import{u as B,P as M,E as c}from"./BC86FAwA.js";import{u as q}from"./DLj1BPX9.js";import{_ as P,F as w,x as I,k as n,y as E,C as o,D as a,z as G,A as e,B as s}from"#entry";const A={class:"semantic-html"},D={class:"page-structure"},F={class:"page-header"},N={class:"site-title"},O={class:"navigation"},z={class:"nav-item"},W={class:"nav-item"},j={class:"nav-item"},J={class:"page-content"},K={class:"content-title"},Q={class:"page-footer"},R={class:"code-block"},U={class:"page-structure"},X={class:"page-header"},Y={class:"site-title"},Z=["aria-label"],x={class:"navigation"},ee={href:"/",class:"nav-item"},te={href:"/about",class:"nav-item"},se={href:"/contact",class:"nav-item"},ie={class:"page-content"},ne={class:"content-title"},ae={class:"page-footer"},le={class:"code-block"},oe={class:"article-demo"},ce={class:"title-large"},de={class:"title-medium"},me={class:"title-medium"},re={class:"title-small"},pe={class:"title-medium"},ue={class:"code-block"},ge={class:"article-demo"},he={class:"code-block"},ve={class:"actions-demo"},$e={class:"code-block"},be={class:"actions-demo"},He={href:"/profile",class:"action-item"},Se={class:"code-block"},ke={class:"list-demo"},fe={class:"list-title"},Ce={class:"list-content"},Le={class:"list-title"},_e={class:"list-content"},Ve={class:"code-block"},ye={class:"list-demo"},Te={class:"code-block"},Be={__name:"semantic-html",setup(Me){const{t:l,locale:g}=w(),{getPageSEO:h}=q(),v=h("/semantic-html");I(v),B();const $={fr:{pageStructure:{badComment:"Mauvais : divs sans sémantique",goodComment:"Bon : éléments HTML sémantiques",siteTitle:"Mon Site",home:"Accueil",about:"À propos",mainNav:"Navigation principale",welcome:"Bienvenue",mainContent:"Contenu principal...",copyright:"© 2025 Mon Site"},headings:{badComment:"Mauvais : divs avec classes pour le style",goodComment:"Bon : hiérarchie de titres sémantiques",intro:"Introduction",content:"Contenu...",section1:"Section 1",section2:"Section 2",subsection:"Sous-section",basicTechniques:"Techniques de base",semanticHTML:"HTML sémantique",structureElements:"Éléments de structure",cssAccessibility:"CSS et accessibilité"},buttonsVsLinks:{badComment:"Mauvais : divs et spans cliquables",goodComment:"Bon : boutons pour actions, liens pour navigation",save:"Sauvegarder",delete:"Supprimer",profile:"Voir le profil",moreInfo:"Plus d'infos"},lists:{badComment:"Mauvais : divs pour listes",goodComment:"Bon : ul et ol sémantiques",ingredientsTitle:"Ingrédients :",eggs:"3 œufs",milk:"2 cuillères à soupe de lait",seasoning:"Sel et poivre",stepsTitle:"Étapes :",step1:"Battre les œufs",step2:"Faire chauffer le beurre",step3:"Verser et cuire",step1Full:"Battre les œufs avec le lait",step4:"Plier en deux et servir"}},en:{pageStructure:{badComment:"Bad: divs without semantics",goodComment:"Good: semantic HTML elements",siteTitle:"My Site",home:"Home",about:"About",mainNav:"Main navigation",welcome:"Welcome",mainContent:"Main content...",copyright:"© 2025 My Site"},headings:{badComment:"Bad: divs with classes for styling",goodComment:"Good: semantic headings hierarchy",intro:"Introduction",content:"Content...",section1:"Section 1",section2:"Section 2",subsection:"Subsection",basicTechniques:"Basic techniques",semanticHTML:"Semantic HTML",structureElements:"Structure elements",cssAccessibility:"CSS and accessibility"},buttonsVsLinks:{badComment:"Bad: clickable divs and spans",goodComment:"Good: buttons for actions, links for navigation",save:"Save",delete:"Delete",profile:"View profile",moreInfo:"More info"},lists:{badComment:"Bad: divs for lists",goodComment:"Good: semantic ul and ol",ingredientsTitle:"Ingredients:",eggs:"3 eggs",milk:"2 tablespoons of milk",seasoning:"Salt and pepper",stepsTitle:"Steps:",step1:"Beat the eggs",step2:"Heat the butter",step3:"Pour and cook",step1Full:"Beat the eggs with the milk",step4:"Fold in half and serve"}}},i=t=>{const u=g.value,y=t.split(".");let d=$[u];for(const T of y)d=d?.[T];return d||t},b=n(()=>`<!-- ${i("pageStructure.badComment")} -->
<div class="page-header">
  <div class="site-title">${i("pageStructure.siteTitle")}</div>
  <div class="navigation">
    <div>${i("pageStructure.home")}</div>
    <div>${i("pageStructure.about")}</div>
  </div>
</div>
<div class="page-content">
  <div class="content-title">${i("pageStructure.welcome")}</div>
  <div>${i("pageStructure.mainContent")}</div>
</div>
<div class="page-footer">
  ${i("pageStructure.copyright")}
</div>`),H=n(()=>`<!-- ${i("pageStructure.goodComment")} -->
<header>
  <div class="site-title">${i("pageStructure.siteTitle")}</div>
  <nav aria-label="${i("pageStructure.mainNav")}">
    <ul>
      <li><a href="/">${i("pageStructure.home")}</a></li>
      <li><a href="/about">${i("pageStructure.about")}</a></li>
    </ul>
  </nav>
</header>
<main>
  <h1>${i("pageStructure.welcome")}</h1>
  <p>${i("pageStructure.mainContent")}</p>
</main>
<footer>
  <p>${i("pageStructure.copyright")}</p>
</footer>`),S=n(()=>`<!-- ${i("headings.badComment")} -->
<div class="title-large">${i("headings.intro")}</div>
<p>${i("headings.content")}</p>
<div class="title-medium">${i("headings.section1")}</div>
<p>${i("headings.content")}</p>
<div class="title-medium">${i("headings.section2")}</div>
<p>${i("headings.content")}</p>
<div class="title-small">${i("headings.subsection")}</div>
<p>${i("headings.content")}</p>`),k=n(()=>`<!-- ${i("headings.goodComment")} -->
<h1>${i("headings.intro")}</h1>
<p>${i("headings.content")}</p>
<h2>${i("headings.basicTechniques")}</h2>
<p>${i("headings.content")}</p>
<h3>${i("headings.semanticHTML")}</h3>
<p>${i("headings.content")}</p>
<h4>${i("headings.structureElements")}</h4>
<p>${i("headings.content")}</p>
<h3>${i("headings.cssAccessibility")}</h3>
<p>${i("headings.content")}</p>`),f=n(()=>`<!-- ${i("buttonsVsLinks.badComment")} -->
<div @click="handleSave" style="cursor: pointer;">
  💾 ${i("buttonsVsLinks.save")}
</div>
<div @click="handleDelete" style="cursor: pointer;">
  🗑️ ${i("buttonsVsLinks.delete")}
</div>
<span @click="navigateToProfile" style="cursor: pointer;">
  👤 ${i("buttonsVsLinks.profile")}
</span>`),C=n(()=>`<!-- ${i("buttonsVsLinks.goodComment")} -->
<button type="button" @click="handleSave">
  💾 ${i("buttonsVsLinks.save")}
</button>
<button type="button" @click="handleDelete">
  🗑️ ${i("buttonsVsLinks.delete")}
</button>
<a href="/profile">
  👤 ${i("buttonsVsLinks.profile")}
</a>
<button type="button" @click="toggleModal">
  ℹ️ ${i("buttonsVsLinks.moreInfo")}
</button>`),L=n(()=>`<!-- ${i("lists.badComment")} -->
<div class="list-title">${i("lists.ingredientsTitle")}</div>
<div>${i("lists.eggs")}</div>
<div>${i("lists.milk")}</div>
<div>${i("lists.seasoning")}</div>

<div class="list-title">${i("lists.stepsTitle")}</div>
<div>1. ${i("lists.step1")}</div>
<div>2. ${i("lists.step2")}</div>
<div>3. ${i("lists.step3")}</div>`),_=n(()=>`<!-- ${i("lists.goodComment")} -->
<h3>${i("lists.ingredientsTitle")}</h3>
<ul>
  <li>${i("lists.eggs")}</li>
  <li>${i("lists.milk")}</li>
  <li>${i("lists.seasoning")}</li>
</ul>

<h3>${i("lists.stepsTitle")}</h3>
<ol>
  <li>${i("lists.step1Full")}</li>
  <li>${i("lists.step2")}</li>
  <li>${i("lists.step3")}</li>
  <li>${i("lists.step4")}</li>
</ol>`);function m(){alert(l("pages.semanticHtml.buttonsVsLinks.alerts.saved"))}function r(){confirm(l("pages.semanticHtml.buttonsVsLinks.alerts.deleteConfirm"))&&alert(l("pages.semanticHtml.buttonsVsLinks.alerts.deleted"))}function V(){alert(l("pages.semanticHtml.buttonsVsLinks.alerts.profile"))}function p(){alert(l("pages.semanticHtml.buttonsVsLinks.alerts.modal"))}return(t,u)=>(G(),E("div",A,[o(M,{title:t.$t("pages.semanticHtml.title"),description:t.$t("pages.semanticHtml.description")},null,8,["title","description"]),o(c,{title:t.$t("pages.semanticHtml.pageStructure.title"),explanation:t.$t("pages.semanticHtml.pageStructure.explanation")},{bad:a(()=>[e("div",D,[e("div",F,[e("div",N,s(t.$t("pages.semanticHtml.pageStructure.bad.siteTitle")),1),e("div",O,[e("div",z,s(t.$t("pages.semanticHtml.pageStructure.bad.nav.home")),1),e("div",W,s(t.$t("pages.semanticHtml.pageStructure.bad.nav.about")),1),e("div",j,s(t.$t("pages.semanticHtml.pageStructure.bad.nav.contact")),1)])]),e("div",J,[e("div",K,s(t.$t("pages.semanticHtml.pageStructure.bad.content.title")),1),e("div",null,s(t.$t("pages.semanticHtml.pageStructure.bad.content.body")),1)]),e("div",Q,[e("div",null,s(t.$t("pages.semanticHtml.pageStructure.bad.footer")),1)])]),e("div",R,[e("pre",null,[e("code",null,s(b.value),1)])])]),good:a(()=>[e("div",U,[e("header",X,[e("div",Y,s(t.$t("pages.semanticHtml.pageStructure.good.siteTitle")),1),e("nav",{"aria-label":t.$t("pages.semanticHtml.pageStructure.good.navLabel")},[e("ul",x,[e("li",null,[e("a",ee,s(t.$t("pages.semanticHtml.pageStructure.bad.nav.home")),1)]),e("li",null,[e("a",te,s(t.$t("pages.semanticHtml.pageStructure.bad.nav.about")),1)]),e("li",null,[e("a",se,s(t.$t("pages.semanticHtml.pageStructure.bad.nav.contact")),1)])])],8,Z)]),e("main",ie,[e("h1",ne,s(t.$t("pages.semanticHtml.pageStructure.good.content.title")),1),e("p",null,s(t.$t("pages.semanticHtml.pageStructure.good.content.body")),1)]),e("footer",ae,[e("p",null,s(t.$t("pages.semanticHtml.pageStructure.good.footer")),1)])]),e("div",le,[e("pre",null,[e("code",null,s(H.value),1)])])]),_:1},8,["title","explanation"]),o(c,{title:t.$t("pages.semanticHtml.headings.title"),explanation:t.$t("pages.semanticHtml.headings.explanation")},{bad:a(()=>[e("article",oe,[e("div",ce,s(t.$t("pages.semanticHtml.headings.article.h1")),1),e("p",null,s(t.$t("pages.semanticHtml.headings.article.intro")),1),e("div",de,s(t.$t("pages.semanticHtml.headings.article.h2")),1),e("p",null,s(t.$t("pages.semanticHtml.headings.article.techniques")),1),e("div",me,s(t.$t("pages.semanticHtml.headings.article.h3semantic")),1),e("p",null,s(t.$t("pages.semanticHtml.headings.article.semantic")),1),e("div",re,s(t.$t("pages.semanticHtml.headings.article.h4")),1),e("p",null,s(t.$t("pages.semanticHtml.headings.article.elements")),1),e("div",pe,s(t.$t("pages.semanticHtml.headings.article.h3css")),1),e("p",null,s(t.$t("pages.semanticHtml.headings.article.css")),1)]),e("div",ue,[e("pre",null,[e("code",null,s(S.value),1)])])]),good:a(()=>[e("article",ge,[e("h1",null,s(t.$t("pages.semanticHtml.headings.article.h1")),1),e("p",null,s(t.$t("pages.semanticHtml.headings.article.intro")),1),e("h2",null,s(t.$t("pages.semanticHtml.headings.article.h2")),1),e("p",null,s(t.$t("pages.semanticHtml.headings.article.techniques")),1),e("h3",null,s(t.$t("pages.semanticHtml.headings.article.h3semantic")),1),e("p",null,s(t.$t("pages.semanticHtml.headings.article.semantic")),1),e("h4",null,s(t.$t("pages.semanticHtml.headings.article.h4")),1),e("p",null,s(t.$t("pages.semanticHtml.headings.article.elements")),1),e("h3",null,s(t.$t("pages.semanticHtml.headings.article.h3css")),1),e("p",null,s(t.$t("pages.semanticHtml.headings.article.css")),1)]),e("div",he,[e("pre",null,[e("code",null,s(k.value),1)])])]),_:1},8,["title","explanation"]),o(c,{title:t.$t("pages.semanticHtml.buttonsVsLinks.title"),explanation:t.$t("pages.semanticHtml.buttonsVsLinks.explanation")},{bad:a(()=>[e("div",ve,[e("div",{class:"action-item",onClick:m,style:{cursor:"pointer"}}," 💾 "+s(t.$t("pages.semanticHtml.buttonsVsLinks.actions.save")),1),e("div",{class:"action-item",onClick:r,style:{cursor:"pointer"}}," 🗑️ "+s(t.$t("pages.semanticHtml.buttonsVsLinks.actions.delete")),1),e("div",{class:"action-item",onClick:V,style:{cursor:"pointer"}}," 👤 "+s(t.$t("pages.semanticHtml.buttonsVsLinks.actions.profile")),1),e("span",{class:"action-item",onClick:p,style:{cursor:"pointer"}}," ℹ️ "+s(t.$t("pages.semanticHtml.buttonsVsLinks.actions.info")),1)]),e("div",$e,[e("pre",null,[e("code",null,s(f.value),1)])])]),good:a(()=>[e("div",be,[e("button",{type:"button",class:"action-item",onClick:m}," 💾 "+s(t.$t("pages.semanticHtml.buttonsVsLinks.actions.save")),1),e("button",{type:"button",class:"action-item",onClick:r}," 🗑️ "+s(t.$t("pages.semanticHtml.buttonsVsLinks.actions.delete")),1),e("a",He," 👤 "+s(t.$t("pages.semanticHtml.buttonsVsLinks.actions.profile")),1),e("button",{type:"button",class:"action-item",onClick:p}," ℹ️ "+s(t.$t("pages.semanticHtml.buttonsVsLinks.actions.info")),1)]),e("div",Se,[e("pre",null,[e("code",null,s(C.value),1)])])]),_:1},8,["title","explanation"]),o(c,{title:t.$t("pages.semanticHtml.lists.title"),explanation:t.$t("pages.semanticHtml.lists.explanation")},{bad:a(()=>[e("div",ke,[e("div",fe,s(t.$t("pages.semanticHtml.lists.recipe.ingredients.title")),1),e("div",Ce,[e("div",null,s(t.$t("pages.semanticHtml.lists.recipe.ingredients.eggs")),1),e("div",null,s(t.$t("pages.semanticHtml.lists.recipe.ingredients.milk")),1),e("div",null,s(t.$t("pages.semanticHtml.lists.recipe.ingredients.seasoning")),1),e("div",null,s(t.$t("pages.semanticHtml.lists.recipe.ingredients.butter")),1)]),e("div",Le,s(t.$t("pages.semanticHtml.lists.recipe.steps.title")),1),e("div",_e,[e("div",null,"1. "+s(t.$t("pages.semanticHtml.lists.recipe.steps.step1")),1),e("div",null,"2. "+s(t.$t("pages.semanticHtml.lists.recipe.steps.step2")),1),e("div",null,"3. "+s(t.$t("pages.semanticHtml.lists.recipe.steps.step3")),1),e("div",null,"4. "+s(t.$t("pages.semanticHtml.lists.recipe.steps.step4")),1)])]),e("div",Ve,[e("pre",null,[e("code",null,s(L.value),1)])])]),good:a(()=>[e("div",ye,[e("h3",null,s(t.$t("pages.semanticHtml.lists.recipe.ingredients.title")),1),e("ul",null,[e("li",null,s(t.$t("pages.semanticHtml.lists.recipe.ingredients.eggs")),1),e("li",null,s(t.$t("pages.semanticHtml.lists.recipe.ingredients.milk")),1),e("li",null,s(t.$t("pages.semanticHtml.lists.recipe.ingredients.seasoning")),1),e("li",null,s(t.$t("pages.semanticHtml.lists.recipe.ingredients.butter")),1)]),e("h3",null,s(t.$t("pages.semanticHtml.lists.recipe.steps.title")),1),e("ol",null,[e("li",null,s(t.$t("pages.semanticHtml.lists.recipe.steps.step1")),1),e("li",null,s(t.$t("pages.semanticHtml.lists.recipe.steps.step2")),1),e("li",null,s(t.$t("pages.semanticHtml.lists.recipe.steps.step3")),1),e("li",null,s(t.$t("pages.semanticHtml.lists.recipe.steps.step4")),1)])]),e("div",Te,[e("pre",null,[e("code",null,s(_.value),1)])])]),_:1},8,["title","explanation"])]))}},Ie=P(Be,[["__scopeId","data-v-72c28a15"]]);export{Ie as default};
