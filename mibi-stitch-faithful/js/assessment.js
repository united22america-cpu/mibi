import {questions} from './data.js';
import {KEY_INDEX,KEY_ANSWERS,getAnswers,toast} from './common.js';

const choices=[...document.querySelectorAll('.likert-pill')];
const questionEl=document.querySelector('main h1');
const nextBtn=document.querySelector('#nextBtn');
const prevBtn=document.querySelector('#prevBtn');
const save=document.querySelector('#saveStatusText');
let answers=getAnswers();
let index=Math.min(questions.length-1,Math.max(0,Number(localStorage.getItem(KEY_INDEX)||0)));
let autoAdvanceTimer=null;
let advancing=false;
const defaultClasses=choices.map(c=>c.className.replace('active-pill','').replace('bg-[#B7CBB9]','bg-cloud-cream').replace('border-sage-green','border-border-subtle').replace('shadow-md','shadow-sm'));

function cancelAutoAdvance(){
  if(autoAdvanceTimer!==null) clearTimeout(autoAdvanceTimer);
  autoAdvanceTimer=null;
}
function render(){
  const q=questions[index];
  questionEl.textContent='“'+q.text+'”';
  const progress=document.querySelector('main .rounded-full.px-5');
  if(progress){
    const labels=progress.querySelectorAll('span');
    for(const sp of labels){
      const txt=sp.textContent.trim();
      if(txt.startsWith('Dimension ')) sp.textContent='Dimension '+q.section+' of 4';
      else if(['Perception & Intuition','Energy & Connection','Decisions & Values','Rhythm & Lifestyle'].includes(txt)) sp.textContent=q.dimensionLabel;
      else if(txt.includes('mins remaining')) sp.textContent='~'+Math.max(1,Math.ceil((questions.length-index)/5))+' mins remaining';
    }
    const strong=progress.querySelector('strong');
    if(strong) strong.textContent=String(index+1);
    const bar=progress.querySelector('.h-full.bg-sage-green');
    if(bar) bar.style.width=(100*(index+1)/questions.length)+'%';
  }
  const val=Number(answers[q.id]||0);
  choices.forEach((c,i)=>{
    c.className=defaultClasses[i];
    c.classList.remove('is-chosen');
    c.setAttribute('aria-checked',String(val===i+1));
    const check=c.querySelector('.check-icon');
    if(check){check.classList.add('hidden');check.classList.remove('inline')}
    if(val===i+1){
      c.classList.add('is-chosen');
      if(check){check.classList.remove('hidden');check.classList.add('inline')}
    }
  });
  prevBtn.disabled=index===0;
  prevBtn.style.opacity=index===0?'0.55':'1';
  const nextText=nextBtn.querySelector('span:not(.material-symbols-outlined)');
  if(nextText) nextText.textContent=index===questions.length-1?'See My Results':'Next Question';
  if(save) save.textContent='Mibi auto-saves your reflections locally';
}
function advance(){
  if(advancing) return;
  cancelAutoAdvance();
  if(!answers[questions[index].id]){toast('Choose an answer to continue.');return;}
  advancing=true;
  if(index===questions.length-1){
    localStorage.setItem(KEY_INDEX,'0');
    location.href='./result.html?from=assessment';
    return;
  }
  index++;
  localStorage.setItem(KEY_INDEX,String(index));
  render();
  advancing=false;
}
function choose(val){
  if(advancing) return;
  cancelAutoAdvance();
  answers[questions[index].id]=Number(val);
  localStorage.setItem(KEY_ANSWERS,JSON.stringify(answers));
  render();
  if(save) save.textContent='✓ Response saved · Next question…';
  // Display the selected state briefly before advancing. Repeated selections
  // reset the timer so a quick double click cannot skip two questions.
  autoAdvanceTimer=setTimeout(advance,380);
}
choices.forEach(c=>c.addEventListener('click',()=>choose(c.dataset.val)));
nextBtn.addEventListener('click',advance);
prevBtn.addEventListener('click',()=>{
  cancelAutoAdvance();
  index=Math.max(0,index-1);
  localStorage.setItem(KEY_INDEX,String(index));
  render();
});
window.addEventListener('keydown',e=>{
  if(e.target.closest('input,textarea,select'))return;
  if('12345'.includes(e.key)&&e.key.length===1){
    e.preventDefault();
    choose(Number(e.key));
    return;
  }
  if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
    e.preventDefault();
    const prev=Number(answers[questions[index].id]||3);
    choose(Math.max(1,Math.min(5,prev+(e.key==='ArrowRight'?1:-1))));
    return;
  }
  if(e.key==='Enter'&&!(e.target instanceof HTMLButtonElement)){
    e.preventDefault();
    advance();
  }
});
window.addEventListener('pagehide',cancelAutoAdvance);
render();
