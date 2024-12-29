<template>
  <div class="filter-container">
    <section>
      <el-card class="full-height-card">
        <div class="d-flex justify-content-between mb-3">
          <div class="w-100 me-2">
            <el-input v-model="listQuery.name" :placeholder="$t('company.searchByDeviceNameDeviceCode')"
              @keyup="handleFilter" />
          </div>
          <div class="d-flex">
            <router-link to="/measurement/create">
              <el-button class="btn btn-primary me-2 w-100">{{ $t("user.addMeasurements") }}</el-button>
            </router-link>
          </div>
        </div>
        <div v-loading="listLoading" class="user-table">
          <el-table :data="measurementList" border style="width: 100%">
            <el-table-column align="center" :label="$t('user.device')">
              <template #default="scope">
                {{ scope.row.device ? (scope.row.device.deviceCode ? (scope.row.device.deviceName ? `${scope.row.device.deviceCode} | ${scope.row.device.deviceName}` : `${scope.row.device.deviceCode} | --`)
                   : (scope.row.device.deviceName ? `-- | ${scope.row.device.deviceName}` : '--')) : '--'
                }}
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('user.dateTime')" width="180">
              <template #default="scope">{{ formatDateTime(scope.row.measureDateTime) }}</template>
            </el-table-column>
            <el-table-column align="center" :label="$t('user.temperature')" width="180">
              <template #default="scope">{{ `${scope.row.measure} °${scope.row.scale}` }}</template>
            </el-table-column>
            <el-table-column v-if="userType == '1'" align="center" :label="$t('user.user')" width="210">
              <template #default="scope">
                {{ scope.row.user ? (scope.row.user.email && scope.row.user.fullName ? `${scope.row.user.email} |
                ${scope.row.user.fullName}` : '--') : '--' }}
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
                  <router-link :to="`/measurement/create/${row._id}`" class="pe-2">
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
    <el-dialog class="custom-dialog form-item-label" :title="$t('company.measurementDetails')"
      v-model="measurementModel">
      <el-form label-position="top">
        <div>
          <el-row :gutter="20">
            <el-col class="field" :span="12">
              <el-form-item :label="$t('user.device')">
                {{ selectedMeasurement.device ? (selectedMeasurement.device.deviceCode ?
                  `${selectedMeasurement.device.deviceCode} | ${selectedMeasurement.device.deviceName}` : `-- |
                ${selectedMeasurement.device.deviceName}`) : '--' }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('user.temperature')">
                {{ `${selectedMeasurement.measure} °${selectedMeasurement.scale}` }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('user.dateTime')">
                {{ formatDateTime(selectedMeasurement.measureDateTime) }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('user.user')">
                {{ selectedMeasurement.user ? (selectedMeasurement.user.email && selectedMeasurement.user.fullName ?
                  `${selectedMeasurement.user.email} | ${selectedMeasurement.user.fullName}` : '--') : '--' }}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="text-center">
          <el-button class="btn btn-primary" @click="measurementModel = false">
            <i class="el-icon-circle-check" /> {{ $t("company.done") }}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getMeasurementList, deleteMeasurement } from "@/api/measurement"
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
      },
      measurementList: [],
      total: 0,
      measurementModel: false,
      selectedMeasurement: {},
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
        const res = await getMeasurementList(this.listQuery)
        this.measurementList = res.data.data
        this.total = res.data.totalCount
      } catch (error) {
        console.error("Error fetching measurement list:", error)
      } finally {
        this.listLoading = false
      }
    },
    async handleFilter() {
      this.listLoading = true
      try {
        const res = await getMeasurementList(this.listQuery)
        this.measurementList = res.data.data
        this.total = res.data.totalCount
      } catch (error) {
        console.error("Error filtering measurement list:", error)
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
        this.$t("company.confirmToMeasurement"),
        this.$t("company.warning"),
        {
          confirmButtonText: this.$t("company.confirm"),
          cancelButtonText: this.$t("company.cancel"),
          type: "warning",
        }
      )
        .then(async () => {
          try {
            const response = await deleteMeasurement(id)
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
    formatDateTime(value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY HH:mm');
      }
      return null;
    },
    async viewDevice(measurement) {
      this.selectedMeasurement = measurement
      this.measurementModel = true
    }
  }
}
</script>
