import{a as y,b as P,c as w,d as E,g as c,h as S,j as v,n as k,q as N,r as I}from"./chunk-QG7LUQJH.js";import{c as x}from"./chunk-7FRV2PME.js";import{$a as p,Ba as g,Ca as u,Sa as o,Ta as i,Ua as d,Wa as f,Ya as s,_a as b,ab as h,ba as C,bb as _,db as O,ya as M}from"./chunk-7SA4OEOS.js";var F=(()=>{let a=class a{constructor(t,e){this.router=t,this.firestore=e,this.mail="",this.contrasenia="",this.notificacion=""}ngOnInit(){let t=localStorage.getItem("Tp1UsuarioLogueado");t!=null&&t!=null&&this.goToHome()}registrar(){if(this.mail!=""&&this.contrasenia!=""){let t=v();S(t,this.mail,this.contrasenia).then(e=>{let n=e.user;this.guardarUsuarioLogueado(n.email),this.goToHome()}).catch(e=>{let n=e.code,l=e.message;switch(n){case c.INVALID_EMAIL:this.mostrarNotificacion("Email inv\xE1lido.");break;case c.EMAIL_EXISTS:this.mostrarNotificacion("Este email ya se encuentra registrado.");break;case c.OPERATION_NOT_ALLOWED:this.mostrarNotificacion("Operaci\xF3n no permitida.");break;case c.WEAK_PASSWORD:this.mostrarNotificacion("Contrase\xF1a d\xE9bil.");break;default:this.mostrarNotificacion("Ha ocurrido un error al registrar. Intente de nuevo mas tarde.");break}})}else this.mostrarNotificacion("Complete ambos campos")}guardarUsuarioLogueado(t){localStorage.setItem("Tp1UsuarioLogueado",t);let e=k(this.firestore,"logins");N(e,{fecha:new Date,user:t})}goToHome(){this.router.navigate(["/home"])}mostrarNotificacion(t){this.notificacion=t;let e=document.querySelector(".notification");e.style.visibility="visible"}esconderNotificacion(){this.notificacion="";let t=document.querySelector(".notification");t.style.visibility="hidden"}};a.\u0275fac=function(e){return new(e||a)(u(x),u(I))},a.\u0275cmp=C({type:a,selectors:[["app-registrar"]],standalone:!0,features:[O],decls:19,vars:3,consts:[["href",M`https://fonts.googleapis.com/css?family=Ubuntu:500`,"rel","stylesheet","type","text/css"],[1,"login"],[1,"login-form"],[1,"login-header"],["type","email","placeholder","Mail",3,"ngModelChange","ngModel"],["type","password","placeholder","Contrase\xF1a",3,"ngModelChange","ngModel"],[1,"button","is-link",3,"click"],[1,"notification","is-danger","is-light",2,"visibility","hidden"],[1,"delete",3,"click"]],template:function(e,n){e&1&&(d(0,"link",0),o(1,"div",1)(2,"div",2)(3,"div",3)(4,"h1"),s(5,"Registrate"),i()(),o(6,"h3"),s(7,"Mail:"),i(),o(8,"input",4),_("ngModelChange",function(r){return h(n.mail,r)||(n.mail=r),r}),i(),d(9,"br"),o(10,"h3"),s(11,"Contrase\xF1a:"),i(),o(12,"input",5),_("ngModelChange",function(r){return h(n.contrasenia,r)||(n.contrasenia=r),r}),i(),d(13,"br"),o(14,"button",6),f("click",function(){return n.registrar()}),s(15,"Registrar"),i()(),o(16,"div",7)(17,"button",8),f("click",function(){return n.esconderNotificacion()}),i(),s(18),i()()),e&2&&(g(8),p("ngModel",n.mail),g(4),p("ngModel",n.contrasenia),g(6),b(" ",n.notificacion," "))},dependencies:[E,y,P,w],styles:["[_nghost-%COMP%]{margin:0;font-family:Ubuntu,sans-serif;background-size:100% 110%;width:10vw}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], a[_ngcontent-%COMP%]{margin:0;padding:0}.login[_ngcontent-%COMP%]{margin:0 auto;max-width:500px}.login-header[_ngcontent-%COMP%]{color:#fff;text-align:center;font-size:300%}.login-form[_ngcontent-%COMP%]{border:.5px solid #fff;background:#4facff;border-radius:10px;box-shadow:0 0 10px #000}.login-form[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{text-align:left;margin-left:40px;color:#fff}.login-form[_ngcontent-%COMP%]{box-sizing:border-box;padding-top:15px;padding-bottom:10%;margin:5% auto;text-align:center}.login[_ngcontent-%COMP%]   input[type=email][_ngcontent-%COMP%], .login[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{max-width:400px;width:80%;line-height:3em;font-family:Ubuntu,sans-serif;margin:1em 2em;border-radius:5px;border:2px solid #f2f2f2;outline:none;padding-left:10px}.login-form[_ngcontent-%COMP%]   input[type=button][_ngcontent-%COMP%]{height:30px;width:100px;background:#fff;border:1px solid #f2f2f2;border-radius:20px;color:#708090;text-transform:uppercase;font-family:Ubuntu,sans-serif;cursor:pointer}.no-access[_ngcontent-%COMP%]{color:#e86850;margin:20px 0 20px -57%;text-decoration:underline;cursor:pointer}.try-again[_ngcontent-%COMP%]{color:#f2f2f2;text-decoration:underline;cursor:pointer}@media only screen and (min-width: 150px) and (max-width: 530px){.login-form[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{text-align:center;margin:0}.sign-up[_ngcontent-%COMP%], .no-access[_ngcontent-%COMP%]{margin:10px 0}.login-button[_ngcontent-%COMP%]{margin-bottom:10px}}"]});let m=a;return m})();export{F as RegistrarComponent};
