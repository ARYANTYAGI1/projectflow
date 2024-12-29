<template>
  <div>
    <el-tabs v-model="activeTabName" @tab-click="handleClick">
      <el-tab-pane name="Key" :label="$t('user.secretKey')">
        <section>
          <el-card class="full-height-card">
            <div class="d-flex justify-content-between mb-3" v-if="!keyData || keyData.length === 0">
              <div class="d-flex">
                <router-link to="/settings/create-key">
                  <el-button class="btn btn-primary me-2 w-100">{{ $t("user.addSecretKey") }}</el-button>
                </router-link>
              </div>
            </div>
            <div v-loading="listLoading" class="user-table">
              <!-- Table to display the key data -->
              <el-table v-if="Object.keys(keyData).length > 0" :data="[keyData]" border style="width: 100%"  :empty-text="$t('table.noData')">
                <el-table-column align="center" :label="$t('user.secretKey')">
                  <template #default="scope">{{ scope.row.secretKey }}</template>
                </el-table-column>
                <el-table-column align="center" :label="$t('table.actions')" width="180">
                  <template #default="scope">
                    <div class="d-flex justify-content-center">
                      <!-- Edit Button -->
                      <router-link :to="`/settings/create-key/${scope.row._id}`" class="pe-2">
                        <el-button class="btn btn-primary table-icon-btn">
                          <i class="mdi mdi-account-edit"></i>
                        </el-button>
                      </router-link>
                      <!-- Delete Button -->
                      <el-button class="btn btn-primary delete-btn table-icon-btn" @click="deleteKey(scope.$index,scope.row._id)">
                        <i class="mdi mdi-delete" />
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-table v-else :data="[]" border style="width: 100%" :empty-text="$t('table.noData')"/>
            </div>
          </el-card>
        </section>
      </el-tab-pane>
      <el-tab-pane name="AppKey" :label="$t('user.ApplicationKey')">
        <section>
          <el-card class="full-height-card">
            <div class="d-flex justify-content-between mb-3" v-if="!appKeyData || appKeyData.length === 0">
              <div class="d-flex">
                <router-link to="/settings/create-appkey">
                  <el-button class="btn btn-primary me-2 w-100">{{ $t("user.addAppKey") }}</el-button>
                </router-link>
              </div>
            </div>
            <div v-loading="listLoading" class="user-table">
              <!-- Table to display the key data -->
              <el-table v-if="Object.keys(appKeyData).length > 0" :data="[appKeyData]" border style="width: 100%"  :empty-text="$t('table.noData')">
                <el-table-column align="center" :label="$t('user.ApplicationKey')">
                  <template #default="scope">{{ scope.row.applicationKey }}</template>
                </el-table-column>
                <el-table-column align="center" :label="$t('table.actions')" width="180">
                  <template #default="scope">
                    <div class="d-flex justify-content-center">
                      <!-- Edit Button -->
                      <router-link :to="`/settings/create-appkey/${scope.row._id}`" class="pe-2">
                        <el-button class="btn btn-primary table-icon-btn">
                          <i class="mdi mdi-account-edit"></i>
                        </el-button>
                      </router-link>
                      <!-- Delete Button -->
                      <el-button class="btn btn-primary delete-btn table-icon-btn" @click="deleteAppKey(scope.$index,scope.row._id)">
                        <i class="mdi mdi-delete" />
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-table v-else :data="[]" border style="width: 100%" :empty-text="$t('table.noData')"/>
            </div>
          </el-card>
        </section>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getKey, removeKey, getAppKey, removeAppKey } from "@/api/setting";

export default {
  data() {
    return {
      listLoading: false,
      keyData: {},
      appKeyData: {},
      activeTabName: 'Key',
    };
  },
  created() {
    this.getPageInfo();
  },
  watch: {
    activeTabName(newTabName) {
      if (newTabName === 'Key') {
        this.getPageInfo();
      } else if (newTabName === 'AppKey') {
        this.getAppPageInfo();
      }
    }
  },
  methods: {
    async getPageInfo() {
      this.listLoading = true;
      try {
        const res = await getKey();
        this.keyData = res.data.data;
      } catch (error) {
        console.error("Error fetching key data:", error);
      } finally {
        this.listLoading = false;
      }
    },
    deleteKey(index, id) {
      this.$confirm(this.$t("company.confirmToSecretKey"), this.$t("company.warning"), {
        confirmButtonText: this.$t("company.confirm"),
        cancelButtonText: this.$t("company.cancel"),
        type: 'warning'
      }).then(() => {
        removeKey(id).then(response => {
          this.$message.success({ message: response.data.message })
          this.getPageInfo()
        }).catch(error => {
          this.$message.error({ message: error.message })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    async getAppPageInfo() {
      this.listLoading = true;
      try {
        const res = await getAppKey();
        this.appKeyData = res.data.data;
      } catch (error) {
        console.error("Error fetching key data:", error);
      } finally {
        this.listLoading = false;
      }
    },
    deleteAppKey(index, id) {
      this.$confirm(this.$t("company.confirmToAppKey"), this.$t("company.warning"), {
        confirmButtonText: this.$t("company.confirm"),
        cancelButtonText: this.$t("company.cancel"),
        type: 'warning'
      }).then(() => {
        removeAppKey(id).then(response => {
          this.$message.success({ message: response.data.message })
          this.getAppPageInfo()
        }).catch(error => {
          this.$message.error({ message: error.message })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    handleClick(tabName) {
      this.activeTabName = tabName.name;
      if (tabName.name === 'Key') this.getPageInfo();
      if (tabName.name === 'AppKey') {
        this.getAppPageInfo();
      }
    },
  },
};
</script>
