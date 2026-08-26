(function(){
  'use strict';
  var toggle=document.getElementById('contentA11yToggle');
  var panel=document.getElementById('contentA11yPanel');
  if(!toggle||!panel)return;
  function setOpen(open){panel.hidden=!open;panel.toggleAttribute('inert',!open);toggle.setAttribute('aria-expanded',String(open));if(open){var first=panel.querySelector('button,a');if(first)first.focus()}}
  toggle.addEventListener('click',function(){setOpen(panel.hidden)});
  panel.addEventListener('click',function(event){var action=event.target.getAttribute('data-content-a11y');if(action==='text')document.body.classList.toggle('content-large-text');if(action==='contrast')document.body.classList.toggle('content-high-contrast');if(action==='close'){setOpen(false);toggle.focus()}});
  document.addEventListener('keydown',function(event){if(event.key==='Escape'&&!panel.hidden){setOpen(false);toggle.focus()}});
})();
