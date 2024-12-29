<template>
  <div>
    <section class="profile-page mt-3">
      <div v-loading="detailLoading" class="container-fluid">
        <el-card>
          <el-form  ref="signupForm" :model="signupForm" :rules="rules" label-width="auto" label-position="top">
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item :label="$t('user.firstName')" prop="firstName">
                  <el-input v-model="signupForm.firstName" type="text" />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item :label="$t('user.lastName')" prop="lastName">
                  <el-input v-model="signupForm.lastName" type="text" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item :label="$t('company.email')" prop="email">
                  <el-input v-model="signupForm.email" type="text" :disabled="!!signupForm._id" />
                </el-form-item>
              </el-col>
              <el-col :md="12" v-if="!id">
                <el-form-item :label="$t('company.password')" prop="password">
                  <el-input v-model="signupForm.password" type="password" show-password />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="d-flex align-items-center justify-content-center mt-4">
              <el-button class="btn btn-primary" :disabled="signupRequest" @click="doSignup('signupForm')">{{ $t('company.save') }}<span v-if="signupRequest"> ...</span></el-button>
              <router-link :to="'/'">
                <el-button class="btn btn-secondary ms-3">{{ $t('company.cancel') }}</el-button>
              </router-link>
            </div>
          </el-form>
        </el-card>
      </div>
    </section>
  </div>
</template>

<script>
import { doSignUp } from '@/api/login'
import { getUserDetail, updateUser } from '@/api/user'
export default {
  page: {
    title: 'Create Profile',
    meta: [{ name: 'description' }]
  },
  data() {
    return {
      signupRequest: false,
      detailLoading: false,
      id: '',
      signupForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      rules: {
        firstName: [
          { required: true, message: this.$t('company.firstNameIsRequired'), trigger: 'change' }
        ],
        lastName: [
          { required: true, message: this.$t('company.lastNameIsRequired'), trigger: 'change' }
        ],
        email: [
          { required: true, message: this.$t('company.emailIsRequired'), trigger: 'change' },
          { type: 'email', message: this.$t('company.validEmail'), trigger: 'change' }
        ],
        password: [
          { required: true, message: this.$t('company.passwordIsRequired'), trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getPageInfo()
  },
  methods: {
    async getPageInfo() {
      this.detailLoading = true
      this.id = this.$route.params && this.$route.params.id
      if (this.id) {
        const res = await getUserDetail(this.id)
        this.signupForm = res.data.data
      }
      this.detailLoading = false
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    doSignup(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.validEmail(this.signupForm.email)) {
            this.signupForm.email = ''
            return false
          }
          const { firstName, lastName, email, address, password, _id } = this.signupForm
          const opts = { firstName, lastName, email, address, userType: 2, isCreatedByAdmin: true }
          if (_id) {
            opts._id = _id
            this.signupRequest = true
            updateUser(_id, opts).then(response => {
              this.signupRequest = false
              this.$message({ type: 'success', message: response.data.message })
              this.$router.push({ path: '/' })
            }).catch(error => {
              this.signupRequest = false
              this.$message.error(error.message)
            })
          } else {
            opts.password = password
            this.signupRequest = true
            doSignUp(opts).then(response => {
              this.signupRequest = false
              this.$router.push({ path: '/login' })
              this.$refs[formName].resetFields()
              this.$message({ type: 'success', message: response.data.message })
            }).catch(error => {
              this.signupRequest = false
              this.$message.error(error.message)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
