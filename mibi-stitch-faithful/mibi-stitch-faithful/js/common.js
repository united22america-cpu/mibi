export const KEY_ANSWERS='mibi-answers-v2';export const KEY_INDEX='mibi-index-v2';
export function toast(message){const old=document.querySelector('.mibi-toast');if(old)old.remove();const node=document.createElement('div');node.className='mibi-toast';node.setAttribute('role','status');node.textContent=message;document.body.appendChild(node);setTimeout(()=>node.remove(),3400)}
export function openAssessment(){location.href='./assessment.html'}
export function openType(code){location.href='./result.html?type='+encodeURIComponent(code)}
export function getAnswers(){try{return JSON.parse(localStorage.getItem(KEY_ANSWERS)||'{}')}catch{return{}}}
export function nav(){document.addEventListener('click',e=>{
 const a=e.target.closest('a');if(!a)return;const text=a.textContent.replace(/\s+/g,' ').trim().toLowerCase();const dest=a.getAttribute('href')||'';
 if(dest.startsWith('http')||dest.startsWith('mailto:'))return;
 if(text.includes('discover your type')||text.includes('take the assessment')||text.includes('start assessment')||dest==='#assessment'){e.preventDefault();openAssessment();return}
 if(text.includes('ask mibi')||text.includes('chat with mibi')||text.includes('ai companion')||text.includes('meet mibi')||dest==='#companion' && location.pathname!='/index.html'){e.preventDefault();location.href='./ask-mibi.html';return}
 if(text.includes('personality types')||text==='explore types'){e.preventDefault();location.href='./index.html#temperaments';return}
 if(text==='discover'||text==='mibi.'||text.includes('exit assessment')){e.preventDefault();location.href='./index.html';return}
 if(text==='sign in'){e.preventDefault();toast('Sign in will arrive with the backend phase.');return}
 if(dest==='#' && !a.onclick){e.preventDefault();toast('This section is planned for a future release.')}
 });}
nav();
