import{_ as P,F as V,x as j,r as d,k as s,y as g,C as u,A as a,B as o,E as z,D as r,z as b,I as G,J as H,N as U,O as _,U as C,V as I,W as Y}from"#entry";import{u as q,P as J,E as y}from"./BC86FAwA.js";import{u as R}from"./DLj1BPX9.js";const W={class:"keyboard-navigation"},Q={"aria-labelledby":"keyboard-shortcuts-title"},X={id:"keyboard-shortcuts-title"},Z={class:"shortcuts-list"},aa={class:"list-nav-demo"},ea={class:"menu-bad"},oa={class:"menu-item-bad",tabindex:"0"},ta={class:"menu-item-bad",tabindex:"0"},na={class:"menu-item-bad",tabindex:"0"},sa={class:"menu-item-bad",tabindex:"0"},ia={class:"menu-item-bad",tabindex:"0"},la={class:"code-block"},da=["innerHTML"],ra={class:"list-nav-demo"},ca=["tabindex","onClick","onFocus"],pa={class:"hint"},ga={class:"code-block"},ua={class:"code-block language-javascript","data-no-highlight":"true"},ba={class:"focus-demo"},va={class:"controls-bad"},ma={type:"button",class:"btn-no-focus"},ka={type:"button",class:"btn-no-focus"},ya={href:"#",class:"link-no-focus"},fa=["placeholder"],ha={type:"button",class:"btn-no-focus"},Na={class:"code-block language-css"},$a={class:"code-block"},Ea={class:"focus-demo"},Ta={class:"controls-good"},La={type:"button",class:"btn-good-focus"},_a={type:"button",class:"btn-good-focus"},Ca={href:"#",class:"link-good-focus"},Ia=["placeholder"],wa={type:"button",class:"btn-good-focus"},xa={class:"code-block language-css"},Ma={class:"code-block"},Fa={class:"skip-demo"},Sa={class:"demo-page-bad"},Ba={class:"demo-header"},Aa={class:"demo-logo"},Da={class:"demo-nav"},Ka={href:"#"},Oa={href:"#"},Pa={href:"#"},Va={href:"#"},ja={href:"#"},za={href:"#"},Ga={href:"#"},Ha={href:"#"},Ua={class:"demo-main",id:"main-content-bad"},Ya={class:"code-block"},qa={class:"skip-demo"},Ja={class:"demo-page-good"},Ra={href:"#main-content-good",class:"skip-link"},Wa={class:"demo-header"},Qa={class:"demo-logo"},Xa={class:"demo-nav"},Za={href:"#"},ae={href:"#"},ee={href:"#"},oe={href:"#"},te={href:"#"},ne={href:"#"},se={href:"#"},ie={href:"#"},le={class:"demo-main",id:"main-content-good"},de={class:"code-block language-css"},re={class:"code-block"},ce={class:"modal-demo"},pe={class:"modal-header"},ge={class:"modal-body"},ue=["placeholder"],be={class:"modal-footer"},ve={class:"code-block"},me={class:"modal-demo"},ke={class:"modal-header"},ye={id:"good-modal-title"},fe=["aria-label"],he={class:"modal-body"},Ne=["placeholder"],$e={class:"modal-footer"},Ee={class:"code-block"},Te={class:"code-block language-javascript","data-no-highlight":"true"},Le={__name:"keyboard-navigation",setup(_e){const{t}=V(),{getPageSEO:w}=R(),x=w("/keyboard-navigation");j(x),q();const v=d(!1),f=d(!1),h=d(null),m=d(null),$=d(null),E=d(null),T=d(null),i=d(0),k=s(()=>[`🏠 ${t("pages.keyboardNavigation.listNavigation.bad.items.home")}`,`📋 ${t("pages.keyboardNavigation.listNavigation.bad.items.projects")}`,`👥 ${t("pages.keyboardNavigation.listNavigation.bad.items.team")}`,`📊 ${t("pages.keyboardNavigation.listNavigation.bad.items.stats")}`,`⚙️ ${t("pages.keyboardNavigation.listNavigation.bad.items.settings")}`]);function M(){v.value=!0}function N(){v.value=!1}function F(){alert(t("pages.keyboardNavigation.modalTrap.modal.content")),v.value=!1}async function S(){f.value=!0,await Y(),m.value&&m.value.focus()}function p(){f.value=!1,h.value&&h.value.focus()}function B(){alert(t("pages.keyboardNavigation.modalTrap.modal.content")),p()}function A(e){e.preventDefault();const n=[m.value,$.value,E.value,T.value].filter(l=>l!==null);if(n.length===0)return;const c=n.findIndex(l=>l===document.activeElement);e.shiftKey?c<=0?n[n.length-1]?.focus():n[c-1]?.focus():c===-1||c>=n.length-1?n[0]?.focus():n[c+1]?.focus()}function L(e){i.value=e,alert(`Sélectionné : ${k.value[e]}`)}function D(e){switch(e.key){case"ArrowDown":e.preventDefault(),i.value=(i.value+1)%k.value.length;break;case"ArrowUp":e.preventDefault(),i.value=i.value===0?k.value.length-1:i.value-1;break;case"Enter":case" ":e.preventDefault(),L(i.value);break}}const K=s(()=>`&lt;!-- ${t("pages.keyboardNavigation.codeExamples.listNavigation.badComment")} --&gt;
&lt;div class="menu"&gt;
  &lt;div tabindex="0"&gt;🏠 ${t("pages.keyboardNavigation.codeExamples.listNavigation.home")}&lt;/div&gt;
  &lt;div tabindex="0"&gt;📋 ${t("pages.keyboardNavigation.codeExamples.listNavigation.projects")}&lt;/div&gt;
  &lt;div tabindex="0"&gt;👥 ${t("pages.keyboardNavigation.codeExamples.listNavigation.team")}&lt;/div&gt;
  &lt;div tabindex="0"&gt;📊 ${t("pages.keyboardNavigation.codeExamples.listNavigation.stats")}&lt;/div&gt;
  &lt;div tabindex="0"&gt;⚙️ ${t("pages.keyboardNavigation.codeExamples.listNavigation.settings")}&lt;/div&gt;
&lt;/div&gt;

&lt;!-- ${t("pages.keyboardNavigation.codeExamples.listNavigation.userMustTab5Times")} --&gt;
&lt;!-- ${t("pages.keyboardNavigation.codeExamples.listNavigation.noArrowNavigation")} --&gt;
&lt;!-- ${t("pages.keyboardNavigation.codeExamples.listNavigation.noMenuSemantics")} --&gt;`);return s(()=>`&lt;!-- ${t("pages.keyboardNavigation.codeExamples.listNavigation.goodComment")} --&gt;
&lt;div
  role="menu"
  @keydown="handleKeydown"
&gt;
  &lt;div
    v-for="(item, i) in items"
    role="menuitem"
    :tabindex="selected === i ? 0 : -1"
    @focus="selected = i"
    :class="{ selected: selected === i }"
  &gt;
    {{ '{' + '{ item }' + '}' }}
  &lt;/div&gt;
&lt;/div&gt;`),s(()=>`// ${t("pages.keyboardNavigation.codeExamples.listNavigation.arrowNavigationComment")}
function handleKeydown(e) {
  switch(e.key) {
    case 'ArrowDown':
      selected = (selected + 1) % items.length
      break
    case 'ArrowUp':
      selected = selected === 0 ? items.length - 1 : selected - 1
      break
    case 'Enter':
      selectItem(selected)
      break
  }
}`),s(()=>`/* ❌ ${t("pages.keyboardNavigation.codeExamples.focusIndicators.removeFocusComment")} */
*:focus {
  outline: none !important;
}

button:focus, a:focus, input:focus {
  outline: none !important;
}`),s(()=>`&lt;!-- ❌ ${t("pages.keyboardNavigation.codeExamples.focusIndicators.accessibilityProblems")} --&gt;
&lt;button&gt;${t("pages.keyboardNavigation.codeExamples.focusIndicators.button1")}&lt;/button&gt; &lt;!-- ${t("pages.keyboardNavigation.codeExamples.focusIndicators.button1NoType")} --&gt;
&lt;button&gt;${t("pages.keyboardNavigation.codeExamples.focusIndicators.button2")}&lt;/button&gt; &lt;!-- ${t("pages.keyboardNavigation.codeExamples.focusIndicators.button2NoType")} --&gt;
&lt;a href="#"&gt;${t("pages.keyboardNavigation.codeExamples.focusIndicators.link")}&lt;/a&gt; &lt;!-- ${t("pages.keyboardNavigation.codeExamples.focusIndicators.linkNoFocus")} --&gt;
&lt;input type="text" /&gt; &lt;!-- ${t("pages.keyboardNavigation.codeExamples.focusIndicators.inputNoFocus")} --&gt;
&lt;!-- ${t("pages.keyboardNavigation.codeExamples.focusIndicators.keyboardNavigationNotVisible")} --&gt;`),s(()=>`/* ✅ ${t("pages.keyboardNavigation.codeExamples.focusIndicators.visibleFocusComment")} */
button:focus-visible {
  outline: 3px solid #4F46E5;
  outline-offset: 2px;
}

input:focus-visible {
  border-color: #4F46E5;
  outline: 2px solid #4F46E5;
  outline-offset: 1px;
}`),s(()=>`&lt;button type="button"&gt;${t("pages.keyboardNavigation.codeExamples.focusIndicators.button1")}&lt;/button&gt;
&lt;button type="button"&gt;${t("pages.keyboardNavigation.codeExamples.focusIndicators.button2")}&lt;/button&gt;
&lt;a href="#"&gt;Lien vers la page&lt;/a&gt;
&lt;input type="text" placeholder="Saisissez du texte" /&gt;`),s(()=>`&lt;!-- ${t("pages.keyboardNavigation.codeExamples.skipLinks.badComment")} --&gt;
&lt;header&gt;
  &lt;nav&gt;
    &lt;a href="#"&gt;${t("pages.keyboardNavigation.codeExamples.skipLinks.home")}&lt;/a&gt;
    &lt;a href="#"&gt;${t("pages.keyboardNavigation.codeExamples.skipLinks.products")}&lt;/a&gt;
    &lt;a href="#"&gt;${t("pages.keyboardNavigation.codeExamples.skipLinks.services")}&lt;/a&gt;
    &lt;!-- ${t("pages.keyboardNavigation.codeExamples.skipLinks.tenPlusLinks")} --&gt;
  &lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;!-- ${t("pages.keyboardNavigation.codeExamples.skipLinks.userMustTraverse")} --&gt;
  &lt;h1&gt;${t("pages.keyboardNavigation.codeExamples.skipLinks.mainContent")}&lt;/h1&gt;
&lt;/main&gt;`),s(()=>`/* ${t("pages.keyboardNavigation.codeExamples.skipLinks.skipLinkComment")} */
.skip-link {
  position: absolute;
  top: -100px;
  left: 1rem;
  z-index: 1000;
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: 0.625rem;
}

.skip-link:focus {
  top: 1rem;
}`),s(()=>`&lt;a href="#main-content" class="skip-link"&gt;
  ${t("pages.keyboardNavigation.codeExamples.skipLinks.skipToContent")}
&lt;/a&gt;

&lt;header&gt;
  &lt;nav aria-label="Navigation principale"&gt;
    &lt;ul&gt;
      &lt;li&gt;&lt;a href="/"&gt;${t("pages.keyboardNavigation.codeExamples.skipLinks.home")}&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="/produits"&gt;${t("pages.keyboardNavigation.codeExamples.skipLinks.products")}&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="/services"&gt;${t("pages.keyboardNavigation.codeExamples.skipLinks.services")}&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/nav&gt;
&lt;/header&gt;

&lt;main id="main-content"&gt;
  &lt;h1&gt;${t("pages.keyboardNavigation.codeExamples.skipLinks.mainContent")}&lt;/h1&gt;
&lt;/main&gt;`),s(()=>`&lt;!-- ${t("pages.keyboardNavigation.codeExamples.modalTrap.badComment")} --&gt;
&lt;div v-if="modalOpen" class="modal-overlay" @click="close"&gt;
  &lt;div class="modal-content" @click.stop&gt;
    &lt;div class="modal-header"&gt;
      &lt;h3&gt;${t("pages.keyboardNavigation.codeExamples.modalTrap.confirmAction")}&lt;/h3&gt;
      &lt;button @click="close"&gt;×&lt;/button&gt;
    &lt;/div&gt;

    &lt;div class="modal-body"&gt;
      &lt;p&gt;${t("pages.keyboardNavigation.codeExamples.modalTrap.areYouSure")}&lt;/p&gt;
      &lt;input type="text" placeholder="${t("pages.keyboardNavigation.codeExamples.modalTrap.reasonOptional")}" /&gt;
    &lt;/div&gt;

    &lt;div class="modal-footer"&gt;
      &lt;button @click="close"&gt;${t("pages.keyboardNavigation.codeExamples.modalTrap.cancel")}&lt;/button&gt;
      &lt;button @click="confirm"&gt;${t("pages.keyboardNavigation.codeExamples.modalTrap.confirm")}&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;`),s(()=>`&lt;!-- ${t("pages.keyboardNavigation.codeExamples.modalTrap.goodComment")} --&gt;
&lt;div
  v-if="modalOpen"
  class="modal-overlay"
  @click="closeModal"
  @keydown.esc="closeModal"
&gt;
  &lt;div
    class="modal-content"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    @click.stop
  &gt;
    &lt;header class="modal-header"&gt;
      &lt;h2 id="modal-title"&gt;${t("pages.keyboardNavigation.codeExamples.modalTrap.confirmAction")}&lt;/h2&gt;
      &lt;button
        type="button"
        @click="closeModal"
        aria-label="${t("pages.keyboardNavigation.codeExamples.modalTrap.closeModal")}"
        class="close-btn"
      &gt;×&lt;/button&gt;
    &lt;/header&gt;

    &lt;div class="modal-body"&gt;
      &lt;p&gt;${t("pages.keyboardNavigation.codeExamples.modalTrap.areYouSure")}&lt;/p&gt;
      &lt;input
        ref="firstInput"
        type="text"
        placeholder="${t("pages.keyboardNavigation.codeExamples.modalTrap.reasonOptional")}"
        @keydown.tab="handleFocusTrap"
      /&gt;
    &lt;/div&gt;

    &lt;footer class="modal-footer"&gt;
      &lt;button
        type="button"
        @click="closeModal"
        @keydown.tab="handleFocusTrap"
      &gt;${t("pages.keyboardNavigation.codeExamples.modalTrap.cancel")}&lt;/button&gt;
      &lt;button
        type="button"
        ref="lastButton"
        @click="confirmAction"
        @keydown.tab="handleFocusTrap"
      &gt;${t("pages.keyboardNavigation.codeExamples.modalTrap.confirm")}&lt;/button&gt;
    &lt;/footer&gt;
  &lt;/div&gt;
&lt;/div&gt;`),s(()=>`// ${t("pages.keyboardNavigation.codeExamples.modalTrap.focusTrapComment")} :
// - Focus automatique sur premier élément
// - Piège à focus (Tab/Shift+Tab)
// - Fermeture par Échap
// - Retour du focus à l'élément déclencheur

function handleFocusTrap(event) {
  const focusableElements = modalContent.querySelectorAll(
    'button, input, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}`),(e,n)=>(b(),g("div",W,[u(J,{title:e.$t("pages.keyboardNavigation.title"),description:e.$t("pages.keyboardNavigation.description")},null,8,["title","description"]),a("section",Q,[a("h2",X,o(e.$t("pages.keyboardNavigation.shortcuts.title")),1),a("dl",Z,[a("div",null,[n[2]||(n[2]=a("dt",null,[a("kbd",null,"Tab")],-1)),a("dd",null,o(e.$t("pages.keyboardNavigation.shortcuts.tab")),1)]),a("div",null,[n[3]||(n[3]=a("dt",null,[a("kbd",null,"Shift + Tab")],-1)),a("dd",null,o(e.$t("pages.keyboardNavigation.shortcuts.shiftTab")),1)]),a("div",null,[n[4]||(n[4]=a("dt",null,[a("kbd",null,"Entrée"),z(" / "),a("kbd",null,"Espace")],-1)),a("dd",null,o(e.$t("pages.keyboardNavigation.shortcuts.enter")),1)]),a("div",null,[n[5]||(n[5]=a("dt",null,[a("kbd",null,"Échap")],-1)),a("dd",null,o(e.$t("pages.keyboardNavigation.shortcuts.escape")),1)]),a("div",null,[n[6]||(n[6]=a("dt",null,[a("kbd",null,"↑ ↓")],-1)),a("dd",null,o(e.$t("pages.keyboardNavigation.shortcuts.arrows")),1)])])]),u(y,{title:e.$t("pages.keyboardNavigation.listNavigation.title"),explanation:e.$t("pages.keyboardNavigation.listNavigation.explanation")},{bad:r(()=>[a("div",aa,[a("p",null,o(e.$t("pages.keyboardNavigation.listNavigation.bad.intro")),1),a("div",ea,[a("div",oa,"🏠 "+o(e.$t("pages.keyboardNavigation.listNavigation.bad.items.home")),1),a("div",ta,"📋 "+o(e.$t("pages.keyboardNavigation.listNavigation.bad.items.projects")),1),a("div",na,"👥 "+o(e.$t("pages.keyboardNavigation.listNavigation.bad.items.team")),1),a("div",sa,"📊 "+o(e.$t("pages.keyboardNavigation.listNavigation.bad.items.stats")),1),a("div",ia,"⚙️ "+o(e.$t("pages.keyboardNavigation.listNavigation.bad.items.settings")),1)]),a("div",la,[a("pre",null,[a("code",{innerHTML:K.value},null,8,da)])])])]),good:r(()=>[a("div",ra,[a("p",null,o(e.$t("pages.keyboardNavigation.listNavigation.good.intro")),1),a("div",{class:"menu-good",role:"menu",onKeydown:D},[(b(!0),g(G,null,H(k.value,(c,l)=>(b(),g("div",{key:l,class:U(["menu-item-good",{selected:i.value===l}]),role:"menuitem",tabindex:i.value===l?0:-1,onClick:O=>L(l),onFocus:O=>i.value=l},o(c),43,ca))),128))],32),a("p",pa,"💡 "+o(e.$t("pages.keyboardNavigation.listNavigation.good.hint")),1),a("div",ga,[a("pre",null,[a("code",null,"<!-- "+o(e.$t("pages.keyboardNavigation.codeExamples.listNavigation.goodComment"))+` -->
<div
  role="menu"
  @keydown="handleKeydown"
>
  <div
    v-for="(item, i) in items"
    role="menuitem"
    :tabindex="selected === i ? 0 : -1"
    @focus="selected = i"
    :class="{ selected: selected === i }"
  >
    `+o("{{ item }}")+`
  </div>
</div>`,1)])]),a("div",ua,[a("pre",null,[a("code",null,"// "+o(e.$t("pages.keyboardNavigation.codeExamples.listNavigation.arrowNavigationComment"))+`
function handleKeydown(e) {
  switch(e.key) {
    case 'ArrowDown':
      selected = (selected + 1) % items.length
      break
    case 'ArrowUp':
      selected = selected === 0
        ? items.length - 1
        : selected - 1
      break
    case 'Enter':
      selectItem(selected)
      break
  }
}`,1)])])])]),_:1},8,["title","explanation"]),u(y,{title:e.$t("pages.keyboardNavigation.focusStyles.title"),explanation:e.$t("pages.keyboardNavigation.focusStyles.explanation")},{bad:r(()=>[a("div",ba,[a("p",null,o(e.$t("pages.keyboardNavigation.focusStyles.intro")),1),a("div",va,[a("button",ma,o(e.$t("pages.keyboardNavigation.focusStyles.button1")),1),a("button",ka,o(e.$t("pages.keyboardNavigation.focusStyles.button2")),1),a("a",ya,o(e.$t("pages.keyboardNavigation.focusStyles.link")),1),a("input",{type:"text",class:"input-no-focus",placeholder:e.$t("pages.keyboardNavigation.focusStyles.input")},null,8,fa),a("button",ha,o(e.$t("pages.keyboardNavigation.focusStyles.submit")),1)]),a("div",Na,[a("pre",null,[a("code",null,"/* ❌ "+o(e.$t("pages.keyboardNavigation.codeExamples.focusIndicators.removeFocusComment"))+` */
*:focus {
  outline: none !important;
}

button:focus,
a:focus,
input:focus {
  outline: none !important;
}`,1)])]),a("div",$a,[a("pre",null,[a("code",null,"<!-- "+o(e.$t("pages.keyboardNavigation.codeExamples.focusIndicators.accessibilityProblems"))+` -->
<button>`+o(e.$t("pages.keyboardNavigation.codeExamples.focusIndicators.button1"))+"</button>        <!-- "+o(e.$t("pages.keyboardNavigation.codeExamples.focusIndicators.button1NoType"))+` -->
<button>`+o(e.$t("pages.keyboardNavigation.codeExamples.focusIndicators.button2"))+"</button>        <!-- "+o(e.$t("pages.keyboardNavigation.codeExamples.focusIndicators.button2NoType"))+` -->
<a href="#">`+o(e.$t("pages.keyboardNavigation.codeExamples.focusIndicators.link"))+"</a>           <!-- "+o(e.$t("pages.keyboardNavigation.codeExamples.focusIndicators.linkNoFocus"))+` -->
<input type="text" />         <!-- `+o(e.$t("pages.keyboardNavigation.codeExamples.focusIndicators.inputNoFocus"))+` -->

<!-- `+o(e.$t("pages.keyboardNavigation.codeExamples.focusIndicators.keyboardNavigationNotVisible"))+" -->",1)])])])]),good:r(()=>[a("div",Ea,[a("p",null,o(e.$t("pages.keyboardNavigation.focusStyles.intro")),1),a("div",Ta,[a("button",La,o(e.$t("pages.keyboardNavigation.focusStyles.button1")),1),a("button",_a,o(e.$t("pages.keyboardNavigation.focusStyles.button2")),1),a("a",Ca,o(e.$t("pages.keyboardNavigation.focusStyles.link")),1),a("input",{type:"text",class:"input-good-focus",placeholder:e.$t("pages.keyboardNavigation.focusStyles.input")},null,8,Ia),a("button",wa,o(e.$t("pages.keyboardNavigation.focusStyles.submit")),1)]),a("div",xa,[a("pre",null,[a("code",null,"/* ✅ "+o(e.$t("pages.keyboardNavigation.codeExamples.focusIndicators.visibleFocusComment"))+` */
button:focus-visible {
  outline: 3px solid #4F46E5;
  outline-offset: 2px;
}

input:focus-visible {
  border-color: #4F46E5;
  outline: 2px solid #4F46E5;
  outline-offset: 1px;
}`,1)])]),a("div",Ma,[a("pre",null,[a("code",null,'<button type="button">'+o(e.$t("pages.keyboardNavigation.codeExamples.focusIndicators.button1"))+`</button>
<button type="button">`+o(e.$t("pages.keyboardNavigation.codeExamples.focusIndicators.button2"))+`</button>
<a href="#">`+o(e.$t("pages.keyboardNavigation.focusStyles.link"))+`</a>
<input type="text" placeholder="`+o(e.$t("pages.keyboardNavigation.focusStyles.input"))+'" />',1)])])])]),_:1},8,["title","explanation"]),u(y,{title:e.$t("pages.keyboardNavigation.skipLink.title"),explanation:e.$t("pages.keyboardNavigation.skipLink.explanation")},{bad:r(()=>[a("div",Fa,[a("div",Sa,[a("div",Ba,[a("div",Aa,o(e.$t("pages.keyboardNavigation.skipLink.bad.logo")),1),a("div",Da,[a("a",Ka,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.home")),1),a("a",Oa,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.products")),1),a("a",Pa,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.services")),1),a("a",Va,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.about")),1),a("a",ja,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.blog")),1),a("a",za,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.contact")),1),a("a",Ga,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.support")),1),a("a",Ha,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.account")),1)])]),a("div",Ua,[a("h2",null,o(e.$t("pages.keyboardNavigation.skipLink.bad.content.heading")),1),a("p",null,o(e.$t("pages.keyboardNavigation.skipLink.bad.content.description")),1)])]),a("div",Ya,[a("pre",null,[a("code",null,"<!-- "+o(e.$t("pages.keyboardNavigation.codeExamples.skipLinks.badComment"))+` -->
<header>
  <nav>
    <a href="#">`+o(e.$t("pages.keyboardNavigation.codeExamples.skipLinks.home"))+`</a>
    <a href="#">`+o(e.$t("pages.keyboardNavigation.codeExamples.skipLinks.products"))+`</a>
    <a href="#">`+o(e.$t("pages.keyboardNavigation.codeExamples.skipLinks.services"))+`</a>
    <!-- `+o(e.$t("pages.keyboardNavigation.codeExamples.skipLinks.tenPlusLinks"))+` -->
  </nav>
</header>
<main>
  <!-- `+o(e.$t("pages.keyboardNavigation.codeExamples.skipLinks.userMustTraverse"))+` -->
  <h1>`+o(e.$t("pages.keyboardNavigation.codeExamples.skipLinks.mainContent"))+`</h1>
</main>`,1)])])])]),good:r(()=>[a("div",qa,[a("div",Ja,[a("a",Ra,o(e.$t("pages.keyboardNavigation.skipLink.skip")),1),a("div",Wa,[a("div",Qa,o(e.$t("pages.keyboardNavigation.skipLink.bad.logo")),1),a("div",Xa,[a("a",Za,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.home")),1),a("a",ae,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.products")),1),a("a",ee,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.services")),1),a("a",oe,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.about")),1),a("a",te,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.blog")),1),a("a",ne,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.contact")),1),a("a",se,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.support")),1),a("a",ie,o(e.$t("pages.keyboardNavigation.skipLink.bad.nav.account")),1)])]),a("div",le,[a("h2",null,o(e.$t("pages.keyboardNavigation.skipLink.good.content.heading")),1),a("p",null,o(e.$t("pages.keyboardNavigation.skipLink.good.content.description")),1)])]),a("div",de,[a("pre",null,[a("code",null,"/* "+o(e.$t("pages.keyboardNavigation.codeExamples.skipLinks.skipLinkComment"))+` */
.skip-link {
  position: absolute;
  top: -100px;
  left: 1rem;
  z-index: 1000;
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: 0.625rem;
}

.skip-link:focus {
  top: 1rem;
}`,1)])]),a("div",re,[a("pre",null,[a("code",null,`<a href="#main-content" class="skip-link">
  `+o(e.$t("pages.keyboardNavigation.codeExamples.skipLinks.skipToContent"))+`
</a>
<header>
  <nav aria-label="`+o(e.$t("navigation.ariaLabel"))+`">
    <ul>
      <li><a href="/">`+o(e.$t("pages.keyboardNavigation.codeExamples.skipLinks.home"))+`</a></li>
      <li><a href="/produits">`+o(e.$t("pages.keyboardNavigation.codeExamples.skipLinks.products"))+`</a></li>
      <li><a href="/services">`+o(e.$t("pages.keyboardNavigation.codeExamples.skipLinks.services"))+`</a></li>
    </ul>
  </nav>
</header>
<main id="main-content">
  <h1>`+o(e.$t("pages.keyboardNavigation.codeExamples.skipLinks.mainContent"))+`</h1>
</main>`,1)])])])]),_:1},8,["title","explanation"]),u(y,{title:e.$t("pages.keyboardNavigation.modalTrap.title"),explanation:e.$t("pages.keyboardNavigation.modalTrap.explanation")},{bad:r(()=>[a("div",ce,[a("button",{type:"button",onClick:M,class:"open-modal-btn"},o(e.$t("pages.keyboardNavigation.modalTrap.openBad")),1),v.value?(b(),g("div",{key:0,class:"modal-overlay-bad",onClick:N},[a("div",{class:"modal-content-bad",onClick:n[0]||(n[0]=I(()=>{},["stop"]))},[a("div",pe,[a("h3",null,o(e.$t("pages.keyboardNavigation.modalTrap.modal.title")),1),a("button",{type:"button",onClick:N,class:"close-btn"},"×")]),a("div",ge,[a("p",null,o(e.$t("pages.keyboardNavigation.modalTrap.modal.content")),1),a("input",{type:"text",placeholder:e.$t("pages.keyboardNavigation.modalTrap.modal.reason")},null,8,ue)]),a("div",be,[a("button",{type:"button",onClick:N},o(e.$t("pages.keyboardNavigation.modalTrap.modal.cancel")),1),a("button",{type:"button",onClick:F},o(e.$t("pages.keyboardNavigation.modalTrap.modal.confirm")),1)])])])):_("",!0),a("div",ve,[a("pre",null,[a("code",null,"<!-- "+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.badComment"))+` -->
<div v-if="modalOpen" class="modal-overlay" @click="close">
  <div class="modal-content" @click.stop>
    <div class="modal-header">
      <h3>`+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.confirmAction"))+`</h3>
      <button @click="close">×</button>
    </div>
    <div class="modal-body">
      <p>`+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.areYouSure"))+`</p>
      <input type="text" placeholder="`+o(e.$t("pages.keyboardNavigation.modalTrap.modal.reason"))+`" />
    </div>
    <div class="modal-footer">
      <button @click="close">`+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.cancel"))+`</button>
      <button @click="confirm">`+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.confirm"))+`</button>
    </div>
  </div>
</div>`,1)])])])]),good:r(()=>[a("div",me,[a("button",{type:"button",onClick:S,class:"open-modal-btn",ref_key:"goodModalTrigger",ref:h},o(e.$t("pages.keyboardNavigation.modalTrap.openGood")),513),f.value?(b(),g("div",{key:0,class:"modal-overlay-good",onClick:p,onKeydown:[C(p,["esc"]),C(A,["tab"])],role:"dialog","aria-modal":"true","aria-labelledby":"good-modal-title"},[a("div",{class:"modal-content-good",onClick:n[1]||(n[1]=I(()=>{},["stop"]))},[a("div",ke,[a("h3",ye,o(e.$t("pages.keyboardNavigation.modalTrap.modal.title")),1),a("button",{type:"button",onClick:p,ref_key:"goodModalCloseButton",ref:m,class:"close-btn-good","aria-label":e.$t("pages.keyboardNavigation.modalTrap.modal.closeLabel")},"×",8,fe)]),a("div",he,[a("p",null,o(e.$t("pages.keyboardNavigation.modalTrap.modal.content")),1),a("input",{type:"text",placeholder:e.$t("pages.keyboardNavigation.modalTrap.modal.reason"),ref_key:"goodModalFirstInput",ref:$},null,8,Ne)]),a("div",$e,[a("button",{type:"button",onClick:p,ref_key:"goodModalCancelButton",ref:E,class:"btn-cancel"},o(e.$t("pages.keyboardNavigation.modalTrap.modal.cancel")),513),a("button",{type:"button",onClick:B,ref_key:"goodModalLastButton",ref:T,class:"btn-confirm"},o(e.$t("pages.keyboardNavigation.modalTrap.modal.confirm")),513)])])],32)):_("",!0),a("div",Ee,[a("pre",null,[a("code",null,"<!-- "+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.goodComment"))+` -->
<div
  v-if="modalOpen"
  class="modal-overlay"
  @click="closeModal"
  @keydown.esc="closeModal"
>
  <div
    class="modal-content"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    @click.stop
  >
    <header class="modal-header">
      <h2 id="modal-title">`+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.confirmAction"))+`</h2>
      <button
        type="button"
        @click="closeModal"
        aria-label="`+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.closeModal"))+`"
        class="close-btn"
      >×</button>
    </header>

    <div class="modal-body">
      <p>`+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.areYouSure"))+`</p>
      <input
        ref="firstInput"
        type="text"
        placeholder="`+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.reasonOptional"))+`"
        @keydown.tab="handleFocusTrap"
      />
    </div>

    <footer class="modal-footer">
      <button
        type="button"
        @click="closeModal"
        @keydown.tab="handleFocusTrap"
      >`+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.cancel"))+`</button>
      <button
        type="button"
        ref="lastButton"
        @click="confirmAction"
        @keydown.tab="handleFocusTrap"
      >`+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.confirm"))+`</button>
    </footer>
  </div>
</div>`,1)])]),a("div",Te,[a("pre",null,[a("code",null,"// "+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.focusTrapComment"))+` :
// - `+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.autoFocus"))+`
// - `+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.trapFocus"))+`
// - `+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.closeOnEscape"))+`
// - `+o(e.$t("pages.keyboardNavigation.codeExamples.modalTrap.returnFocus"))+`

function handleFocusTrap(event) {
  const focusableElements = modalContent.querySelectorAll(
    'button, input, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}`,1)])])])]),_:1},8,["title","explanation"])]))}},xe=P(Le,[["__scopeId","data-v-387d1824"]]);export{xe as default};
