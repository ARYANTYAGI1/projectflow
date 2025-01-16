<template>
  <div>
    <section>
      <el-card class="full-height-card">
        <div class="d-flex justify-content-between mb-3">
          <div class="w-100 me-2">
            <el-input
              v-model="listQuery.name"
              placeholder="Search Task by Name, Description"
              @keyup="handleFilter()"
            />
          </div>
          <div v-if="userType==1" class="d-flex">
            <router-link to="/tasks/create">
              <el-button class="btn btn-primary me-2 w-100">
                Add Task
              </el-button>
            </router-link>
          </div>
        </div>
        <div v-loading="listLoading" class="user-table">
          <el-table :data="taskList" border style="width: 100%">
            <el-table-column align="center" label="Title" width="120">
              <template #default="scope">{{ scope.row.title }}</template>
            </el-table-column>>
            <el-table-column align="center" label="Project">
                <template #default="scope">{{ scope.row.project.name }}</template>
            </el-table-column>
            <el-table-column align="center" label="Created By" width="120">
                <template #default="scope">{{ scope.row.createdBy.name }}</template>
            </el-table-column>
            <el-table-column align="center" label="Assigned To" width="120">
                <template #default="scope">{{ scope.row.assignedTo.name }}</template>
            </el-table-column>
            <el-table-column align="center" label="Status" width="150">
                <template #default="scope">
                    <el-tag
                    :type="getStatusTagType(scope.row.status)"
                    effect="plain"
                    >
                    {{ scope.row.status }}
                    </el-tag>
                </template>
                </el-table-column>

                <el-table-column align="center" label="Priority" width="120">
                <template #default="scope">
                    <el-tag
                    :type="getPriorityTagType(scope.row.priority)"
                    effect="plain"
                    >
                    {{ scope.row.priority }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="Due Date" width="150">
                <template #default="scope">{{ formatDate(scope.row.dueDate) }}</template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.created_at')" width="150">
              <template #default="scope">{{ formatDate(scope.row.createdAt) }}</template>
            </el-table-column>
            <el-table-column align="center" label="Actions" width="100">
              <template #default="{ row }">
                <div class="d-flex justify-content-center">
                  <div v-if="userType==1">
                    <router-link :to="`/project/create/${row._id}`" class="pe-2">
                      <el-button class="btn btn-primary table-icon-btn"><i class="mdi mdi-account-edit"></i></el-button>
                    </router-link>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div v-show="total > listQuery.limit" class="page-pagination">
            <div class="pagination-container">
              <el-pagination
                background
                v-model="listQuery.page"
                :page-size="listQuery.limit"
                :total="total" 
                layout="prev, pager, next"
                @current-change="handlePageChange"
              ></el-pagination>
              <span class="pagination-text">
                {{
                  $t("Settings.packageAgent.paginationText", {
                    page: listQuery.page,
                    totalPages: totalPages,
                    total: total,
                  })
                }}
              </span>
            </div>
          </div>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
import { getTaskList } from "@/api/tasks";
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
      },
      taskList: [],
      total: 0,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.listQuery.limit);
    },
    ...mapGetters([
      'userType',
      'userid'
    ])
  },
  created() {
    this.getPageInfo();
  },
  methods: {
    async getPageInfo() {
      this.listLoading = true;
      const res = await getTaskList(this.listQuery);
      this.taskList = res.data.data;
      this.total = res.data.totalCount;
      this.listLoading = false;
    },
    async handleFilter() {
      this.listLoading = true;
      const res = await getTaskList(this.listQuery);
      this.taskList = res.data.data;
      this.total = res.data.totalCount;
      this.listLoading = false;
    },
    async handlePageChange(page) {
      this.listQuery.page = page;
      await this.handleFilter();
    },
    formatDate(value) {
      return this.$filters.formatDate(value);
    },
    getStatusTagType(status) {
      switch (status) {
        case 'Not Started':
          return 'info';
        case 'In Progress':
          return 'warning';
        case 'Ready For Review':
          return 'primary';
        case 'Ready For Live':
          return 'success';
        case 'Completed':
          return 'success';
        case 'On Hold':
          return 'danger';
        default:
          return '';
      }
    },
    getPriorityTagType(priority) {
      switch (priority) {
        case 'Low':
          return 'success';
        case 'Medium':
          return 'warning';
        case 'High':
          return 'danger';
        default:
          return '';
      }
    },
  },
};
</script>
