import{g as R,u as $,c as V}from"./setting-3e7a5288.js";import{a as k}from"./vuex-235c7b47.js";import{_ as w}from"./index-b0184b1b.js";import{an as i,au as C,o as l,c as m,a as p,M as x,C as o,y as a,D as _,E as g,s as D}from"./@vue-7664832f.js";import"./js-cookie-edb2da2a.js";import"./vue-router-627d3bcd.js";import"./axios-dd1c8fc2.js";import"./element-plus-97d68548.js";import"./lodash-es-2e98bc53.js";import"./@element-plus-7759aa15.js";import"./@popperjs-d53b9d70.js";import"./@ctrl-f8748455.js";import"./dayjs-de1d8cda.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-10c90328.js";import"./vue-i18n-f00e7388.js";import"./@intlify-ddb89f4e.js";import"./simplebar-vue-88307be6.js";import"./simplebar-core-cc63b2ef.js";import"./metismenujs-584191f1.js";import"./bootstrap-vue-next-01df5512.js";import"./maska-1eacf752.js";import"./moment-aaecb89a.js";const L={page:{title:"Create Key",meta:[{name:"description"}]},data(){return{addingRequest:!1,detailLoading:!1,id:"",ruleForm:{secretKey:""},rules:{secretKey:[{required:!0,message:this.$t("company.deviceNameIsRequired"),trigger:"change"}]}}},created(){this.getPageInfo()},computed:{...k(["userType","userid"])},methods:{async getPageInfo(){this.detailLoading=!0;const t=this.$route.params.id;if(this.id=t,t){let r=await R();this.ruleForm=r.data.data}this.detailLoading=!1},sumbitForm(t){this.$refs[t].validate(r=>{if(r){const{secretKey:d,_id:n}=this.ruleForm,e={secretKey:d};n?(this.addingRequest=!0,$(n,e).then(s=>{this.addingRequest=!1,this.$message({type:"success",message:s.data.message}),this.$router.push({path:"/settings"})}).catch(s=>{this.addingRequest=!1,this.$message.error(s.message)})):(this.addingRequest=!0,V(e).then(s=>{this.addingRequest=!1,this.$router.push({path:"/settings"}),this.$refs[t].resetFields(),this.$message({type:"success",message:s.data.message})}).catch(s=>{this.addingRequest=!1,this.$message.error(s.message)}))}else return console.log("error submit!!"),!1})}}},N={class:"profile-page mt-3"},B={class:"container-fluid"},I={class:"d-flex align-items-center justify-content-center mt-4"},E={key:0};function P(t,r,d,n,e,s){const f=i("el-input"),h=i("el-form-item"),y=i("el-col"),b=i("el-row"),c=i("el-button"),v=i("router-link"),K=i("el-form"),q=i("el-card"),F=C("loading");return l(),m("div",null,[p("section",N,[x((l(),m("div",B,[o(q,null,{default:a(()=>[o(K,{ref:"ruleForm",model:e.ruleForm,rules:e.rules,"label-width":"auto","label-position":"top"},{default:a(()=>[o(b,{gutter:20},{default:a(()=>[o(y,{md:24},{default:a(()=>[o(h,{label:t.$t("user.secretKey"),prop:"secretKey"},{default:a(()=>[o(f,{modelValue:e.ruleForm.secretKey,"onUpdate:modelValue":r[0]||(r[0]=u=>e.ruleForm.secretKey=u),type:"text"},null,8,["modelValue"])]),_:1},8,["label"])]),_:1})]),_:1}),p("div",I,[o(c,{class:"btn btn-primary",disabled:e.addingRequest,onClick:r[1]||(r[1]=u=>s.sumbitForm("ruleForm"))},{default:a(()=>[_(g(t.$t("company.save")),1),e.addingRequest?(l(),m("span",E," ...")):D("",!0)]),_:1},8,["disabled"]),o(v,{to:"/settings"},{default:a(()=>[o(c,{class:"btn btn-secondary ms-3"},{default:a(()=>[_(g(t.$t("company.cancel")),1)]),_:1})]),_:1})])]),_:1},8,["model","rules"])]),_:1})])),[[F,e.detailLoading]])])])}const me=w(L,[["render",P]]);export{me as default};
