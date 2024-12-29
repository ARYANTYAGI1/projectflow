import{g as x,r as A,a as T,b as C}from"./setting-3e7a5288.js";import{_ as I}from"./index-b0184b1b.js";import{an as c,au as P,o as i,c as p,C as a,y as t,a as l,D as u,E as f,s as w,M as v,l as _}from"./@vue-7664832f.js";import"./vuex-235c7b47.js";import"./js-cookie-edb2da2a.js";import"./vue-router-627d3bcd.js";import"./axios-dd1c8fc2.js";import"./element-plus-97d68548.js";import"./lodash-es-2e98bc53.js";import"./@element-plus-7759aa15.js";import"./@popperjs-d53b9d70.js";import"./@ctrl-f8748455.js";import"./dayjs-de1d8cda.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-10c90328.js";import"./vue-i18n-f00e7388.js";import"./@intlify-ddb89f4e.js";import"./simplebar-vue-88307be6.js";import"./simplebar-core-cc63b2ef.js";import"./metismenujs-584191f1.js";import"./bootstrap-vue-next-01df5512.js";import"./maska-1eacf752.js";import"./moment-aaecb89a.js";const B={data(){return{listLoading:!1,keyData:{},appKeyData:{},activeTabName:"Key"}},created(){this.getPageInfo()},watch:{activeTabName(e){e==="Key"?this.getPageInfo():e==="AppKey"&&this.getAppPageInfo()}},methods:{async getPageInfo(){this.listLoading=!0;try{const e=await x();this.keyData=e.data.data}catch(e){console.error("Error fetching key data:",e)}finally{this.listLoading=!1}},deleteKey(e,r){this.$confirm(this.$t("company.confirmToSecretKey"),this.$t("company.warning"),{confirmButtonText:this.$t("company.confirm"),cancelButtonText:this.$t("company.cancel"),type:"warning"}).then(()=>{A(r).then(n=>{this.$message.success({message:n.data.message}),this.getPageInfo()}).catch(n=>{this.$message.error({message:n.message})})}).catch(n=>{console.log(n)})},async getAppPageInfo(){this.listLoading=!0;try{const e=await T();this.appKeyData=e.data.data}catch(e){console.error("Error fetching key data:",e)}finally{this.listLoading=!1}},deleteAppKey(e,r){this.$confirm(this.$t("company.confirmToAppKey"),this.$t("company.warning"),{confirmButtonText:this.$t("company.confirm"),cancelButtonText:this.$t("company.cancel"),type:"warning"}).then(()=>{C(r).then(n=>{this.$message.success({message:n.data.message}),this.getAppPageInfo()}).catch(n=>{this.$message.error({message:n.message})})}).catch(n=>{console.log(n)})},handleClick(e){this.activeTabName=e.name,e.name==="Key"&&this.getPageInfo(),e.name==="AppKey"&&this.getAppPageInfo()}}},L={key:0,class:"d-flex justify-content-between mb-3"},V={class:"d-flex"},j={class:"user-table"},N={class:"d-flex justify-content-center"},E=l("i",{class:"mdi mdi-account-edit"},null,-1),S=l("i",{class:"mdi mdi-delete"},null,-1),O={key:0,class:"d-flex justify-content-between mb-3"},M={class:"d-flex"},U={class:"user-table"},q={class:"d-flex justify-content-center"},z=l("i",{class:"mdi mdi-account-edit"},null,-1),F=l("i",{class:"mdi mdi-delete"},null,-1);function G(e,r,n,H,o,b){const d=c("el-button"),m=c("router-link"),y=c("el-table-column"),h=c("el-table"),g=c("el-card"),k=c("el-tab-pane"),$=c("el-tabs"),K=P("loading");return i(),p("div",null,[a($,{modelValue:o.activeTabName,"onUpdate:modelValue":r[0]||(r[0]=s=>o.activeTabName=s),onTabClick:b.handleClick},{default:t(()=>[a(k,{name:"Key",label:e.$t("user.secretKey")},{default:t(()=>[l("section",null,[a(g,{class:"full-height-card"},{default:t(()=>[!o.keyData||o.keyData.length===0?(i(),p("div",L,[l("div",V,[a(m,{to:"/settings/create-key"},{default:t(()=>[a(d,{class:"btn btn-primary me-2 w-100"},{default:t(()=>[u(f(e.$t("user.addSecretKey")),1)]),_:1})]),_:1})])])):w("",!0),v((i(),p("div",j,[Object.keys(o.keyData).length>0?(i(),_(h,{key:0,data:[o.keyData],border:"",style:{width:"100%"},"empty-text":e.$t("table.noData")},{default:t(()=>[a(y,{align:"center",label:e.$t("user.secretKey")},{default:t(s=>[u(f(s.row.secretKey),1)]),_:1},8,["label"]),a(y,{align:"center",label:e.$t("table.actions"),width:"180"},{default:t(s=>[l("div",N,[a(m,{to:`/settings/create-key/${s.row._id}`,class:"pe-2"},{default:t(()=>[a(d,{class:"btn btn-primary table-icon-btn"},{default:t(()=>[E]),_:1})]),_:2},1032,["to"]),a(d,{class:"btn btn-primary delete-btn table-icon-btn",onClick:D=>b.deleteKey(s.$index,s.row._id)},{default:t(()=>[S]),_:2},1032,["onClick"])])]),_:1},8,["label"])]),_:1},8,["data","empty-text"])):(i(),_(h,{key:1,data:[],border:"",style:{width:"100%"},"empty-text":e.$t("table.noData")},null,8,["empty-text"]))])),[[K,o.listLoading]])]),_:1})])]),_:1},8,["label"]),a(k,{name:"AppKey",label:e.$t("user.ApplicationKey")},{default:t(()=>[l("section",null,[a(g,{class:"full-height-card"},{default:t(()=>[!o.appKeyData||o.appKeyData.length===0?(i(),p("div",O,[l("div",M,[a(m,{to:"/settings/create-appkey"},{default:t(()=>[a(d,{class:"btn btn-primary me-2 w-100"},{default:t(()=>[u(f(e.$t("user.addAppKey")),1)]),_:1})]),_:1})])])):w("",!0),v((i(),p("div",U,[Object.keys(o.appKeyData).length>0?(i(),_(h,{key:0,data:[o.appKeyData],border:"",style:{width:"100%"},"empty-text":e.$t("table.noData")},{default:t(()=>[a(y,{align:"center",label:e.$t("user.ApplicationKey")},{default:t(s=>[u(f(s.row.applicationKey),1)]),_:1},8,["label"]),a(y,{align:"center",label:e.$t("table.actions"),width:"180"},{default:t(s=>[l("div",q,[a(m,{to:`/settings/create-appkey/${s.row._id}`,class:"pe-2"},{default:t(()=>[a(d,{class:"btn btn-primary table-icon-btn"},{default:t(()=>[z]),_:1})]),_:2},1032,["to"]),a(d,{class:"btn btn-primary delete-btn table-icon-btn",onClick:D=>b.deleteAppKey(s.$index,s.row._id)},{default:t(()=>[F]),_:2},1032,["onClick"])])]),_:1},8,["label"])]),_:1},8,["data","empty-text"])):(i(),_(h,{key:1,data:[],border:"",style:{width:"100%"},"empty-text":e.$t("table.noData")},null,8,["empty-text"]))])),[[K,o.listLoading]])]),_:1})])]),_:1},8,["label"])]),_:1},8,["modelValue","onTabClick"])])}const be=I(B,[["render",G]]);export{be as default};