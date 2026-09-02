(function(){
  'use strict';
  var measurementId='G-Q3V66EP3E5';
  var loaded=false;
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};

  function loadAnalytics(){
    if(loaded)return;
    loaded=true;
    var script=document.createElement('script');
    script.async=true;
    script.src='https://www.googletagmanager.com/gtag/js?id='+measurementId;
    document.head.appendChild(script);
    window.gtag('js',new Date());
    window.gtag('config',measurementId,{transport_type:'beacon'});
  }

  /* Load as soon as the browser is idle after parsing, capped at 1.2s.
     The previous 6s delay meant every visitor who left before it elapsed
     without touching the screen was never counted at all, which understated
     sessions and overstated engagement. The tag itself is async and does not
     block rendering, so waiting longer bought nothing. */
  function scheduleAnalytics(){
    if('requestIdleCallback'in window){
      window.requestIdleCallback(loadAnalytics,{timeout:1200});
    }else{
      window.setTimeout(loadAnalytics,300);
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',scheduleAnalytics,{once:true});
  }else{
    scheduleAnalytics();
  }

  /* Any real interaction loads it immediately, ahead of the idle callback. */
  ['pointerdown','keydown','touchstart','scroll'].forEach(function(eventName){
    window.addEventListener(eventName,loadAnalytics,{once:true,passive:true});
  });

  window.trackLead=function(eventName,params){
    loadAnalytics();
    window.gtag('event',eventName,Object.assign({event_category:'lead',transport_type:'beacon'},params||{}));
  };

  document.addEventListener('click',function(event){
    var link=event.target.closest('a[href]');
    if(!link)return;
    var href=link.getAttribute('href')||'';
    if(href.indexOf('wa.me/')!==-1){
      window.trackLead('whatsapp_click',{link_url:href});
    }else if(href.indexOf('tel:')===0){
      window.trackLead('phone_click');
    }
  });
})();
