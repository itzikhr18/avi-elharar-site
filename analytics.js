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

  function scheduleAnalytics(){
    window.setTimeout(function(){
      if('requestIdleCallback'in window){
        window.requestIdleCallback(loadAnalytics,{timeout:3000});
      }else{
        loadAnalytics();
      }
    },6000);
  }

  window.addEventListener('load',scheduleAnalytics,{once:true});
  ['pointerdown','keydown','touchstart'].forEach(function(eventName){
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
