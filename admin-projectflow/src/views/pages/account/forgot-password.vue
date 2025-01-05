<template>
  <div>
    <div class="container-fluid p-0">
      <div>
        <div>
          <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
            <div class="w-100">
              <div class="d-flex justify-content-center">
                <div style="width:100%;max-width: 500px;">
                  <div>
                    <div class="card" style="border-width: 0;">
                      <div>
                        <div class="mb-3 login-card">
                          <router-link to="/" class="logo">
                            <h1 style="color: white;">ProjectFlow</h1>
                          </router-link>
                        </div>
                      </div>
                      <div class="p-5 pb-4 pt-2">
                        <div v-if="forgotPasswordMode">
                          <h4 class="font-size-18 mt-2">{{ $t('company.resetPassword') }}</h4>
                          <el-form ref="emailForm" :model="emailForm" :rules="emailRules">
                            <el-form-item prop="email">
                              <el-input v-model="emailForm.email" type="email" id="email" placeholder="Email" />
                            </el-form-item>
                            <div class="mt-4 text-center">
                              <el-button class="btn btn-primary w-md waves-effect waves-light" type="primary" @click="forgotPassword">Reset</el-button>
                            </div>
                          </el-form>
                          <div class="mt-3 text-center">
                            <p>
                              Back to Login?
                              <router-link tag="a" to="/login" class="font-weight-medium text-primary">Log in</router-link>
                            </p>
                          </div>
                        </div>
                        <div v-if="verifyCodeMode">
                          <h4 class="font-size-18 mt-2">{{ $t('company.resetPassword') }}</h4>
                          <p class="text-muted">{{ $t('company.optMessage') }}</p>
                          <el-form :model="otpForm" :rules="otpRules" ref="otpForm">
                            <el-form-item prop="otp">
                              <el-input v-model="otpForm.otp" id="otp" placeholder="OTP" />
                            </el-form-item>
                            <div class="mt-4 text-center">
                              <el-button class="btn btn-primary w-md waves-effect waves-light" type="primary" @click="verifyOTP">Submit</el-button>
                            </div>
                          </el-form>
                        </div>
                        <div v-if="resetPasswordMode">
                          <p class="text-muted">{{ $t('company.enterPassword') }}</p>
                          <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm">
                            <el-row :gutter="20">
                              <el-col :md="24">
                                <el-form-item prop="newPassword">
                                  <el-input type="password" v-model="passwordForm.newPassword" placeholder="Enter New Password" />
                                </el-form-item>
                              </el-col>
                              <el-col :md="24">
                                <el-form-item prop="confirmPassword">
                                  <el-input type="password" v-model="passwordForm.confirmPassword" placeholder="Confirm New Password" />
                                </el-form-item>
                              </el-col>
                            </el-row>
                            <div class="text-center">
                              <el-button class="btn btn-primary" @click="requestResetPassword">Submit</el-button>
                            </div>
                          </el-form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { forgotPassword, resetPassword } from '@/api/login'
import { verifyForgotPasswordCode } from '@/api/user'

export default {
  data() {
    return {
      email: '',
      otp: '',
      submitted: false,
      error: null,
      tryingToReset: false,
      verifyCodeMode: false,
      resetPasswordMode: false,
      forgotPasswordMode: true,
      passwordForm: {
        newPassword: '',
        confirmPassword: ''
      },
      userData: {},
      loading: false,
      emailForm: { email: '' },
      otpForm: { otp: '' },
      emailRules: {
        email: [
          { required: true, message: this.$t('company.emailIsRequired'), trigger: 'change' }
        ]
      },
      otpRules: {
        otp: [
          { required: true, message: this.$t('company.otpIsRequired'), trigger: 'change' }
        ]
      },
      passwordRules: {
        newPassword: [
          { required: true, message: this.$t('user.pleaseEnterNewPassword'), trigger: 'change' }
        ],
        confirmPassword: [
          { required: true, message: this.$t('user.pleaseEnterConfirmPassword'), trigger: 'change' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query && this.$route.query.id && this.$route.query.token) {
      this.forgotPasswordMode = false
      this.resetPasswordMode = true
    }
    document.body.classList.add('auth-body-bg')
  },
  methods: {
    forgotPassword() {
      this.$refs.emailForm.validate((valid) => {
        if (valid) {
          this.loading = true
          forgotPassword({ email: this.emailForm.email }).then(response => {
            this.loading = false
            this.$message({
              message: response.data.message,
              type: 'success'
            })
            this.forgotPasswordMode = false
            this.verifyCodeMode = true
          }).catch(error => {
            this.$message({
              message: error.message,
              type: 'error'
            })
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    verifyOTP() {
      this.$refs.otpForm.validate((valid) => {
        if (valid) {
          this.loading = true
          verifyForgotPasswordCode({ code: this.otpForm.otp, email:this.emailForm.email}).then(response => {
            this.loading = false
            this.userData = response.data.data
            this.$message({
              message: response.data.message,
              type: 'success'
            })
            this.verifyCodeMode = false
            this.resetPasswordMode = true
          }).catch(error => {
            this.$message({
              message: error.message,
              type: 'error'
            })
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    requestResetPassword() {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          if (this.passwordForm.newPassword && this.passwordForm.confirmPassword) {
            var opts = {
              userId: this.userData,
              newPassword: this.passwordForm.newPassword,
              confirmPassword: this.passwordForm.confirmPassword
            }
            this.loading = true
            resetPassword(opts).then(response => {
              this.loading = false
              this.forgotPasswordMode = false
              this.resetPasswordMode = false
              this.$router.push({ path: '/login' })
              this.$message({
                message: response.data.message,
                type: 'success'
              })
            }).catch(error => {
              this.$message({
                message: error.message,
                type: 'error'
              })
              this.loading = false
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
