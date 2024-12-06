import{a as Oe,b as Re,c as Ge,d as qe,e as je,f as Le}from"./chunk-44CIVHJ3.js";import{A as L,B as Be,C as He,D as Z,E as B,F as P,a as S,b as g,d as E,e as T,f as Ee,g as Te,h as w,i as R,j as G,k as q,l as we,m as De,n as j,o as Me,p as D,q as Ve,r as ke,s as Fe,t as Ae,u as M,v as V,w as k,x as F,y as A,z as I}from"./chunk-DK7YPTA5.js";import{b as Ie,c as Pe,e as y}from"./chunk-RFOXM2BK.js";import{Aa as ge,Da as fe,Hb as v,Ib as n,Ka as p,Kb as x,Lb as Y,Ma as _e,Mb as be,Nb as he,Oa as ve,Ob as Ce,Pb as xe,Tb as W,Ub as $,V as me,X as se,Xb as ye,Ya as f,_ as pe,ba as C,bb as c,ca as de,hb as d,ia as b,ic as Ne,ja as h,lb as z,nc as Se,pa as ce,qb as r,rb as t,sa as ue,sb as m,ub as N,wb as _,xb as s}from"./chunk-HLTXTU6G.js";import"./chunk-Q7L6LLAK.js";function $e(i,o){if(i&1&&n(0),i&2){let e=o.$implicit;x("",e||"This field"," is required")}}function Ze(i,o){if(i&1&&(n(0),W(1,"number")),i&2){let e=o.error,a=o.$implicit;Y(" ",a||"This field"," must be at least ",$(1,2,e.requiredLength)," characters long ")}}function Xe(i,o){if(i&1&&(n(0),W(1,"number")),i&2){let e=o.error,a=o.$implicit;Y(" ",a||"This field"," must be at most ",$(1,2,e.requiredLength)," characters long ")}}function Je(i,o){if(i&1&&n(0),i&2){let e=o.$implicit;x("",e||"This field"," doesn't have the required format")}}function Ke(i,o){if(i&1&&n(0),i&2){let e=o.$implicit;x("",e||"This field"," must be a valid email address")}}function Qe(i,o){if(i&1&&(n(0),W(1,"number")),i&2){let e=o.error,a=o.$implicit;Y(" ",a||"This field"," must be at least ",$(1,2,e.min)," ")}}function et(i,o){if(i&1&&(n(0),W(1,"number")),i&2){let e=o.error,a=o.$implicit;Y("",a||"This field"," must be at most ",$(1,2,e.max),"")}}var X=class i{constructor(){let o=C(Z);o.errorsClasses="invalid-feedback"}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["demo-validation-defaults"]],decls:8,vars:0,consts:[["valError","required"],["valError","minlength"],["valError","maxlength"],["valError","pattern"],["valError","email"],["valError","min"],["valError","max"]],template:function(e,a){e&1&&(r(0,"val-default-errors"),c(1,$e,1,1,"ng-template",0)(2,Ze,2,4,"ng-template",1)(3,Xe,2,4,"ng-template",2)(4,Je,1,1,"ng-template",3)(5,Ke,1,1,"ng-template",4)(6,Qe,2,4,"ng-template",5)(7,et,2,4,"ng-template",6),t())},dependencies:[P,L,Be,Se],encapsulation:2,changeDetection:0})};var K=class i{navbarCollapsed=!0;static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["demo-root"]],decls:30,vars:1,consts:[[1,"d-none"],["data-bs-theme","dark",1,"navbar","navbar-expand-md","bg-dark"],[1,"container-fluid"],[1,"navbar-brand","mb-0"],["routerLink","/",1,"navbar-brand","pt-0","pb-0"],[1,"d-none","d-sm-inline"],["type","button","aria-controls","navbarContent","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler",3,"click"],[1,"navbar-toggler-icon"],["id","navbarContent",1,"navbar-collapse",3,"ngbCollapse"],[1,"navbar-nav","me-auto"],["ngbDropdown","",1,"nav-item"],["role","button","id","integration-menu","ngbDropdownToggle","",1,"nav-link"],["ngbDropdownMenu","","aria-labelledby","integration-menu",1,"dropdown-menu-dark"],["routerLink","/bootstrap",1,"dropdown-item"],["routerLink","/material",1,"dropdown-item"],[1,"nav-item"],["href","documentation/index.html",1,"nav-link"],["href","https://github.com/Ninja-Squad/ngx-valdemort",1,"nav-link"],["alt","","src","/github.png"],["role","main",1,"container","mt-5"]],template:function(e,a){e&1&&(m(0,"demo-validation-defaults",0),r(1,"header")(2,"nav",1)(3,"div",2)(4,"h1",3)(5,"a",4),n(6,"ngx-valdemort "),r(7,"small",5),n(8,"by Ninja Squad"),t()()(),r(9,"button",6),_("click",function(){return a.navbarCollapsed=!a.navbarCollapsed}),m(10,"span",7),t(),r(11,"div",8)(12,"ul",9)(13,"li",10)(14,"a",11),n(15," Integration "),t(),r(16,"div",12)(17,"a",13),n(18,"Bootstrap"),t(),r(19,"a",14),n(20,"Material"),t()()(),r(21,"li",15)(22,"a",16),n(23,"API documentation"),t()(),r(24,"li",15)(25,"a",17),m(26,"img",18),n(27," Github "),t()()()()()()(),r(28,"main",19),m(29,"router-outlet"),t()),e&2&&(p(11),d("ngbCollapse",a.navbarCollapsed))},dependencies:[X,je,Ve,Ae,Fe,ke,qe],styles:[".nav-link[_ngcontent-%COMP%]{cursor:pointer}"]})};var Q=class i{snippet="getting-started.snippet.ts-like";static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["demo-getting-started"]],decls:31,vars:1,consts:[["href","documentation/index.html"],["lang","angular-ts",3,"code"]],template:function(e,a){e&1&&(r(0,"ol")(1,"li"),n(2,"import from "),r(3,"code"),n(4,"ngx-valdemort"),t()(),r(5,"li"),n(6," add "),r(7,"code"),n(8,"ValdemortModule"),t(),n(9," to the imports of your module, or directly import our standalone components and directives from your components "),t(),r(10,"li"),n(11," Use "),r(12,"code"),n(13,"<val-errors>"),t(),n(14,", "),r(15,"code"),n(16,"<val-default-errors>"),t(),n(17," and "),r(18,"code"),n(19,"ValdemortConfig"),t(),n(20," as shown above "),t(),r(21,"li"),n(22,"..."),t(),r(23,"li"),n(24,"Profit!"),t()(),r(25,"p"),n(26,"We also have an "),r(27,"a",0),n(28,"API documentation"),t(),n(29,"."),t(),m(30,"demo-snippet",1)),e&2&&(p(30),d("code",a.snippet))},dependencies:[y],encapsulation:2})};function tt(i,o){if(i&1&&m(0,"demo-snippet",8),i&2){let e=s();d("code",e.ngModelSnippet)}}function nt(i,o){if(i&1){let e=N();r(0,"div",9)(1,"form",null,1)(3,"div",10)(4,"label",11),n(5,"Email"),t(),r(6,"input",12,2),Ce("ngModelChange",function(l){b(e);let u=s();return he(u.user.email,l)||(u.user.email=l),h(l)}),t(),m(8,"val-errors",13),t(),r(9,"button",14),_("click",function(){b(e);let l=s();return h(l.submit())}),n(10,"Submit"),t(),r(11,"button",15),_("click",function(){b(e);let l=v(2),u=s();return h(u.reset(l))}),n(12,"Reset"),t()()()}if(i&2){let e=v(7),a=s();p(6),be("ngModel",a.user.email),p(2),d("control",e.control)}}var ee=class i{ngModelSnippet="ng-model.snippet.html";user={email:""};submit(){}reset(o){o.resetForm({email:""})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["demo-ng-model"]],decls:11,vars:1,consts:[["nav","ngbNav"],["f","ngForm"],["emailCtrl","ngModel"],["ngbNav","",1,"nav-tabs"],["ngbNavItem",""],["ngbNavLink",""],["ngbNavContent",""],[3,"ngbNavOutlet"],["lang","angular-html",3,"code"],[1,"demo"],[1,"mb-3"],[1,"form-label"],["type","email","name","email","required","","email","",1,"form-control",3,"ngModelChange","ngModel"],["label","The email",3,"control"],[1,"btn","btn-primary","me-2",3,"click"],["type","button",1,"btn","btn-secondary",3,"click"]],template:function(e,a){if(e&1&&(r(0,"ul",3,0)(2,"li",4)(3,"a",5),n(4,"Form component"),t(),c(5,tt,1,1,"ng-template",6),t(),r(6,"li",4)(7,"a",5),n(8,"Demo"),t(),c(9,nt,13,2,"ng-template",6),t()(),m(10,"div",7)),e&2){let l=v(1);p(10),d("ngbNavOutlet",l)}},dependencies:[F,k,V,A,M,y,D,w,S,E,T,we,De,Me,Te,Ee,P,B,I],encapsulation:2})};function it(i,o){if(i&1&&m(0,"demo-snippet",7),i&2){let e=s();d("code",e.snippet)}}function ot(i,o){if(i&1&&n(0),i&2){let e=o.error;x("You must be at least ",e.min," years old")}}function rt(i,o){if(i&1){let e=N();r(0,"div",8)(1,"form",9,1)(3,"div",10)(4,"label",11),n(5,"Email"),t(),m(6,"input",12)(7,"val-errors",13),t(),r(8,"div",10)(9,"label",11),n(10,"Age"),t(),m(11,"input",14),r(12,"val-errors",15),c(13,ot,1,1,"ng-template",16),t()(),r(14,"button",17),_("click",function(){b(e);let l=s();return h(l.submit())}),n(15,"Submit"),t(),r(16,"button",18),_("click",function(){b(e);let l=v(2),u=s();return h(u.reset(l))}),n(17,"Reset"),t()()()}if(i&2){let e=s();p(),d("formGroup",e.form)}}var ne=class i{form=C(j).group({email:["",[g.required,g.email]],age:[null,[g.required,g.min(18)]]});snippet="configuration.snippet.ts-like";constructor(){let o=C(Z);o.errorsClasses="text-warning",o.displayMode=He.ONE,o.shouldDisplayErrors=e=>e.dirty}submit(){}reset(o){o.resetForm({email:"",age:null})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["demo-configuration"]],features:[xe([Z])],decls:17,vars:1,consts:[["nav","ngbNav"],["f","ngForm"],["ngbNav","",1,"nav-tabs"],["ngbNavItem",""],["ngbNavLink",""],["ngbNavContent",""],[3,"ngbNavOutlet"],["lang","angular-ts",3,"code"],[1,"demo"],[3,"formGroup"],[1,"mb-3"],[1,"form-label"],["formControlName","email","type","email",1,"form-control"],["controlName","email","label","The email"],["formControlName","age","type","number",1,"form-control"],["controlName","age","label","The age"],["valError","min"],[1,"btn","btn-primary","me-2",3,"click"],["type","button",1,"btn","btn-secondary",3,"click"]],template:function(e,a){if(e&1&&(r(0,"p"),n(1,"The behavior of ngx-valdemort is configured via a configuration service. The same look and feel can thus be applied globally."),t(),r(2,"p"),n(3,` Instead of displaying errors when the control is touched or its form is submitted, the following example uses the service to specify that errors should be shown when the controls are dirty, to add a CSS class on errors to display them in orange rather than red, and to only display one error message per control instead of all of them.
`),t(),r(4,"p"),n(5,` Such a configuration is typically done only once, in the root component (or in a dedicated component inserted in the root component), to ensure that the same configuration applies everywhere.
`),t(),r(6,"ul",2,0)(8,"li",3)(9,"a",4),n(10,"App component"),t(),c(11,it,1,1,"ng-template",5),t(),r(12,"li",3)(13,"a",4),n(14,"Demo"),t(),c(15,rt,18,1,"ng-template",5),t()(),m(16,"div",6)),e&2){let l=v(7);p(16),d("ngbNavOutlet",l)}},dependencies:[F,k,V,A,M,y,D,w,S,R,E,T,G,q,P,B,L,I],encapsulation:2})};function at(i,o){if(i&1&&m(0,"demo-snippet",7),i&2){let e=s();d("code",e.appSnippet)}}function lt(i,o){if(i&1&&m(0,"demo-snippet",7),i&2){let e=s();d("code",e.snippet)}}function mt(i,o){if(i&1&&n(0),i&2){let e=o.error;x("You must be at least ",e.min," years old")}}function st(i,o){if(i&1){let e=N();r(0,"div",8)(1,"form",9,1)(3,"div",10)(4,"label",11),n(5,"Email"),t(),m(6,"input",12)(7,"val-errors",13),t(),r(8,"div",10)(9,"label",11),n(10,"Age"),t(),m(11,"input",14),r(12,"val-errors",15),c(13,mt,1,1,"ng-template",16),t()(),r(14,"button",17),_("click",function(){b(e);let l=s();return h(l.submit())}),n(15,"Submit"),t(),r(16,"button",18),_("click",function(){b(e);let l=v(2),u=s();return h(u.reset(l))}),n(17,"Reset"),t()()()}if(i&2){let e=s();p(),d("formGroup",e.form)}}var ie=class i{form=C(j).group({email:["",[g.required,g.email]],age:[null,[g.required,g.min(18)]]});appSnippet="consistency.app.snippet.html";snippet="consistency.snippet.html";submit(){}reset(o){o.resetForm({email:"",age:null})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["demo-consistency"]],decls:27,vars:1,consts:[["nav","ngbNav"],["f","ngForm"],["ngbNav","",1,"nav-tabs"],["ngbNavItem",""],["ngbNavLink",""],["ngbNavContent",""],[3,"ngbNavOutlet"],["lang","angular-html",3,"code"],[1,"demo"],[3,"formGroup"],[1,"mb-3"],[1,"form-label"],["formControlName","email","type","email",1,"form-control"],["controlName","email","label","The email"],["formControlName","age","type","number",1,"form-control"],["controlName","age"],["valError","min"],[1,"btn","btn-primary","me-2",3,"click"],["type","button",1,"btn","btn-secondary",3,"click"]],template:function(e,a){if(e&1&&(r(0,"p"),n(1,` By defining a default error message for each type of error once, and only once (typically in the root component), every form can become simpler.
`),t(),r(2,"ul",2,0)(4,"li",3)(5,"a",4),n(6,"App template"),t(),c(7,at,1,1,"ng-template",5),t(),r(8,"li",3)(9,"a",4),n(10,"Template"),t(),c(11,lt,1,1,"ng-template",5),t(),r(12,"li",3)(13,"a",4),n(14,"Demo"),t(),c(15,st,18,1,"ng-template",5),t()(),m(16,"div",6),r(17,"p"),n(18," As you can see, you can choose to have very generic error messages ("),r(19,"em"),n(20,"This field is required"),t(),n(21,", as demonstrated on the age example) or, by just specifying the label on the "),r(22,"code"),n(23,"val-errors"),t(),n(24,` component, have specific, but consistent error messages. And if you really need to (like in the error for the minimum age), you can override the default message by the one you want.
`),t(),r(25,"p"),n(26,"By defining the messages in the templates, you can easily internationalize them, use pipes, or HTML formatting."),t()),e&2){let l=v(3);p(16),d("ngbNavOutlet",l)}},dependencies:[F,k,V,A,M,y,D,w,S,R,E,T,G,q,P,B,L,I],styles:["h3[_ngcontent-%COMP%]{font-size:1rem}"]})};function pt(i,o){if(i&1&&m(0,"demo-snippet",2),i&2){let e=s();d("code",e.snippet)}}function dt(i,o){i&1&&n(0,"The email is required")}function ct(i,o){i&1&&n(0,"The email must be a valid email address")}function ut(i,o){i&1&&n(0,"The age is required")}function gt(i,o){if(i&1&&n(0),i&2){let e=o.error;x("You must be at least ",e.min," years old")}}function ft(i,o){if(i&1){let e=N();r(0,"div",8)(1,"form",9,1)(3,"div",10)(4,"label",11),n(5,"Email"),t(),m(6,"input",12),r(7,"val-errors",13),c(8,dt,1,0,"ng-template",14)(9,ct,1,0,"ng-template",15),t()(),r(10,"div",10)(11,"label",11),n(12,"Age"),t(),m(13,"input",16),r(14,"val-errors",17),c(15,ut,1,0,"ng-template",14)(16,gt,1,1,"ng-template",18),t()(),r(17,"button",19),_("click",function(){b(e);let l=s();return h(l.submit())}),n(18,"Submit"),t(),r(19,"button",20),_("click",function(){b(e);let l=v(2),u=s();return h(u.reset(l))}),n(20,"Reset"),t()()()}if(i&2){let e=s();p(),d("formGroup",e.form)}}var oe=class i{form=C(j).group({email:["",[g.required,g.email]],age:[null,[g.required,g.min(18)]]});introSnippet="solution.intro.snippet.html";snippet="solution.snippet.html";submit(){}reset(o){o.resetForm({email:"",age:null})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["demo-solution"]],decls:18,vars:2,consts:[["nav","ngbNav"],["f","ngForm"],["lang","angular-html",3,"code"],["ngbNav","",1,"nav-tabs"],["ngbNavItem",""],["ngbNavLink",""],["ngbNavContent",""],[3,"ngbNavOutlet"],[1,"demo"],[3,"formGroup"],[1,"mb-3"],[1,"form-label"],["formControlName","email","type","email",1,"form-control"],["controlName","email"],["valError","required"],["valError","email"],["formControlName","age","type","number",1,"form-control"],["controlName","age"],["valError","min"],[1,"btn","btn-primary","me-2",3,"click"],["type","button",1,"btn","btn-secondary",3,"click"]],template:function(e,a){if(e&1&&(r(0,"p"),n(1,"Here is how you do the same using ngx-valdemort:"),t(),m(2,"demo-snippet",2),r(3,"p"),n(4,"And here is the same complete small form."),t(),r(5,"ul",3,0)(7,"li",4)(8,"a",5),n(9,"Template"),t(),c(10,pt,1,1,"ng-template",6),t(),r(11,"li",4)(12,"a",5),n(13,"Demo"),t(),c(14,ft,21,1,"ng-template",6),t()(),m(15,"div",7),r(16,"p"),n(17,` This is already much better. The code is much easier to read and write, and the probability of introducing a bug is much smaller than before. But we can do better, and avoid repeating the same error messages over and over.
`),t()),e&2){let l=v(6);p(2),d("code",a.introSnippet),p(13),d("ngbNavOutlet",l)}},dependencies:[y,F,k,V,A,M,D,w,S,R,E,T,G,q,P,B,L,I],encapsulation:2})};function _t(i,o){if(i&1&&m(0,"demo-snippet",2),i&2){let e=s();d("code",e.snippet)}}function vt(i,o){i&1&&(r(0,"div"),n(1,"The email is required"),t())}function bt(i,o){i&1&&(r(0,"div"),n(1,"The email must be a valid email address"),t())}function ht(i,o){if(i&1&&(r(0,"div",13),c(1,vt,2,0,"div")(2,bt,2,0,"div"),t()),i&2){let e=s(2);p(),z(e.form.controls.email.hasError("required")?1:-1),p(),z(e.form.controls.email.hasError("email")?2:-1)}}function Ct(i,o){i&1&&(r(0,"div"),n(1,"The age is required"),t())}function xt(i,o){if(i&1&&(r(0,"div"),n(1),t()),i&2){let e=s(3);p(),x("You must be at least ",e.form.controls.age.getError("min").min," years old")}}function yt(i,o){if(i&1&&(r(0,"div",13),c(1,Ct,2,0,"div")(2,xt,2,1,"div"),t()),i&2){let e=s(2);p(),z(e.form.controls.age.hasError("required")?1:-1),p(),z(e.form.controls.age.hasError("min")?2:-1)}}function Nt(i,o){if(i&1){let e=N();r(0,"div",8)(1,"form",9,1)(3,"div",10)(4,"label",11),n(5,"Email"),t(),m(6,"input",12),c(7,ht,3,2,"div",13),t(),r(8,"div",10)(9,"label",11),n(10,"Age"),t(),m(11,"input",14),c(12,yt,3,2,"div",13),t(),r(13,"button",15),_("click",function(){b(e);let l=s();return h(l.submit())}),n(14,"Submit"),t(),r(15,"button",16),_("click",function(){b(e);let l=v(2),u=s();return h(u.reset(l))}),n(16,"Reset"),t()()()}if(i&2){let e=v(2),a=s();p(),d("formGroup",a.form),p(6),z(a.form.controls.email.invalid&&(e.submitted||a.form.controls.email.touched)?7:-1),p(5),z(a.form.controls.age.invalid&&(e.submitted||a.form.controls.age.touched)?12:-1)}}var re=class i{form=C(j).group({email:["",[g.required,g.email]],age:[null,[g.required,g.min(18)]]});introSnippet="problem.intro.snippet.html";snippet="problem.snippet.html";submit(){}reset(o){o.resetForm({email:"",age:null})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["demo-problem"]],decls:20,vars:2,consts:[["nav","ngbNav"],["f","ngForm"],["lang","angular-html",3,"code"],["ngbNav","",1,"nav-tabs"],["ngbNavItem",""],["ngbNavLink",""],["ngbNavContent",""],[3,"ngbNavOutlet"],[1,"demo"],[3,"formGroup"],[1,"mb-3"],[1,"form-label"],["formControlName","email","type","email",1,"form-control"],[1,"invalid-feedback"],["formControlName","age","type","number",1,"form-control"],[1,"btn","btn-primary","me-2",3,"click"],["type","button",1,"btn","btn-secondary",3,"click"]],template:function(e,a){if(e&1&&(r(0,"p"),n(1,"If you're using Angular forms, you have probably written code like this to display validation errors:"),t(),m(2,"demo-snippet",2),r(3,"p"),n(4,"Here is a complete small form using that kind of markup."),t(),r(5,"ul",3,0)(7,"li",4)(8,"a",5),n(9,"Template"),t(),c(10,_t,1,1,"ng-template",6),t(),r(11,"li",4)(12,"a",5),n(13,"Demo"),t(),c(14,Nt,17,3,"ng-template",6),t()(),m(15,"div",7),r(16,"p"),n(17,` That's a lot of code and duplications to display appropriate error messages, when the form is submitted or when the input field is touched. And this is only one form, with just two fields.
`),t(),r(18,"p"),n(19,` Sure, we could improve this by adding fields or getters in the component, but doing so for each and every form of the app is cumbersome, error-prone, and can lead to inconsistencies if every developer doesn't use the same technique.
`),t()),e&2){let l=v(6);p(2),d("code",a.introSnippet),p(13),d("ngbNavOutlet",l)}},dependencies:[y,F,k,V,A,M,D,w,S,R,E,T,G,q,I],encapsulation:2})};var ae=class i{static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["demo-home"]],decls:97,vars:0,consts:[[1,"rounded-3","bg-light","p-5","mb-4","d-sm-flex"],[1,"logo"],["src","/logo.svg","alt","logo"],[1,"flex-fill"],[1,"lead"],[1,"visually-hidden"],[1,"row","mt-5"],[1,"col-md","feature-block"],[1,"text-center"],[1,"fa","fa-child"],[1,"fa","fa-cogs"],[1,"fa","fa-gavel"],[1,"row"],[1,"fa","fa-check"],[1,"fa","fa-heart"],["href","https://github.com/Ninja-Squad/ngx-valdemort"],[1,"mt-5"]],template:function(e,a){e&1&&(r(0,"div",0)(1,"div",1),m(2,"img",2),t(),r(3,"div",3)(4,"h2"),n(5," ngx\u2011valdemort "),r(6,"small"),n(7,"by\xA0Ninja\xA0Squad"),t()(),r(8,"p",4),n(9,"Simple, consistent validation error messages for your Angular forms."),t()()(),r(10,"h2"),n(11,"Tired of writing the same validation logic again, and again?"),t(),m(12,"demo-problem"),r(13,"h2"),n(14,"Our solution: ngx-valdemort"),t(),m(15,"demo-solution"),r(16,"h2"),n(17,"Consistent error messages? We've got you covered!"),t(),m(18,"demo-consistency"),r(19,"h2"),n(20,"Easily adapt ngx-valdemort to your preferences"),t(),m(21,"demo-configuration"),r(22,"h2"),n(23,"It works with "),r(24,"code"),n(25,"ngModel"),t(),n(26," too!"),t(),m(27,"demo-ng-model"),r(28,"h2",5),n(29,"Features"),t(),r(30,"div",6)(31,"div",7)(32,"div",8),m(33,"i",9),r(34,"h3"),n(35,"Easy to use"),t()(),r(36,"ul")(37,"li"),n(38,"Minimum markup needed"),t(),r(39,"li"),n(40,"Add "),r(41,"code"),n(42,"val-errors"),t(),n(43,", and you're set!"),t(),r(44,"li"),n(45,"Consistent, default error messages"),t()()(),r(46,"div",7)(47,"div",8),m(48,"i",10),r(49,"h3"),n(50,"Configurable"),t()(),r(51,"ul")(52,"li"),n(53,"Overriding of default messages for custom error messages"),t(),r(54,"li"),n(55,"Access to the error value (min, max, required length, etc.)"),t(),r(56,"li"),n(57,"Central configuration service"),t()()(),r(58,"div",7)(59,"div",8),m(60,"i",11),r(61,"h3"),n(62,"Customisable"),t()(),r(63,"ul")(64,"li"),n(65,"I18n possible"),t(),r(66,"li"),n(67,"HTML in messages possible"),t(),r(68,"li"),n(69,"Use of pipes in messages possible"),t(),r(70,"li"),n(71," A fallback message can be specified to handle forgotten errors or to display multiple error types the same way using i18n (see API documentation) "),t()()()(),r(72,"div",12)(73,"div",7)(74,"div",8),m(75,"i",13),r(76,"h3"),n(77,"Usable everywhere"),t()(),r(78,"ul")(79,"li"),n(80,"In reactive forms, template-driven forms, or standalone controls"),t(),r(81,"li"),n(82,"On controls nested in form groups or form arrays"),t()()(),r(83,"div",7)(84,"div",8),m(85,"i",14),r(86,"h4"),n(87,"Free, and open-source."),t()(),r(88,"ul")(89,"li"),n(90,"MIT license"),t(),r(91,"li")(92,"a",15),n(93,"The code is available on Github"),t()()()()(),r(94,"h2",16),n(95,"You convinced me. How to get started?"),t(),m(96,"demo-getting-started"))},dependencies:[re,oe,ie,ne,ee,Q],styles:['@charset "UTF-8";.logo[_ngcontent-%COMP%]{text-align:center}.logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:220px}@media (min-width: 576px){.logo[_ngcontent-%COMP%]{text-align:left;margin-top:-40px}}.feature-block[_ngcontent-%COMP%]{padding:2rem}.feature-block[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%]{font-size:5rem;color:#212529bf}.feature-block[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.5rem}.feature-block[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;margin-left:0;padding-left:0}.feature-block[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before{content:"\\2713";padding-right:1ch}']})};var Ue=[{path:"",component:ae},{path:"bootstrap",loadComponent:()=>import("./chunk-FJTRS2PW.js").then(i=>i.BootstrapComponent)},{path:"material",loadComponent:()=>import("./chunk-7PL6YVXK.js").then(i=>i.MaterialComponent)}];var St="@",Et=(()=>{class i{doc;delegate;zone;animationType;moduleImpl;_rendererFactoryPromise=null;scheduler=C(ce,{optional:!0});loadingSchedulerFn=C(Tt,{optional:!0});_engine;constructor(e,a,l,u,U){this.doc=e,this.delegate=a,this.zone=l,this.animationType=u,this.moduleImpl=U}ngOnDestroy(){this._engine?.flush()}loadImpl(){let e=()=>this.moduleImpl??import("./chunk-M2TFR4HF.js").then(l=>l),a;return this.loadingSchedulerFn?a=this.loadingSchedulerFn(e):a=e(),a.catch(l=>{throw new me(5300,!1)}).then(({\u0275createEngine:l,\u0275AnimationRendererFactory:u})=>{this._engine=l(this.animationType,this.doc);let U=new u(this.delegate,this._engine,this.zone);return this.delegate=U,U})}createRenderer(e,a){let l=this.delegate.createRenderer(e,a);if(l.\u0275type===0)return l;typeof l.throwOnSyntheticProps=="boolean"&&(l.throwOnSyntheticProps=!1);let u=new le(l);return a?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(U=>{let We=U.createRenderer(e,a);u.use(We),this.scheduler?.notify(11)}).catch(U=>{u.use(l)}),u}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}static \u0275fac=function(a){_e()};static \u0275prov=se({token:i,factory:i.\u0275fac})}return i})(),le=class{delegate;replay=[];\u0275type=1;constructor(o){this.delegate=o}use(o){if(this.delegate=o,this.replay!==null){for(let e of this.replay)e(o);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(o,e){return this.delegate.createElement(o,e)}createComment(o){return this.delegate.createComment(o)}createText(o){return this.delegate.createText(o)}get destroyNode(){return this.delegate.destroyNode}appendChild(o,e){this.delegate.appendChild(o,e)}insertBefore(o,e,a,l){this.delegate.insertBefore(o,e,a,l)}removeChild(o,e,a){this.delegate.removeChild(o,e,a)}selectRootElement(o,e){return this.delegate.selectRootElement(o,e)}parentNode(o){return this.delegate.parentNode(o)}nextSibling(o){return this.delegate.nextSibling(o)}setAttribute(o,e,a,l){this.delegate.setAttribute(o,e,a,l)}removeAttribute(o,e,a){this.delegate.removeAttribute(o,e,a)}addClass(o,e){this.delegate.addClass(o,e)}removeClass(o,e){this.delegate.removeClass(o,e)}setStyle(o,e,a,l){this.delegate.setStyle(o,e,a,l)}removeStyle(o,e,a){this.delegate.removeStyle(o,e,a)}setProperty(o,e,a){this.shouldReplay(e)&&this.replay.push(l=>l.setProperty(o,e,a)),this.delegate.setProperty(o,e,a)}setValue(o,e){this.delegate.setValue(o,e)}listen(o,e,a){return this.shouldReplay(e)&&this.replay.push(l=>l.listen(o,e,a)),this.delegate.listen(o,e,a)}shouldReplay(o){return this.replay!==null&&o.startsWith(St)}},Tt=new pe("");function ze(i="animations"){return fe("NgAsyncAnimations"),de([{provide:ve,useFactory:(o,e,a)=>new Et(o,e,a,i),deps:[Ne,Oe,ue]},{provide:ge,useValue:i==="noop"?"NoopAnimations":"BrowserAnimations"}])}var Ye={providers:[Le(Ue),ze(),Ie(Pe()),Ge(),ye()]};Re(K,Ye).catch(i=>console.error(i));
