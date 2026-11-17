import {openAssessment,openType,toast} from './common.js';
document.querySelectorAll('.personality-card').forEach(card=>{
 const code=card.querySelector('.text-2xl')?.textContent?.trim();if(!code)return;
 card.setAttribute('role','link');card.setAttribute('tabindex','0');card.setAttribute('aria-label','Explore '+code+' personality profile');
 card.addEventListener('click',()=>openType(code));card.addEventListener('keydown',e=>{if(e.key==='Enter'){openType(code)}});
});
// The original Stitch visual interactions are preserved.
document.querySelectorAll('button').forEach(btn=>{
 const label=btn.textContent.replace(/\s+/g,' ').trim().toLowerCase();
 if(label.includes('exploring my energy')||label.includes('setting gentle boundaries')||label.includes('understanding my type')){
 btn.addEventListener('click',()=>{location.href='./ask-mibi.html'});
 }
});
