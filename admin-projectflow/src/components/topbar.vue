<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex align-items-center">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-light text-center">
            <span class="logo-sm">
              <!-- <img src="@/assets/images/logo_white_WLP.png" alt height="30" /> -->
              <h1 style="color: white;padding: 10px 0;margin-inline-start: -13px;">PF</h1>
            </span>
            <span class="logo-lg text-center">
              <!-- <img src="@/assets/images/logo_white.png" alt height="45" /> -->
              <h1 style="color: white;padding: 10px;">ProjectFlow</h1>
            </span>
          </router-link>
        </div>
        <button @click="toggleMenu" type="button" class="btn btn-sm px-3 font-size-24 header-item waves-effect" id="vertical-menu-btn">
          <i class="ri-menu-2-line align-middle"></i>
        </button>
        <!-- App Search-->
        <div class="position-relative">
          <h4 class="ms-2 mb-0" style="font-size: 20px;">{{ $t(pageTitle) }}</h4>
        </div>
        <!-- </form> -->
      </div>
      <div class="d-flex">
        <div class="dropdown d-inline-block d-lg-none ms-2">
          <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-search-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="ri-search-line"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0" aria-labelledby="page-header-search-dropdown">
            <form class="p-3">
              <div class="form-group m-0">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search ..." />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="submit">
                      <i class="ri-search-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <BDropdown variant="white" right toggle-class="header-item" menu-class="dropdown-menu-end" class="d-inline-block user-dropdown">
          <template #button-content>
            <img class="rounded-circle header-profile-user" src="@/assets/images/user/user.jpg" alt="Header Avatar" />
            <span class="d-none d-xl-inline-block ms-1">{{ fullName }}</span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <BDropdownItem href="/profile">
            <i class="ri-user-line align-middle me-1"></i>
            {{ $t("navbar.profile") }}
          </BDropdownItem>
          <BDropdownItem class="d-block" href="/change-password">
            <span class="badge badge-success float-end mt-1">11</span>
            <i class="ri-settings-2-line align-middle me-1"></i>
            {{ $t("navbar.changePassword") }}
          </BDropdownItem>
          <BDropdownDivider />
          <BDropdownItem class="text-danger" @click="logOut()">
            <i class="ri-shut-down-line align-middle me-1 text-danger"></i>
            {{ $t("navbar.logout") }}
          </BDropdownItem>
        </BDropdown>
      </div>
    </div>
  </header>
</template>
<script>
import simplebar from 'simplebar-vue'
import i18n from '../i18n'
import us from '@/assets/images/flags/us.jpg'
import italy from '@/assets/images/flags/flag_it.png'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      languages: [
        {
          flag: us,
          language: 'en',
          title: 'English'
        },
        {
          flag: italy,
          language: 'it',
          title: 'Italian'
        }
      ],
      current_language: 'it',
      flag: italy,
      title: 'Italian',
      pageTitle: ''
    }

  },
  components: { simplebar },
  computed: {
    ...mapGetters([
      'fullName',
    ])
  },
  watch: {
    $route(to, from) {
      this.getPageName(to.name)
    }
  },
  created() {
    this.getPageName(this.$route.name)
  },
  methods: {
    getPageName(name) {
      this.pageTitle = name
    },
    logOut() {
      this.$confirm(this.$t('user.sureToLogout'), this.$t('company.warning'), {
        confirmButtonText: this.$t('company.confirm'),
        cancelButtonText: this.$t('company.cancel'),
        type: 'warning'
      }).then(async() => {
        this.$store.dispatch('LogOut', {}).then((response) => {
          this.$router.push({ path: '/login' })
          this.$message({ message: this.$t('user.logoutSuccessfully'), type: 'success' })
        })
      }).catch(err => { console.error(err) })
    },
    toggleMenu() {
      this.$parent.toggleMenu()
    },
    initFullScreen() {
      document.body.classList.toggle('fullscreen-enable')
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          )
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        }
      }
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar()
    },
    setLanguage(locale, country, flag) {
      this.text = country
      this.flag = flag
      this.current_language = i18n.locale
      i18n.global.locale = locale
    }
  }
}
</script>
<style lang="scss" scoped>
.notify-item {
  .active {
    color: #16181b;
    background-color: #f8f9fa;
  }
}
</style>
