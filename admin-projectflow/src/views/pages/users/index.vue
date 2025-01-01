<template>
  <div>
    <section>
      <el-card class="full-height-card">
        <div class="d-flex justify-content-between mb-3">
          <div class="w-100 me-2">
            <el-input v-model="listQuery.name" :placeholder="$t('company.searchByNameEmail')" @keyup="handleFilter()" />
          </div>
          <div class="d-flex">
            <router-link to="/users/create">
              <el-button class="btn btn-primary me-2 w-100">{{
                $t("table.addUser")
              }}</el-button>
            </router-link>
          </div>
        </div>
        <div v-loading="listLoading" class="user-table">
          <el-table :data="userList" border style="width: 100%">
            <el-table-column align="center" label="Name">
              <template #default="scope">{{
                scope.row.name
              }}</template>
            </el-table-column>
            <el-table-column align="center" label="Email">
              <template #default="scope">{{ scope.row.email }}</template>
            </el-table-column>
            <el-table-column align="center" :label="$t('company.status')" width="130">
              <template #default="scope">
                <el-button v-if="scope.row.status == 'InActive'"  type="danger" size="small" @click="openStatusDialog(scope.row, 'Active')" style="cursor: pointer;"
                  title="company.inactive" class="statusbtn">{{ $t("company.inactive") }}</el-button>
                <el-button v-if="scope.row.status == 'Active'" type="success" size="small" @click="openStatusDialog(scope.row, 'Active')" style="cursor: pointer;"
                  title="company.active" class="statusbtn">{{ $t("company.active") }}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.created_at')">
              <template #default="scope">{{
                formatDate(scope.row.createdAt)
              }}</template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.actions')" width="180">
              <template #default="{ row }">
                <div class="d-flex justify-content-center">
                  <router-link :to="`/users/view/${row._id}`" class="pe-2">
                    <el-button class="btn btn-primary table-icon-btn"><i class="mdi mdi-eye"></i></el-button>
                  </router-link>
                  <el-button class="btn btn-primary delete-btn table-icon-btn" @click="deleteUser(`${row._id}`)">
                    <i class="mdi mdi-delete" />
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div v-show="total > listQuery.limit" class="page-pagination">
            <div class="pagination-container">
              <el-pagination background v-model="listQuery.page" :page-size="listQuery.limit" :total="total"
                layout="prev, pager, next" @current-change="handlePageChange"></el-pagination>
              <span class="pagination-text">{{
                $t("Settings.packageAgent.paginationText", {
                  page: listQuery.page,
                  totalPages: totalPages,
                  total: total,
                })
              }}</span>
            </div>
          </div>
        </div>
        <el-dialog :visible.sync="statusDialogVisible" width="400px" title="Change Status">
    <span> Are you sure to Change status ?</span>
    <template #footer>
      <el-button @click="statusDialogVisible = false">{{ $t('company.cancel') }}</el-button>
      <el-button type="primary" @click="changeStatus">{{ $t('company.confirm') }}</el-button>
    </template>
  </el-dialog>
      </el-card>
    </section>
  </div>
</template>

<script>
import Pagination from "@/components/pagination.vue"
import { getUsersList, deleteUser } from "@/api/user"

export default {
  data() {
    return {
      listLoading: false,
      statusDialogVisible: false,
      selectedRow: null, 
      newStatus: '',          
      listQuery: {
        page: 1,
        limit: 10,
      },
      userList: [],
      total: 0,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.listQuery.limit)
    },
  },
  created() {
    this.getPageInfo()
  },
  methods: {
    async getPageInfo() {
      this.listLoading = true
      const res = await getUsersList(this.listQuery)
      console.log(res.data.data)
      this.userList = res.data.data
      this.total = res.data.totalCount
      this.listLoading = false
    },
    openStatusDialog(row, newStatus) {
      this.selectedRow = row;
      this.newStatus = newStatus;
      this.statusDialogVisible = true;
      console.log(this.statusDialogVisible

      )
    },
    async changeStatus() {
      try {
        const response = await this.$axios.post('/api/changeStatus', {
          userId: this.selectedRow._id,
          status: this.newStatus
        });
        if (response.data.success) {
          this.$message.success(this.$t('company.statusUpdated'));
          this.selectedRow.status = this.newStatus; // Update status in the table
          this.statusDialogVisible = false;        // Close the dialog
        } else {
          this.$message.error(this.$t('company.errorUpdatingStatus'));
        }
      } catch (error) {
        this.$message.error(this.$t('company.errorUpdatingStatus'));
      }
    },
    async handleFilter() {
      this.listLoading = true
      const res = await getUsersList(this.listQuery)
      this.userList = res.data.data
      this.total = res.data.totalCount
      this.listLoading = false
    },
    async handlePageChange(page) {
      this.listQuery.page = page
      await this.handleFilter()
    },
    deleteUser(id) {
      this.$confirm(
        this.$t("company.confirmTodeleteUser"),
        this.$t("company.warning"),
        {
          confirmButtonText: this.$t("company.confirm"),
          cancelButtonText: this.$t("company.cancel"),
          type: "warning",
        }
      )
        .then(async () => {
          deleteUser(id)
            .then((response) => {
              this.$message.success({ message: response.data.message })
              var totalCounts = this.total / 10
              if (totalCounts.toString().split(".")[1] === "1") {
                if (this.listQuery.page < 1) this.listQuery.page - 1
                else this.listQuery.page = 1
              }
              this.getPageInfo()
            })
            .catch((error) => {
              this.$message.error(error.message)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    formatDate(value) {
      return this.$filters.formatDate(value)
    },
  },
}
</script>
