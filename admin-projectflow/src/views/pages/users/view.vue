<template>
  <main>
    <section>
      <el-card class="full-height-card">
        <div v-loading="detailLoading">
          <el-form :model="userData" label-position="top">
            <el-row :gutter="20" style="display: flex; justify-content: center; align-items: center;">
              <el-col :md="6">
                <el-form-item>
                  <el-avatar shape="circle" :size="120">
                    <img v-if="userData.picture" :src="userData.picture" class="iavatar">
                    <img v-else src="@/assets/images/user/user.jpg" class="iavatar" alt="">
                  </el-avatar>
                  <p><strong class="text-uppercase">{{ userData.fullName ? userData.fullName: '--' }}</strong></p>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :md="12">
                  <el-form-item class="form-item-label" :label="$t('user.firstName')">
                    {{ userData.firstName ? userData.firstName: '--' }}
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item class="form-item-label" :label="$t('user.lastName')">
                    {{ userData.lastName ? userData.lastName: '--' }}
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :md="12">
                  <el-form-item class="form-item-label" :label="$t('company.email')">
                    {{ userData.email }}
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item class="form-item-label" :label="$t('table.emailverified')">
                    {{ userData.isEmailVerified ? 'Si': 'No' }}
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :md="12">
                  <el-form-item class="form-item-label" :label="$t('table.lastLogin')">
                    {{ formatDate(userData.lastLogin) }}
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item class="form-item-label" :label="$t('table.created_at')">
                    {{ formatDate(userData.created_at) }}
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item class="form-item-label" :label="$t('company.status')" prop="isActive">
                    <el-switch v-model="userData.isActive" active-color="#409EFF" inactive-color="#eeeeee" @change="updateBanUnban(userData._id, userData.isActive)" />
                  </el-form-item>
                </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </section>
  </main>
</template>

<script>
import { getUserDetail, blockUser } from '@/api/user'

export default {
  data() {
    return {
      detailLoading: false,
      userData: {}
    }
  },
  created() {
    this.getPageInfo()
  },
  methods: {
    async getPageInfo() {
      this.detailLoading = true
      this.userId = this.$route.params && this.$route.params.id
      const res = await getUserDetail(this.userId)
      this.userData = res.data.data
      this.total = res.data.totalCount
      this.detailLoading = false
    },
    formatDate(value) {
      return this.$filters.formatDate(value)
    },
    async updateBanUnban(userId, status) {
      await blockUser(userId, { isActive: status })
      this.getPageInfo()
    }
  }
}

</script>
