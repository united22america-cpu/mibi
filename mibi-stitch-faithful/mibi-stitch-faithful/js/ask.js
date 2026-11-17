import './common.js';
import {toast} from './common.js';
// The AI API and data storage will be connected in a later phase.
function note(){toast('Ask Mibi is a visual preview. The AI companion will be connected in a later phase.')}
const box=document.querySelector('#chatInput');if(box){box.setAttribute('placeholder','AI chat coming soon — try a suggested prompt');box.setAttribute('aria-label','Ask Mibi preview input');}
window.handleSend=note;
const sendButtons=[...document.querySelectorAll('button')].filter(b=>b.textContent.includes('send')||b.getAttribute('aria-label')?.toLowerCase().includes('send'));
sendButtons.forEach(b=>b.addEventListener('click',e=>{e.preventDefault();note()}));
if(box)box.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();note()}});
