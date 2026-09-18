// Stable field IDs and separate flow types can be reused by a future private intake service.
// This implementation prepares email drafts only; it has no storage or submission endpoint.
const field = (id, type = 'text', required = false, maxLength = 160) => ({ id, type, required, maxLength });
export const intakeSchemas = {
 brandEnquiry: { type:'brand_lead', groups:[{id:'project',fields:[field('name','text',true),field('company','text',true),field('role'),field('email','email',true),field('website','url'),field('categories'),field('help','textarea',true,1200),field('timing'),field('budget')]}]},
 manufacturerApplication: {type:'manufacturer_application',groups:[
  {id:'company',fields:[field('company','text',true),field('name','text',true),field('role'),field('email','email',true),field('phone'),field('website','url'),field('country','text',true),field('city')]},
  {id:'capabilities',fields:[field('categories','text',true),field('specialisms','textarea',true,800),field('materials','textarea',false,800),field('machinery','textarea',false,800)]},
  {id:'production',fields:[field('moq'),field('capacity'),field('leadTimes'),field('sampleRoom','textarea',false,800)]},
  {id:'experience',fields:[field('currentMarkets'),field('premiumExperience','textarea',false,800),field('clientExperience','textarea',false,800)]},
  {id:'standards',fields:[field('certifications'),field('compliance','textarea',false,800)]},
  {id:'ambitions',fields:[field('targetMarkets'),field('introduction','textarea',true,1200),field('profileUrl','url')]},
 ]},
 specialistApplication:{type:'specialist_application',groups:[
  {id:'profile',fields:[field('name','text',true),field('email','email',true),field('location','text',true),field('languages')]},
  {id:'expertise',fields:[field('expertise','select',true),field('categories'),field('years','number'),field('currentMarkets'),field('availability'),field('status'),field('portfolio','url'),field('linkedin','url'),field('rate'),field('introduction','textarea',true,1200)]},
 ]},
};
export function validateIntake(flow, values, consent) {
 const schema=intakeSchemas[flow];
 if(!schema)throw new Error('Unknown intake flow');
 const errors={};
 for(const field of schema.groups.flatMap(group=>group.fields)){
  const value=String(values[field.id]??'').trim();
  if(field.required&&!value){errors[field.id]='required';continue;}
  if(!value)continue;
  if(value.length>field.maxLength){errors[field.id]='tooLong';continue;}
  if(field.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))errors[field.id]='email';
  if(field.type==='url')try{const u=new URL(value);if(!['https:','http:'].includes(u.protocol)||!u.hostname.includes('.')||u.username||u.password)errors[field.id]='url';}catch{errors[field.id]='url';}
  if(field.type==='number'&&(!Number.isFinite(Number(value))||Number(value)<0||Number(value)>80))errors[field.id]='number';
  if(field.type==='select'&&!/^[0-7]$/.test(value))errors[field.id]='required';
 }
 if(!consent)errors.consent='consent';
 return errors;
}
export function prepareDraft(flow, values, copy, areas) {
 const schema=intakeSchemas[flow];
 const lines=[copy.titles[flow], ''];
 for(const group of schema.groups){
  lines.push(copy.groups[group.id]);
  for(const field of group.fields){
   let value=String(values[field.id]??'').trim();
   if(field.type==='select'&&value)value=areas[Number(value)];
   if(value)lines.push(`${copy.labels[field.id]}: ${value}`);
  }
  lines.push('');
 }
 lines.push(copy.consent);
 return lines.join('\n');
}
export function draftMailto(subject, draft) {
 const base=`mailto:milena@milenapereira.co?subject=${encodeURIComponent(subject)}`;
 const full=`${base}&body=${encodeURIComponent(draft)}`;
 return {href:full.length<=1800?full:base,includesBody:full.length<=1800};
}
