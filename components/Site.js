import Link from 'next/link';
import IntakeForm from './IntakeForm';
import { intakeSchemas } from '../lib/intake.mjs';
import { email, emailUrl, pageUrl, projectDestinations, teamProfiles } from '../content/site';

export function ArrowLink({ href, children, className = '', label }) {
  return <Link className={`arrow ${className}`} href={href} aria-label={label}>{children}<span aria-hidden="true">↗</span></Link>;
}
export function SectionTitle({ children, number }) {
  return <div className="sectionTitle">{number && <span aria-hidden="true">{number}</span>}<h2>{children}</h2></div>;
}
function Lines({ children }) {
  return children.split('\n').map(line => <span key={line}>{line}</span>);
}
function PageIntro({ label, headline, intro }) {
  return <section className="pageIntro"><p className="kicker">{label}</p><h1><Lines>{headline}</Lines></h1>{intro && <p className="lead">{intro}</p>}</section>;
}
export function Footer({ copy, language }) {
  return <footer className="siteFooter"><div><strong>MILENA PEREIRA LIMITED</strong><span>{copy.ui.company}</span></div><span>{copy.ui.cities}</span><a href={`mailto:${email}`}>{email}</a><Link href={pageUrl(language)}>{copy.ui.home} ↑</Link></footer>;
}
function Contact({ copy, language, full = false, compact = false, intakePage }) {
  const Heading = full ? 'h1' : 'h2';
  return <section className={`contact dark section ${compact ? 'compactContact' : ''}`} id="contact"><p className="kicker">{copy.contact.title}</p><Heading><Lines>{copy.contact.headline}</Lines></Heading>{!compact && <p className="lead">{copy.contact.intro}</p>}<Link className="contactButton" href={intakePage ? pageUrl(language, intakePage) : emailUrl(copy.ui.projectSubject)}>{intakePage === 'manufacturerApplication' ? copy.commercial.apply : copy.ui.discuss}<span aria-hidden="true">↗</span></Link>{full && <div className="contactRoutes">{['brandEnquiry', 'manufacturerApplication', 'specialistApplication'].map(key => <ArrowLink key={key} href={pageUrl(language, key)}>{copy[key].title}</ArrowLink>)}</div>}<a className="contactEmail" href={`mailto:${email}`}>{email}</a></section>;
}
function Audience({ copy, language }) {
  return <section className="audience section" id="audiences"><SectionTitle number="01">{copy.audience.title}</SectionTitle><div className="audienceRoutes">{copy.audience.items.slice(0, 2).map(([title, description], index) => <Link className="audienceRoute" key={title} href={pageUrl(language, ['brands', 'manufacturers', 'specialists'][index])}><span className="routeNumber" aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div><span className="routeArrow" aria-hidden="true">↗</span></Link>)}</div><div className="secondaryJourney"><p className="kicker">{copy.commercial.secondaryHeading}</p><ArrowLink href={pageUrl(language, 'specialists')}>{copy.commercial.secondaryLink}</ArrowLink></div></section>;
}
function ProjectModels({ copy, language, preview = false }) {
  const Heading = preview ? 'h3' : 'h2';
  return <section className="section projects" id="project-models">{preview && <SectionTitle number="03">{copy.projects.title}</SectionTitle>}<div className="projectGrid">{copy.projects.items.map((project, index) => <article className="projectCard" key={project.title}><p className="kicker">{project.audience}</p><Heading>{project.title}</Heading>{!preview && <p>{project.description}</p>}<ArrowLink label={`${copy.ui.explore}: ${project.title}`} href={pageUrl(language, preview ? 'projects' : projectDestinations[index])}>{copy.ui.explore}</ArrowLink></article>)}</div>{preview && <p className="smallNote">{copy.projects.intro}</p>}</section>;
}
function Network({ copy }) {
  return <section className="network section dark" id="network"><SectionTitle number="04">{copy.network.title}</SectionTitle><div className="networkIntro"><h3><Lines>{copy.network.headline}</Lines></h3><p className="serif">{copy.network.intro}</p></div><div className="networkDetails"><div><p className="kicker">{copy.network.manufacturing}</p><p className="marketNames">{copy.network.countries}</p></div><div><p className="kicker">{copy.network.sales}</p><p className="marketNames">{copy.network.markets}</p></div></div><p className="smallNote">{copy.network.note}</p></section>;
}
function FieldNotes({ copy, language, preview = false }) {
  return <section className="section notes">{preview && <SectionTitle number="06">{copy.notes.title}</SectionTitle>}<div className="editorialSplit"><div><p className="kicker">{copy.notes.coming}</p>{preview ? <h3 className="editorialTitle"><Lines>{copy.notes.headline}</Lines></h3> : <ul className="topicList">{copy.notes.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>}</div><div><p className="serif">{copy.notes.intro}</p>{preview ? <ArrowLink href={pageUrl(language, 'notes')}>{copy.notes.explore}</ArrowLink> : <><p>{copy.notes.body}</p><ArrowLink href={emailUrl(copy.notes.subject, copy.notes.request)}>{copy.notes.subscribe}</ArrowLink><p className="smallNote">{copy.notes.note}</p></>}</div></div></section>;
}
function Approach({ copy }) {
  return <section className="section approach"><SectionTitle>{copy.ui.approach}</SectionTitle><ol className="stages">{copy.stages.map(([title, description]) => <li key={title}><h3>{title}</h3><p>{description}</p></li>)}</ol></section>;
}
function WorkingModel({ copy }) {
  return <section className="section workingModel editorialSplit"><h2 className="editorialTitle"><Lines>{copy.working.title}</Lines></h2><div><p className="serif">{copy.working.body}</p><p>{copy.working.commercial}</p></div></section>;
}
function PresentationFeature({ copy, language }) {
  return <section className="section presentation editorialSplit"><div><p className="kicker">{copy.presentation.eyebrow}</p><h2 className="editorialTitle">{copy.presentation.title}</h2></div><div><p className="serif">{copy.presentation.example}</p><ArrowLink label={`${copy.ui.learn}: ${copy.presentation.title}`} href={pageUrl(language, 'presentation')}>{copy.ui.learn}</ArrowLink></div></section>;
}
function Related({ copy, language, pages }) {
  return <nav className="section related" aria-label={copy.ui.related}><p className="kicker">{copy.ui.related}</p>{pages.map(page => <ArrowLink key={page} href={pageUrl(language, page)}>{copy[page].title}</ArrowLink>)}</nav>;
}
function Home({ copy, language }) {
  return <>
    <section className="hero"><p className="eyebrow">{copy.hero.eyebrow}</p><h1>{copy.hero.lines.map(line => <span key={line}>{line}</span>)}</h1><div className="heroBottom"><p>{copy.hero.intro}</p><ArrowLink href={emailUrl(copy.ui.projectSubject)}>{copy.ui.discuss}</ArrowLink></div><p className="places">{copy.hero.places}</p></section>
    <Audience copy={copy} language={language}/>
    <section className="section what"><SectionTitle number="02">{copy.what.title}</SectionTitle><p className="statement">{copy.what.statement}</p><div className="ecosystem"><p className="kicker">{copy.commercial.ecosystemTitle}</p><ul>{copy.commercial.ecosystem.map(label => <li key={label}>{label}</li>)}</ul></div><div className="pillars">{copy.what.pillars.map(([title, body], index) => <article key={title}><h3>{title}</h3><p>{body}</p><ArrowLink label={`${copy.ui.explore}: ${title}`} href={pageUrl(language, index === 2 ? 'manufacturers' : 'brands')}>{copy.ui.explore}</ArrowLink></article>)}</div></section>
    <ProjectModels copy={copy} language={language} preview/>
    <Network copy={copy}/>
    <section className="section teamTeaser"><SectionTitle number="05">{copy.ui.meet}</SectionTitle><div className="editorialSplit"><h3 className="editorialTitle"><Lines>{copy.team.headline}</Lines></h3><div><p className="serif">{copy.team.teaser}</p><ArrowLink href={pageUrl(language, 'team')}>{copy.ui.meet}</ArrowLink></div></div></section>
    <FieldNotes copy={copy} language={language} preview/>
    <Contact copy={copy} language={language}/>
  </>;
}
function AudiencePage({ copy, language, page }) {
  const content = copy[page];
  const maker = page === 'manufacturers';
  return <>
    <PageIntro label={content.title} headline={content.headline} intro={content.intro}/>
    {maker ? <nav className="section commercialChoices" aria-label={copy.ui.services}><a href="#development">01 — {copy.commercial.developmentTitle} ↓</a><a href="#representation">02 — {copy.commercial.representationTitle} ↓</a></nav> : <section className="section brandChallenge"><p className="serif">{copy.commercial.brandIntro}</p><ArrowLink href={pageUrl(language, 'brandEnquiry')}>{copy.ui.discuss}</ArrowLink></section>}
    <section className="section serviceSection" id="development"><SectionTitle>{maker ? copy.commercial.developmentTitle : copy.ui.services}</SectionTitle>{maker && <p className="sectionLead serif">{copy.commercial.developmentIntro}</p>}<ol className="serviceList">{content.services.map(item => <li key={item}>{item}</li>)}</ol></section>
    {maker && <><PresentationFeature copy={copy} language={language}/><section className="section dark representation" id="representation"><p className="kicker">02</p><h2 className="editorialTitle">{copy.commercial.representationTitle}</h2><div className="editorialSplit"><p className="serif">{copy.commercial.representationIntro}</p><div><p>{copy.commercial.representationBody}</p><p className="smallNote">{copy.commercial.selection}</p><ArrowLink href={pageUrl(language, 'manufacturerApplication')}>{copy.commercial.apply}</ArrowLink></div></div></section></>}
    <Approach copy={copy}/><WorkingModel copy={copy}/><Related copy={copy} language={language} pages={maker ? ['presentation', 'projects'] : ['projects', 'team']}/><Contact copy={copy} language={language} compact intakePage={maker ? 'manufacturerApplication' : 'brandEnquiry'}/>
  </>;
}
function Team({ copy, language }) {
  return <><PageIntro label={copy.team.title} headline={copy.team.headline} intro={copy.team.body}/><section className="section profiles">{teamProfiles.map(profile => <article className="profile" key={profile.id}><div><h2>{profile.name}</h2><p className="kicker">{copy.team[profile.roleKey]}</p></div><div><p className="serif">{copy.team.teaser}</p><ArrowLink href={pageUrl(language, profile.page)}>{copy.ui.about}</ArrowLink></div></article>)}</section><section className="section"><SectionTitle>{copy.team.capabilitiesTitle}</SectionTitle><div className="capabilities">{copy.team.capabilities.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section><Related copy={copy} language={language} pages={['specialists', 'about']}/><Contact copy={copy} language={language} compact/></>;
}
export default function SitePage({ route }) {
  const { copy, language, page } = route;
  if (intakeSchemas[page]) return <><PageIntro label={copy[page].title} headline={copy[page].title} intro={copy[page].intro}/><IntakeForm flow={page} copy={copy.forms} areas={copy.specialists.areas}/><Related copy={copy} language={language} pages={[page === 'brandEnquiry' ? 'brands' : page === 'manufacturerApplication' ? 'manufacturers' : 'specialists']}/></>;
  if (page === 'home') return <Home copy={copy} language={language}/>;
  if (page === 'brands' || page === 'manufacturers') return <AudiencePage copy={copy} language={language} page={page}/>;
  if (page === 'team') return <Team copy={copy} language={language}/>;
  if (page === 'contact') return <Contact copy={copy} language={language} full/>;
  if (page === 'projects') return <><PageIntro label={copy.nav.projects} headline={copy.projects.title} intro={copy.projects.intro}/><ProjectModels copy={copy} language={language}/><Contact copy={copy} language={language} compact/></>;
  if (page === 'notes') return <><PageIntro label={copy.notes.title} headline={copy.notes.headline}/><FieldNotes copy={copy} language={language}/></>;
  if (page === 'about') return <><PageIntro label={copy.about.title} headline={copy.about.headline}/><section className="section aboutBody"><div className="editorialSplit"><p className="serif">{copy.about.paragraphs[0]}</p><p className="serif">{copy.about.paragraphs[1]}</p></div><p className="credentials">{copy.about.strip}</p></section><WorkingModel copy={copy}/><Related copy={copy} language={language} pages={['team', 'projects']}/><Contact copy={copy} language={language} compact/></>;
  if (page === 'presentation') return <><PageIntro label={copy.presentation.eyebrow} headline={copy.presentation.title} intro={copy.presentation.intro}/><section className="section editorialSplit presentationScope"><p className="serif">{copy.presentation.scope}</p><aside><p className="kicker">{copy.presentation.exampleLabel}</p><p className="serif">{copy.presentation.example}</p></aside></section><Approach copy={copy}/><Related copy={copy} language={language} pages={['manufacturers', 'projects']}/><Contact copy={copy} language={language} compact/></>;
  if (page === 'specialists') return <><PageIntro label={copy.specialists.title} headline={copy.specialists.headline} intro={copy.specialists.intro}/><section className="section"><SectionTitle>{copy.specialists.areasTitle}</SectionTitle><ul className="serviceList specialistAreas">{copy.specialists.areas.map(area => <li key={area}>{area}</li>)}</ul></section><section className="section specialistInvite editorialSplit"><h2 className="editorialTitle">{copy.ui.join}</h2><div><p className="serif">{copy.specialists.body}</p><p className="smallNote">{copy.specialists.note}</p><ArrowLink href={pageUrl(language, 'specialistApplication')}>{copy.ui.join}</ArrowLink></div></section><Related copy={copy} language={language} pages={['team']}/></>;
  return <><PageIntro label={copy.services.title} headline={copy.services.headline} intro={copy.services.intro}/><section className="section serviceRoutes">{['brands', 'manufacturers', 'presentation'].map(key => <article key={key}><h2 className="editorialTitle">{copy[key].title}</h2><div><p>{copy[key].intro}</p><ArrowLink label={`${copy.ui.learn}: ${copy[key].title}`} href={pageUrl(language, key)}>{copy.ui.learn}</ArrowLink></div></article>)}</section><Contact copy={copy} language={language} compact/></>;
}
