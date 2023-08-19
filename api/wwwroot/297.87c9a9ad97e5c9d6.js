"use strict";(self.webpackChunkchator=self.webpackChunkchator||[]).push([[297],{1297:(G,d,a)=>{a.r(d),a.d(d,{AuthModule:()=>k});var h=a(9808),m=a(4996),o=a(3075),f=a(3264);class i{static MatchPassword(n){n.get("password").value!=n.get("confirmPassword").value&&n.get("confirmPassword").setErrors({MatchPassword:!0})}static AtLeastOneNumber(n){let e=n.get("password").value;/\d/.test(e)||n.get("password").setErrors({AtLeastOneNumber:!0})}static AtLeastABigLetter(n){let e=n.get("password").value;/[A-Z]/.test(e)||n.get("password").setErrors({AtLeastABigLetter:!0})}static AtLeastALowerCaseLetter(n){let e=n.get("password").value;/[a-z]/.test(e)||n.get("password").setErrors({AtLeastALowerCaseLetter:!0})}static AtLeastASpecialCharacter(n){let e=n.get("password").value;/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e)||n.get("password").setErrors({AtLeastASpecialCharacter:!0})}}var t=a(5e3),b=a(2340),x=a(520);let c=(()=>{class r{constructor(e){this.http=e,this.baseUrl=b.N.baseUrl}login(e){return this.http.post(`${this.baseUrl}/auth/login`,e)}register(e){return this.http.post(`${this.baseUrl}/auth/register`,e)}}return r.\u0275fac=function(e){return new(e||r)(t.LFG(x.eN))},r.\u0275prov=t.Yz7({token:r,factory:r.\u0275fac}),r})();var C=a(8492),A=a(3382),p=a(9224),L=a(4015),M=a(7446),v=a(7423);let w=(()=>{class r{constructor(e,s,g,u,l){this.authService=e,this.fb=s,this.snackBar=g,this.logginPersister=u,this.router=l}ngOnInit(){this.createForm()}submit(){this.snackBar.info("Logging in..."),this.authService.login(this.formGroup.value).subscribe({next:e=>{f.f.setAccessToken(e.token,this.formGroup.value.rememberMe),this.logginPersister.setLoggedUser(),this.router.navigate(["/dashboard"]),this.snackBar.success("Logged In")},error:e=>{this.snackBar.error(e.error.message)}})}createForm(){this.formGroup=this.fb.group({username:["",[o.kI.required,o.kI.minLength(5),o.kI.maxLength(10)]],password:["",[o.kI.required,o.kI.minLength(6),o.kI.maxLength(10)]],rememberMe:[!1]},{validators:[i.AtLeastASpecialCharacter,i.AtLeastOneNumber,i.AtLeastABigLetter,i.AtLeastALowerCaseLetter]})}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(c),t.Y36(o.qu),t.Y36(C.c),t.Y36(A.O),t.Y36(m.F0))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-login"]],decls:11,vars:7,consts:[[1,"login"],[3,"formGroup","ngSubmit"],[3,"formControl","label"],[3,"formControl","label","type"],["type","checkbox","formControlName","rememberMe"],["mat-flat-button","","color","primary",3,"disabled"]],template:function(e,s){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"mat-card"),t.TgZ(2,"mat-card-title"),t._uU(3,"Login"),t.qZA(),t.TgZ(4,"form",1),t.NdJ("ngSubmit",function(){return s.submit()}),t._UZ(5,"app-text-input",2),t._UZ(6,"app-text-input",3),t.TgZ(7,"mat-checkbox",4),t._uU(8,"Remember me"),t.qZA(),t.TgZ(9,"button",5),t._uU(10," Login "),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.xp6(4),t.Q6J("formGroup",s.formGroup),t.xp6(1),t.Q6J("formControl",s.formGroup.controls.username)("label","Username"),t.xp6(1),t.Q6J("formControl",s.formGroup.controls.password)("label","Password")("type","password"),t.xp6(3),t.Q6J("disabled",s.formGroup.invalid))},directives:[p.a8,p.n5,o._Y,o.JL,o.sg,L.t,o.JJ,o.oH,M.oG,o.u,v.lW],styles:[".login[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.login[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{width:30%;padding:50px;border-radius:30px}.login[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;flex-flow:column;grid-gap:5px;gap:5px}.login[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   app-text-input[_ngcontent-%COMP%]{width:100%}@media screen and (max-width: 1173px){.register[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{grid-gap:12px;gap:12px}}"]}),r})();var O=a(7531);const Z=[{path:"login",component:w},{path:"register",component:(()=>{class r{constructor(e,s,g,u,l){this.authService=e,this.router=s,this.fb=g,this.snackBar=u,this.logginPersister=l}ngOnInit(){this.createForm()}submit(){this.snackBar.info("Registering..."),this.authService.register(this.formGroup.value).subscribe({next:e=>{f.f.setAccessToken(e.token),this.logginPersister.setLoggedUser(),this.router.navigate(["/dashboard"]),this.snackBar.success("Registered and Logged In")},error:e=>{this.snackBar.error(e.error.message)}})}createForm(){this.formGroup=this.fb.group({username:["",[o.kI.required,o.kI.minLength(5),o.kI.maxLength(10)]],description:[""],password:["",[o.kI.required,o.kI.minLength(8),o.kI.maxLength(20)]],confirmPassword:["",[o.kI.required,o.kI.minLength(8),o.kI.maxLength(20)]]},{validators:[i.MatchPassword,i.AtLeastASpecialCharacter,i.AtLeastOneNumber,i.AtLeastABigLetter,i.AtLeastALowerCaseLetter]})}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(c),t.Y36(m.F0),t.Y36(o.qu),t.Y36(C.c),t.Y36(A.O))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-register"]],decls:11,vars:10,consts:[[1,"register"],[3,"formGroup","ngSubmit"],[3,"formControl","label"],["matInput","","placeholder","Enter your description here...","formControlName","description","cols","30","rows","5"],[3,"formControl","label","type"],["mat-flat-button","","color","primary",3,"disabled"]],template:function(e,s){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"mat-card"),t.TgZ(2,"mat-card-title"),t._uU(3,"Register"),t.qZA(),t.TgZ(4,"form",1),t.NdJ("ngSubmit",function(){return s.submit()}),t._UZ(5,"app-text-input",2),t._UZ(6,"textarea",3),t._UZ(7,"app-text-input",4),t._UZ(8,"app-text-input",4),t.TgZ(9,"button",5),t._uU(10,"Register"),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.xp6(4),t.Q6J("formGroup",s.formGroup),t.xp6(1),t.Q6J("formControl",s.formGroup.controls.username)("label","Username"),t.xp6(2),t.Q6J("formControl",s.formGroup.controls.password)("label","Password")("type","password"),t.xp6(1),t.Q6J("formControl",s.formGroup.controls.confirmPassword)("label","Confirm Password")("type","password"),t.xp6(1),t.Q6J("disabled",s.formGroup.invalid))},directives:[p.a8,p.n5,o._Y,o.JL,o.sg,L.t,o.JJ,o.oH,O.Nt,o.Fj,o.u,v.lW],styles:[".register[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.register[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{width:30%;padding:50px;border-radius:30px}.register[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;flex-flow:column;grid-gap:5px;gap:5px}.register[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{border:1px solid #8d8989;border-radius:20px;padding:10px;width:95%;margin-bottom:10px}.register[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   app-text-input[_ngcontent-%COMP%]{width:100%;height:100%}@media screen and (max-width: 1173px){.register[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{grid-gap:12px;gap:12px}}"]}),r})()}];let P=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({providers:[c],imports:[[h.ez,m.Bz.forChild(Z)],m.Bz]}),r})();var y=a(4466);let k=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[[h.ez,P,y.m],P]}),r})()}}]);