<template>
  <div >
    <section  class="profile-page mt-3">
      <div v-loading="detailLoading" class="container-fluid">
        <el-card>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="auto" label-position="top">
            <el-row :gutter="20" v-if="userType !=2">
              <el-col :md="24">
                <el-form-item :label="$t('user.user')" prop="user">
                  <el-select v-model="ruleForm.user" :placeholder="$t('user.user')" :disabled="!!id" @change="handleUserChange">
                    <el-option  v-for="user in userList"  :key="user.value" :label="`${user.email  } | ${user.fullName ? user.fullName : '--'}`" :value="user._id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24">
                <el-form-item :label="$t('user.device')" prop="device">
                  <el-select v-model="ruleForm.device" :placeholder="$t('user.device')" :disabled="userType == 1 && !ruleForm.user">
                    <el-option v-for="device in deviceList" :key="device.value" :label="`${device.deviceName} | ${device.deviceCode}`" :value="device._id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item :label="$t('user.dateTime')" prop="measureDateTime">
                  <el-date-picker v-model="ruleForm.measureDateTime" format="DD/MM/YYYY HH:mm"  type="datetime" :placeholder="$t('user.dateTime')" style="width:100%" />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item :label="$t('user.scale')" prop="scale">
                  <el-select v-model="ruleForm.scale" :placeholder="$t('user.scale')">
                    <el-option v-for="scale in scaleOptions" :key="scale.key" :label="scale.value"
                      :value="scale.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24">
                <el-form-item :label="$t('user.temperature')" prop="measure">
                  <el-slider v-model="ruleForm.measure" :min="-100" :max="100" :marks="marks" />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="d-flex align-items-center justify-content-center mt-4">
              <el-button class="btn btn-primary" :disabled="addingRequest" @click="sumbitForm('ruleForm')">{{ $t('company.save') }}<span v-if="addingRequest"> ...</span></el-button>
              <router-link :to="'/measurements'">
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
import { createMeasurement, getDeviceList, getUserList, updateMeasurment, getMeasurementDetail } from '@/api/measurement'
import { getScaleOptions } from "@/api/config"
import { mapGetters } from 'vuex'

export default {
  page: {
    title: 'Create Measurement',
    meta: [{ name: 'description' }]
  },
  data() {
    return {
      addingRequest: false,
      detailLoading: false,
      id: '',
      isEdit: false,
      deviceList: [],
      userList: [],
      ruleForm: {
        device: '',
        measure: 0,
        measureDateTime: '',
        scale: 'C',
        user: ''
      },
      marks: {
      '-100': '-100',  
      '0': '0',        
      '100': '100'     
      },
      scaleOptions: [],
      rules: {
        device: [
          { required: true, message: this.$t('company.deviceIsRequired'), trigger: 'change' }
        ],
        measure: [
          { required: true, message: this.$t('company.measureIsRequired'), trigger: 'change' }
        ],
        measureDateTime: [
          { required: true, message: this.$t('company.dateIsRequired'), trigger: 'change' }
        ],
        scale: [
          { required: true, message: this.$t('company.scaleIsRequired'), trigger: 'change' }
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
      const device = await getDeviceList()
      this.deviceList = device.data.data
      this.scaleOptions = getScaleOptions()
      const user = await getUserList()
      this.userList = user.data.data
      const id = this.$route.params.id
      this.id = id
      if (id) {
        let res = await getMeasurementDetail(id)
        this.ruleForm = res.data.data
        if (this.userType == 1 && this.ruleForm.user) {
          await this.handleUserChange(this.ruleForm.user);
        }
      }
      if (!this.id) {
        this.ruleForm.measureDateTime = new Date();
      }
      this.detailLoading = false
    },
    async handleUserChange(userId) {
      if (this.userType == 1 && userId) {
        const device = await getDeviceList({ userId: userId });
        this.deviceList = device.data.data;
      }
    },
    sumbitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { device, scale, user, measure, measureDateTime, _id } = this.ruleForm
          const opts = { device, scale, user, measure, measureDateTime,  user: this.userType == '2' ? this.userid : user }
          if (_id) {
            this.addingRequest = true
            updateMeasurment(_id, opts).then(response => {
              this.addingRequest = false
              this.$message({ type: 'success', message: response.data.message })
              this.$router.push({ path: '/measurements' })
            }).catch(error => {
              this.addingRequest = false
              this.$message.error(error.message)
            })
          } else {
            this.addingRequest = true
            createMeasurement(opts).then(response => {
              this.addingRequest = false
              this.$router.push({ path: '/measurements' })
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
    },
    
  }
}
</script>