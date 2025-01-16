<template>
  <div>
    <section class="project-page mt-3">
      <div v-loading="detailLoading" class="container-fluid">
        <el-card>
          <el-form ref="projectForm" :model="projectForm" :rules="rules" label-width="auto" label-position="top">
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item label="Project Name" prop="name">
                  <el-input v-model="projectForm.name" type="text" placeholder="Enter project name" />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="Description" prop="description">
                  <el-input v-model="projectForm.description" type="text" placeholder="Enter project description" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item label="Status" prop="status">
                  <el-select v-model="projectForm.status" placeholder="Select status">
                    <el-option
                      v-for="status in statusList"
                      :key="status"
                      :label="status"
                      :value="status"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="Members" prop="members">
                  <el-select v-model="projectForm.members" multiple placeholder="Select members">
                    <el-option
                      v-for="member in membersList"
                      :key="member._id"
                      :label="`${member.name}-${member.role}`"
                      :value="member._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="d-flex align-items-center justify-content-center mt-4">
              <el-button class="btn btn-primary" :disabled="addingRequest" @click="submitProject('projectForm')">
                Save<span v-if="addingRequest"> ...</span>
              </el-button>
              <router-link :to="'/project'">
                <el-button class="btn btn-secondary ms-3">Cancel</el-button>
              </router-link>
            </div>
          </el-form>
        </el-card>
      </div>
    </section>
  </div>
</template>

<script>
import { getMemberList, createProject, getProjectDetail, updateProject } from '@/api/project';

export default {
  page: {
    title: 'Create Project',
  },
  data() {
    return {
      addingRequest: false,
      detailLoading: false,
      membersList: [],
      projectForm: {
        name: '',
        description: '',
        status: 'Active',
        members: [],
      },
      statusList: ['Active', 'InActive', 'Hold', 'Archive'],
      rules: {
        name: [
          { required: true, message: "Project name is required", trigger: 'change' },
        ],
        members: [
          { required: true, message: "Please select at least one member", trigger: 'change' },
        ],
      },
    };
  },
  created() {
    this.detailLoading = true;
    this.id = this.$route.params.id || '';
    getMemberList()
    .then((response) => {
      this.membersList = response.data.data;
      this.detailLoading = false;

      // Fetch project details only after membersList is loaded
      const projectId = this.$route.params.id;
      if (projectId) {
        this.detailLoading = true;
        getProjectDetail(projectId)
          .then((response) => {
            const projectData = response.data.data;

            // Map members to their IDs
            const memberIds = projectData.members.map(member => member._id);
            this.projectForm = {
              ...projectData,
              members: memberIds, // Ensure members are IDs for el-select
              id: projectId,
            };
            this.detailLoading = false;
          })
          .catch((error) => {
            this.detailLoading = false;
            this.$message.error(error.message);
          });
      }
    })
    .catch((error) => {
      this.detailLoading = false;
      this.$message.error(error.message);
    });
     
      if (this.id) {
        getProjectDetail(this.id).then((response) => {
          this.projectForm = response.data.data;
        }).catch((error) => {
          this.$message.error(error.message);
        });
      }
  },
  methods: {
    submitProject(formName) {
      this.$refs[formName].validate((valid) => {
      if (valid) {
            const { name, description, status, members } = this.projectForm;
            const opts = { name, description, members };
            this.addingRequest = true;
            const request = this.id ? updateProject(this.id, opts) : createProject(opts);
            request.then((response) => {
              this.addingRequest = false;
              this.$router.push({ path: '/project' });
              this.$refs[formName].resetFields();
              this.$message({ type: 'success', message: response.data.message });
            }).catch((error) => {
              this.addingRequest = false;
              this.$message.error(error.message);
            });
          } else {
            console.log('Validation failed!');
            return false;
          }
      });
    }
  },
};
</script>

<style scoped>
.mt-3 {
  margin-top: 1rem;
}
</style>