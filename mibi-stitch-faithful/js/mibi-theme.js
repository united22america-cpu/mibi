/* Mibi shared Peach/Violet theme — Add to ask-mibi.html before </body>.
   Uses the existing homepage setting: localStorage['mibi-theme']. */
(()=>{
  'use strict';
  const css=`
  :root[data-theme="violet"] {
    --bg:#F9F7FD; --line:#E7E0F2; --peach:#EAE2F7; --lav:#DCD6EC;
  }
  :root[data-theme="violet"] body {
    background:#F9F7FD;
    transition:background-color .25s ease;
  }
  :root[data-theme="violet"] header {background:#F9F7FDf2;border-color:#E7E0F2;}
  :root[data-theme="violet"] .mibi-hero {
    background:linear-gradient(110deg,#E0D5F3,#F0EAFE 64%,#F8F4FE)!important;
    border-color:#E0D5F3;
  }
  :root[data-theme="violet"] .mibi-hero .hero-voice {
    background:#FFFFFFb8!important;border-color:#E7DBF7!important;
  }
  :root[data-theme="violet"] .panel {border-color:#E7E0F2;}
  :root[data-theme="violet"] .chathead {background:#FBF9FF;}
  :root[data-theme="violet"] .messages {background:linear-gradient(180deg,#FFFFFF,#FBF9FF)!important;}
  :root[data-theme="violet"] .locked-messages {background:repeating-linear-gradient(135deg,#fff,#fff 28px,#f8f5fc 28px,#f8f5fc 56px)!important;}
  :root[data-theme="violet"] .chat-gate {border-color:#E7DDF2; background:#FEFDFF;}
  :root[data-theme="violet"] .customize {background:#FEFCFF;}
  :root[data-theme="violet"] .soft {background:#F0EAF8!important;}
  :root[data-theme="violet"] .note {background:#F8F2FB!important;}
  :root[data-theme="violet"] .profile-summary {background:#EFE8FA;border-color:#DED0F0;}
  :root[data-theme="violet"] .note-chip {background:#DCD6EC;}
  :root[data-theme="violet"] .message.assistant .bubble {background:#F1EBFA;}
  :root[data-theme="violet"] .composer textarea:focus {
    border-color:#B6A4D6;outline:2px solid #DCD6EC;
  }
  :root[data-theme="violet"] .customize select:focus,
  :root[data-theme="violet"] .customize input:focus {border-color:#B6A4D6;}
  :root[data-theme="violet"] .mibi-theme-btn {background:#EAE2F7;border-color:#D8C9EB;}
  .mibi-theme-btn {
    appearance:none;white-space:nowrap;display:inline-flex;align-items:center;justify-content:center;
    border:1px solid var(--line);border-radius:999px;background:#FFFDFB;
    color:#343B43;padding:9px 13px;min-height:38px;
    font:700 12px 'DM Sans',sans-serif;cursor:pointer;
  }
  .mibi-theme-btn:focus-visible {outline:2px solid #A59BCB;outline-offset:2px;}
  @media(max-width:600px){.mibi-theme-btn{padding:8px 10px;font-size:11px;}}
  `;
  const style=document.createElement('style');
  style.id='mibi-shared-theme-css';
  style.textContent=css;
  document.head.append(style);
  const button=document.createElement('button');
  button.type='button';
  button.id='mibiThemeToggle';
  button.className='mibi-theme-btn';
  button.setAttribute('aria-label','Switch Mibi color theme');
  const nav=document.querySelector('header .navright');
  if(nav)nav.insertBefore(button,nav.firstChild);
  const getTheme=()=>{
    try{return localStorage.getItem('mibi-theme')==='violet'?'violet':'peach'}
    catch{return 'peach'}
  };
  function applyTheme(theme,save=true){
    document.documentElement.dataset.theme=theme;
    if(button.isConnected){
      button.textContent=theme==='violet'?'☀ Peach':'☾ Violet';
      button.setAttribute('aria-pressed',String(theme==='violet'));
      button.title=theme==='violet'?'Switch to peach theme':'Switch to violet theme';
    }
    if(save){try{localStorage.setItem('mibi-theme',theme)}catch{}}
  }
  applyTheme(getTheme(),false);
  button.addEventListener('click',()=>{
    applyTheme(document.documentElement.dataset.theme==='violet'?'peach':'violet');
  });
  window.addEventListener('storage',e=>{
    if(e.key==='mibi-theme') applyTheme(getTheme(),false);
  });
})();
