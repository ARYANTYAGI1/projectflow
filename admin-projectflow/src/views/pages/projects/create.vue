<template>
  <div>
    <section class="task-page mt-3">
      <div v-loading="detailLoading" class="container-fluid">
        <el-card>
          <el-form ref="taskForm" :model="taskForm" :rules="rules" label-width="auto" label-position="top">
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item label="Title" prop="title">
                  <el-input v-model="taskForm.title" type="text" />
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="Description">
                  <el-input v-model="taskForm.description" type="text" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item label="Project" prop="project">
                  <el-select v-model="taskForm.project" placeholder="Select Project">
                    <el-option
                      v-for="project in projectList"
                      :key="project._id"
                      :label="project.name"
                      :value="project._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="Assigned To" prop="assignedTo">
                  <el-select v-model="taskForm.assignedTo" placeholder="Assign User">
                    <el-option
                      v-for="member in membersList"
                      :key="member._id"
                      :label="member.name"
                      :value="member._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item label="Status" prop="status">
                  <el-select v-model="taskForm.status" placeholder="Select Status">
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
                <el-form-item label="Priority" prop="priority">
                  <el-select v-model="taskForm.priority" placeholder="Select Priority">
                    <el-option
                      v-for="priority in priorityList"
                      :key="priority"
                      :label="priority"
                      :value="priority"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item label="Due Date" prop="dueDate">
                  <el-date-picker
                    v-model="taskForm.dueDate"
                    type="date"
                    placeholder="Select Due Date"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="d-flex align-items-center justify-content-center mt-4">
              <el-button class="btn btn-primary" :disabled="addingRequest" @click="addTask('taskForm')">
                Save<span v-if="addingRequest"> ...</span>
              </el-button>
              <router-link :to="'/'">
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
import { getMemberList, getProjectList, createTask, getTaskDetail, updateTask } from '@/api/task'

export default {
  page: {
    title: 'Add Task',
  },
  data() {
    return {
      addingRequest: false,
      detailLoading: false,
      id: '',
      projectList: [],
      membersList: [],
      taskForm: {
        title: '',
        description: '',
        project: '',
        assignedTo: '',
        status: '',
        priority: '',
        dueDate: '',
      },
      statusList: ['Not Started', 'In Progress', 'Ready For Review', 'Ready For Live', 'Completed', 'On Hold'],
      priorityList: ['Low', 'Medium', 'High'],
      rules: {
        title: [
          { required: true, message: "Title is required", trigger: 'change' }
        ],
        project: [
          { required: true, message: "Project is required", trigger: 'change' }
        ],
        status: [
          { required: true, message: "Status is required", trigger: 'change' }
        ],
      },
    };
  },
  created() {
    this.detailLoading = true;

    // Fetch Members
    getMemberList().then((response) => {
      this.membersList = response.data.data;
    }).catch((error) => {
      this.$message.error(error.message);
    });

    // Fetch Projects
    getProjectList().then((response) => {
      this.projectList = response.data.data;
      this.detailLoading = false;
    }).catch((error) => {
      this.detailLoading = false;
      this.$message.error(error.message);
    });

    // Check if editing an existing Task
    this.id = this.$route.params.id || '';
    if (this.id) {
      getTaskDetail(this.id).then((response) => {
        this.taskForm = response.data.data;
      }).catch((error) => {
        this.$message.error(error.message);
      });
    }
  },
  methods: {
    addTask(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { title, description, project, assignedTo, status, priority, dueDate } = this.taskForm;
          const opts = { title, description, project, assignedTo, status, priority, dueDate };
          this.addingRequest = true;

          const request = this.id ? updateTask(this.id, opts) : createTask(opts);

          request.then((response) => {
            this.addingRequest = false;
            this.$router.push({ path: '/tasks' });
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
    },
  },
};
</script>
