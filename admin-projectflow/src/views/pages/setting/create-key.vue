<template>
  <div>
    <section class="profile-page mt-3">
      <div v-loading="detailLoading" class="container-fluid">
        <el-card>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="auto" label-position="top">
            <el-row :gutter="20">
              <el-col :md="24">
                <el-form-item :label="$t('user.secretKey')" prop="secretKey">
                  <el-input v-model="ruleForm.secretKey" type="text" />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="d-flex align-items-center justify-content-center mt-4">
              <el-button class="btn btn-primary" :disabled="addingRequest" @click="sumbitForm('ruleForm')">
                {{ $t('company.save') }}<span v-if="addingRequest"> ...</span></el-button>
              <router-link :to="'/settings'">
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
import { addKey, getKey, updateKey } from '@/api/setting'
import { mapGetters } from 'vuex'

export default {
  page: {
    title: 'Create Key',
    meta: [{ name: 'description' }]
  },
  data() {
    return {
      addingRequest: false,
      detailLoading: false,
      id: '',
      ruleForm: {
        secretKey: ''
      },
      rules: {
        secretKey: [
          { required: true, message: this.$t('company.deviceNameIsRequired'), trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getPageInfo()
  },
  computed: {
    ...mapGetters([
      'userType',
      'userid'
    ])
  },
  methods: {
    async getPageInfo() {
      this.detailLoading = true
      const id = this.$route.params.id
      this.id = id
      if (id) {
        let res = await getKey(id)
        this.ruleForm = res.data.data
      }
      this.detailLoading = false
    },
    sumbitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { secretKey, _id } = this.ruleForm
          const opts = { secretKey }
          if (_id) {
            this.addingRequest = true
            updateKey(_id, opts).then(response => {
              this.addingRequest = false
              this.$message({ type: 'success', message: response.data.message })
              this.$router.push({ path: '/settings' })
            }).catch(error => {
              this.addingRequest = false
              this.$message.error(error.message)
            })
          } else {
            this.addingRequest = true
            addKey(opts).then(response => {
              this.addingRequest = false
              this.$router.push({ path: '/settings' })
              this.$refs[formName].resetFields()
              this.$message({ type: 'success', message: response.data.message })
            }).catch(error => {
              this.addingRequest = false
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