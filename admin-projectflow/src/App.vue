<template>
  <div id="app">
    <Layout v-if="!showLayout">
      <router-view />
    </Layout>
    <router-view v-else />
  </div>
</template>

<script>
import Layout from './views/layouts/main.vue'

export default {
  name: 'App',
  components: {
    Layout
  },
  data() {
    return {
      showLayout: false
    }
  },
  watch: {
    $route(to, from) {
      this.checkRoute(to.name)
    }
  },
  created() {
    this.checkRoute(this.$route.name)
  },
  methods: {
    checkRoute(pageName) {
      if (['Login', 'Forgot-password', 'Register', 'VerifyAccount', undefined].indexOf(pageName) > -1) {
        this.showLayout = true
      } else {
        this.showLayout = false
      }
    }
  }
}
</script>
