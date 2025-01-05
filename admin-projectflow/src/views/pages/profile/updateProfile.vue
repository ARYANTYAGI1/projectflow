<template>
  <!-- Page Top Heading -->
  <div>
    <section class="profile-page mt-3">
      <div class="container-fluid">
        <el-card v-loading="loading" :style="cardStyle">
          <el-form ref="profileForm" :model="profileForm" :rules="rules" label-width="auto" label-position="top" class="common-form-layout">
            <el-row :gutter="20">
              <el-col :md="24">
                <el-form-item :label="$t('updateProfile.form.profilePicture')">
                  <div class="d-flex align-items-center">
                    <div v-if="profileForm.picture" slot="error" class="image-slot pointer me-2 position-relative">
                      <img v-if="profileForm.picture" :src="profileForm.picture" class="el-upload-list__item-thumbnail" style="width:148px; height:148px; margin-right:10px; border-radius:8px; object-fit:cover;">
                    </div>
                    <el-upload action="#" list-type="picture-card" :on-change="handleFileChange" :on-remove="handleRemoveFile" :on-preview="handlePictureCardPreview" accept="image/*" :auto-upload="false" :limit="1">
                      <el-icon v-if="!profileForm.picture"><Plus /></el-icon>
                      <el-icon v-else><Edit /></el-icon>
                    </el-upload>
                  </div>
                  <el-dialog v-model="dialogVisible">
                    <img :src="dialogImageUrl" alt="Preview Image" style="width: -webkit-fill-available;max-height: 550px;object-fit: contain;" />
                  </el-dialog>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item :label="$t('user.firstName')" prop="firstName">
                  <el-input v-model="profileForm.firstName" :placeholder="$t('user.firstName')"/>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item :label="$t('user.lastName')" prop="lastName">
                  <el-input v-model="profileForm.lastName" :placeholder="$t('user.lastName')"/>
                </el-form-item>
              </el-col>
            </el-row>
            <h4>{{ $t('updateProfile.form.heading') }}</h4>
            <el-divider />
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item :label="$t('updateProfile.form.address')">
                  <el-input type="text" v-model="profileForm.address" :placeholder="$t('updateProfile.form.address')" />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item :label="$t('company.city')">
                  <el-input type="text" v-model="profileForm.city" :placeholder="$t('company.city')" />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item :label="$t('company.province')">
                  <el-input type="text" v-model="profileForm.province" :placeholder="$t('company.province')" />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item :label="$t('company.region')">
                  <el-input type="text" v-model="profileForm.region" :placeholder="$t('company.region')" />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item :label="$t('updateProfile.form.zip')">
                  <el-input v-model="profileForm.zipCode" :placeholder="$t('updateProfile.form.zip')" />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item :label="$t('company.state')">
                  <el-input v-model="profileForm.state" :placeholder="$t('company.state')" />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="d-flex align-items-center justify-content-center fixed-h-card-btn">
              <el-button class="btn btn-primary" :disabled="addingRequest" @click="submitForm('profileForm')">{{ $t('company.updateProfile') }}<span v-if="addingRequest">...</span></el-button>
              <el-button class="btn btn-secondary ms-2" @click="closeProfile()">{{ $t('company.cancel') }}</el-button>
            </div>
          </el-form>
        </el-card>
      </div>
    </section>
  </div>
</template>
<script>
import { getUserProfile, updateProfile } from '@/api/user'

export default {
  page: {
    title: "Update Profile",
    meta: [{ name: "description" }]
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      loading: false,
      addingRequest: false,
      profileForm: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        province: '',
        state: '',
        region: '',
        zipCode: '',
        imageFile: '',
        image: ''
      },
      rules: {
        firstName: [
          { required: true, message: this.$t('company.firstNameIsRequired'), trigger: 'change' }
        ],
        lastName: [
          { required: true, message: this.$t('company.lastNameIsRequired'), trigger: 'change' }
        ]
      },
      cardStyle: {
        minHeight: '0px',
        overflow: 'auto'
      }
    }
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    async getUserProfile() {
      this.loading = true
      const pres = await getUserProfile()
      this.profileForm = pres.data.data
      this.loading = false
    },
    handleRemoveFile() {
      this.profileForm.imageFile = ''
      this.fileList = []
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleFileChange(file) {
      this.profileForm.picture = ''
      const isJPG = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isLt2M = file.raw.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.profileForm.imageFile = ''
        this.$message.error("Image format should be jpg, png")
        // fileList = fileList.pop()
        return false
      }
      if (!isLt2M) {
        this.profileForm.imageFile = ''
        this.$message.error("Image must be less than 2 Mb")
        // fileList = fileList.pop()
        return false
      }
      var file = file.raw
      if (isJPG && isLt2M) {
        this.profileForm.imageFile = file
        this.profileForm.picture = file.url
      } else {
        this.profileForm.imageFile = ''
        this.fileList = []
      }
    },
    closeProfile() {
      this.$router.push('/profile')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addingRequest = true
          var opts = this.profileForm
          updateProfile(opts).then(response => {
            this.addingRequest = false
            this.profileDetail = response.data.data
            this.profileForm = this.profileDetail
            this.$store.dispatch('GetUserInfo').then((response) => { }).catch(error => { console.log(error) })
            this.$message({ title: 'success', message: response.data.message, type: 'success', duration: 3000 })
            this.getUserProfile()
            this.$router.push('/profile')
          }).catch(error => {
            this.addingRequest = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
.profile-page .profile-page-card {
  border-top: none !important;
}
</style>
