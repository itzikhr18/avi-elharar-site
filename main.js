(function(){
'use strict';
var R=window.matchMedia('(prefers-reduced-motion:reduce)').matches;

/* Mobile Menu */
var mb=document.getElementById('menuBtn'),mm=document.getElementById('mobileMenu');
if(mb&&mm){
  function closeMenu(){mm.classList.remove('open');mb.setAttribute('aria-expanded','false');mb.focus()}
  function openMenu(){mm.classList.add('open');mb.setAttribute('aria-expanded','true');var firstLink=mm.querySelector('a');if(firstLink)firstLink.focus()}
  mb.addEventListener('click',function(){if(mm.classList.contains('open'))closeMenu();else openMenu()});
  mm.querySelectorAll('a').forEach(function(l){l.addEventListener('click',closeMenu)});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&mm.classList.contains('open')){e.preventDefault();closeMenu();return}
    if(!mm.classList.contains('open'))return;
    if(e.key==='Tab'){
      var focusable=mm.querySelectorAll('a[href],button');
      if(!focusable.length)return;
      var first=focusable[0],last=focusable[focusable.length-1];
      if(e.shiftKey){if(document.activeElement===first){e.preventDefault();last.focus()}}
      else{if(document.activeElement===last){e.preventDefault();first.focus()}}
    }
  });
}

/* Contact Form */
var f=document.getElementById('contactForm'),n=document.getElementById('formNote');
if(f&&n){f.addEventListener('submit',function(e){e.preventDefault();var nameEl=document.getElementById('name'),phoneEl=document.getElementById('phone'),cityEl=document.getElementById('city');var nameVal=nameEl?nameEl.value.trim():'',phoneVal=phoneEl?phoneEl.value.trim():'',cityVal=cityEl?cityEl.value.trim():'';if(!nameVal){n.textContent='אנא הזינו שם מלא.';return}if(!/^0(?:5\d|[2-4]|8|9)[\s-]?\d{3}[\s-]?\d{4}$/.test(phoneVal.replace(/\s+/g,' ').trim())){n.textContent='אנא הזינו מספר טלפון ישראלי תקין.';return}if(!cityVal){n.textContent='אנא הזינו אזור מגורים.';return}var msg='היי אבי, אשמח לקבוע שיחת התאמה.\nשם: '+nameVal+'\nטלפון: '+phoneVal+'\nאזור: '+cityVal;window.open('https://wa.me/972528449147?text='+encodeURIComponent(msg),'_blank');n.textContent='מעולה! מועבר לווטסאפ...';f.reset()})}

/* Header Scroll — a state change rather than an animation: the scrolled header is
   more opaque and therefore more readable over content. Must run under reduced motion. */
var h=document.querySelector('.site-header');
if(h){var t=false;window.addEventListener('scroll',function(){if(!t){requestAnimationFrame(function(){h.classList.toggle('scrolled',window.scrollY>60);t=false});t=true}},{passive:true})}

/* Back to Top + WhatsApp Float + Sticky CTA — all three start at opacity:0 with
   pointer-events:none and are only ever revealed by this code, so they must run
   unconditionally. Behind the motion guard they stayed invisible forever. */
var btt=document.getElementById('backToTop');
var waFloat=document.getElementById('waFloat');
var stickyCta=document.getElementById('stickyCta');
var heroSection=document.querySelector('.hero');
var contactSection=document.getElementById('contact');
function updateScrollUI(){var sy=window.scrollY;if(btt)btt.classList.toggle('visible',sy>500);if(waFloat)waFloat.classList.toggle('visible',sy>300);if(stickyCta){var heroBot=heroSection?heroSection.getBoundingClientRect().bottom:0;var contactTop=contactSection?contactSection.getBoundingClientRect().top:9999;var show=heroBot<-50&&contactTop>window.innerHeight;stickyCta.classList.toggle('visible',show);stickyCta.setAttribute('aria-hidden',String(!show))}}
var scrollUITick=false;window.addEventListener('scroll',function(){if(!scrollUITick){requestAnimationFrame(function(){updateScrollUI();scrollUITick=false});scrollUITick=true}},{passive:true});
if(btt)btt.addEventListener('click',function(){window.scrollTo({top:0,behavior:R?'auto':'smooth'})});
updateScrollUI();

/* ---- Decorative motion only, below this point. -------------------------------
   This guard used to be a bare `if(R)return;` at the top of the file, which also
   disabled the accessibility widget and the floating WhatsApp button for anyone
   with prefers-reduced-motion — precisely the users who need them most. */
if(!R){

/* Hero Entrance */
var hc=document.querySelector('.hero-copy'),hv=document.querySelector('.hero-visual');
requestAnimationFrame(function(){setTimeout(function(){if(hc)hc.classList.add('animated');if(hv)hv.classList.add('animated')},100)});

/* Scroll Reveal — see the shared sweep below. Deliberately NOT IntersectionObserver:
   an anchor jump lands past whole sections without ever firing a callback for them,
   which leaves those sections stuck at opacity:0. A position check catches anything
   at or above the trigger line, including everything already scrolled past. */
var re=[].slice.call(document.querySelectorAll('.reveal,.reveal-stagger'));

/* Counter Animation */
function ac(el){var txt=el.textContent.trim(),m=txt.match(/^([\d,]+)/);if(!m)return;var tgt=parseInt(m[1].replace(/,/g,''),10);if(isNaN(tgt)||tgt===0)return;var sfx=txt.replace(m[1],''),dur=1800,st=performance.now();function ease(t){return t===1?1:1-Math.pow(2,-10*t)}function up(now){var p=Math.min((now-st)/dur,1);el.textContent=Math.round(ease(p)*tgt).toLocaleString()+sfx;if(p<1)requestAnimationFrame(up);else el.textContent=txt}el.textContent='0'+sfx;requestAnimationFrame(up)}
var ms=[].slice.call(document.querySelectorAll('.hero-metrics strong'));

/* Stats Counter Animation */
function animateStatNum(el){var tgt=parseFloat(el.dataset.target);if(isNaN(tgt)||tgt===0)return;var isFloat=String(tgt).indexOf('.')!==-1;var dur=2000,st=performance.now();function ease(t){return t===1?1:1-Math.pow(2,-10*t)}function up(now){var p=Math.min((now-st)/dur,1);var v=ease(p)*tgt;el.textContent=isFloat?v.toFixed(1):Math.round(v).toLocaleString();if(p<1)requestAnimationFrame(up)}el.textContent=isFloat?'0.0':'0';requestAnimationFrame(up)}
var statNums=[].slice.call(document.querySelectorAll('.stat-item__number[data-target]'));

/* Shared position sweep for reveals and counters. Each list is spliced as it fires,
   so an element is only ever triggered once and the lists drain to empty. */
function sweep(){
  var wh=window.innerHeight||document.documentElement.clientHeight;
  var revealAt=wh*.9,countAt=wh*.75,i;
  for(i=re.length-1;i>=0;i--){if(re[i].getBoundingClientRect().top<revealAt){re[i].classList.add('visible');re.splice(i,1)}}
  for(i=ms.length-1;i>=0;i--){if(ms[i].getBoundingClientRect().top<countAt){ac(ms[i]);ms.splice(i,1)}}
  for(i=statNums.length-1;i>=0;i--){if(statNums[i].getBoundingClientRect().top<countAt){animateStatNum(statNums[i]);statNums.splice(i,1)}}
}
var swTick=false;
function queueSweep(){if(!swTick){swTick=true;requestAnimationFrame(function(){sweep();swTick=false})}}
window.addEventListener('scroll',queueSweep,{passive:true});
window.addEventListener('resize',queueSweep,{passive:true});
window.addEventListener('hashchange',queueSweep);
window.addEventListener('load',queueSweep);
sweep();

/* Scroll Progress Bar */
var spBar=document.querySelector('.scroll-progress__bar');
if(spBar){var spTick=false;window.addEventListener('scroll',function(){if(!spTick){requestAnimationFrame(function(){var scrollTop=window.scrollY;var docH=document.documentElement.scrollHeight-window.innerHeight;spBar.style.width=(docH>0?(scrollTop/docH)*100:0)+'%';spTick=false});spTick=true}},{passive:true})}

/* Animated Process Timeline */
var procSteps=document.getElementById('processSteps');
if(procSteps){var pFill=procSteps.querySelector('.process-line__fill');var pItems=procSteps.querySelectorAll('.process-step');if(pFill&&pItems.length){var poTick=false;function updateTimeline(){var rect=procSteps.getBoundingClientRect();var wh=window.innerHeight;var triggerY=wh*.65;var totalH=rect.height;var progress=Math.min(Math.max((triggerY-rect.top)/totalH,0),1);pFill.style.height=(progress*100)+'%';pItems.forEach(function(s){var sr=s.getBoundingClientRect();if(sr.top<triggerY)s.classList.add('reached');else s.classList.remove('reached')})}window.addEventListener('scroll',function(){if(!poTick){requestAnimationFrame(function(){updateTimeline();poTick=false});poTick=true}},{passive:true});updateTimeline()}}

/* Typewriter Effect */
var twEl=document.getElementById('heroHeading');
if(twEl){var twHTML=twEl.innerHTML;var twPlain=twHTML.replace(/<br\s*\/?>/gi,'\n');var twChars=twPlain.split('');var twH=twEl.offsetHeight;twEl.style.minHeight=twH+'px';twEl.innerHTML='';var twCursor=document.createElement('span');twCursor.className='typewriter-cursor';twEl.appendChild(twCursor);var twIdx=0;function twType(){if(twIdx<twChars.length){if(twChars[twIdx]==='\n'){twEl.insertBefore(document.createElement('br'),twCursor);twIdx++;setTimeout(twType,300)}else{twEl.insertBefore(document.createTextNode(twChars[twIdx]),twCursor);twIdx++;var d=twChars[twIdx-1]==='.'?400:65+Math.random()*45;setTimeout(twType,d)}}else{twEl.style.minHeight='';setTimeout(function(){twCursor.style.transition='opacity 1s';twCursor.style.opacity='0';setTimeout(function(){twCursor.remove()},1000)},2000)}}setTimeout(twType,800)}

/* Image Blur Reveal */
document.querySelectorAll('img[loading="lazy"]').forEach(function(img){img.classList.add('blur-load');if(img.complete){img.classList.add('loaded')}else{img.addEventListener('load',function(){img.classList.add('loaded')});img.addEventListener('error',function(){img.classList.add('loaded')})}});

/* FAQ Smooth Toggle */
document.querySelectorAll('.faq-item').forEach(function(detail){
var summary=detail.querySelector('summary');
var body=detail.querySelector('.faq-item__body');
if(!summary||!body)return;
summary.addEventListener('click',function(e){
e.preventDefault();
if(detail.open){body.style.gridTemplateRows='0fr';body.style.opacity='0';detail.addEventListener('transitionend',function close(){detail.open=false;detail.removeEventListener('transitionend',close)},{once:true})}
else{detail.open=true;requestAnimationFrame(function(){requestAnimationFrame(function(){body.style.gridTemplateRows='1fr';body.style.opacity='1'})})}
})});

/* Card Spotlight */
document.querySelectorAll('.card').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mouse-x',((e.clientX-r.left)/r.width*100)+'%');c.style.setProperty('--mouse-y',((e.clientY-r.top)/r.height*100)+'%')})});

/* 3D Tilt */
var T='ontouchstart'in window;
if(!T){document.querySelectorAll('.card,.testimonial-card').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,cx=r.width/2,cy=r.height/2;c.style.transform='perspective(800px) rotateX('+((y-cy)/cy*-5)+'deg) rotateY('+((x-cx)/cx*5)+'deg) translateY(-6px)'});c.addEventListener('mouseleave',function(){c.style.transform=''})})}

/* Magnetic Buttons */
if(!T){document.querySelectorAll('.btn-primary').forEach(function(b){b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+(e.clientX-r.left-r.width/2)*.15+'px,'+(e.clientY-r.top-r.height/2)*.15+'px)'});b.addEventListener('mouseleave',function(){b.style.transform=''})})}

/* Parallax */
var hi=document.querySelector('.hero-visual img');
if(hi){var st2=false;window.addEventListener('scroll',function(){if(!st2){requestAnimationFrame(function(){if(window.scrollY<window.innerHeight)hi.style.transform='translateY('+window.scrollY*.08+'px)';st2=false});st2=true}},{passive:true})}

/* Particles — optimized: fewer particles, pause when tab hidden */
if(window.innerWidth>1024){var cv=document.createElement('canvas');cv.className='particles-canvas';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);var ctx=cv.getContext('2d'),ps=[],w,ht,pRunning=true;function rs(){w=cv.width=window.innerWidth;ht=cv.height=window.innerHeight}rs();window.addEventListener('resize',rs,{passive:true});var PC=Math.min(20,Math.floor(w/55));for(var i=0;i<PC;i++)ps.push({x:Math.random()*w,y:Math.random()*ht,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,s:Math.random()*1.5+.5,o:Math.random()*.35+.1});function dr(){if(!pRunning)return;ctx.clearRect(0,0,w,ht);ps.forEach(function(p){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=ht;if(p.y>ht)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fillStyle='rgba(212,175,55,'+p.o+')';ctx.fill()});for(var i=0;i<ps.length;i++)for(var j=i+1;j<ps.length;j++){var dx=ps[i].x-ps[j].x,dy=ps[i].y-ps[j].y,dt=dx*dx+dy*dy;if(dt<22500){ctx.beginPath();ctx.moveTo(ps[i].x,ps[i].y);ctx.lineTo(ps[j].x,ps[j].y);ctx.strokeStyle='rgba(212,175,55,'+(0.06*(1-Math.sqrt(dt)/150))+')';ctx.lineWidth=.5;ctx.stroke()}}requestAnimationFrame(dr)}dr();document.addEventListener('visibilitychange',function(){pRunning=!document.hidden;if(pRunning)requestAnimationFrame(dr)})}

} /* ---- end decorative motion block ---------------------------------------- */

/* Accessibility widget now lives in a11y.js, which every page loads so the
   controls and the statement link exist site-wide (IS 5568), not just here. */

/* Footer legal page links — the three legal sections ship collapsed via an inline
   display:none and are opened on demand. A :target rule in the stylesheet does the
   same job when this script is unavailable. */
var legalLinks=[['footerA11yLink','accessibility-statement'],
 ['footerPrivacyLink','privacy-policy'],
 ['footerTermsLink','terms-of-use']];
legalLinks.forEach(function(pair){
  var link=document.getElementById(pair[0]),section=document.getElementById(pair[1]);
  if(!link||!section)return;
  link.addEventListener('click',function(e){
    e.preventDefault();
    section.style.display='';
    section.scrollIntoView({behavior:R?'auto':'smooth'});
  });
});

/* Dynamic copyright year */
var cyEl=document.getElementById('copyrightYear');
if(cyEl)cyEl.textContent=new Date().getFullYear();

})();
