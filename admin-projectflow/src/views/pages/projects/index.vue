<template>
  <div>
    <section>
      <el-card class="full-height-card">
        <div class="d-flex justify-content-between mb-3">
          <div class="w-100 me-2">
            <el-input
              v-model="listQuery.name"
              placeholder="Search Project by Name, Description"
              @keyup="handleFilter()"
            />
          </div>
          <div class="d-flex">
            <router-link to="/projects/create">
              <el-button class="btn btn-primary me-2 w-100">
                Add Project
              </el-button>
            </router-link>
          </div>
        </div>
        <div v-loading="listLoading" class="user-table">
          <el-table :data="projectList" border style="width: 100%">
            <el-table-column align="center" label="Name">
              <template #default="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column align="center" label="Description">
              <template #default="scope">{{ scope.row.description }}</template>
            </el-table-column>
            <el-table-column align="center" label="Members">
                <template #default="scope">{{ scope.row.members.map(member => member.name).join(', ') }}</template>
            </el-table-column>
            <el-table-column align="center" label="Status">
              <template #default="scope">
                <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.created_at')">
              <template #default="scope">{{ formatDate(scope.row.createdAt) }}</template>
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
        <el-dialog
          v-model="statusDialogVisible"
          width="400px"
          title="Change Status"
        >
          <span>Are you sure to change the status?</span>
          <template #footer>
            <el-button @click="statusDialogVisible = false">
              {{ $t('company.cancel') }}
            </el-button>
            <el-button type="primary" @click="changeStatus">
              {{ $t('company.confirm') }}
            </el-button>
          </template>
        </el-dialog>

      </el-card>
    </section>
  </div>
</template>

<script>
import { getProjectList } from "@/api/project";

export default {
  data() {
    return {
      listLoading: false,
      statusDialogVisible: false,
      selectedRow: null,
      newStatus: "",
      listQuery: {
        page: 1,
        limit: 10,
      },
      projectList: [],
      total: 0,
      statusList: ['Active', 'InActive', 'Hold', 'Archive'],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.listQuery.limit);
    },
  },
  created() {
    this.getPageInfo();
  },
  methods: {
    getStatusType(status) {
      switch (status) {
        case 'Active':
          return 'success';
        case 'InActive':
          return 'danger';
        case 'Hold':
          return 'warning';
        case 'Archive':
          return 'info';
        default:
          return '';
      }
    },
    async getPageInfo() {
      this.listLoading = true;
      const res = await getProjectList(this.listQuery);
      this.projectList = res.data.data;
      this.total = res.data.totalCount;
      this.listLoading = false;
    },
    async handleFilter() {
      this.listLoading = true;
      const res = await getProjectList(this.listQuery);
      this.projectList = res.data.data;
      console.log(this.projectList);
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
    handleStatusChange(row, newStatus) {
      // Make API call to change status
      // Example:
      // axios.post('/api/changeStatus', { id: row.id, status: newStatus })
      //   .then(response => {
      //     row.status = newStatus;
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
      row.status = newStatus; // Update status locally for now
    }
  },
};
</script>
