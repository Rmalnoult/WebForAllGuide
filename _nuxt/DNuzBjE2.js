import{_ as ae,F as se,x as ne,r as l,k as h,o as le,K as te,y as p,C as E,D as d,z as c,A as e,B as a,L as $,E as t,M as P,N as u,O as k,I,J as V,P as O,Q as re,R as U}from"#entry";import{u as de,P as ie,E as M}from"./BC86FAwA.js";import{u as pe}from"./DLj1BPX9.js";const ce=globalThis.setInterval,me={class:"performance"},ue={class:"motion-demo"},ge={class:"motion-examples-bad"},ve={class:"animated-card card-bounce"},fe={class:"animated-button"},be={class:"animated-elements"},he={class:"slide-bad"},$e={class:"motion-demo"},ze={class:"motion-controls"},ye={key:0,class:"feedback-message"},Le={class:"animated-elements-good"},ke={key:0,class:"pulse-good"},we={class:"controlled-carousel"},Ce=["aria-label"],Ee={class:"carousel-content"},_e={class:"carousel-slide"},Se=["aria-label"],Me={class:"code-block"},Te={class:"code-example"},Pe={class:"zoom-demo"},Ae={class:"layout-bad"},Be={class:"fixed-layout"},Ne={class:"sidebar-bad"},Ie={href:"#"},Ve={href:"#"},Oe={href:"#"},Ue={href:"#"},je={class:"content-bad"},De={class:"toolbar-bad"},Fe=["placeholder"],He={class:"cards-bad"},Qe={class:"card-bad"},Re={class:"price-bad"},We={class:"card-bad"},Ze={class:"price-bad"},qe={class:"zoom-demo"},Je={class:"zoom-controls"},Ke=["value"],Ye={class:"zoom-indicator"},Ge={key:0,class:"zoom-warning"},Xe=["aria-expanded"],xe={id:"main-nav",class:"nav-content"},eo={href:"#"},oo={href:"#"},ao={href:"#"},so={href:"#"},no={class:"content-good"},lo={class:"toolbar-good"},to={class:"toolbar-actions"},ro={class:"toolbar-search"},io=["placeholder"],po={class:"cards-good"},co={class:"card-good"},mo={class:"price-good"},uo={class:"card-good"},go={class:"price-good"},vo={class:"code-block"},fo={class:"code-example"},bo={class:"responsive-demo"},ho={class:"device-simulator-bad"},$o={class:"fixed-interface"},zo={class:"header-bad"},yo={class:"logo-bad"},Lo={class:"nav-bad"},ko={href:"#"},wo={href:"#"},Co={href:"#"},Eo={href:"#"},_o={href:"#"},So={href:"#"},Mo={class:"actions-bad"},To={class:"content-section-bad"},Po={class:"form-bad"},Ao={class:"form-row-bad"},Bo=["placeholder"],No=["placeholder"],Io=["placeholder"],Vo={class:"form-actions-bad"},Oo={class:"info-bad"},Uo={class:"responsive-demo"},jo={class:"device-controls"},Do=["value"],Fo={class:"responsive-interface"},Ho={class:"header-good"},Qo={class:"logo-good"},Ro=["aria-expanded"],Wo={key:1,class:"actions-good"},Zo={class:"content-section-good"},qo={class:"form-section-good"},Jo={class:"form-good"},Ko={class:"form-row-good"},Yo=["placeholder","aria-label"],Go=["placeholder","aria-label"],Xo=["placeholder","aria-label"],xo={class:"form-actions-good"},ea={type:"button"},oa={type:"submit"},aa={class:"info-good"},sa=["href"],na={class:"code-block"},la={class:"code-example"},ta={class:"loading-demo"},ra={class:"interface-bad"},da={class:"content-example-bad"},ia={class:"problem-explanation"},pa={class:"technical-term"},ca={class:"simple-list"},ma={class:"visual-example bad"},ua={class:"website-example"},ga={class:"resource-item loaded"},va={class:"resource-item loaded"},fa={class:"resource-item loaded"},ba={class:"resource-item loaded"},ha={class:"resource-item loaded"},$a={class:"resource-item loaded unnecessary"},za={class:"resource-item loaded unnecessary"},ya={class:"resource-item loaded unnecessary"},La={class:"wait-time bad"},ka={class:"data-usage bad"},wa={class:"loading-demo"},Ca={class:"interface-good"},Ea={class:"content-example-good"},_a={class:"solution-explanation"},Sa={class:"technical-term"},Ma={class:"loading-controls-simple"},Ta={class:"checkbox-card"},Pa={class:"checkbox-content"},Aa={class:"checkbox-label"},Ba={class:"checkbox-card"},Na={class:"checkbox-content"},Ia={class:"checkbox-label"},Va={class:"visual-example good"},Oa={class:"website-example"},Ua={class:"resource-item loaded"},ja={class:"resource-item loaded"},Da={class:"resource-item loaded"},Fa={class:"resource-item loaded"},Ha={class:"resource-item loaded"},Qa={class:"wait-time good"},Ra={key:0,class:"data-usage good"},Wa={class:"real-world-benefits"},Za={class:"benefit-grid"},qa={class:"benefit-item"},Ja={class:"benefit-item"},Ka={class:"benefit-item"},Ya={class:"benefit-item"},Ga={class:"code-block"},Xa={class:"code-example"},xa={__name:"performance",setup(es){const{t:r}=se(),{getPageSEO:j}=pe(),D=j("/performance");ne(D),de();const _=l(!1),F=h(()=>_.value?!0:typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches),A=l(!1),T=l(!1),w=l(!1),C=l(!1),z=l(0),i=l("100"),g=l(!1),v=l("desktop"),f=l(!1),m=l(!0),y=l(!0);l("auto");const S=l(0),b=l(""),H=h(()=>[{value:"100",label:"100% (normal)"},{value:"125",label:"125%"},{value:"150",label:"150%"},{value:"175",label:"175%"},{value:"200",label:"200%"}]),Q=h(()=>[{value:"desktop",label:r("pages.performance.responsive.devices.desktop")},{value:"tablet",label:r("pages.performance.responsive.devices.tablet")},{value:"mobile",label:r("pages.performance.responsive.devices.mobile")}]),R=h(()=>w.value?r("pages.performance.motion.good.stopLoad"):r("pages.performance.motion.good.load")),W=h(()=>C.value?r("pages.performance.motion.good.stopPulse"):r("pages.performance.motion.good.pulse")),Z=h(()=>m.value?r("pages.performance.lazyLoading.good.timeFast"):r("pages.performance.lazyLoading.good.timeSlow")),q=h(()=>y.value&&m.value?r("pages.performance.lazyLoading.good.savings.both"):r("pages.performance.lazyLoading.good.savings.single"));function J(){}function K(){T.value=!0,b.value=r("pages.performance.motion.good.button"),setTimeout(()=>{T.value=!1,b.value=""},2e3)}function Y(){w.value=!w.value,b.value=w.value?"Chargement en cours...":"Chargement terminé"}function G(){C.value=!C.value,b.value=C.value?"Pulsation activée":"Pulsation désactivée"}function X(){z.value=z.value===0?3:z.value-1}function x(){z.value=(z.value+1)%4}function ee(){b.value=`Zoom ajusté à ${i.value}%`}function oe(){f.value=!1,b.value=`Affichage ${v.value} simulé`}function L(){f.value=!1}function B(){b.value="Stratégie de chargement mise à jour",S.value===100&&N(),setTimeout(()=>{b.value=""},2e3)}function N(){S.value=0;const o=ce(()=>{S.value+=10,S.value>=100&&clearInterval(o)},200)}return le(()=>{if(typeof window>"u")return;N(),window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(_.value=!0)}),te(v,o=>{o==="desktop"?(f.value=!1,g.value=!1):g.value=!0}),(o,s)=>(c(),p("div",me,[E(ie,{title:o.$t("pages.performance.title"),description:o.$t("pages.performance.description")},null,8,["title","description"]),E(M,{title:o.$t("pages.performance.motion.title"),explanation:o.$t("pages.performance.motion.explanation")},{bad:d(()=>[e("div",ue,[e("h4",null,a(o.$t("pages.performance.motion.bad.heading")),1),e("div",ge,[e("div",ve,[e("h5",null,a(o.$t("pages.performance.motion.bad.card.title")),1),e("p",null,a(o.$t("pages.performance.motion.bad.card.description")),1),e("button",fe,a(o.$t("pages.performance.motion.bad.button")),1)]),e("div",be,[s[9]||(s[9]=e("div",{class:"spinner-bad"},null,-1)),s[10]||(s[10]=e("div",{class:"pulse-bad"},null,-1)),e("div",he,a(o.$t("pages.performance.motion.bad.slide")),1)]),s[11]||(s[11]=e("div",{class:"auto-carousel"},[e("div",{class:"carousel-track"},[e("div",{class:"carousel-slide"},"Slide 1"),e("div",{class:"carousel-slide"},"Slide 2"),e("div",{class:"carousel-slide"},"Slide 3"),e("div",{class:"carousel-slide"},"Slide 4")])],-1))])])]),good:d(()=>[e("div",$e,[e("h4",null,a(o.$t("pages.performance.motion.good.heading")),1),e("div",ze,[e("label",null,[$(e("input",{type:"checkbox","onUpdate:modelValue":s[0]||(s[0]=n=>_.value=n),onChange:J},null,544),[[P,_.value]]),t(" "+a(o.$t("pages.performance.motion.good.simulate")),1)])]),e("div",{class:u(["motion-examples-good",{"reduced-motion":F.value}])},[e("div",{class:"animated-card card-respectful",onMouseenter:s[1]||(s[1]=n=>A.value=!0),onMouseleave:s[2]||(s[2]=n=>A.value=!1)},[e("h5",null,a(o.$t("pages.performance.motion.good.card.title")),1),e("p",null,a(o.$t("pages.performance.motion.good.card.description")),1),e("button",{class:"animated-button-good",onClick:K},a(o.$t("pages.performance.motion.good.button")),1),T.value?(c(),p("div",ye,a(o.$t("pages.performance.motion.good.feedback")),1)):k("",!0)],32),e("div",Le,[e("div",{class:u(["spinner-good",{loading:w.value}])},null,2),e("button",{onClick:Y,class:"load-button"},a(R.value),1),C.value?(c(),p("div",ke)):k("",!0),e("button",{onClick:G,class:"pulse-button"},a(W.value),1)]),e("div",we,[e("button",{onClick:X,"aria-label":o.$t("pages.performance.motion.good.prev")},"‹",8,Ce),e("div",Ee,[e("div",_e,a(o.$t("pages.performance.motion.good.slide"))+" "+a(z.value+1),1)]),e("button",{onClick:x,"aria-label":o.$t("pages.performance.motion.good.next")},"›",8,Se)])],2)])]),default:d(()=>[e("div",Me,[s[14]||(s[14]=e("h5",null,"Code d'exemple",-1)),e("div",Te,[s[12]||(s[12]=e("h6",null,"❌ Mauvais : Animations sans respect des préférences",-1)),e("pre",null,[e("code",null,"<!-- "+a(o.$t("pages.performance.codeExamples.motion.badComment"))+` -->
.animated-card {
  animation: bounce 2s infinite; /* `+a(o.$t("pages.performance.codeExamples.motion.alwaysActive"))+` */
}

.pulse-element {
  animation: pulse 1.5s infinite; /* `+a(o.$t("pages.performance.codeExamples.motion.noUserControl"))+` */
}

<!-- `+a(o.$t("pages.performance.codeExamples.motion.htmlNoControls"))+` -->
<div class="auto-carousel">
  <!-- `+a(o.$t("pages.performance.codeExamples.motion.autoCarousel"))+` -->
</div>`,1)]),s[13]||(s[13]=e("h6",null,"✅ Bon : Respect de prefers-reduced-motion",-1)),e("pre",null,[e("code",null,"<!-- "+a(o.$t("pages.performance.codeExamples.motion.goodComment"))+` -->
.animated-card {
  transition: transform 0.3s ease;
}

.animated-card:hover {
  transform: translateY(-2px);
}

/* `+a(o.$t("pages.performance.codeExamples.motion.systemPreferences"))+` */
@media (prefers-reduced-motion: reduce) {
  .animated-card {
    transition: none;
  }
  .animated-card:hover {
    transform: none;
  }
}

<!-- `+a(o.$t("pages.performance.codeExamples.motion.htmlWithControls"))+` -->
<div class="controlled-carousel">
  <button aria-label="Slide précédent">‹</button>
  <div class="carousel-content">
    <!-- `+a(o.$t("pages.performance.codeExamples.motion.userControlledContent"))+` -->
  </div>
  <button aria-label="Slide suivant">›</button>
</div>`,1)])])])]),_:1},8,["title","explanation"]),E(M,{title:o.$t("pages.performance.zoom.title"),explanation:o.$t("pages.performance.zoom.explanation")},{bad:d(()=>[e("div",Pe,[e("div",Ae,[e("h4",null,a(o.$t("pages.performance.zoom.bad.heading")),1),e("div",Be,[e("div",Ne,[e("h5",null,a(o.$t("pages.performance.zoom.bad.menu")),1),e("ul",null,[e("li",null,[e("a",Ie,a(o.$t("pages.performance.zoom.bad.nav.home")),1)]),e("li",null,[e("a",Ve,a(o.$t("pages.performance.zoom.bad.nav.products")),1)]),e("li",null,[e("a",Oe,a(o.$t("pages.performance.zoom.bad.nav.services")),1)]),e("li",null,[e("a",Ue,a(o.$t("pages.performance.zoom.bad.nav.contact")),1)])])]),e("div",je,[e("div",De,[e("button",null,a(o.$t("pages.performance.zoom.bad.toolbar.new")),1),e("button",null,a(o.$t("pages.performance.zoom.bad.toolbar.edit")),1),e("button",null,a(o.$t("pages.performance.zoom.bad.toolbar.delete")),1),e("input",{type:"search",placeholder:o.$t("pages.performance.zoom.bad.toolbar.search")},null,8,Fe)]),e("div",He,[e("div",Qe,[e("h6",null,a(o.$t("pages.performance.zoom.bad.cards.product1.title")),1),e("p",null,a(o.$t("pages.performance.zoom.bad.cards.product1.description")),1),e("div",Re,a(o.$t("pages.performance.zoom.bad.cards.product1.price")),1)]),e("div",We,[e("h6",null,a(o.$t("pages.performance.zoom.bad.cards.product2.title")),1),e("p",null,a(o.$t("pages.performance.zoom.bad.cards.product2.description")),1),e("div",Ze,a(o.$t("pages.performance.zoom.bad.cards.product2.price")),1)])])])])])])]),good:d(()=>[e("div",qe,[e("div",Je,[e("label",null,[t(a(o.$t("pages.performance.zoom.simulate"))+" ",1),$(e("select",{"onUpdate:modelValue":s[3]||(s[3]=n=>i.value=n),onChange:ee},[(c(!0),p(I,null,V(H.value,n=>(c(),p("option",{key:n.value,value:n.value},a(n.label),9,Ke))),128))],544),[[O,i.value]])]),e("div",Ye,[t(" 📏 "+a(o.$t("pages.performance.zoom.indicator"))+" ",1),e("strong",null,a(i.value)+"%",1),i.value>=150?(c(),p("span",Ge,"⚠️ "+a(o.$t("pages.performance.zoom.warning")),1)):k("",!0)])]),e("div",{class:"layout-good",style:re({fontSize:`${i.value}%`})},[e("h4",null,a(o.$t("pages.performance.zoom.good.heading")),1),e("div",{class:u(["flexible-layout",{"zoom-large":i.value>=150}])},[e("nav",{class:u(["sidebar-good",{collapsed:g.value||i.value>=150}])},[e("button",{class:"sidebar-toggle",onClick:s[4]||(s[4]=n=>g.value=!g.value),"aria-expanded":!g.value&&i.value<150,"aria-controls":"main-nav"},a(g.value||i.value>=150?"☰":"✕"),9,Xe),$(e("div",xe,[e("h5",null,a(o.$t("pages.performance.zoom.good.menu")),1),e("ul",null,[e("li",null,[e("a",eo,a(o.$t("pages.performance.zoom.bad.nav.home")),1)]),e("li",null,[e("a",oo,a(o.$t("pages.performance.zoom.bad.nav.products")),1)]),e("li",null,[e("a",ao,a(o.$t("pages.performance.zoom.bad.nav.services")),1)]),e("li",null,[e("a",so,a(o.$t("pages.performance.zoom.bad.nav.contact")),1)])])],512),[[U,!g.value&&i.value<150]])],2),e("main",no,[e("div",lo,[e("div",to,[e("button",null,a(o.$t("pages.performance.zoom.good.toolbar.new")),1),e("button",null,a(o.$t("pages.performance.zoom.good.toolbar.edit")),1),e("button",null,a(o.$t("pages.performance.zoom.good.toolbar.delete")),1)]),e("div",ro,[e("input",{type:"search",placeholder:o.$t("pages.performance.zoom.good.toolbar.search")},null,8,io)])]),e("div",po,[e("article",co,[e("h6",null,a(o.$t("pages.performance.zoom.good.cards.product1.title")),1),e("p",null,a(o.$t("pages.performance.zoom.good.cards.product1.description")),1),e("div",mo,a(o.$t("pages.performance.zoom.good.cards.product1.price")),1)]),e("article",uo,[e("h6",null,a(o.$t("pages.performance.zoom.good.cards.product2.title")),1),e("p",null,a(o.$t("pages.performance.zoom.good.cards.product2.description")),1),e("div",go,a(o.$t("pages.performance.zoom.good.cards.product2.price")),1)])])])],2)],4)])]),default:d(()=>[e("div",vo,[s[17]||(s[17]=e("h5",null,"Code d'exemple",-1)),e("div",fo,[s[15]||(s[15]=e("h6",null,"❌ Mauvais : Tailles fixes qui ne s'adaptent pas",-1)),e("pre",null,[e("code",null,"<!-- "+a(o.$t("pages.performance.codeExamples.zoom.badComment"))+` -->
.sidebar {
  width: 250px; /* `+a(o.$t("pages.performance.codeExamples.zoom.fixedWidth"))+` */
  font-size: 14px; /* `+a(o.$t("pages.performance.codeExamples.zoom.fixedSize"))+` */
}

.content {
  max-width: 800px; /* `+a(o.$t("pages.performance.codeExamples.zoom.noAdapt"))+` */
  overflow: hidden; /* `+a(o.$t("pages.performance.codeExamples.zoom.contentCut"))+` */
}

<!-- `+a(o.$t("pages.performance.codeExamples.zoom.htmlNoAdaptive"))+` -->
<div class="fixed-layout">
  <div class="sidebar">Menu</div>
  <div class="content">Contenu fixe</div>
</div>`,1)]),s[16]||(s[16]=e("h6",null,"✅ Bon : Unités relatives et flexibilité",-1)),e("pre",null,[e("code",null,"<!-- "+a(o.$t("pages.performance.codeExamples.zoom.goodComment"))+` -->
.sidebar {
  width: 15rem; /* `+a(o.$t("pages.performance.codeExamples.zoom.relativeUnit"))+` */
  min-width: 200px;
  font-size: 1rem; /* `+a(o.$t("pages.performance.codeExamples.zoom.adaptToPreferences"))+` */
}

.content {
  flex: 1; /* `+a(o.$t("pages.performance.codeExamples.zoom.flexible"))+` */
  max-width: none; /* `+a(o.$t("pages.performance.codeExamples.zoom.noFixedLimit"))+` */
  overflow-wrap: break-word; /* `+a(o.$t("pages.performance.codeExamples.zoom.contentManagement"))+` */
}

/* `+a(o.$t("pages.performance.codeExamples.zoom.zoomSupport"))+` */
@media (max-width: 1024px) {
  .sidebar {
    width: 100%;
    order: 2;
  }
}

<!-- `+a(o.$t("pages.performance.codeExamples.zoom.htmlFlexible"))+` -->
<div class="flexible-layout">
  <aside class="sidebar" aria-label="Navigation">
    <button aria-expanded="false" aria-controls="nav-menu">
      Toggle Menu
    </button>
    <nav id="nav-menu">Menu adaptatif</nav>
  </aside>
  <main class="content">Contenu adaptatif</main>
</div>`,1)])])])]),_:1},8,["title","explanation"]),E(M,{title:o.$t("pages.performance.responsive.title"),explanation:o.$t("pages.performance.responsive.explanation")},{bad:d(()=>[e("div",bo,[e("div",ho,[e("h4",null,a(o.$t("pages.performance.responsive.bad.heading")),1),e("div",$o,[e("div",zo,[e("div",yo,a(o.$t("pages.performance.responsive.bad.logo")),1),e("div",Lo,[e("a",ko,a(o.$t("pages.performance.responsive.bad.nav.home")),1),e("a",wo,a(o.$t("pages.performance.responsive.bad.nav.about")),1),e("a",Co,a(o.$t("pages.performance.responsive.bad.nav.services")),1),e("a",Eo,a(o.$t("pages.performance.responsive.bad.nav.portfolio")),1),e("a",_o,a(o.$t("pages.performance.responsive.bad.nav.blog")),1),e("a",So,a(o.$t("pages.performance.responsive.bad.nav.contact")),1)]),e("div",Mo,[e("button",null,a(o.$t("pages.performance.responsive.bad.login")),1),e("button",null,a(o.$t("pages.performance.responsive.bad.signup")),1)])]),e("div",To,[e("div",Po,[e("h5",null,a(o.$t("pages.performance.responsive.bad.form.heading")),1),e("div",Ao,[e("input",{type:"text",placeholder:o.$t("pages.performance.responsive.bad.form.name")},null,8,Bo),e("input",{type:"email",placeholder:o.$t("pages.performance.responsive.bad.form.email")},null,8,No)]),e("textarea",{placeholder:o.$t("pages.performance.responsive.bad.form.message")},null,8,Io),e("div",Vo,[e("button",null,a(o.$t("pages.performance.responsive.bad.form.cancel")),1),e("button",null,a(o.$t("pages.performance.responsive.bad.form.send")),1)])]),e("div",Oo,[e("h5",null,a(o.$t("pages.performance.responsive.bad.info.heading")),1),e("p",null,[t(a(o.$t("pages.performance.responsive.bad.info.address")),1),s[18]||(s[18]=e("br",null,null,-1)),t(a(o.$t("pages.performance.responsive.bad.info.city")),1),s[19]||(s[19]=e("br",null,null,-1)),t(a(o.$t("pages.performance.responsive.bad.info.phone")),1)])])])])])])]),good:d(()=>[e("div",Uo,[e("div",jo,[e("label",null,[t(a(o.$t("pages.performance.responsive.simulate"))+" ",1),$(e("select",{"onUpdate:modelValue":s[5]||(s[5]=n=>v.value=n),onChange:oe},[(c(!0),p(I,null,V(Q.value,n=>(c(),p("option",{key:n.value,value:n.value},a(n.label),9,Do))),128))],544),[[O,v.value]])])]),e("div",{class:u(["device-simulator-good",v.value])},[e("h4",null,a(o.$t("pages.performance.responsive.good.heading")),1),e("div",Fo,[e("header",Ho,[e("div",Qo,a(o.$t("pages.performance.responsive.bad.logo")),1),v.value!=="desktop"?(c(),p("button",{key:0,class:"menu-toggle",onClick:s[6]||(s[6]=n=>f.value=!f.value),"aria-expanded":f.value,"aria-controls":"responsive-nav"}," ☰ "+a(o.$t("pages.performance.responsive.good.menu")),9,Ro)):k("",!0),$(e("nav",{id:"responsive-nav",class:u(["nav-good",{open:f.value}])},[e("a",{href:"#",onClick:L},a(o.$t("pages.performance.responsive.bad.nav.home")),1),e("a",{href:"#",onClick:L},a(o.$t("pages.performance.responsive.bad.nav.about")),1),e("a",{href:"#",onClick:L},a(o.$t("pages.performance.responsive.bad.nav.services")),1),e("a",{href:"#",onClick:L},a(o.$t("pages.performance.responsive.bad.nav.portfolio")),1),e("a",{href:"#",onClick:L},a(o.$t("pages.performance.responsive.bad.nav.blog")),1),e("a",{href:"#",onClick:L},a(o.$t("pages.performance.responsive.bad.nav.contact")),1)],2),[[U,v.value==="desktop"||f.value]]),v.value==="desktop"?(c(),p("div",Wo,[e("button",null,a(o.$t("pages.performance.responsive.bad.login")),1),e("button",null,a(o.$t("pages.performance.responsive.bad.signup")),1)])):k("",!0)]),e("main",Zo,[e("section",qo,[e("h5",null,a(o.$t("pages.performance.responsive.good.form.heading")),1),e("form",Jo,[e("div",Ko,[e("input",{type:"text",placeholder:o.$t("pages.performance.responsive.bad.form.name"),"aria-label":o.$t("pages.performance.responsive.good.form.nameLabel")},null,8,Yo),e("input",{type:"email",placeholder:o.$t("pages.performance.responsive.bad.form.email"),"aria-label":o.$t("pages.performance.responsive.good.form.emailLabel")},null,8,Go)]),e("textarea",{placeholder:o.$t("pages.performance.responsive.good.form.messageLabel"),"aria-label":o.$t("pages.performance.responsive.good.form.messageLabel")},null,8,Xo),e("div",xo,[e("button",ea,a(o.$t("pages.performance.responsive.good.form.cancel")),1),e("button",oa,a(o.$t("pages.performance.responsive.good.form.send")),1)])])]),e("aside",aa,[e("h5",null,a(o.$t("pages.performance.responsive.good.info.heading")),1),e("address",null,[t(a(o.$t("pages.performance.responsive.bad.info.address")),1),s[20]||(s[20]=e("br",null,null,-1)),t(" "+a(o.$t("pages.performance.responsive.bad.info.city")),1),s[21]||(s[21]=e("br",null,null,-1)),e("a",{href:`tel:${o.$t("pages.performance.responsive.bad.info.phone").replace(/\s/g,"")}`},a(o.$t("pages.performance.responsive.bad.info.phone")),9,sa)])])])])],2)])]),default:d(()=>[e("div",na,[s[24]||(s[24]=e("h5",null,"Code d'exemple",-1)),e("div",la,[s[22]||(s[22]=e("h6",null,"❌ Mauvais : Interface fixe non responsive",-1)),e("pre",null,[e("code",null,"<!-- "+a(o.$t("pages.performance.codeExamples.responsive.badComment"))+` -->
.header {
  display: flex;
  position: fixed; /* `+a(o.$t("pages.performance.codeExamples.responsive.fixedPosition"))+` */
  width: 1200px; /* `+a(o.$t("pages.performance.codeExamples.responsive.fixedWidth"))+` */
}

.nav-menu {
  display: flex; /* `+a(o.$t("pages.performance.codeExamples.responsive.overflow"))+` */
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr; /* `+a(o.$t("pages.performance.codeExamples.responsive.alwaysTwoColumns"))+` */
}

button {
  padding: 4px 8px; /* `+a(o.$t("pages.performance.codeExamples.responsive.tooSmallTouch"))+` */
  min-width: auto;
}

<!-- `+a(o.$t("pages.performance.codeExamples.responsive.htmlNoAdaptability"))+` -->
<header class="header">
  <div class="logo">Logo</div>
  <nav class="nav-menu">
    <a href="#">Link1</a><a href="#">Link2</a>
  </nav>
</header>`,1)]),s[23]||(s[23]=e("h6",null,"✅ Bon : Design responsive et adaptatif",-1)),e("pre",null,[e("code",null,"<!-- "+a(o.$t("pages.performance.codeExamples.responsive.goodComment"))+` -->
.header {
  display: flex;
  flex-wrap: wrap;
  width: 100%; /* `+a(o.$t("pages.performance.codeExamples.responsive.fluid"))+` */
  max-width: 100%;
}

.nav-menu {
  display: none; /* `+a(o.$t("pages.performance.codeExamples.responsive.hiddenByDefault"))+` */
}

.nav-menu.open {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .nav-menu {
    display: flex !important;
    flex-direction: row;
  }
  .menu-toggle {
    display: none;
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

button {
  min-height: 44px; /* `+a(o.$t("pages.performance.codeExamples.responsive.minTouchTarget"))+` */
  min-width: 44px;
  padding: 0.75rem 1.5rem;
}

<!-- `+a(o.$t("pages.performance.codeExamples.responsive.htmlAdaptiveNav"))+` -->
<header class="header">
  <div class="logo">Logo</div>
  <button class="menu-toggle"
          aria-expanded="false"
          aria-controls="nav-menu">
    ☰ Menu
  </button>
  <nav id="nav-menu" class="nav-menu">
    <a href="#">Accueil</a>
    <a href="#">Services</a>
  </nav>
</header>`,1)])])])]),_:1},8,["title","explanation"]),E(M,{title:o.$t("pages.performance.lazyLoading.title"),explanation:o.$t("pages.performance.lazyLoading.explanation")},{bad:d(()=>[e("div",ta,[e("div",ra,[e("h4",null,"❌ "+a(o.$t("pages.performance.lazyLoading.bad.heading")),1),e("div",da,[e("p",ia,[e("strong",null,a(o.$t("pages.performance.lazyLoading.bad.problem")),1)]),e("p",pa,[e("strong",null,"📚 "+a(o.$t("pages.performance.lazyLoading.bad.term")),1)]),e("ul",ca,[e("li",null,[s[25]||(s[25]=t("📥 ",-1)),e("strong",null,a(o.$t("pages.performance.lazyLoading.bad.issues.problem1")),1)]),e("li",null,[s[26]||(s[26]=t("⏱️ ",-1)),e("strong",null,a(o.$t("pages.performance.lazyLoading.bad.issues.problem2")),1)]),e("li",null,[s[27]||(s[27]=t("📱 ",-1)),e("strong",null,a(o.$t("pages.performance.lazyLoading.bad.issues.problem3")),1)]),e("li",null,[s[28]||(s[28]=t("🔋 ",-1)),e("strong",null,a(o.$t("pages.performance.lazyLoading.bad.issues.problem4")),1)])]),e("div",ma,[e("div",ua,[e("div",ga,"📄 "+a(o.$t("pages.performance.lazyLoading.bad.resources.html")),1),e("div",va,"🎨 "+a(o.$t("pages.performance.lazyLoading.bad.resources.css")),1),e("div",fa,"⚙️ "+a(o.$t("pages.performance.lazyLoading.bad.resources.js")),1),e("div",ba,"🖼️ "+a(o.$t("pages.performance.lazyLoading.bad.resources.img1")),1),e("div",ha,"🖼️ "+a(o.$t("pages.performance.lazyLoading.bad.resources.img2")),1),e("div",$a,"🖼️ "+a(o.$t("pages.performance.lazyLoading.bad.resources.img3")),1),e("div",za,"🖼️ "+a(o.$t("pages.performance.lazyLoading.bad.resources.img4")),1),e("div",ya,"🖼️ "+a(o.$t("pages.performance.lazyLoading.bad.resources.img5")),1)]),e("div",La," ⏱️ "+a(o.$t("pages.performance.lazyLoading.bad.time")),1),e("div",ka," 📊 "+a(o.$t("pages.performance.lazyLoading.bad.data")),1)])])])])]),good:d(()=>[e("div",wa,[e("div",Ca,[e("h4",null,"✅ "+a(o.$t("pages.performance.lazyLoading.good.heading")),1),e("div",Ea,[e("p",_a,[e("strong",null,a(o.$t("pages.performance.lazyLoading.good.solution")),1)]),e("p",Sa,[e("strong",null,"📚 "+a(o.$t("pages.performance.lazyLoading.good.terms")),1)]),e("div",Ma,[e("h5",null,a(o.$t("pages.performance.lazyLoading.good.controls.title")),1),e("label",Ta,[$(e("input",{type:"checkbox","onUpdate:modelValue":s[7]||(s[7]=n=>m.value=n),onChange:B},null,544),[[P,m.value]]),e("div",Pa,[s[29]||(s[29]=e("span",{class:"checkbox-icon"},"👁️",-1)),e("span",Aa,[e("strong",null,a(o.$t("pages.performance.lazyLoading.good.controls.lazyLoad.label")),1),e("small",null,a(o.$t("pages.performance.lazyLoading.good.controls.lazyLoad.description")),1)])])]),e("label",Ba,[$(e("input",{type:"checkbox","onUpdate:modelValue":s[8]||(s[8]=n=>y.value=n),onChange:B},null,544),[[P,y.value]]),e("div",Na,[s[30]||(s[30]=e("span",{class:"checkbox-icon"},"💾",-1)),e("span",Ia,[e("strong",null,a(o.$t("pages.performance.lazyLoading.good.controls.cache.label")),1),e("small",null,a(o.$t("pages.performance.lazyLoading.good.controls.cache.description")),1)])])])]),e("div",Va,[e("div",Oa,[e("div",Ua,"📄 "+a(o.$t("pages.performance.lazyLoading.good.resources.html")),1),e("div",ja,"🎨 "+a(o.$t("pages.performance.lazyLoading.good.resources.css")),1),e("div",Da,"⚙️ "+a(o.$t("pages.performance.lazyLoading.good.resources.js")),1),e("div",Fa,"🖼️ "+a(o.$t("pages.performance.lazyLoading.good.resources.img1")),1),e("div",Ha,"🖼️ "+a(o.$t("pages.performance.lazyLoading.good.resources.img2")),1),e("div",{class:u(["resource-item",{"lazy-loaded":m.value}])}," 🖼️ "+a(o.$t("pages.performance.lazyLoading.good.resources.img3"))+" "+a(m.value?o.$t("pages.performance.lazyLoading.good.resources.lazy"):o.$t("pages.performance.lazyLoading.good.resources.notLoaded")),3),e("div",{class:u(["resource-item",{"lazy-loaded":m.value}])}," 🖼️ "+a(o.$t("pages.performance.lazyLoading.good.resources.img4"))+" "+a(m.value?o.$t("pages.performance.lazyLoading.good.resources.lazy"):o.$t("pages.performance.lazyLoading.good.resources.notLoaded")),3),e("div",{class:u(["resource-item",{cached:y.value}])}," 🖼️ "+a(o.$t("pages.performance.lazyLoading.good.resources.imgCached"))+" "+a(y.value?o.$t("pages.performance.lazyLoading.good.resources.cached"):o.$t("pages.performance.lazyLoading.good.resources.redownload")),3)]),e("div",Qa,[t(" ⏱️ "+a(o.$t("pages.performance.lazyLoading.good.time"))+" ",1),e("strong",null,a(Z.value),1)]),m.value||y.value?(c(),p("div",Ra,[t(" 📊 "+a(o.$t("pages.performance.lazyLoading.good.dataSaved"))+" ",1),e("strong",null,a(q.value),1)])):k("",!0)]),e("div",Wa,[e("h5",null,"💡 "+a(o.$t("pages.performance.lazyLoading.good.benefits.title")),1),e("div",Za,[e("div",qa,[s[31]||(s[31]=e("span",{class:"benefit-icon"},"🚀",-1)),e("strong",null,a(o.$t("pages.performance.lazyLoading.good.benefits.speed.label")),1),e("p",null,a(o.$t("pages.performance.lazyLoading.good.benefits.speed.description")),1)]),e("div",Ja,[s[32]||(s[32]=e("span",{class:"benefit-icon"},"📱",-1)),e("strong",null,a(o.$t("pages.performance.lazyLoading.good.benefits.mobile.label")),1),e("p",null,a(o.$t("pages.performance.lazyLoading.good.benefits.mobile.description")),1)]),e("div",Ka,[s[33]||(s[33]=e("span",{class:"benefit-icon"},"🔋",-1)),e("strong",null,a(o.$t("pages.performance.lazyLoading.good.benefits.battery.label")),1),e("p",null,a(o.$t("pages.performance.lazyLoading.good.benefits.battery.description")),1)]),e("div",Ya,[s[34]||(s[34]=e("span",{class:"benefit-icon"},"♿",-1)),e("strong",null,a(o.$t("pages.performance.lazyLoading.good.benefits.devices.label")),1),e("p",null,a(o.$t("pages.performance.lazyLoading.good.benefits.devices.description")),1)])])])])])])]),default:d(()=>[e("div",Ga,[s[37]||(s[37]=e("h5",null,"Pour les développeurs : exemples de code",-1)),e("div",Xa,[s[35]||(s[35]=e("h6",null,"❌ Tout charger d'un coup",-1)),e("pre",null,[e("code",null,"<!-- "+a(o.$t("pages.performance.codeExamples.lazyLoading.badComment"))+` -->
<img src="photo-tres-lourde-5mo.jpg" alt="Photo">
<img src="autre-photo-4mo.jpg" alt="Autre photo">
<img src="encore-une-3mo.jpg" alt="Encore une photo">

<!-- `+a(o.$t("pages.performance.codeExamples.lazyLoading.resultBefore"))+" -->",1)]),s[36]||(s[36]=e("h6",null,"✅ Charger intelligemment",-1)),e("pre",null,[e("code",null,"<!-- "+a(o.$t("pages.performance.codeExamples.lazyLoading.goodComment"))+` -->
<img src="photo-optimisee-500ko.webp"
     alt="Photo"
     loading="lazy">

<!-- `+a(o.$t("pages.performance.codeExamples.lazyLoading.otherImagesOnScroll"))+` -->
<img src="autre-photo-500ko.webp"
     alt="Autre photo"
     loading="lazy">

<!-- `+a(o.$t("pages.performance.codeExamples.lazyLoading.resultSmart"))+" -->",1)])])])]),_:1},8,["title","explanation"])]))}},ns=ae(xa,[["__scopeId","data-v-29ffa161"]]);export{ns as default};
