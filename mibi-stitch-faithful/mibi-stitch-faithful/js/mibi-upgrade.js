import {locales,ui,questionTranslations} from './mibi-i18n.js';

// Focused progressive enhancement. No original Stitch layout or mascot is replaced.
const paths={discover:'index.html',types:'types.html',how:'how-it-works.html',ask:'ask-mibi.html',about:'about.html',take:'assessment.html'};
const page=(location.pathname.split('/').pop()||'index.html');
const safeGet=(key,fallback)=>{try{return localStorage.getItem(key)||fallback}catch{return fallback}};
const safeSet=(key,val)=>{try{localStorage.setItem(key,val)}catch{}};
let lang=safeGet('mibi-lang','en');if(!ui[lang])lang='en';
let vibe=safeGet('mibi-vibe','peach');if(!['peach','violet'].includes(vibe))vibe='peach';
const current=()=>ui[lang]||ui.en;
const mibiLabel=(key)=>current()[key]||ui.en[key]||key;

function fixNavigation(){
 const labels={discover:['discover','explore'],types:['personality types','explore types','types'],how:['how it works'],ask:['ask mibi','meet mibi','chat with mibi'],about:['about','about us'],take:['discover your type','start assessment','take the assessment']};
 document.querySelectorAll('a').forEach(a=>{
   const text=a.textContent.replace(/\s+/g,' ').trim().toLowerCase();
   for(const [key,values] of Object.entries(labels)){
     if(values.includes(text) || (key==='discover' && /^mibi\.?$/.test(text))){
       a.dataset.mibiNav=key;a.href='./'+paths[key];break;
     }
   }
   if(a.getAttribute('href')==='#assessment') {a.dataset.mibiNav='take';a.href='./assessment.html'}
   if(a.getAttribute('href')==='#companion') {a.dataset.mibiNav='ask';a.href='./ask-mibi.html'}
 });
 // This capture handler prevents the legacy shared script from hijacking the new links.
 document.addEventListener('click',e=>{
   const anchor=e.target.closest?.('a[data-mibi-nav]');if(!anchor)return;
   e.stopPropagation();
 },true);
 const header=document.querySelector('header');if(!header)return;
 const existing=header.querySelector('nav');
 if(existing){
   existing.querySelectorAll('a[data-mibi-nav]').forEach(a=>{a.setAttribute('aria-current',a.getAttribute('href')?.endsWith(page)?'page':'false')});
 }
 const root=header.querySelector('div.flex')||header.firstElementChild;
 if(!root)return;
 const toggle=document.createElement('button');toggle.className='mibi-menu-toggle';toggle.type='button';toggle.setAttribute('aria-label','Open menu');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';
 const menu=document.createElement('div');menu.className='mibi-mobile-menu';menu.id='mibi-mobile-menu';
 for(const k of ['discover','types','how','ask','about','take']){const a=document.createElement('a');a.href='./'+paths[k];a.dataset.i18n=k;a.textContent=mibiLabel(k);menu.append(a)}
 toggle.addEventListener('click',()=>{const open=menu.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});
 root.append(toggle);header.append(menu);
}
function installControls(){
 const header=document.querySelector('header');if(!header)return;
 const controls=document.createElement('div');controls.className='mibi-controls';
 const select=document.createElement('select');select.id='mibi-language';select.className='mibi-lang-select';select.setAttribute('aria-label','Choose a language');
 for(const [code,label] of locales){const opt=document.createElement('option');opt.value=code;opt.textContent=label;select.appendChild(opt)}
 select.value=lang;
 select.addEventListener('change',()=>{lang=select.value;safeSet('mibi-lang',lang);document.documentElement.lang=lang;translatePage();renderQuestionTranslation();updateAssessmentLabels()});
 controls.append(select);
 // Remove only the existing non-functional language button; preserve other actions.
 const old=[...header.querySelectorAll('button')].find(b=>/English(?:\s*\(10\))?/.test(b.textContent)||b.textContent.trim()==='English');
 if(old)old.style.display='none';
 const root=header.querySelector('div.flex')||header.firstElementChild;
 if(root)root.append(controls);
 document.documentElement.lang=lang;
 // Footer language chips become click targets as well.
 document.querySelectorAll('footer span,footer a').forEach(el=>{
   const s=el.textContent.trim().toLowerCase();const found=locales.find(([code,label])=>s===label.toLowerCase()||s.startsWith(label.toLowerCase()+' (')||s===code||s===code.toUpperCase().toLowerCase());
   if(!found)return;el.style.cursor='pointer';el.tabIndex=0;el.setAttribute('role','button');el.setAttribute('title','Switch language to '+found[1]);
   const change=()=>{select.value=found[0];select.dispatchEvent(new Event('change'))};
   el.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();change()});
   el.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();change()}});
 });
}
function initVibe(){
 document.body.classList.toggle('mibi-violet',vibe==='violet');
 const hero=page==='index.html'?document.querySelector('main section')?.firstElementChild:null;
 if(hero){hero.classList.add('mibi-hero-panel');const image=hero.querySelector('img[src*="mibi-wave"]');image?.parentElement?.classList.add('mibi-mascot-frame');}
 const host=page==='index.html'?document.querySelector('main section'):null;
 if(host){
   const bar=document.createElement('div');bar.className='mibi-home-vibe';
   const label=document.createElement('span');label.className='caption';label.dataset.i18n='vibe';label.textContent=mibiLabel('vibe');bar.append(label);
   bar.append(makeVibeButtons());host.parentNode.insertBefore(bar,host);
 }
 // Keep a small setting on all supporting pages, without a second large banner.
}
function makeVibeButtons(){
 const group=document.createElement('div');group.className='mibi-vibe-control';group.setAttribute('role','group');group.setAttribute('aria-label','Choose the color mood');
 for(const choice of ['peach','violet']){
   const b=document.createElement('button');b.type='button';b.className='mibi-vibe-btn';b.dataset.vibe=choice;b.setAttribute('aria-pressed',String(vibe===choice));
   const dot=document.createElement('span');dot.className='dot';const lbl=document.createElement('span');lbl.className='label';lbl.dataset.i18n=choice==='peach'?'calm':'violet';lbl.textContent=mibiLabel(choice==='peach'?'calm':'violet');b.append(dot,lbl);
   b.addEventListener('click',()=>{vibe=choice;safeSet('mibi-vibe',vibe);document.body.classList.toggle('mibi-violet',vibe==='violet');document.querySelectorAll('.mibi-vibe-btn').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.vibe===vibe)))});group.append(b)
 }
 return group;
}
const englishKeys={
 'Discover':'discover','Explore':'discover','Personality Types':'types','How It Works':'how','Ask Mibi':'ask','About':'about','About Us':'about',
 'Discover Your Type':'take','Meet Mibi':'meet','Sign in':'signin','Sign In':'signin',
 'A little more you, every day.':'hero','Discover the way you think, connect, and grow.':'intro',
 'Your journey of self-discovery starts here.':'journey','Previous':'prev','Next Question':'next','See My Results':'results',
 'Mibi auto-saves your reflections locally':'saves','Understand yourself':'contact','Connect better':'connecting',
 'Discover your strengths':'strengths','Grow at your own pace':'grow','Explore the Four Temperament Families':'explore',
 'Neutral / Balanced':'balanced','Agree':'agree','Disagree':'disagree','Neutral':'neutral',
 'Strongly Agree':'strongAgree','Strongly Disagree':'strongDisagree'
};
function translatePage(){
 document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(current()[key])el.textContent=current()[key]});
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode()){
   if(node.parentElement?.closest('script,style,select,option,textarea'))continue;
   if(node.parentElement?.closest('main h1') && page==='assessment.html')continue;
   const original=node.parentElement?.dataset.mibiEn||node.textContent.trim();
   const key=englishKeys[original];if(!key)continue;
   node.parentElement.dataset.mibiEn=original;
   node.textContent=node.textContent.replace(node.textContent.trim(),mibiLabel(key));
 }
 document.querySelectorAll('[data-mibi-nav]').forEach(el=>{
   const key=el.dataset.mibiNav;if(key&&current()[key]){
     // Update only simple menu labels, leaving nested icons and brand typography intact.
     if(el.children.length===0)el.textContent=current()[key];
   }
 });
 // Avoid advertising whole-page translations where longer editorial copy remains English.
}
const Q_EN=[
 'After a full week, quiet time alone helps me recharge.','I feel energized after spending time with a lively group.','I prefer thinking through an idea before discussing it.','Talking through ideas helps me understand them.','I enjoy a small circle of deep connections.','Meeting new people comes naturally to me.','I find extended social activity tiring, even when enjoyable.','I often initiate conversations in unfamiliar settings.','I do my best reflection in solitude.','I feel inspired by shared group energy.',
 'I feel inspired by imagining long-term possibilities and hidden meanings.','I trust practical details that I can observe directly.','I enjoy exploring abstract patterns and connections.','I prefer clear examples over theoretical explanations.','I often think about what might happen years from now.','I notice small changes in my immediate surroundings.','Unusual ideas interest me even before they seem practical.','I like building on methods that have already worked.','I search for the deeper meaning behind events.','I enjoy solving problems through concrete steps.',
 'I consider how decisions affect the people involved.','I prioritize consistent logic when choosing between options.','Harmony matters to me when resolving disagreements.','I appreciate direct feedback even when it feels uncomfortable.','Personal values strongly influence my choices.','I naturally analyze arguments for inconsistencies.','I notice the emotional atmosphere of a room.','I try to separate feelings from factual judgments.','I value compassion when evaluating a difficult situation.','I find fair principles more useful than individual exceptions.',
 'I enjoy leaving room for spontaneous changes.','I feel comfortable when plans are decided in advance.','I like exploring options before making a final commitment.','Finishing a task early gives me peace of mind.','I adapt easily when priorities shift.','Clear schedules help me feel organized.','I work well when I can follow my curiosity.','I prefer having decisions settled rather than open-ended.','I enjoy unexpected opportunities.','I naturally create structure for group projects.'
];
function renderQuestionTranslation(){
 if(page!=='assessment.html')return;
 const el=document.querySelector('main h1');if(!el)return;
 const raw=el.textContent.trim().replace(/^[“"\s]+|[”"\s]+$/g,'');
 let idx=Q_EN.indexOf(raw);
 if(idx<0){for(const items of Object.values(questionTranslations)){idx=items.indexOf(raw);if(idx>=0)break}}
 if(idx<0)return;
 const translated=questionTranslations[lang]?.[idx]||Q_EN[idx];const next='“'+translated+'”';
 if(el.textContent!==next)el.textContent=next;
}
function updateAssessmentLabels(){
 if(page!=='assessment.html')return;
 const prev=document.querySelector('#prevBtn span:not(.material-symbols-outlined)');if(prev)prev.textContent=mibiLabel('prev');
 const next=document.querySelector('#nextBtn span:not(.material-symbols-outlined)');if(next)next.textContent=Number(safeGet('mibi-index-v2','0'))===39?mibiLabel('results'):mibiLabel('next');
 const status=document.querySelector('#saveStatusText');if(status)status.textContent=mibiLabel('saves');
 const buttons=[...document.querySelectorAll('.likert-pill')];const keys=['strongDisagree','disagree','neutral','agree','strongAgree'];
 buttons.forEach((btn,i)=>{const span=[...btn.querySelectorAll('span')].find(x=>x.textContent.replace(/\s+/g,' ').trim()===ui.en[keys[i]] || x.dataset.mibiLikert===keys[i]);if(span){span.dataset.mibiLikert=keys[i];span.textContent=mibiLabel(keys[i])}});
 let banner=document.querySelector('#mibi-translation-note');
 if(!questionTranslations[lang]&&lang!=='en'){
   if(!banner){banner=document.createElement('div');banner.id='mibi-translation-note';banner.className='mibi-ui-banner';document.querySelector('main')?.prepend(banner)}
   banner.textContent='This language currently translates the interface; assessment questions remain in English while localization is being completed.';
 }else banner?.remove();
}
function observeAssessment(){
 if(page!=='assessment.html')return;
 const q=document.querySelector('main h1');if(!q)return;
 const obs=new MutationObserver(()=>{renderQuestionTranslation();updateAssessmentLabels()});obs.observe(q,{characterData:true,childList:true,subtree:true});
 renderQuestionTranslation();updateAssessmentLabels();
 const next=document.querySelector('#nextBtn'),prev=document.querySelector('#prevBtn');
 [next,prev].forEach(b=>b?.addEventListener('click',()=>setTimeout(()=>{renderQuestionTranslation();updateAssessmentLabels()},0)));
}
function simplifyAsk(){
 if(page!=='ask-mibi.html')return;
 const main=document.querySelector('main');if(!main)return;
 main.className='mibi-upgrade-page';main.style.cssText='max-width:100%;padding:30px 18px 70px;';
 main.innerHTML=`<div class="mibi-chat-shell"><header class="mibi-chat-header"><img src="./assets/mibi-wave.png" alt="Mibi, the clay mascot waving"><div><h1 data-i18n="ask">Ask Mibi</h1><p>A little space for your thoughts.</p></div></header><div class="mibi-chat-empty"><img src="./assets/mibi-lantern.png" alt="Mibi holding a gentle lantern"><h2 data-i18n="welcome">What’s on your mind?</h2><p data-i18n="start">You can start anywhere.</p><div class="mibi-chat-prompts"><button type="button" data-prompt="Understanding myself">Understanding myself</button><button type="button" data-prompt="My relationships">My relationships</button><button type="button" data-prompt="Personal growth">Personal growth</button></div></div><form class="mibi-chat-input-row" id="mibi-chat-demo-form"><input type="text" aria-label="Ask Mibi preview" placeholder="Ask me anything…" id="chatInput" autocomplete="off"><button type="submit" aria-label="Send message">↑</button></form><p class="mibi-chat-disclaimer" data-i18n="notlive">AI companion coming soon</p></div>`;
 const form=document.querySelector('#mibi-chat-demo-form');form.addEventListener('submit',e=>{e.preventDefault();let old=document.querySelector('.mibi-update-note');old?.remove();const note=document.createElement('div');note.className='mibi-update-note';note.textContent=mibiLabel('soon');form.insertAdjacentElement('beforebegin',note)});
 document.querySelectorAll('[data-prompt]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('#chatInput').value=btn.dataset.prompt;document.querySelector('#chatInput').focus()}));
}
function updateHomeFlow(){
 if(page!=='index.html')return;
 const allLinks=document.querySelectorAll('main a[href="#"]');allLinks.forEach(a=>{const t=a.textContent.toLowerCase();if(t.includes('explore type'))a.href='./types.html'});
}
function init(){fixNavigation();simplifyAsk();installControls();initVibe();updateHomeFlow();translatePage();observeAssessment();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
