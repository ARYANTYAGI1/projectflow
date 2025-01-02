<template>
  <!-- Page Top Heading -->
   <div v-loading="detailLoading">
    <div>
      <section class="profile-page mt-3" v-if="profileData">
        <div class="container-fluid">
          <el-card class="profile-page-card">
            <div class="profile-detail">
              <el-row :gutter="20">
                <el-col :md="10">
                  <div class="text-center">
                    <div class="profile-picture">
                      <img src="@/assets/images/user/user.jpg" class="rounded-circle" alt="Profile picture">
                    </div>
                    <div class="profile-name">
                      <h3>{{ profileData.name }}</h3>
                    </div>
                    <div class="account-opening-date">
                      <p class="date"><i class="fas fa-calendar-alt"></i>{{ formatDate(profileData.createdAt) }}</p>
                    </div>
                  </div>
                </el-col>
                <el-col :md="14" class="m-auto">
                  <div class="profile-info-detail">
                    <p><strong>{{ $t('company.fullName') }}:</strong> {{ profileData.name }}</p>
                    <p><strong>{{ $t('company.email') }}:</strong> {{ profileData.email }}</p>
                    <p><strong>Organization:</strong> {{ profileData.organization }}</p>
                    <p><strong>Role:</strong> {{ profileData.role }}</p>
                    <p><strong>Status:</strong> {{ profileData.status }}</p>
                  </div>
                </el-col>
              </el-row>
              <div class="d-flex align-items-center justify-content-center mt-4">
                <!-- <router-link :to="'/profile/update'" >
                  <el-button class="btn btn-primary">{{ $t('company.update') }}</el-button>
                </router-link> -->
              <router-link :to="'/'" >
                <el-button class="btn btn-secondary ms-3">{{ $t('company.back') }}</el-button>
              </router-link>
            </div>
            </div>
          </el-card>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { getUserProfile } from '@/api/user'

export default {
  page: {
    title: 'Profile',
    meta: [{ name: 'description' }]
  },
  data() {
    return {
      detailLoading: false,
      profileData: {}
    }
  },
  created() {
    this.getProfileInfo()
  },
  methods: {
    async getProfileInfo() {
      this.detailLoading = true
      const res = await getUserProfile()
      this.profileData = res.data.data
      console.log(this.profileData, 'ProfileData')
      this.detailLoading = false
    },
    formatDate(value) {
      return this.$filters.formatDate(value)
    }
  }
}
</script>
