import{a as d}from"./user-c789e581.js";import{_}from"./index-b0184b1b.js";import{an as r,au as h,M as u,o as f,c as g,a as o,E as v,C as c,y as n,D as y,aC as k,aD as E}from"./@vue-7664832f.js";import"./axios-dd1c8fc2.js";import"./vuex-235c7b47.js";import"./js-cookie-edb2da2a.js";import"./vue-router-627d3bcd.js";import"./element-plus-97d68548.js";import"./lodash-es-2e98bc53.js";import"./@element-plus-7759aa15.js";import"./@popperjs-d53b9d70.js";import"./@ctrl-f8748455.js";import"./dayjs-de1d8cda.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-10c90328.js";import"./vue-i18n-f00e7388.js";import"./@intlify-ddb89f4e.js";import"./simplebar-vue-88307be6.js";import"./simplebar-core-cc63b2ef.js";import"./metismenujs-584191f1.js";import"./bootstrap-vue-next-01df5512.js";import"./maska-1eacf752.js";import"./moment-aaecb89a.js";const w="/static/check-9aa1f474.png";const C={name:"VerifyEmail",bodyClass:"signup-page",components:{},data(){return{addingRequest:!1,resmessage:"",isCorrect:""}},created(){this.verifyEmail()},methods:{verifyEmail(){const e=window.location.href.split("?");if(e.length==2){const a=e[1].split("&"),t={};let i="";a.forEach(function(s){i=s.split("="),i.length==2&&(t[i[0]]=i[1])}),this.id=t.id,this.email=t.email,this.token=t.token,this.id&&this.email&&this.token?d(this.id,this.email,this.token).then(s=>{this.addingRequest=!1,this.isCorrect=1,this.resmessage=this.$t("user.verifyEmail1"),this.$message({message:"Verifica dell'account riuscita",type:"success"})}).catch(s=>{console.log(s,"error"),this.resmessage=s.message,this.addingRequest=!1,this.$message({message:"Invalid Request",type:"error"}),setTimeout(function(){this.resmessage=s.message,window.location.href="/"},5e3)}):(this.resmessage="Invalid request",setTimeout(function(){this.resmessage=error.message},2e3))}}}},$=e=>(k("data-v-f84c6c6d"),e=e(),E(),e),q={class:"verify-container"},I={class:"content"},V=$(()=>o("p",{class:"success"},[o("img",{src:w,class:"successflag",alt:"successflag"})],-1)),b={class:"message"};function x(e,a,t,i,s,D){const m=r("el-button"),p=r("router-link"),l=h("loading");return u((f(),g("div",q,[o("div",I,[V,o("p",b,v(e.$t("user.verifyEmail1")),1),c(p,{to:"/login"},{default:n(()=>[c(m,{class:"btn btn-primary"},{default:n(()=>[y("Login")]),_:1})]),_:1})])])),[[l,s.addingRequest]])}const te=_(C,[["render",x],["__scopeId","data-v-f84c6c6d"]]);export{te as default};
