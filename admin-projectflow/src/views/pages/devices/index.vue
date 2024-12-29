<template>
  <div class="filter-container" >
    <section>
      <el-card class="full-height-card">
        <div class="d-flex justify-content-between mb-3">
          <div class="w-100 me-2">
            <el-input v-model="listQuery.name" :placeholder="$t('company.searchByEmailDeviceName')"
              @keyup="handleFilter" />
          </div>
          <div class="d-flex">
            <router-link to="/device/create">
              <el-button class="btn btn-primary me-2 w-100">{{
                $t("table.addDevices")
              }}</el-button>
            </router-link>
          </div>
        </div>
        <div v-loading="listLoading" class="user-table">
          <el-table :data="deviceList" border style="width: 100%">
            <el-table-column align="center" :label="$t('company.deviceCode')" width="180">
              <template #default="scope">{{ scope.row.deviceCode   }}</template>
            </el-table-column>
            <el-table-column align="center" :label="$t('company.deviceName')" width="150">
              <template #default="scope">{{ scope.row.deviceName ? scope.row.deviceName : "--" }}</template>
            </el-table-column>
            <el-table-column align="center" :label="$t('company.fridgeName')" width="150">
              <template #default="scope">{{ scope.row.fridgeInfo && scope.row.fridgeInfo.titleIt ? scope.row.fridgeInfo.titleIt : "--" }}</template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.description')">
              <template #default="scope">{{ scope.row.description ?  `${scope.row.description}` : '--' }}</template>
            </el-table-column>
            <el-table-column v-if="userType == '1'" align="center" :label="$t('company.user')" width="200">
              <template #default="scope">
                {{ scope.row.user ? (scope.row.user.fullName ? `${scope.row.user.fullName} | ${scope.row.user.email}` :
                  `-- | ${scope.row.user.email}`) : '--' }}
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.actions')" width="180">
              <template #default="{ row }">
                <div class="d-flex justify-content-center">
                  <div class="pe-2">
                    <el-button class="btn btn-primary table-icon-btn" @click="viewDevice(row)">
                      <i class="mdi mdi-eye"></i>
                    </el-button>
                  </div>
                  <router-link :to="`/device/create/${row._id}`" class="pe-2">
                    <el-button class="btn btn-primary table-icon-btn"><i class="mdi mdi-account-edit"></i></el-button>
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
      </el-card>
    </section>
    <el-dialog class="custom-dialog form-item-label"  :title="$t('company.deviceDetail')"
      v-model="deviceModel">
      <el-form label-position="top">
        <div>
          <el-row :gutter="20">
            <el-col class="field" :span="12">
              <el-form-item :label="$t('company.deviceName')">
                {{ selectedDevice.deviceName ? selectedDevice.deviceName : "--" }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('company.deviceCode')">
                {{ selectedDevice.deviceCode  }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="$t('company.description')">
                {{ selectedDevice.description ? selectedDevice.description : "--" }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('company.user')">
                {{ selectedDevice.user ? (selectedDevice.user.fullName ? `${selectedDevice.user.fullName} | ${selectedDevice.user.email}` : `-- | ${selectedDevice.user.email}`) : '--' }}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="text-center">
          <el-button class="btn btn-primary" @click="deviceModel = false">
            <i class="el-icon-circle-check" /> {{ $t("company.done") }}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceList, deleteDevice, getFridgeName } from "@/api/device"
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
      },
      deviceList: [],
      total: 0,
      deviceModel: false,
      selectedDevice: {},
      fridgeList: {}
    }
  },
  computed: {
    ...mapGetters(['userType']),
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
      try {   
        const res = await getDeviceList(this.listQuery);
        const fridgeRes = await getFridgeName();
        const fridgeList = Array.isArray(fridgeRes.data.data.data) ? fridgeRes.data.data.data : fridgeRes.data.data.data.titleIt || [];
        const deviceList = res.data.data;
        const mergedList = deviceList.map(device => {
            const matchingFridge = fridgeList.find(fridge => fridge.ProjectFlowCode === device.deviceCode);
            return {
                ...device,
                fridgeInfo: matchingFridge
            };
        });
        this.deviceList = mergedList;
        this.total = res.data.totalCount;
      } catch (error) {
        console.error("Error fetching device list:", error)
      } finally {
        this.listLoading = false
      }
    },
    async handleFilter() {
      this.listLoading = true
      try {
        const res = await getDeviceList(this.listQuery)
        this.deviceList = res.data.data
        this.total = res.data.totalCount
      } catch (error) {
        console.error("Error filtering device list:", error)
      } finally {
        this.listLoading = false
      }
    },
    async handlePageChange(page) {
      this.listQuery.page = page
      await this.handleFilter()
    },
    deleteUser(id) {
      this.$confirm(
        this.$t("company.confirmTodevice"),
        this.$t("company.warning"),
        {
          confirmButtonText: this.$t("company.confirm"),
          cancelButtonText: this.$t("company.cancel"),
          type: "warning"
        }
      )
        .then(async () => {
          try {
            const response = await deleteDevice(id)
            this.$message.success({ message: response.data.message })
            this.getPageInfo()
          } catch (error) {
            this.$message.error(error.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    formatDate(value) {
      return this.$filters.formatDate(value)
    },
    async viewDevice(device) {
      this.listLoading = true
      this.selectedDevice = device
      this.deviceModel = true
      this.listLoading = false

    }
  }
}
</script>
