<template>
  <div v-loading="addingRequest" class="verify-container">
    <div class="content">
      <p class="success">
        <img src="@/assets/images/check.png" class="successflag" alt="successflag">
      </p>
      <p class="message">
        {{ $t('user.verifyEmail1') }}
      </p>
      <router-link :to="'/login'">
        <el-button class="btn btn-primary">Login</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { verifyUserAccount } from '@/api/user'

export default {
  name: 'VerifyEmail',
  bodyClass: 'signup-page',
  components: {},
  data() {
    return {
      addingRequest: false,
      resmessage: '',
      isCorrect: ''
    }
  },
  created() {
    this.verifyEmail()
  },
  methods: {
    verifyEmail() {
      const uri = window.location.href.split('?')
      if (uri.length == 2) {
        const vars = uri[1].split('&')
        const getVars = {}
        let tmp = ''
        vars.forEach(function(v) {
          tmp = v.split('=')
          if (tmp.length == 2) getVars[tmp[0]] = tmp[1]
        })
        this.id = getVars.id
        this.email = getVars.email
        this.token = getVars.token
        if (this.id && this.email && this.token) {
          verifyUserAccount(this.id, this.email, this.token).then((response) => {
            this.addingRequest = false
            this.isCorrect = 1
            this.resmessage = this.$t('user.verifyEmail1')
            this.$message({
              message: "Verifica dell'account riuscita",
              type: 'success'
            })
          }).catch((error) => {
            this.resmessage = error.message
            this.addingRequest = false
            this.$message({
              message: "Invalid Request",
              type: 'error'
            })
            setTimeout(function() {
              this.resmessage = error.message
              window.location.href = '/'
            }, 5000)
          })
        } else {
          this.resmessage = 'Invalid request'
          setTimeout(function() {
            this.resmessage = error.message
            // window.location.href = '/'
          }, 2000)
        }
      }
    }
  }
}
</script>

<style scoped>
.verify-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.successflag {
  width: 62px; /* Adjust as needed */
}

.message {
  margin: 20px 0;
  font-size: 18px; /* Adjust font size as needed */
}

.btn {
  margin-top: 20px;
}
</style>