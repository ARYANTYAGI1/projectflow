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
          <div v-if="userType==1" class="d-flex">
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
            <el-table-column align="center" label="Actions" width="180">
              <template #default="{ row }">
                <div class="d-flex justify-content-center">
                  <div class="pe-2">
                    <el-button class="btn btn-primary table-icon-btn" @click="viewProject(row)">
                      <i class="mdi mdi-eye"></i>
                    </el-button>
                  </div>
                  <div v-if="userType==1">
                    <router-link :to="`/projects/create/${row._id}`" class="pe-2">
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
      <el-dialog v-model="detailModal" width="400px" title="Project Details" >
      <div>
        <p><strong>Name:</strong> {{ detailData.name }}</p>
        <p><strong>Description:</strong> {{ detailData.description }}</p>
        <p><strong>Members:</strong> {{ detailData.members.map(member => member.name).join(', ') }}</p>
        <p><strong>Status:</strong> {{ detailData.status }}</p>
        <p><strong>Created At:</strong> {{ formatDate(detailData.createdAt) }}</p>
      </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { getProjectList, getProjectDetail } from "@/api/project";
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      listLoading: false,
      detailModal: false,
      detailData: {},
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
    ...mapGetters([
      'userType',
      'userid'
    ])
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
      this.total = res.data.totalCount;
      this.listLoading = false;
    },
    async handlePageChange(page) {
      this.listQuery.page = page;
      await this.handleFilter();
    },
    async viewProject(row) {
      const res = await getProjectDetail(row._id);
      this.detailData = res.data.data;
      this.detailModal = true
    },
    formatDate(value) {
      return this.$filters.formatDate(value);
    },
  },
};
</script>
