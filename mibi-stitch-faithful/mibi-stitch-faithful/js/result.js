import {types,scoreAnswers} from './data.js';
import {KEY_ANSWERS,KEY_INDEX,getAnswers,openAssessment,toast} from './common.js';
const params=new URLSearchParams(location.search),answers=getAnswers(),scored=scoreAnswers(answers),hasFullResult=scored.answered===40;
const typeCode=(params.get('type')||((params.has('from')&&hasFullResult)?scored.code:'INFJ')).toUpperCase();
const data=types.find(t=>t[0]===typeCode)||types[4];const code=data[0],name=data[1],desc=data[3];
const h1=document.querySelector('main h1');if(h1)h1.textContent=code;
const h2=document.querySelector('main h2');if(h2)h2.textContent=name;
document.title=`${code} — ${name} | mibi`;
// Retain the Stitch result design, but never give a false impression of a clinically validated type.
const intro=document.querySelector('.relative.z-10.grid');if(intro){let p=[...intro.querySelectorAll('p')].find(x=>x.textContent.trim().length>50);if(p)p.textContent=desc+' Personality types are reflective lenses, not fixed identities or diagnoses.'}
// Replace remaining sample INFJ text when displaying a different archetype.
if(code!=='INFJ'){
 const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;while(node=walk.nextNode()){
  if(node.parentElement?.closest('script,style'))continue;
  if(node.textContent.includes('INFJ'))node.textContent=node.textContent.replaceAll('INFJ',code);
  if(node.textContent.includes('The Mindful Clarifier'))node.textContent=node.textContent.replaceAll('The Mindful Clarifier',name);
 }
}
if(params.has('from')&&!hasFullResult){toast('Complete all 40 questions to receive your result.');setTimeout(()=>location.href='./assessment.html',800)}
// Correct the static Stitch example balance visuals with real quiz results when available.
if(params.has('from')&&hasFullResult){
 const anchor=[...document.querySelectorAll('h3')].find(n=>n.textContent.includes('4 Dimensional Balances'));
 if(anchor){const block=document.createElement('div');block.className='mibi-scores';block.setAttribute('aria-label','Your four dimension preferences');
  for(const item of scored.balances){const row=document.createElement('div');row.className='mibi-score-row';const left=document.createElement('span');left.textContent=item.first;const track=document.createElement('div');track.className='mibi-score-track';const fill=document.createElement('div');fill.className='mibi-score-fill';fill.style.width=item.percent+'%';track.append(fill);const right=document.createElement('span');right.textContent=item.second;row.append(left,track,right);block.append(row)}
  const note=document.createElement('p');note.style.cssText='font-size:12px;color:#686E74;margin-bottom:16px';note.textContent='Illustrative preference scores derived from your responses; not a validated psychological measure.';block.append(note);anchor.insertAdjacentElement('afterend',block);
 }
}
// Original share modal behavior is retained from the Stitch export.
const links=[...document.querySelectorAll('a')];links.forEach(a=>{const t=a.textContent.toLowerCase();if(t.includes('retake')||t.includes('take assessment'))a.addEventListener('click',e=>{e.preventDefault();localStorage.removeItem(KEY_ANSWERS);localStorage.setItem(KEY_INDEX,'0');openAssessment()});if(t.includes('ask mibi'))a.addEventListener('click',e=>{e.preventDefault();location.href='./ask-mibi.html'})});
