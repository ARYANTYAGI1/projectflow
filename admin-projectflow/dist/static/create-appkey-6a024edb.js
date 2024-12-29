import{a as R,d as $,e as k}from"./setting-3e7a5288.js";import{a as V}from"./vuex-235c7b47.js";import{_ as w}from"./index-b0184b1b.js";import{an as a,au as C,o as l,c as p,a as u,M as A,C as o,y as r,D as _,E as g,s as x}from"./@vue-7664832f.js";import"./js-cookie-edb2da2a.js";import"./vue-router-627d3bcd.js";import"./axios-dd1c8fc2.js";import"./element-plus-97d68548.js";import"./lodash-es-2e98bc53.js";import"./@element-plus-7759aa15.js";import"./@popperjs-d53b9d70.js";import"./@ctrl-f8748455.js";import"./dayjs-de1d8cda.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-10c90328.js";import"./vue-i18n-f00e7388.js";import"./@intlify-ddb89f4e.js";import"./simplebar-vue-88307be6.js";import"./simplebar-core-cc63b2ef.js";import"./metismenujs-584191f1.js";import"./bootstrap-vue-next-01df5512.js";import"./maska-1eacf752.js";import"./moment-aaecb89a.js";const D={page:{title:"Create Key",meta:[{name:"description"}]},data(){return{addingRequest:!1,detailLoading:!1,id:"",ruleForm:{applicationKey:""},rules:{applicationKey:[{required:!0,message:this.$t("company.deviceNameIsRequired"),trigger:"change"}]}}},created(){this.getPageInfo()},computed:{...V(["userType","userid"])},methods:{async getPageInfo(){this.detailLoading=!0;const s=this.$route.params.id;if(this.id=s,s){let i=await R();this.ruleForm=i.data.data}this.detailLoading=!1},sumbitForm(s){this.$refs[s].validate(i=>{if(i){const{applicationKey:m,_id:n}=this.ruleForm,e={applicationKey:m};n?(this.addingRequest=!0,$(n,e).then(t=>{this.addingRequest=!1,this.$message({type:"success",message:t.data.message}),this.$router.push({path:"/settings"})}).catch(t=>{this.addingRequest=!1,this.$message.error(t.message)})):(this.addingRequest=!0,k(e).then(t=>{this.addingRequest=!1,this.$router.push({path:"/settings"}),this.$refs[s].resetFields(),this.$message({type:"success",message:t.data.message})}).catch(t=>{console.log(t),this.addingRequest=!1,this.$message.error(t.message)}))}else return console.log("error submit!!"),!1})}}},L={class:"profile-page mt-3"},N={class:"container-fluid"},B={class:"d-flex align-items-center justify-content-center mt-4"},I={key:0};function E(s,i,m,n,e,t){const f=a("el-input"),h=a("el-form-item"),y=a("el-col"),b=a("el-row"),d=a("el-button"),v=a("router-link"),q=a("el-form"),F=a("el-card"),K=C("loading");return l(),p("div",null,[u("section",L,[A((l(),p("div",N,[o(F,null,{default:r(()=>[o(q,{ref:"ruleForm",model:e.ruleForm,rules:e.rules,"label-width":"auto","label-position":"top"},{default:r(()=>[o(b,{gutter:20},{default:r(()=>[o(y,{md:24},{default:r(()=>[o(h,{label:s.$t("user.ApplicationKey"),prop:"applicationKey"},{default:r(()=>[o(f,{modelValue:e.ruleForm.applicationKey,"onUpdate:modelValue":i[0]||(i[0]=c=>e.ruleForm.applicationKey=c),type:"text"},null,8,["modelValue"])]),_:1},8,["label"])]),_:1})]),_:1}),u("div",B,[o(d,{class:"btn btn-primary",disabled:e.addingRequest,onClick:i[1]||(i[1]=c=>t.sumbitForm("ruleForm"))},{default:r(()=>[_(g(s.$t("company.save")),1),e.addingRequest?(l(),p("span",I," ...")):x("",!0)]),_:1},8,["disabled"]),o(v,{to:"/settings"},{default:r(()=>[o(d,{class:"btn btn-secondary ms-3"},{default:r(()=>[_(g(s.$t("company.cancel")),1)]),_:1})]),_:1})])]),_:1},8,["model","rules"])]),_:1})])),[[K,e.detailLoading]])])])}const pe=w(D,[["render",E]]);export{pe as default};