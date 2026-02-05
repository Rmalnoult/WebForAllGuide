import{_ as Q,F as X,x as j,r as c,k as B,y as r,C as S,D as h,z as m,A as s,B as o,V as C,O as g,I as K,J as Y,X as x,L as b,N as i,T as u,Q as ee}from"#entry";import{u as se,P as oe,E as G}from"./BC86FAwA.js";import{u as ae}from"./DLj1BPX9.js";const le={class:"accessible-forms"},ie={class:"form-demo"},te={class:"form-bad"},ne={class:"form-group"},de=["placeholder"],re={class:"form-group"},me=["placeholder"],ce={class:"form-group checkbox-group"},pe={type:"submit"},be={class:"code-block"},ue={class:"form-demo"},ge={class:"form-good"},ve={class:"form-group"},fe={for:"email-good"},he=["placeholder"],Fe={id:"email-help",class:"field-help"},$e={class:"form-group"},ye={for:"password-good"},we={id:"password-help",class:"field-help"},Ae={class:"form-group checkbox-group"},Ve={for:"remember-good"},Ee={type:"submit"},ke={class:"code-block"},qe={class:"form-demo"},_e={class:"form-group"},Se={class:"form-group"},Be={class:"form-group"},Ge={key:0,class:"error-summary-bad"},Ie={type:"submit"},Le={class:"code-block"},Ce={class:"form-demo"},Te={key:0,class:"error-summary-good",role:"alert","aria-labelledby":"error-summary-title"},Ue={id:"error-summary-title"},Me=["href"],ze={class:"form-group"},Pe={for:"name-good-form"},Re={key:0,id:"name-error",class:"error-message",role:"alert"},He={class:"form-group"},Ne={for:"email-good-form"},Ze={key:0,id:"email-good-error",class:"error-message",role:"alert"},De={class:"form-group"},Oe={for:"age-good-form"},We={id:"age-help",class:"field-help"},Je={key:0,id:"age-error",class:"error-message",role:"alert"},Qe={type:"submit"},Xe={class:"code-block"},je={class:"form-demo"},Ke={class:"form-fieldset-bad"},Ye={class:"messy-form"},xe={class:"form-row"},es={for:"email-contact-bad"},ss={for:"newsletter-bad"},os={class:"form-row"},as={for:"phone-contact-bad"},ls=["placeholder"],is={class:"form-row"},ts={for:"offers-bad"},ns={for:"sms-contact-bad"},ds={class:"form-row"},rs=["placeholder"],ms={for:"updates-bad"},cs={class:"form-row"},ps={class:"select-input"},bs={type:"submit"},us={class:"code-block","data-no-highlight":"true"},gs={class:"form-demo"},vs={class:"form-fieldset-good"},fs={class:"form-section",role:"group","aria-labelledby":"personal-info-title"},hs={id:"personal-info-title"},Fs={class:"form-field"},$s={for:"name-good"},ys={id:"name-desc",class:"field-description"},ws={class:"form-field"},As={for:"email-field-good"},Vs={id:"email-desc",class:"field-description"},Es={class:"form-section",role:"radiogroup","aria-labelledby":"contact-method-title","aria-required":"true"},ks={id:"contact-method-title"},qs={class:"radio-group"},_s={for:"email-contact-good"},Ss={class:"radio-group"},Bs={for:"phone-contact-good"},Gs={class:"radio-group"},Is={for:"sms-contact-good"},Ls={class:"form-section",role:"group","aria-labelledby":"comm-types-title"},Cs={id:"comm-types-title"},Ts={id:"comm-types-desc",class:"section-description"},Us={class:"checkbox-group"},Ms={for:"newsletter-good"},zs={class:"checkbox-group"},Ps={for:"offers-good"},Rs={class:"checkbox-group"},Hs={for:"updates-good"},Ns={class:"form-section",role:"group","aria-labelledby":"frequency-title"},Zs={id:"frequency-title"},Ds={class:"form-field"},Os={for:"frequency-good"},Ws={id:"frequency-good",name:"frequency","aria-describedby":"frequency-desc"},Js={value:""},Qs={value:"daily"},Xs={value:"weekly"},js={value:"monthly"},Ks={id:"frequency-desc",class:"field-description"},Ys={type:"submit"},xs={class:"code-block"},eo={class:"form-demo"},so={class:"complex-form-bad"},oo={class:"form-row"},ao={class:"form-group"},lo={key:0,class:"error-inline"},io={class:"form-group"},to={key:0,class:"error-inline"},no={class:"form-group"},ro={key:0,class:"error-inline"},mo={type:"submit"},co={class:"code-block"},po={class:"form-demo"},bo={class:"complex-form-good"},uo={class:"form-row"},go={class:"form-group"},vo={for:"username-complex"},fo={id:"username-requirements",class:"field-requirements"},ho={key:0,id:"username-feedback",class:"error-message",role:"alert","aria-live":"polite"},Fo={key:1,id:"username-feedback",class:"success-message",role:"status","aria-live":"polite"},$o={class:"form-group"},yo={for:"email-complex"},wo={key:0,id:"email-complex-feedback",class:"error-message",role:"alert","aria-live":"polite"},Ao={key:1,id:"email-complex-feedback",class:"success-message",role:"status","aria-live":"polite"},Vo={class:"form-group"},Eo={for:"password-complex"},ko={id:"password-strength",class:"password-strength"},qo={class:"strength-indicator"},_o={class:"strength-requirements"},So={key:0,id:"password-feedback",class:"error-message",role:"alert","aria-live":"polite"},Bo=["disabled"],Go={class:"code-block"},Io={__name:"accessible-forms",setup(Lo){const{t:d}=X(),{getPageSEO:T}=ae(),U=T("/accessible-forms");j(U),se();const M=c({message:""}),p=c({name:"",email:"",age:0}),t=c({name:"",email:"",age:0}),V=c(!1),f=c(!1),v=c({username:"",email:"",password:""}),n=c({username:"",email:"",password:""}),F=c(""),w=c(""),A=c(""),$=c(""),E=c(!1),k=c(""),q=c(!1),_=c("");function y(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}const z=B(()=>{const e=[];return p.value.name||e.push(d("pages.accessibleForms.validation.good.errors.nameRequired")),y(p.value.email)||e.push(d("pages.accessibleForms.validation.good.errors.emailInvalid")),p.value.age<16&&e.push(d("pages.accessibleForms.validation.good.errors.ageMinimum")),e}),I=B(()=>{const e=[];return t.value&&!t.value.name&&e.push({field:"name",message:d("pages.accessibleForms.validation.good.errors.nameRequired")}),t.value&&!y(t.value.email)&&e.push({field:"email",message:d("pages.accessibleForms.validation.good.errors.emailInvalid")}),t.value&&t.value.age<16&&e.push({field:"age",message:d("pages.accessibleForms.validation.good.errors.ageMinimum")}),e});function P(){V.value=!0}function R(){f.value=!0,I.value.length===0&&alert(d("pages.accessibleForms.validation.good.successMessage"))}function H(){v.value.username.length<3?F.value=d("pages.accessibleForms.complexValidation.bad.errors.usernameTooShort"):/^[a-zA-Z0-9_]+$/.test(v.value.username)?F.value="":F.value=d("pages.accessibleForms.complexValidation.bad.errors.usernameInvalidChars")}function N(){y(v.value.email)?w.value="":w.value=d("pages.accessibleForms.complexValidation.bad.errors.emailInvalid")}function Z(){v.value.password.length<8?A.value=d("pages.accessibleForms.complexValidation.bad.errors.passwordTooShort"):A.value=""}function D(){$.value="",E.value=!1,n.value.username.length<3?$.value=d("pages.accessibleForms.complexValidation.good.usernameErrors.minLength"):/^[a-zA-Z0-9_]+$/.test(n.value.username)?E.value=!0:$.value=d("pages.accessibleForms.complexValidation.good.usernameErrors.invalidChars")}function O(){k.value="",q.value=!1,y(n.value.email)?q.value=!0:k.value=d("pages.accessibleForms.complexValidation.good.emailError")}function W(){_.value="",n.value.password.length<8&&(_.value=d("pages.accessibleForms.complexValidation.good.passwordError"))}const L=B(()=>{const e=n.value.password;let a=0;return e.length>=8&&a++,/[A-Z]/.test(e)&&a++,/[0-9]/.test(e)&&a++,/[^A-Za-z0-9]/.test(e)&&a++,a}),J=B(()=>E.value&&q.value&&L.value>=3);return(e,a)=>(m(),r("div",le,[S(oe,{title:e.$t("pages.accessibleForms.title"),description:e.$t("pages.accessibleForms.description")},null,8,["title","description"]),S(G,{title:e.$t("pages.accessibleForms.labelsAndAssociations.title"),explanation:e.$t("pages.accessibleForms.labelsAndAssociations.explanation")},{bad:h(()=>[s("div",ie,[s("form",te,[s("h4",null,o(e.$t("pages.accessibleForms.labelsAndAssociations.bad.heading")),1),s("div",ne,[s("input",{type:"email",placeholder:e.$t("pages.accessibleForms.labelsAndAssociations.bad.email")},null,8,de)]),s("div",re,[s("input",{type:"password",placeholder:e.$t("pages.accessibleForms.labelsAndAssociations.bad.password"),autocomplete:"current-password"},null,8,me)]),s("div",ce,[a[12]||(a[12]=s("input",{type:"checkbox"},null,-1)),s("span",null,o(e.$t("pages.accessibleForms.labelsAndAssociations.bad.remember")),1)]),s("button",pe,o(e.$t("pages.accessibleForms.labelsAndAssociations.bad.submit")),1)])]),s("div",be,[s("pre",null,[s("code",null,"<!-- "+o(e.$t("pages.accessibleForms.codeExamples.labelsAndAssociations.badComment"))+` -->
<form>
  <h4>`+o(e.$t("pages.accessibleForms.labelsAndAssociations.bad.heading"))+`</h4>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.labelsAndAssociations.noLabel"))+` -->
  <input
    type="email"
    placeholder="`+o(e.$t("pages.accessibleForms.labelsAndAssociations.bad.email"))+`">

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.labelsAndAssociations.noLabelNoAutocomplete"))+` -->
  <input
    type="password"
    placeholder="`+o(e.$t("pages.accessibleForms.labelsAndAssociations.bad.password"))+`">

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.labelsAndAssociations.checkboxNotAssociated"))+` -->
  <input type="checkbox">
  <span>`+o(e.$t("pages.accessibleForms.labelsAndAssociations.bad.remember"))+`</span>

  <button type="submit">`+o(e.$t("pages.accessibleForms.labelsAndAssociations.bad.submit"))+`</button>
</form>`,1)])])]),good:h(()=>[s("div",ue,[s("form",ge,[s("h4",null,o(e.$t("pages.accessibleForms.labelsAndAssociations.good.heading")),1),s("div",ve,[s("label",fe,o(e.$t("pages.accessibleForms.labelsAndAssociations.good.emailLabel")),1),s("input",{type:"email",id:"email-good",placeholder:e.$t("pages.accessibleForms.labelsAndAssociations.good.emailPlaceholder"),required:"","aria-describedby":"email-help",autocomplete:"email"},null,8,he),s("div",Fe,o(e.$t("pages.accessibleForms.labelsAndAssociations.good.emailHelp")),1)]),s("div",$e,[s("label",ye,o(e.$t("pages.accessibleForms.labelsAndAssociations.good.passwordLabel")),1),a[13]||(a[13]=s("input",{type:"password",id:"password-good",required:"","aria-describedby":"password-help",autocomplete:"current-password"},null,-1)),s("div",we,o(e.$t("pages.accessibleForms.labelsAndAssociations.good.passwordHelp")),1)]),s("div",Ae,[a[14]||(a[14]=s("input",{type:"checkbox",id:"remember-good"},null,-1)),s("label",Ve,o(e.$t("pages.accessibleForms.labelsAndAssociations.good.remember")),1)]),s("button",Ee,o(e.$t("pages.accessibleForms.labelsAndAssociations.good.submit")),1)])]),s("div",ke,[s("pre",null,[s("code",null,"<!-- "+o(e.$t("pages.accessibleForms.codeExamples.labelsAndAssociations.goodComment"))+` -->
<form>
  <h4>`+o(e.$t("pages.accessibleForms.labelsAndAssociations.good.heading"))+`</h4>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.labelsAndAssociations.labelWithFor"))+` -->
  <label for="email-good">`+o(e.$t("pages.accessibleForms.labelsAndAssociations.good.emailLabel"))+`</label>
  <input
    type="email"
    id="email-good"
    placeholder="`+o(e.$t("pages.accessibleForms.labelsAndAssociations.good.emailPlaceholder"))+`"
    required
    aria-describedby="email-help"
    autocomplete="email">
  <div id="email-help">
    `+o(e.$t("pages.accessibleForms.labelsAndAssociations.good.emailHelp"))+`
  </div>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.labelsAndAssociations.labelWithInstructions"))+` -->
  <label for="password-good">`+o(e.$t("pages.accessibleForms.labelsAndAssociations.good.passwordLabel"))+`</label>
  <input
    type="password"
    id="password-good"
    required
    aria-describedby="password-help"
    autocomplete="current-password">
  <div id="password-help">
    `+o(e.$t("pages.accessibleForms.labelsAndAssociations.good.passwordHelp"))+`
  </div>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.labelsAndAssociations.checkboxCorrectlyAssociated"))+` -->
  <input type="checkbox" id="remember-good">
  <label for="remember-good">`+o(e.$t("pages.accessibleForms.labelsAndAssociations.good.remember"))+`</label>

  <button type="submit">`+o(e.$t("pages.accessibleForms.labelsAndAssociations.good.submit"))+`</button>
</form>`,1)])])]),_:1},8,["title","explanation"]),S(G,{title:e.$t("pages.accessibleForms.validation.title"),explanation:e.$t("pages.accessibleForms.validation.explanation")},{bad:h(()=>[s("div",qe,[s("form",{class:"form-validation-bad",onSubmit:C(P,["prevent"])},[s("h4",null,o(e.$t("pages.accessibleForms.validation.bad.heading")),1),s("div",_e,[s("label",null,o(e.$t("pages.accessibleForms.validation.bad.name")),1),b(s("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=l=>p.value.name=l),class:i({error:V.value&&!p.value.name})},null,2),[[u,p.value.name]])]),s("div",Se,[s("label",null,o(e.$t("pages.accessibleForms.validation.bad.email")),1),b(s("input",{type:"email","onUpdate:modelValue":a[1]||(a[1]=l=>p.value.email=l),class:i({error:V.value&&!y(p.value.email)})},null,2),[[u,p.value.email]])]),s("div",Be,[s("label",null,o(e.$t("pages.accessibleForms.validation.bad.age")),1),b(s("input",{type:"number","onUpdate:modelValue":a[2]||(a[2]=l=>p.value.age=l),class:i({error:V.value&&p.value.age<16})},null,2),[[u,p.value.age]])]),V.value&&z.value.length?(m(),r("div",Ge," ❌ "+o(e.$t("pages.accessibleForms.validation.bad.errorSummary")),1)):g("",!0),s("button",Ie,o(e.$t("pages.accessibleForms.validation.bad.submit")),1)],32)]),s("div",Le,[s("pre",null,[s("code",null,"<!-- "+o(e.$t("pages.accessibleForms.codeExamples.validation.badComment"))+` -->
<form @submit.prevent="submitBadForm">
  <h4>`+o(e.$t("pages.accessibleForms.validation.bad.heading"))+`</h4>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.validation.noAssociation"))+` -->
  <label>`+o(e.$t("pages.accessibleForms.validation.bad.name"))+`</label>
  <input
    type="text"
    v-model="badForm.name"
    :class="{ 'error': submitted && !badForm.name }">

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.validation.visualErrorOnly"))+` -->
  <label>`+o(e.$t("pages.accessibleForms.validation.bad.email"))+`</label>
  <input
    type="email"
    v-model="badForm.email"
    :class="{ 'error': submitted && !isValidEmail(badForm.email) }">

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.validation.noErrorInfo"))+` -->
  <label>`+o(e.$t("pages.accessibleForms.validation.bad.age"))+`</label>
  <input
    type="number"
    v-model="badForm.age"
    :class="{ 'error': submitted && badForm.age < 16 }">

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.validation.genericMessage"))+` -->
  <div v-if="submitted && badFormErrors.length">
    ❌ `+o(e.$t("pages.accessibleForms.validation.bad.errorSummary"))+`
  </div>

  <button type="submit">`+o(e.$t("pages.accessibleForms.validation.bad.submit"))+`</button>
</form>`,1)])])]),good:h(()=>[s("div",Ce,[s("form",{class:"form-validation-good",onSubmit:C(R,["prevent"]),novalidate:""},[s("h4",null,o(e.$t("pages.accessibleForms.validation.good.heading")),1),f.value&&I.value.length?(m(),r("div",Te,[s("h5",Ue,o(e.$t("pages.accessibleForms.validation.good.errorSummaryTitle")),1),s("ul",null,[(m(!0),r(K,null,Y(I.value,l=>(m(),r("li",{key:l.field},[s("a",{href:`#${l.field}-good-form`},o(l?.message||x(d)("pages.accessibleForms.validation.good.errors.nameRequired")),9,Me)]))),128))])])):g("",!0),s("div",ze,[s("label",Pe,o(e.$t("pages.accessibleForms.validation.good.nameLabel"))+" *",1),b(s("input",{type:"text",id:"name-good-form","onUpdate:modelValue":a[3]||(a[3]=l=>t.value.name=l),class:i({error:f.value&&!t.value.name}),required:"","aria-invalid":"goodFormSubmitted && !goodForm.name","aria-describedby":"name-error"},null,2),[[u,t.value.name]]),f.value&&!t.value.name?(m(),r("div",Re," ❌ "+o(e.$t("pages.accessibleForms.validation.good.nameError")),1)):g("",!0)]),s("div",He,[s("label",Ne,o(e.$t("pages.accessibleForms.validation.good.emailLabel"))+" *",1),b(s("input",{type:"email",id:"email-good-form","onUpdate:modelValue":a[4]||(a[4]=l=>t.value.email=l),class:i({error:f.value&&!y(t.value.email)}),required:"","aria-invalid":"goodFormSubmitted && !isValidEmail(goodForm.email)","aria-describedby":"email-good-error"},null,2),[[u,t.value.email]]),f.value&&!y(t.value.email)?(m(),r("div",Ze," ❌ "+o(e.$t("pages.accessibleForms.validation.good.emailError")),1)):g("",!0)]),s("div",De,[s("label",Oe,o(e.$t("pages.accessibleForms.validation.good.ageLabel"))+" *",1),b(s("input",{type:"number",id:"age-good-form","onUpdate:modelValue":a[5]||(a[5]=l=>t.value.age=l),min:"16",max:"120",class:i({error:f.value&&t.value.age<16}),required:"","aria-invalid":"goodFormSubmitted && goodForm.age < 16","aria-describedby":"age-help age-error"},null,2),[[u,t.value.age]]),s("div",We,o(e.$t("pages.accessibleForms.validation.good.ageHelp")),1),f.value&&t.value.age<16?(m(),r("div",Je," ❌ "+o(e.$t("pages.accessibleForms.validation.good.ageError")),1)):g("",!0)]),s("button",Qe,o(e.$t("pages.accessibleForms.validation.good.submit")),1)],32)]),s("div",Xe,[s("pre",null,[s("code",null,"<!-- "+o(e.$t("pages.accessibleForms.codeExamples.validation.goodComment"))+` -->
<form @submit.prevent="submitGoodForm" novalidate>
  <h4>`+o(e.$t("pages.accessibleForms.validation.good.heading"))+`</h4>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.validation.errorSummary"))+` -->
  <div
    v-if="submitted && goodFormErrors.length"
    role="alert"
    aria-labelledby="error-summary-title">
    <h5 id="error-summary-title">`+o(e.$t("pages.accessibleForms.validation.good.errorSummaryTitle"))+`</h5>
    <ul>
      <li v-for="error in goodFormErrors" :key="error.field">
        <a :href="\`#\${error.field}-good-form\`">
          `+o(M.value.message)+`
        </a>
      </li>
    </ul>
  </div>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.validation.specificErrorAssociated"))+` -->
  <label for="name-good-form">`+o(e.$t("pages.accessibleForms.validation.good.nameLabel"))+` *</label>
  <input
    type="text"
    id="name-good-form"
    v-model="goodForm.name"
    required
    aria-invalid="submitted && !goodForm.name"
    aria-describedby="name-error">
  <div
    v-if="submitted && !goodForm.name"
    id="name-error"
    role="alert">
    ❌ `+o(e.$t("pages.accessibleForms.validation.good.nameError"))+`
  </div>

  <button type="submit">`+o(e.$t("pages.accessibleForms.validation.good.submit"))+`</button>
</form>`,1)])])]),_:1},8,["title","explanation"]),S(G,{title:e.$t("pages.accessibleForms.fieldsets.title"),explanation:e.$t("pages.accessibleForms.fieldsets.explanation")},{bad:h(()=>[s("div",je,[s("form",Ke,[s("h4",null,o(e.$t("pages.accessibleForms.fieldsets.bad.heading")),1),s("div",Ye,[s("div",xe,[a[15]||(a[15]=s("input",{type:"radio",name:"contact-bad",id:"email-contact-bad",value:"email"},null,-1)),s("label",es,o(e.$t("pages.accessibleForms.fieldsets.bad.email")),1),a[16]||(a[16]=s("input",{type:"checkbox",id:"newsletter-bad",value:"newsletter"},null,-1)),s("label",ss,o(e.$t("pages.accessibleForms.fieldsets.bad.newsletter")),1)]),s("div",os,[a[17]||(a[17]=s("input",{type:"radio",name:"contact-bad",id:"phone-contact-bad",value:"phone"},null,-1)),s("label",as,o(e.$t("pages.accessibleForms.fieldsets.bad.phone")),1),s("input",{type:"text",placeholder:e.$t("pages.accessibleForms.fieldsets.bad.name"),class:"text-input"},null,8,ls)]),s("div",is,[a[18]||(a[18]=s("input",{type:"checkbox",id:"offers-bad",value:"offers"},null,-1)),s("label",ts,o(e.$t("pages.accessibleForms.fieldsets.bad.offers")),1),a[19]||(a[19]=s("input",{type:"radio",name:"contact-bad",id:"sms-contact-bad",value:"sms"},null,-1)),s("label",ns,o(e.$t("pages.accessibleForms.fieldsets.bad.sms")),1)]),s("div",ds,[s("input",{type:"email",placeholder:e.$t("pages.accessibleForms.fieldsets.bad.email"),class:"text-input"},null,8,rs),a[20]||(a[20]=s("input",{type:"checkbox",id:"updates-bad",value:"updates"},null,-1)),s("label",ms,o(e.$t("pages.accessibleForms.fieldsets.bad.updates")),1)]),s("div",cs,[s("select",ps,[s("option",null,o(e.$t("pages.accessibleForms.fieldsets.bad.frequency")),1),s("option",null,o(e.$t("pages.accessibleForms.fieldsets.bad.daily")),1),s("option",null,o(e.$t("pages.accessibleForms.fieldsets.bad.weekly")),1),s("option",null,o(e.$t("pages.accessibleForms.fieldsets.bad.monthly")),1)])])]),s("button",bs,o(e.$t("pages.accessibleForms.fieldsets.bad.submit")),1)])]),s("div",us,[s("pre",null,[s("code",null,"<!-- "+o(e.$t("pages.accessibleForms.codeExamples.fieldsets.badComment"))+` -->
<form>
  <h4>`+o(e.$t("pages.accessibleForms.fieldsets.bad.heading"))+`</h4>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.fieldsets.mixedElements"))+` -->
  <div>
    <input type="radio" name="contact-bad"
           id="email-contact-bad" value="email">
    <label for="email-contact-bad">`+o(e.$t("pages.accessibleForms.fieldsets.bad.email"))+`</label>

    <input type="checkbox" id="newsletter-bad"
           value="newsletter">
    <label for="newsletter-bad">`+o(e.$t("pages.accessibleForms.fieldsets.bad.newsletter"))+`</label>
  </div>

  <div>
    <input type="radio" name="contact-bad"
           id="phone-contact-bad" value="phone">
    <label for="phone-contact-bad">`+o(e.$t("pages.accessibleForms.fieldsets.bad.phone"))+`</label>

    <!-- `+o(e.$t("pages.accessibleForms.codeExamples.fieldsets.textFieldNoContext"))+` -->
    <input type="text" placeholder="`+o(e.$t("pages.accessibleForms.fieldsets.bad.name"))+`">
  </div>

  <div>
    <input type="checkbox" id="offers-bad" value="offers">
    <label for="offers-bad">`+o(e.$t("pages.accessibleForms.fieldsets.bad.offers"))+`</label>

    <input type="radio" name="contact-bad"
           id="sms-contact-bad" value="sms">
    <label for="sms-contact-bad">`+o(e.$t("pages.accessibleForms.fieldsets.bad.sms"))+`</label>
  </div>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.fieldsets.selectNoContext"))+` -->
  <select>
    <option>`+o(e.$t("pages.accessibleForms.fieldsets.bad.frequency"))+`</option>
    <option>`+o(e.$t("pages.accessibleForms.fieldsets.bad.daily"))+`</option>
    <option>`+o(e.$t("pages.accessibleForms.fieldsets.bad.weekly"))+`</option>
  </select>

  <button type="submit">`+o(e.$t("pages.accessibleForms.fieldsets.bad.submit"))+`</button>
</form>`,1)])])]),good:h(()=>[s("div",gs,[s("form",vs,[s("h4",null,o(e.$t("pages.accessibleForms.fieldsets.good.heading")),1),s("div",fs,[s("h5",hs,o(e.$t("pages.accessibleForms.fieldsets.good.personalInfo.title")),1),s("div",Fs,[s("label",$s,o(e.$t("pages.accessibleForms.fieldsets.good.personalInfo.nameLabel"))+" *",1),a[21]||(a[21]=s("input",{type:"text",id:"name-good",name:"name",required:"","aria-required":"true","aria-describedby":"name-desc"},null,-1)),s("span",ys,o(e.$t("pages.accessibleForms.fieldsets.good.personalInfo.nameDescription")),1)]),s("div",ws,[s("label",As,o(e.$t("pages.accessibleForms.fieldsets.good.personalInfo.emailLabel"))+" *",1),a[22]||(a[22]=s("input",{type:"email",id:"email-field-good",name:"email-field",required:"","aria-required":"true","aria-describedby":"email-desc"},null,-1)),s("span",Vs,o(e.$t("pages.accessibleForms.fieldsets.good.personalInfo.emailDescription")),1)])]),s("div",Es,[s("h5",ks,o(e.$t("pages.accessibleForms.fieldsets.good.contactMethod.title"))+" *",1),s("div",qs,[a[23]||(a[23]=s("input",{type:"radio",name:"contact-good",id:"email-contact-good",value:"email",required:"","aria-describedby":"contact-method-title"},null,-1)),s("label",_s,o(e.$t("pages.accessibleForms.fieldsets.good.contactMethod.email")),1)]),s("div",Ss,[a[24]||(a[24]=s("input",{type:"radio",name:"contact-good",id:"phone-contact-good",value:"phone",required:"","aria-describedby":"contact-method-title"},null,-1)),s("label",Bs,o(e.$t("pages.accessibleForms.fieldsets.good.contactMethod.phone")),1)]),s("div",Gs,[a[25]||(a[25]=s("input",{type:"radio",name:"contact-good",id:"sms-contact-good",value:"sms",required:"","aria-describedby":"contact-method-title"},null,-1)),s("label",Is,o(e.$t("pages.accessibleForms.fieldsets.good.contactMethod.sms")),1)])]),s("div",Ls,[s("h5",Cs,o(e.$t("pages.accessibleForms.fieldsets.good.commTypes.title")),1),s("p",Ts,o(e.$t("pages.accessibleForms.fieldsets.good.commTypes.description")),1),s("div",Us,[a[26]||(a[26]=s("input",{type:"checkbox",id:"newsletter-good",value:"newsletter","aria-describedby":"comm-types-desc"},null,-1)),s("label",Ms,o(e.$t("pages.accessibleForms.fieldsets.good.commTypes.newsletter")),1)]),s("div",zs,[a[27]||(a[27]=s("input",{type:"checkbox",id:"offers-good",value:"offers","aria-describedby":"comm-types-desc"},null,-1)),s("label",Ps,o(e.$t("pages.accessibleForms.fieldsets.good.commTypes.offers")),1)]),s("div",Rs,[a[28]||(a[28]=s("input",{type:"checkbox",id:"updates-good",value:"updates","aria-describedby":"comm-types-desc"},null,-1)),s("label",Hs,o(e.$t("pages.accessibleForms.fieldsets.good.commTypes.updates")),1)])]),s("div",Ns,[s("h5",Zs,o(e.$t("pages.accessibleForms.fieldsets.good.frequency.title")),1),s("div",Ds,[s("label",Os,o(e.$t("pages.accessibleForms.fieldsets.good.frequency.label")),1),s("select",Ws,[s("option",Js,o(e.$t("pages.accessibleForms.fieldsets.good.frequency.options.select")),1),s("option",Qs,o(e.$t("pages.accessibleForms.fieldsets.good.frequency.options.daily")),1),s("option",Xs,o(e.$t("pages.accessibleForms.fieldsets.good.frequency.options.weekly")),1),s("option",js,o(e.$t("pages.accessibleForms.fieldsets.good.frequency.options.monthly")),1)]),s("span",Ks,o(e.$t("pages.accessibleForms.fieldsets.good.frequency.description")),1)])]),s("button",Ys,o(e.$t("pages.accessibleForms.fieldsets.good.submit")),1)])]),s("div",xs,[s("pre",null,[s("code",null,"<!-- "+o(e.$t("pages.accessibleForms.codeExamples.fieldsets.goodComment"))+` -->
<form>
  <h4>`+o(e.$t("pages.accessibleForms.fieldsets.good.heading"))+`</h4>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.fieldsets.personalInfoSection"))+` -->
  <div role="group" aria-labelledby="personal-info-title">
    <h5 id="personal-info-title">
      `+o(e.$t("pages.accessibleForms.fieldsets.good.personalInfo.title"))+`
    </h5>

    <label for="name-good">`+o(e.$t("pages.accessibleForms.fieldsets.good.personalInfo.nameLabel"))+` *</label>
    <input
      type="text"
      id="name-good"
      name="name"
      required
      aria-required="true"
      aria-describedby="name-desc">
    <span id="name-desc">
      `+o(e.$t("pages.accessibleForms.fieldsets.good.personalInfo.nameDescription"))+`
    </span>
  </div>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.fieldsets.radioGroup"))+` -->
  <div
    role="radiogroup"
    aria-labelledby="contact-method-title"
    aria-required="true">
    <h5 id="contact-method-title">
      `+o(e.$t("pages.accessibleForms.fieldsets.good.contactMethod.title"))+` *
    </h5>

    <input
      type="radio"
      name="contact-good"
      id="email-contact-good"
      value="email"
      required>
    <label for="email-contact-good">`+o(e.$t("pages.accessibleForms.fieldsets.good.contactMethod.email"))+`</label>

    <input
      type="radio"
      name="contact-good"
      id="phone-contact-good"
      value="phone"
      required>
    <label for="phone-contact-good">`+o(e.$t("pages.accessibleForms.fieldsets.good.contactMethod.phone"))+`</label>
  </div>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.fieldsets.checkboxGroup"))+` -->
  <div role="group" aria-labelledby="comm-types-title">
    <h5 id="comm-types-title">`+o(e.$t("pages.accessibleForms.fieldsets.good.commTypes.title"))+`</h5>
    <p id="comm-types-desc">
      `+o(e.$t("pages.accessibleForms.fieldsets.good.commTypes.description"))+`
    </p>

    <input
      type="checkbox"
      id="newsletter-good"
      value="newsletter"
      aria-describedby="comm-types-desc">
    <label for="newsletter-good">`+o(e.$t("pages.accessibleForms.fieldsets.good.commTypes.newsletter"))+`</label>
  </div>

  <button type="submit">
    `+o(e.$t("pages.accessibleForms.fieldsets.good.submit"))+`
  </button>
</form>`,1)])])]),_:1},8,["title","explanation"]),S(G,{title:e.$t("pages.accessibleForms.complexValidation.title"),explanation:e.$t("pages.accessibleForms.complexValidation.explanation")},{bad:h(()=>[s("div",eo,[s("form",so,[s("h4",null,o(e.$t("pages.accessibleForms.complexValidation.bad.heading")),1),s("div",oo,[s("div",ao,[s("label",null,o(e.$t("pages.accessibleForms.complexValidation.bad.username")),1),b(s("input",{type:"text","onUpdate:modelValue":a[6]||(a[6]=l=>v.value.username=l),onInput:H,class:i({error:F.value})},null,34),[[u,v.value.username]]),F.value?(m(),r("div",lo,o(F.value),1)):g("",!0)]),s("div",io,[s("label",null,o(e.$t("pages.accessibleForms.complexValidation.bad.email")),1),b(s("input",{type:"email","onUpdate:modelValue":a[7]||(a[7]=l=>v.value.email=l),onInput:N,class:i({error:w.value})},null,34),[[u,v.value.email]]),w.value?(m(),r("div",to,o(w.value),1)):g("",!0)])]),s("div",no,[s("label",null,o(e.$t("pages.accessibleForms.complexValidation.bad.password")),1),b(s("input",{type:"password","onUpdate:modelValue":a[8]||(a[8]=l=>v.value.password=l),onInput:Z,class:i({error:A.value}),autocomplete:"new-password"},null,34),[[u,v.value.password]]),A.value?(m(),r("div",ro,o(A.value),1)):g("",!0)]),s("button",mo,o(e.$t("pages.accessibleForms.complexValidation.bad.submit")),1)])]),s("div",co,[s("pre",null,[s("code",null,"<!-- "+o(e.$t("pages.accessibleForms.codeExamples.complexValidation.badComment"))+` -->
<form>
  <h4>`+o(e.$t("pages.accessibleForms.complexValidation.bad.heading"))+`</h4>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.complexValidation.immediateValidation"))+` -->
  <label>`+o(e.$t("pages.accessibleForms.complexValidation.bad.username"))+`</label>
  <input
    type="text"
    v-model="complexBadForm.username"
    @input="validateUsernameBad"
    :class="{ 'error': usernameBadError }">
  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.complexValidation.constantErrorToggle"))+` -->
  <div v-if="usernameBadError">
    `+o(F.value)+`
  </div>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.complexValidation.noAriaDescribedby"))+` -->
  <label>`+o(e.$t("pages.accessibleForms.complexValidation.bad.email"))+`</label>
  <input
    type="email"
    v-model="complexBadForm.email"
    @input="validateEmailBad"
    :class="{ 'error': emailBadError }">
  <div v-if="emailBadError">`+o(w.value)+`</div>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.complexValidation.shortMessages"))+` -->
  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.complexValidation.noAutocomplete"))+` -->
  <label>`+o(e.$t("pages.accessibleForms.complexValidation.bad.password"))+`</label>
  <input
    type="password"
    v-model="complexBadForm.password"
    @input="validatePasswordBad"
    :class="{ 'error': passwordBadError }">
  <div v-if="passwordBadError">`+o(A.value)+`</div>

  <button type="submit">`+o(e.$t("pages.accessibleForms.complexValidation.bad.submit"))+`</button>
</form>`,1)])])]),good:h(()=>[s("div",po,[s("form",bo,[s("h4",null,o(e.$t("pages.accessibleForms.complexValidation.good.heading")),1),s("div",uo,[s("div",go,[s("label",vo,o(e.$t("pages.accessibleForms.complexValidation.good.usernameLabel"))+" *",1),b(s("input",{type:"text",id:"username-complex","onUpdate:modelValue":a[9]||(a[9]=l=>n.value.username=l),onBlur:D,class:i({error:$.value,success:E.value}),"aria-describedby":"username-requirements username-feedback","aria-invalid":"!!usernameGoodError",required:""},null,34),[[u,n.value.username]]),s("div",fo,[s("h6",null,o(e.$t("pages.accessibleForms.complexValidation.good.usernameRequirements.title")),1),s("ul",null,[s("li",{class:i({valid:n.value.username.length>=3})},o(e.$t("pages.accessibleForms.complexValidation.good.usernameRequirements.minLength")),3),s("li",{class:i({valid:/^[a-zA-Z0-9_]+$/.test(n.value.username)})},o(e.$t("pages.accessibleForms.complexValidation.good.usernameRequirements.validChars")),3)])]),$.value?(m(),r("div",ho," ❌ "+o($.value),1)):E.value?(m(),r("div",Fo," ✅ "+o(e.$t("pages.accessibleForms.complexValidation.good.usernameValid")),1)):g("",!0)]),s("div",$o,[s("label",yo,o(e.$t("pages.accessibleForms.complexValidation.good.emailLabel"))+" *",1),b(s("input",{type:"email",id:"email-complex","onUpdate:modelValue":a[10]||(a[10]=l=>n.value.email=l),onBlur:O,class:i({error:k.value,success:q.value}),"aria-describedby":"email-complex-feedback","aria-invalid":"!!emailGoodError",required:""},null,34),[[u,n.value.email]]),k.value?(m(),r("div",wo," ❌ "+o(k.value),1)):q.value?(m(),r("div",Ao," ✅ "+o(e.$t("pages.accessibleForms.complexValidation.good.emailValid")),1)):g("",!0)])]),s("div",Vo,[s("label",Eo,o(e.$t("pages.accessibleForms.complexValidation.good.passwordLabel"))+" *",1),b(s("input",{type:"password",id:"password-complex","onUpdate:modelValue":a[11]||(a[11]=l=>n.value.password=l),onInput:W,class:i({error:_.value}),"aria-describedby":"password-strength password-feedback","aria-invalid":"!!passwordGoodError",required:"",autocomplete:"new-password"},null,34),[[u,n.value.password]]),s("div",ko,[s("h6",null,o(e.$t("pages.accessibleForms.complexValidation.good.passwordStrength.title")),1),s("div",qo,[s("div",{class:i(["strength-bar",`strength-${L.value}`]),style:ee({width:`${L.value*25}%`})},null,6)]),s("div",_o,[s("div",{class:i({valid:n.value.password.length>=8})},o(e.$t("pages.accessibleForms.complexValidation.good.passwordStrength.length")),3),s("div",{class:i({valid:/[A-Z]/.test(n.value.password)})},o(e.$t("pages.accessibleForms.complexValidation.good.passwordStrength.uppercase")),3),s("div",{class:i({valid:/[0-9]/.test(n.value.password)})},o(e.$t("pages.accessibleForms.complexValidation.good.passwordStrength.number")),3),s("div",{class:i({valid:/[^A-Za-z0-9]/.test(n.value.password)})},o(e.$t("pages.accessibleForms.complexValidation.good.passwordStrength.special")),3)])]),_.value?(m(),r("div",So," ❌ "+o(_.value),1)):g("",!0)]),s("button",{type:"submit",disabled:!J.value},o(e.$t("pages.accessibleForms.complexValidation.good.submit")),9,Bo)])]),s("div",Go,[s("pre",null,[s("code",null,"<!-- "+o(e.$t("pages.accessibleForms.codeExamples.complexValidation.goodComment"))+` -->
<form>
  <h4>`+o(e.$t("pages.accessibleForms.complexValidation.good.heading"))+`</h4>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.complexValidation.validationOnBlur"))+` -->
  <label for="username-complex">`+o(e.$t("pages.accessibleForms.complexValidation.good.usernameLabel"))+` *</label>
  <input
    type="text"
    id="username-complex"
    v-model="complexGoodForm.username"
    @blur="validateUsernameGood"
    :class="{ error: usernameGoodError,
              success: usernameGoodValid }"
    aria-describedby="username-requirements username-feedback"
    aria-invalid="!!usernameGoodError"
    required>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.complexValidation.clearInstructions"))+` -->
  <div id="username-requirements">
    <h6>`+o(e.$t("pages.accessibleForms.complexValidation.good.usernameRequirements.title"))+`</h6>
    <ul>
      <li :class="{ valid: complexGoodForm.username.length >= 3 }">
        `+o(e.$t("pages.accessibleForms.complexValidation.good.usernameRequirements.minLength"))+`
      </li>
      <li :class="{ valid: /^[a-zA-Z0-9_]+$/.test(username) }">
        `+o(e.$t("pages.accessibleForms.complexValidation.good.usernameRequirements.validChars"))+`
      </li>
    </ul>
  </div>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.complexValidation.accessibleFeedback"))+` -->
  <div
    v-if="usernameGoodError"
    id="username-feedback"
    role="alert"
    aria-live="polite">
    ❌ `+o($.value)+`
  </div>
  <div
    v-else-if="usernameGoodValid"
    id="username-feedback"
    role="status"
    aria-live="polite">
    ✅ `+o(e.$t("pages.accessibleForms.complexValidation.good.usernameValid"))+`
  </div>

  <!-- `+o(e.$t("pages.accessibleForms.codeExamples.complexValidation.passwordStrengthIndicator"))+` -->
  <label for="password-complex">`+o(e.$t("pages.accessibleForms.complexValidation.good.passwordLabel"))+` *</label>
  <input
    type="password"
    id="password-complex"
    v-model="complexGoodForm.password"
    @input="validatePasswordGood"
    aria-describedby="password-strength"
    autocomplete="new-password"
    required>

  <div id="password-strength">
    <h6>`+o(e.$t("pages.accessibleForms.complexValidation.good.passwordStrength.title"))+`</h6>
    <div class="strength-indicator">
      <div
        class="strength-bar"
        :class="\`strength-\${passwordStrength}\`"
        :style="{ width: \`\${passwordStrength * 25}%\` }">
      </div>
    </div>
  </div>

  <button type="submit" :disabled="!isFormValid">
    `+o(e.$t("pages.accessibleForms.complexValidation.good.submit"))+`
  </button>
</form>`,1)])])]),_:1},8,["title","explanation"])]))}},Mo=Q(Io,[["__scopeId","data-v-14b289fe"]]);export{Mo as default};
