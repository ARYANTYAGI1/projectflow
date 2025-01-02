<template>
  <div>
    <section class="profile-page mt-3">
      <div class="profile-page container-fluid">
        <el-card>
          <div>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="auto" label-position="top">
              <el-row :gutter="20">
                <el-col :md="24">
                  <el-form-item :label="$t('company.currentPassword')" prop="oldPassword">
                    <el-input type="password" v-model="ruleForm.oldPassword" show-password />
                  </el-form-item>
                </el-col>
                <el-col :md="24">
                  <el-form-item :label="$t('company.newPassword')" prop="newPassword">
                    <el-input type="password" v-model="ruleForm.newPassword" show-password />
                  </el-form-item>
                </el-col>
                <el-col :md="24">
                  <el-form-item :label="$t('company.confirmPassword')" prop="confirmPassword">
                    <el-input type="password" v-model="ruleForm.confirmPassword" show-password />
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="text-center d-flex justify-content-center align-items-center">
                <el-button v-loading="loading" class="btn btn-primary" :disabled="loading" @click="submitForm">{{ $t('company.update') }}
                  <span v-if="loading"> ...</span>
                </el-button>
                <router-link :to="'/'" class="ms-2">
                  <el-button class="btn btn-secondary">{{ $t('company.cancel') }}</el-button>
                </router-link>
              </div>
            </el-form>
          </div>
        </el-card>
      </div>
    </section>
  </div>
</template>

<script>
import { changePassword } from '@/api/user'
export default {
  page: {
    title: 'Change Password'
  },
  data() {
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      loading: false,
      password: 'password',
      passwordArr: [],
      rules: {
        oldPassword: [
          { required: true, message: this.$t('user.pleaseEnterOldPassword'), trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: this.$t('user.pleaseEnterNewPassword'), trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: this.$t('user.pleaseEnterConfirmPassword'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (this.ruleForm.newPassword !== this.ruleForm.confirmPassword) {
          this.$message.error(this.$t('user.passwordConfirmPasswordDoesNotMatch'))
          return false
        }
        if (valid) {
          this.passwordArr = { oldPassword: this.ruleForm.oldPassword, newPassword: this.ruleForm.newPassword, confirmPassword: this.ruleForm.newPassword }
          this.loading = true
          changePassword(this.passwordArr).then(response => {
            this.$message({
              title: 'success',
              message: response.data.message,
              type: 'success'
            })
            this.loading = false
            this.$router.push('/')
          }).catch(error => {
            this.loading = false
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
