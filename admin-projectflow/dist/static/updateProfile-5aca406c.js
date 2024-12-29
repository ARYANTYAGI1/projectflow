import{e as I,f as z}from"./user-c789e581.js";import{_ as D}from"./index-b0184b1b.js";import{an as s,au as j,o as p,c as g,a as u,M as B,l as h,y as o,q as E,C as e,s as _,E as F,D as V}from"./@vue-7664832f.js";import"./axios-dd1c8fc2.js";import"./vuex-235c7b47.js";import"./js-cookie-edb2da2a.js";import"./vue-router-627d3bcd.js";import"./element-plus-97d68548.js";import"./lodash-es-2e98bc53.js";import"./@element-plus-7759aa15.js";import"./@popperjs-d53b9d70.js";import"./@ctrl-f8748455.js";import"./dayjs-de1d8cda.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-10c90328.js";import"./vue-i18n-f00e7388.js";import"./@intlify-ddb89f4e.js";import"./simplebar-vue-88307be6.js";import"./simplebar-core-cc63b2ef.js";import"./metismenujs-584191f1.js";import"./bootstrap-vue-next-01df5512.js";import"./maska-1eacf752.js";import"./moment-aaecb89a.js";const L={page:{title:"Update Profile",meta:[{name:"description"}]},data(){return{dialogImageUrl:"",dialogVisible:!1,fileList:[],loading:!1,addingRequest:!1,profileForm:{firstName:"",lastName:"",address:"",city:"",province:"",state:"",region:"",zipCode:"",imageFile:"",image:""},rules:{firstName:[{required:!0,message:this.$t("company.firstNameIsRequired"),trigger:"change"}],lastName:[{required:!0,message:this.$t("company.lastNameIsRequired"),trigger:"change"}]},cardStyle:{minHeight:"0px",overflow:"auto"}}},created(){this.getUserProfile()},methods:{async getUserProfile(){this.loading=!0;const r=await I();this.profileForm=r.data.data,this.loading=!1},handleRemoveFile(){this.profileForm.imageFile="",this.fileList=[]},handlePictureCardPreview(r){this.dialogImageUrl=r.url,this.dialogVisible=!0},handleFileChange(a){this.profileForm.picture="";const t=a.raw.type==="image/jpeg"||a.raw.type==="image/png",f=a.raw.size/1024/1024<2;if(!t)return this.profileForm.imageFile="",this.$message.error("Image format should be jpg, png"),!1;if(!f)return this.profileForm.imageFile="",this.$message.error("Image must be less than 2 Mb"),!1;var a=a.raw;t&&f?(this.profileForm.imageFile=a,this.profileForm.picture=a.url):(this.profileForm.imageFile="",this.fileList=[])},closeProfile(){this.$router.push("/profile")},submitForm(r){this.$refs[r].validate(t=>{if(t){this.addingRequest=!0;var f=this.profileForm;z(f).then(a=>{this.addingRequest=!1,this.profileDetail=a.data.data,this.profileForm=this.profileDetail,this.$store.dispatch("GetUserInfo").then(l=>{}).catch(l=>{console.log(l)}),this.$message({title:"success",message:a.data.message,type:"success",duration:3e3}),this.getUserProfile(),this.$router.push("/profile")}).catch(a=>{console.log(a,"error"),this.addingRequest=!1})}else return console.log("error submit!!"),!1})}}},S={class:"profile-page mt-3"},M={class:"container-fluid"},G={class:"d-flex align-items-center"},$={key:0,slot:"error",class:"image-slot pointer me-2 position-relative"},H=["src"],J=["src"],T={class:"d-flex align-items-center justify-content-center fixed-h-card-btn"},A={key:0};function K(r,t,f,a,l,c){const P=s("Plus"),b=s("el-icon"),N=s("Edit"),w=s("el-upload"),U=s("el-dialog"),m=s("el-form-item"),n=s("el-col"),d=s("el-input"),y=s("el-row"),C=s("el-divider"),v=s("el-button"),k=s("el-form"),q=s("el-card"),R=j("loading");return p(),g("div",null,[u("section",S,[u("div",M,[B((p(),h(q,{style:E(l.cardStyle)},{default:o(()=>[e(k,{ref:"profileForm",model:l.profileForm,rules:l.rules,"label-width":"auto","label-position":"top",class:"common-form-layout"},{default:o(()=>[e(y,{gutter:20},{default:o(()=>[e(n,{md:24},{default:o(()=>[e(m,{label:r.$t("updateProfile.form.profilePicture")},{default:o(()=>[u("div",G,[l.profileForm.picture?(p(),g("div",$,[l.profileForm.picture?(p(),g("img",{key:0,src:l.profileForm.picture,class:"el-upload-list__item-thumbnail",style:{width:"148px",height:"148px","margin-right":"10px","border-radius":"8px","object-fit":"cover"}},null,8,H)):_("",!0)])):_("",!0),e(w,{action:"#","list-type":"picture-card","on-change":c.handleFileChange,"on-remove":c.handleRemoveFile,"on-preview":c.handlePictureCardPreview,accept:"image/*","auto-upload":!1,limit:1},{default:o(()=>[l.profileForm.picture?(p(),h(b,{key:1},{default:o(()=>[e(N)]),_:1})):(p(),h(b,{key:0},{default:o(()=>[e(P)]),_:1}))]),_:1},8,["on-change","on-remove","on-preview"])]),e(U,{modelValue:l.dialogVisible,"onUpdate:modelValue":t[0]||(t[0]=i=>l.dialogVisible=i)},{default:o(()=>[u("img",{src:l.dialogImageUrl,alt:"Preview Image",style:{width:"-webkit-fill-available","max-height":"550px","object-fit":"contain"}},null,8,J)]),_:1},8,["modelValue"])]),_:1},8,["label"])]),_:1}),e(n,{md:12},{default:o(()=>[e(m,{label:r.$t("user.firstName"),prop:"firstName"},{default:o(()=>[e(d,{modelValue:l.profileForm.firstName,"onUpdate:modelValue":t[1]||(t[1]=i=>l.profileForm.firstName=i),placeholder:r.$t("user.firstName")},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1}),e(n,{md:12},{default:o(()=>[e(m,{label:r.$t("user.lastName"),prop:"lastName"},{default:o(()=>[e(d,{modelValue:l.profileForm.lastName,"onUpdate:modelValue":t[2]||(t[2]=i=>l.profileForm.lastName=i),placeholder:r.$t("user.lastName")},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1})]),_:1}),u("h4",null,F(r.$t("updateProfile.form.heading")),1),e(C),e(y,{gutter:20},{default:o(()=>[e(n,{md:12},{default:o(()=>[e(m,{label:r.$t("updateProfile.form.address")},{default:o(()=>[e(d,{type:"text",modelValue:l.profileForm.address,"onUpdate:modelValue":t[3]||(t[3]=i=>l.profileForm.address=i),placeholder:r.$t("updateProfile.form.address")},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1}),e(n,{md:12},{default:o(()=>[e(m,{label:r.$t("company.city")},{default:o(()=>[e(d,{type:"text",modelValue:l.profileForm.city,"onUpdate:modelValue":t[4]||(t[4]=i=>l.profileForm.city=i),placeholder:r.$t("company.city")},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1}),e(n,{md:12},{default:o(()=>[e(m,{label:r.$t("company.province")},{default:o(()=>[e(d,{type:"text",modelValue:l.profileForm.province,"onUpdate:modelValue":t[5]||(t[5]=i=>l.profileForm.province=i),placeholder:r.$t("company.province")},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1}),e(n,{md:12},{default:o(()=>[e(m,{label:r.$t("company.region")},{default:o(()=>[e(d,{type:"text",modelValue:l.profileForm.region,"onUpdate:modelValue":t[6]||(t[6]=i=>l.profileForm.region=i),placeholder:r.$t("company.region")},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1}),e(n,{md:12},{default:o(()=>[e(m,{label:r.$t("updateProfile.form.zip")},{default:o(()=>[e(d,{modelValue:l.profileForm.zipCode,"onUpdate:modelValue":t[7]||(t[7]=i=>l.profileForm.zipCode=i),placeholder:r.$t("updateProfile.form.zip")},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1}),e(n,{md:12},{default:o(()=>[e(m,{label:r.$t("company.state")},{default:o(()=>[e(d,{modelValue:l.profileForm.state,"onUpdate:modelValue":t[8]||(t[8]=i=>l.profileForm.state=i),placeholder:r.$t("company.state")},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1})]),_:1}),u("div",T,[e(v,{class:"btn btn-primary",disabled:l.addingRequest,onClick:t[9]||(t[9]=i=>c.submitForm("profileForm"))},{default:o(()=>[V(F(r.$t("company.updateProfile")),1),l.addingRequest?(p(),g("span",A,"...")):_("",!0)]),_:1},8,["disabled"]),e(v,{class:"btn btn-secondary ms-2",onClick:t[10]||(t[10]=i=>c.closeProfile())},{default:o(()=>[V(F(r.$t("company.cancel")),1)]),_:1})])]),_:1},8,["model","rules"])]),_:1},8,["style"])),[[R,l.loading]])])])])}const Fe=D(L,[["render",K]]);export{Fe as default};
