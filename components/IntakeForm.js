'use client';

import { useEffect, useRef, useState } from 'react';
import { intakeSchemas, validateIntake, prepareDraft, draftMailto } from '../lib/intake.mjs';

export default function IntakeForm({ flow, copy, areas }) {
 const [ready,setReady]=useState(false);
 const [values,setValues]=useState({});
 const [consent,setConsent]=useState(false);
 const [errors,setErrors]=useState({});
 const [draft,setDraft]=useState(null);
 const [copyStatus,setCopyStatus]=useState('');
 const draftHeading=useRef(null);
 const errorSummary=useRef(null);
 const form=useRef(null);
 const schema=intakeSchemas[flow];
 useEffect(()=>setReady(true),[]);
 useEffect(()=>{if(draft!==null)draftHeading.current?.focus();},[draft]);
 useEffect(()=>{if(Object.keys(errors).length)errorSummary.current?.focus();},[errors]);
 function submit(event){
  event.preventDefault();
  const nextErrors=validateIntake(flow,values,consent);
  setErrors(nextErrors);
  if(Object.keys(nextErrors).length)return;
  setDraft(prepareDraft(flow,values,copy,areas));setCopyStatus('');
 }
 function change(id,value){setValues(current=>({...current,[id]:value}));}
 async function copyDraft(){
  try{await navigator.clipboard.writeText(draft);setCopyStatus(copy.copied);}catch{setCopyStatus(copy.copyError);}
 }
 const mail=draft===null?null:draftMailto(copy.titles[flow],draft);
 return <section className="section intake" data-intake-flow={schema.type}>
  <p className="intakeNotice">{copy.intro}</p>
  <noscript><p>{copy.noScript} <a href="mailto:milena@milenapereira.co">milena@milenapereira.co</a></p></noscript>
  <form ref={form} onSubmit={submit} noValidate hidden={draft!==null}>
   <p className="smallNote">{copy.requiredNote}</p>
   {Object.keys(errors).length>0&&<div className="errorSummary" role="alert" tabIndex={-1} ref={errorSummary}><h2>{copy.errorTitle}</h2><ul>{Object.keys(errors).map(id=><li key={id}><a href={`#field-${id}`}>{id==='consent'?copy.errors.consent:copy.labels[id]}</a></li>)}</ul></div>}
   {schema.groups.map(group=><fieldset key={group.id} disabled={!ready}><legend>{copy.groups[group.id]}</legend><div className="formGrid">{group.fields.map(field=>{
    const error=errors[field.id];
    const hint=field.type==='url'?copy.urlHint:field.id==='clientExperience'?copy.experienceHint:null;
    const props={id:`field-${field.id}`,name:field.id,value:values[field.id]||'',onChange:event=>change(field.id,event.target.value),required:field.required,'aria-invalid':error?'true':undefined,'aria-describedby':[hint?`hint-${field.id}`:'',error?`error-${field.id}`:''].filter(Boolean).join(' ')||undefined};
    return <div className={`formField ${field.type==='textarea'?'wide':''}`} key={field.id}><label htmlFor={props.id}>{copy.labels[field.id]}{field.required?<span aria-hidden="true"> *</span>:<span className="optional"> ({copy.optional})</span>}</label>{field.type==='textarea'?<textarea {...props} rows={4} maxLength={field.maxLength}/>:field.type==='select'?<select {...props}><option value="">{copy.choose}</option>{areas.map((area,index)=><option key={area} value={index}>{area}</option>)}</select>:<input {...props} type={field.type} maxLength={field.type!=='number'?field.maxLength:undefined} min={field.type==='number'?0:undefined} max={field.type==='number'?80:undefined} step={field.type==='number'?'any':undefined} autoComplete={field.id==='email'?'email':field.id==='name'?'name':field.id==='company'?'organization':field.id==='role'?'organization-title':field.id==='country'?'country-name':field.id==='city'?'address-level2':undefined}/>} {hint&&<p className="fieldHint" id={`hint-${field.id}`}>{hint}</p>}{error&&<p className="fieldError" id={`error-${field.id}`}>{copy.errors[error].replace('{max}',field.maxLength)}</p>}</div>;
   })}</div></fieldset>)}
   <div className="consent"><label htmlFor="field-consent"><input disabled={!ready} id="field-consent" type="checkbox" checked={consent} onChange={event=>setConsent(event.target.checked)} aria-invalid={errors.consent?'true':undefined} aria-describedby={errors.consent?'error-consent':'intake-privacy'}/><span>{copy.consent}</span></label>{errors.consent&&<p className="fieldError" id="error-consent">{copy.errors.consent}</p>}<p className="smallNote" id="intake-privacy">{copy.privacy}</p></div>
   <button type="submit" className="formButton" disabled={!ready}>{copy.submit[flow]} <span aria-hidden="true">↗</span></button><p className="smallNote">{copy.beforeSubmit}</p>
  </form>
  {draft!==null&&<div className="draftPanel"><h2 ref={draftHeading} tabIndex={-1}>{copy.ready}</h2><p>{copy.notSent}</p><p>{mail.includesBody?copy.shortDraft:copy.longDraft}</p><label htmlFor="email-draft">{copy.draftLabel}</label><textarea id="email-draft" rows={15} readOnly value={draft}/><div className="draftActions"><button type="button" className="formButton" onClick={copyDraft}>{copy.copy}</button><a className="formButton" href={mail.href}>{copy.openEmail} ↗</a><button type="button" className="arrow" onClick={()=>{setDraft(null);setCopyStatus('');requestAnimationFrame(()=>form.current?.querySelector('input')?.focus());}}>{copy.edit}</button></div><p role="status" className="smallNote">{copyStatus}</p><a className="contactEmail" href="mailto:milena@milenapereira.co">milena@milenapereira.co</a></div>}
 </section>;
}
