(function(){
'use strict';
var R=window.matchMedia('(prefers-reduced-motion:reduce)').matches;

/* Mobile Menu */
var mb=document.getElementById('menuBtn'),mm=document.getElementById('mobileMenu');
if(mb&&mm){mb.addEventListener('click',function(){var o=mm.classList.toggle('open');mb.setAttribute('aria-expanded',String(o))});mm.querySelectorAll('a').forEach(function(l){l.addEventListener('click',function(){mm.classList.remove('open');mb.setAttribute('aria-expanded','false')})})}

/* Contact Form */
var f=document.getElementById('contactForm'),n=document.getElementById('formNote');
if(f&&n){f.addEventListener('submit',function(e){e.preventDefault();var p=document.getElementById('phone'),v=p?p.value.trim():'';if(!/^0(?:5\d|[2-4]|8|9)-?\d{7}$/.test(v)){n.textContent='אנא הזינו מספר טלפון ישראלי תקין.';return}n.textContent='מעולה, הפרטים נקלטו בהצלחה. נעשה איתך קשר בקרוב.';f.reset()})}

if(R)return;

/* Header Scroll */
var h=document.querySelector('.site-header');
if(h){var t=false;window.addEventListener('scroll',function(){if(!t){requestAnimationFrame(function(){h.classList.toggle('scrolled',window.scrollY>60);t=false});t=true}},{passive:true})}

/* Hero Entrance */
var hc=document.querySelector('.hero-copy'),hv=document.querySelector('.hero-visual');
requestAnimationFrame(function(){setTimeout(function(){if(hc)hc.classList.add('animated');if(hv)hv.classList.add('animated')},100)});

/* Scroll Reveal */
var re=document.querySelectorAll('.reveal,.reveal-stagger');
if(re.length&&'IntersectionObserver'in window){var ro=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -40px 0px'});re.forEach(function(el){ro.observe(el)})}

/* Counter Animation */
function ac(el){var txt=el.textContent.trim(),m=txt.match(/^([\d,]+)/);if(!m)return;var tgt=parseInt(m[1].replace(/,/g,''),10);if(isNaN(tgt)||tgt===0)return;var sfx=txt.replace(m[1],''),dur=1800,st=performance.now();function ease(t){return t===1?1:1-Math.pow(2,-10*t)}function up(now){var p=Math.min((now-st)/dur,1);el.textContent=Math.round(ease(p)*tgt).toLocaleString()+sfx;if(p<1)requestAnimationFrame(up);else el.textContent=txt}el.textContent='0'+sfx;requestAnimationFrame(up)}
var ms=document.querySelectorAll('.hero-metrics strong');
if(ms.length&&'IntersectionObserver'in window){var co=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){ac(e.target);co.unobserve(e.target)}})},{threshold:.5});ms.forEach(function(el){co.observe(el)})}

/* Stats Counter Animation */
function animateStatNum(el){var tgt=parseFloat(el.dataset.target);if(isNaN(tgt)||tgt===0)return;var isFloat=String(tgt).indexOf('.')!==-1;var dur=2000,st=performance.now();function ease(t){return t===1?1:1-Math.pow(2,-10*t)}function up(now){var p=Math.min((now-st)/dur,1);var v=ease(p)*tgt;el.textContent=isFloat?v.toFixed(1):Math.round(v).toLocaleString();if(p<1)requestAnimationFrame(up)}el.textContent=isFloat?'0.0':'0';requestAnimationFrame(up)}
var statNums=document.querySelectorAll('.stat-item__number[data-target]');
if(statNums.length&&'IntersectionObserver'in window){var so=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){animateStatNum(e.target);so.unobserve(e.target)}})},{threshold:.5});statNums.forEach(function(el){so.observe(el)})}

/* Scroll Progress Bar */
var spBar=document.querySelector('.scroll-progress__bar');
if(spBar){var spTick=false;window.addEventListener('scroll',function(){if(!spTick){requestAnimationFrame(function(){var scrollTop=window.scrollY;var docH=document.documentElement.scrollHeight-window.innerHeight;spBar.style.width=(docH>0?(scrollTop/docH)*100:0)+'%';spTick=false});spTick=true}},{passive:true})}

/* Animated Process Timeline */
var procSteps=document.getElementById('processSteps');
if(procSteps){var pFill=procSteps.querySelector('.process-line__fill');var pItems=procSteps.querySelectorAll('.process-step');if(pFill&&pItems.length){var poTick=false;function updateTimeline(){var rect=procSteps.getBoundingClientRect();var wh=window.innerHeight;var triggerY=wh*.65;var totalH=rect.height;var progress=Math.min(Math.max((triggerY-rect.top)/totalH,0),1);pFill.style.height=(progress*100)+'%';pItems.forEach(function(s){var sr=s.getBoundingClientRect();if(sr.top<triggerY)s.classList.add('reached');else s.classList.remove('reached')})}window.addEventListener('scroll',function(){if(!poTick){requestAnimationFrame(function(){updateTimeline();poTick=false});poTick=true}},{passive:true});updateTimeline()}}

/* Back to Top Button */
var btt=document.getElementById('backToTop');
if(btt){var bttTick=false;window.addEventListener('scroll',function(){if(!bttTick){requestAnimationFrame(function(){btt.classList.toggle('visible',window.scrollY>500);bttTick=false});bttTick=true}},{passive:true});btt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})})}

/* Typewriter Effect */
var twEl=document.getElementById('heroHeading');
if(twEl){var twHTML=twEl.innerHTML;var twPlain=twHTML.replace(/<br\s*\/?>/gi,'\n');var twChars=twPlain.split('');twEl.innerHTML='';var twCursor=document.createElement('span');twCursor.className='typewriter-cursor';twEl.appendChild(twCursor);var twIdx=0;function twType(){if(twIdx<twChars.length){if(twChars[twIdx]==='\n'){twEl.insertBefore(document.createElement('br'),twCursor);twIdx++;setTimeout(twType,300)}else{twEl.insertBefore(document.createTextNode(twChars[twIdx]),twCursor);twIdx++;var d=twChars[twIdx-1]==='.'?400:65+Math.random()*45;setTimeout(twType,d)}}else{setTimeout(function(){twCursor.style.transition='opacity 1s';twCursor.style.opacity='0';setTimeout(function(){twCursor.remove()},1000)},2000)}}setTimeout(twType,800)}

/* Image Blur Reveal */
document.querySelectorAll('img[loading="lazy"]').forEach(function(img){img.classList.add('blur-load');if(img.complete){img.classList.add('loaded')}else{img.addEventListener('load',function(){img.classList.add('loaded')});img.addEventListener('error',function(){img.classList.add('loaded')})}});

/* Card Spotlight */
document.querySelectorAll('.card').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mouse-x',((e.clientX-r.left)/r.width*100)+'%');c.style.setProperty('--mouse-y',((e.clientY-r.top)/r.height*100)+'%')})});

/* 3D Tilt */
var T='ontouchstart'in window;
if(!T){document.querySelectorAll('.card,.testimonial-card').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,cx=r.width/2,cy=r.height/2;c.style.transform='perspective(800px) rotateX('+((y-cy)/cy*-5)+'deg) rotateY('+((x-cx)/cx*5)+'deg) translateY(-6px)'});c.addEventListener('mouseleave',function(){c.style.transform=''})})}

/* Magnetic Buttons */
if(!T){document.querySelectorAll('.btn-primary').forEach(function(b){b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+(e.clientX-r.left-r.width/2)*.15+'px,'+(e.clientY-r.top-r.height/2)*.15+'px)'});b.addEventListener('mouseleave',function(){b.style.transform=''})})}

/* Custom Cursor */
if(!T&&window.innerWidth>920){var d=document.createElement('div'),rng=document.createElement('div');d.className='cursor-dot';rng.className='cursor-ring';document.body.appendChild(d);document.body.appendChild(rng);var mx=0,my=0,rx=0,ry=0;document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;d.style.left=mx+'px';d.style.top=my+'px'},{passive:true});function ar(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;rng.style.left=rx+'px';rng.style.top=ry+'px';requestAnimationFrame(ar)}requestAnimationFrame(ar);document.querySelectorAll('a,button,.card,.testimonial-card,.area-chip,.price-row').forEach(function(el){el.addEventListener('mouseenter',function(){document.body.classList.add('cursor-hover')});el.addEventListener('mouseleave',function(){document.body.classList.remove('cursor-hover')})})}

/* Parallax */
var hi=document.querySelector('.hero-visual img');
if(hi){var st2=false;window.addEventListener('scroll',function(){if(!st2){requestAnimationFrame(function(){if(window.scrollY<window.innerHeight)hi.style.transform='translateY('+window.scrollY*.08+'px)';st2=false});st2=true}},{passive:true})}

/* Particles */
if(window.innerWidth>768){var cv=document.createElement('canvas');cv.className='particles-canvas';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);var ctx=cv.getContext('2d'),ps=[],w,ht;function rs(){w=cv.width=window.innerWidth;ht=cv.height=window.innerHeight}rs();window.addEventListener('resize',rs,{passive:true});var PC=Math.min(35,Math.floor(w/35));for(var i=0;i<PC;i++)ps.push({x:Math.random()*w,y:Math.random()*ht,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,s:Math.random()*1.5+.5,o:Math.random()*.4+.1});function dr(){ctx.clearRect(0,0,w,ht);ps.forEach(function(p){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=ht;if(p.y>ht)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fillStyle='rgba(110,231,255,'+p.o+')';ctx.fill()});for(var i=0;i<ps.length;i++)for(var j=i+1;j<ps.length;j++){var dx=ps[i].x-ps[j].x,dy=ps[i].y-ps[j].y,dt=Math.sqrt(dx*dx+dy*dy);if(dt<150){ctx.beginPath();ctx.moveTo(ps[i].x,ps[i].y);ctx.lineTo(ps[j].x,ps[j].y);ctx.strokeStyle='rgba(110,231,255,'+(0.06*(1-dt/150))+')';ctx.lineWidth=.5;ctx.stroke()}}requestAnimationFrame(dr)}dr()}

})();
