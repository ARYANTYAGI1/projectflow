<template>
  <div>
    <section>
      <el-card class="full-height-card">
        <div class="d-flex justify-content-between mb-3">
          <div class="w-100 me-2">
            <el-input
              v-model="listQuery.name"
              :placeholder="$t('company.searchByNameEmail')"
              @keyup="handleFilter()"
            />
          </div>
          <div class="d-flex">
            <router-link to="/users/create">
              <el-button class="btn btn-primary me-2 w-100">
                {{ $t("table.addUser") }}
              </el-button>
            </router-link>
          </div>
        </div>
        <div v-loading="listLoading" class="user-table">
          <el-table :data="userList" border style="width: 100%">
            <el-table-column align="center" label="Name">
              <template #default="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column align="center" label="Email">
              <template #default="scope">{{ scope.row.email }}</template>
            </el-table-column>
            <el-table-column align="center" label="Role">
              <template #default="scope">{{ scope.row.role }}</template>
            </el-table-column>
            <el-table-column
              align="center"
              :label="$t('company.status')"
              width="130"
            >
              <template #default="scope">
                <el-button
                  v-if="scope.row.status == 'InActive'"
                  type="danger"
                  size="small"
                  @click="openStatusDialog(scope.row)"
                  style="cursor: pointer;"
                  title="InActive"
                  class="statusbtn"
                >
                  {{ "InActive" }}
                </el-button>
                <el-button
                  v-if="scope.row.status == 'Active'"
                  type="success"
                  size="small"
                  @click="openStatusDialog(scope.row)"
                  style="cursor: pointer;"
                  title="Active"
                  class="statusbtn"
                >
                  {{ "Active" }}
                </el-button>
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
import { getUsersList, changeStatus } from "@/api/user";

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
      userList: [],
      total: 0,
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
    async getPageInfo() {
      this.listLoading = true;
      const res = await getUsersList(this.listQuery);
      this.userList = res.data.data;
      this.total = res.data.totalCount;
      this.listLoading = false;
    },
    openStatusDialog(row) {
      this.selectedRow = row;
      this.statusDialogVisible = true;
    },
    async changeStatus() {
      try {
        const response = await changeStatus({id:this.selectedRow._id, status: this.selectedRow.status == "Active" ? "InActive" : "Active"});
        if (response.data.success) {
          this.$message.success("Status updated successfully");
          this.statusDialogVisible = false
          this.getPageInfo();
        }
      } catch (error) {
        this.$message.error("Error updating status");
      }
    },
    async handleFilter() {
      this.listLoading = true;
      const res = await getUsersList(this.listQuery);
      this.userList = res.data.data;
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
  },
};
</script>
