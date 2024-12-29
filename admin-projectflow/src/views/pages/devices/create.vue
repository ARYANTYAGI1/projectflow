<template>
  <div>
    <section class="profile-page mt-3">
      <div v-loading="detailLoading" class="container-fluid">
        <el-card>
          <el-form ref="deviceForm" :model="deviceForm" :rules="rules" label-width="auto" label-position="top">
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item :label="$t('user.deviceCode')" prop="deviceCode">
                  <el-input v-model="deviceForm.deviceCode" :disabled="!!id" type="text" :placeholder="$t('user.deviceCode')" />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item :label="$t('user.deviceName')" prop="deviceName">
                  <el-input v-model="deviceForm.deviceName" type="text" :placeholder="$t('user.deviceName')" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="userType !=2">
              <el-col :md="12">
                <el-form-item :label="$t('company.user')" prop="user">
                  <el-select v-model="deviceForm.user" class="w100" :placeholder="$t('company.selectUser')" clearable filterable remote>
                    <el-option v-for="(item, i) in usersList" :key="i" :label="`${item.email} | ${item.fullName ? item.fullName : ''}`" :value="item._id" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24">
                <el-form-item :label="$t('company.description')" >
                  <el-input type="textarea" v-model="deviceForm.description" :rows="5" />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="d-flex align-items-center justify-content-center mt-4">
              <el-button class="btn btn-primary" :disabled="addingRequest" @click="sumbitForm('deviceForm')">
                {{ $t('company.save') }}<span v-if="addingRequest"> ...</span></el-button>
              <router-link :to="'/device'">
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
import { updateDevice, createDevice, getDeviceDetail, getUserList, updateDeviceUser } from '@/api/device'
import { mapGetters } from 'vuex'

export default {
  page: {
    title: 'Create Device',
    meta: [{ name: 'description' }]
  },
  data() {
    return {
      addingRequest: false,
      detailLoading: false,
      id: '',
      isEdit: false,
      usersList: [],
      deviceForm: {
        deviceName: '',
        deviceCode: '',
        description: '',
        user: ''
      },
      rules: {
        deviceName: [
          { required: true, message: this.$t('company.deviceNameIsRequired'), trigger: 'change' }
        ],
        deviceCode: [
          { required: true, message: this.$t('company.deviceCodeIsRequired'), trigger: 'change' }
        ],
        description: [
          { required: true, message: this.$t('company.descriptionIsRequired'), trigger: 'change' }
        ],
        user: [
          { required: true, message: this.$t('company.userIsRequired'), trigger: 'change' }
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
      const users = await getUserList()
      this.usersList = users.data.data
      const id = this.$route.params.id
      this.id = id
      if (id) {
        let res = await getDeviceDetail(id)
        this.deviceForm = res.data.data
      }
      this.detailLoading = false
    },
    sumbitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { deviceCode, deviceName, description, user,  _id } = this.deviceForm
          const opts = { deviceCode, deviceName, description, user: this.userType == '2' ? this.userid : user }
          if (_id) {
            // opts._id = _id
            this.addingRequest = true
            updateDevice(_id, opts).then(response => {
              this.addingRequest = false
              this.$message({ type: 'success', message: response.data.message })
              updateDeviceUser(_id)
            .then(() => {
                this.$router.push({ path: '/device' });
            })
            .catch(error => {
                this.$message.error('Failed to update measurements: ' + error.message);
            });
            }).catch(error => {
              this.addingRequest = false
              this.$message.error(error.message)
            })
          } else {
            this.addingRequest = true
            createDevice(opts).then(response => {
              this.addingRequest = false
              this.$router.push({ path: '/device' })
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