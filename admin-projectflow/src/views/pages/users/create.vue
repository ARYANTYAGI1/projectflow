<template>
  <div>
    <section class="profile-page mt-3">
      <div v-loading="detailLoading" class="container-fluid">
        <el-card>
          <el-form  ref="signupForm" :model="signupForm" :rules="rules" label-width="auto" label-position="top">
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item label="Name" prop="name">
                  <el-input v-model="signupForm.name" type="text" />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="Email" prop="email">
                  <el-input v-model="signupForm.email" type="text" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item label="Role" prop="role">
                  <el-select v-model="signupForm.role" placeholder="Select Role">
                    <el-option label="Team Member" value="Team Member"></el-option>
                    <el-option label="Project Manager" value="Project Manager"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="12">
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
import { createUser } from '@/api/login'
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
        name: [
          { required: true, message: "Name is Required", trigger: 'change' }
        ],
        email: [
          { required: true, message: this.$t('company.emailIsRequired'), trigger: 'change' },
          { type: 'email', message: this.$t('company.validEmail'), trigger: 'change' }
        ],
        password: [
          { required: true, message: this.$t('company.passwordIsRequired'), trigger: 'change' }
        ],
        role: [
          { required: true, message: "Role is Required", trigger: 'change' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
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
          const { name, email,password, role, } = this.signupForm
          const opts = { name, email, password, role }
            this.signupRequest = true
            createUser(opts).then(response => {
              this.signupRequest = false
              this.$router.push({ path: '/users' })
              this.$refs[formName].resetFields()
              this.$message({ type: 'success', message: response.data.message })
            }).catch(error => {
              this.signupRequest = false
              this.$message.error(error.message)
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
