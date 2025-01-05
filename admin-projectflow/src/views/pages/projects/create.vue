<template>
  <div>
    <section class="profile-page mt-3">
      <div v-loading="detailLoading" class="container-fluid">
        <el-card>
          <el-form  ref="projectForm" :model="projectForm" :rules="rules" label-width="auto" label-position="top">
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item label="Name" prop="name">
                  <el-input v-model="projectForm.name" type="text" />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="Description">
                  <el-input v-model="projectForm.description" type="text" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :md="12">
                    <el-form-item label="Members" prop="members">
                        <el-select v-model="projectForm.members" placeholder="Select Members" multiple>
                        <el-option
                            v-for="member in membersList"
                            :key="member._id"
                            :label="member.name"
                            :value="member._id"
                        ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item label="Status" prop="status">
                    <el-select v-model="projectForm.status" placeholder="Select Status">
                      <el-option
                        v-for="status in statusList"
                        :key="status"
                        :label="status"
                        :value="status"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
            </el-row>
            <div class="d-flex align-items-center justify-content-center mt-4">
              <el-button class="btn btn-primary" :disabled="addingRequest" @click="addProject('projectForm')">{{ $t('company.save') }}<span v-if="addingRequest"> ...</span></el-button>
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
import { getMemberList, createProject} from '@/api/project'
export default {
  page: {
    title: 'Add Project',
  },
  data() {
    return {
      addingRequest: false,
      detailLoading: false,
      id: '',
      membersList: [],
      projectForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        members: [],
      },
      statusList: ['Active', 'InActive', 'Hold', 'Archive'],
      rules: {
        name: [
          { required: true, message: "Name is Required", trigger: 'change' }
        ],
        members: [
          { required: true, message: "Members is Required", trigger: 'change' }
        ],
        status: [
          { required: true, message: "Status is Required", trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.detailLoading = true
    getMemberList().then(response => {
      this.membersList = response.data.data
      this.detailLoading = false
    }).catch(error => {
      this.detailLoading = false
      this.$message.error(error.message)
    })
  },
  methods: {
    addProject(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { name, description, members, status } = this.projectForm
          const opts = { name, description, members, status }
          this.addingRequest = true
          createProject(opts).then(response => {
            this.addingRequest = false
            this.$router.push({ path: '/projects' })
            this.$refs[formName].resetFields()
            this.$message({ type: 'success', message: response.data.message })
          }).catch(error => {
            this.addingRequest = false
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
