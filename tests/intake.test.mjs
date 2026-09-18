import test from 'node:test';
import assert from 'node:assert/strict';
import { intakeSchemas, validateIntake, prepareDraft, draftMailto } from '../lib/intake.mjs';
import forms from '../content/forms.js';
import commercial from '../content/commercial.js';

function requiredValues(flow) {
 return Object.fromEntries(intakeSchemas[flow].groups.flatMap(g=>g.fields).filter(f=>f.required).map(f=>[f.id,f.type==='email'?'review@example.org':f.type==='select'?'0':'Review content']));
}
test('three distinct intake types validate required fields and consent',()=>{
 assert.equal(new Set(Object.values(intakeSchemas).map(s=>s.type)).size,3);
 for(const flow of Object.keys(intakeSchemas)){
  assert.deepEqual(validateIntake(flow,requiredValues(flow),true),{});
  assert.equal(validateIntake(flow,requiredValues(flow),false).consent,'consent');
  assert.equal(validateIntake(flow,{...requiredValues(flow),email:'invalid@'},true).email,'email');
  assert.ok(Object.keys(validateIntake(flow,{},false)).length>3);
 }
});
test('rejects unsafe URLs, overlong input and invalid specialist experience',()=>{
 const flow='brandEnquiry',base=requiredValues(flow);
 for(const website of ['javascript:alert(1)','file:///private/data','https://user:password@example.org','not-a-url'])assert.equal(validateIntake(flow,{...base,website},true).website,'url');
 assert.deepEqual(validateIntake(flow,{...base,website:'https://example.org/profile'},true),{});
 assert.equal(validateIntake(flow,{...base,help:'x'.repeat(1201)},true).help,'tooLong');
 for(const years of ['-1','81','NaN'])assert.equal(validateIntake('specialistApplication',{...requiredValues('specialistApplication'),years},true).years,'number');
 assert.equal(validateIntake('specialistApplication',{...requiredValues('specialistApplication'),expertise:'99'},true).expertise,'required');
});
test('all six languages cover every field, group, message and commercial content key',()=>{
 function shape(value){if(Array.isArray(value))return value.map(shape);if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(k=>[k,shape(value[k])]));assert.equal(typeof value,'string');assert.ok(value.trim());return 'text';}
 for(const lang of ['en','fr','pt','it','es','zh']){
  assert.deepEqual(shape(forms[lang]),shape(forms.en));assert.deepEqual(shape(commercial[lang]),shape(commercial.en));
  for(const [flow,schema] of Object.entries(intakeSchemas)){
   assert.ok(forms[lang].titles[flow]);
   for(const group of schema.groups){assert.ok(forms[lang].groups[group.id]);for(const field of group.fields)assert.ok(forms[lang].labels[field.id]);}
  }
 }
});
test('drafts contain only allowed fields and correctly render first expertise selection',()=>{
 const values={...requiredValues('specialistApplication'),unknown:'DO NOT INCLUDE'};
 const draft=prepareDraft('specialistApplication',values,forms.en,['Creative & Design']);
 assert.ok(draft.includes('Creative & Design'));assert.ok(!draft.includes('DO NOT INCLUDE'));assert.ok(draft.includes(forms.en.consent));
});
test('long or multibyte applications never silently truncate the email body',()=>{
 const short=draftMailto('Brand enquiry','A short enquiry');assert.equal(short.includesBody,true);assert.equal(new URL(short.href).searchParams.get('body'),'A short enquiry');
 for(const body of ['x'.repeat(2200),'制造专业能力'.repeat(100)]){
  const long=draftMailto('Manufacturer application',body);assert.equal(long.includesBody,false);assert.equal(new URL(long.href).searchParams.has('body'),false);assert.ok(long.href.length<1800);
 }
});
