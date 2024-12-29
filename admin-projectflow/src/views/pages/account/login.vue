<template>
  <div>
    <div>
      <div class="container-fluid p-0">
        <div>
          <div>
            <div
              class="authentication-page-content align-items-center min-vh-100 place-content-center"
            >
              <div class="w-100">
                <div class="d-flex justify-content-center">
                  <div style="width: 100%; max-width: 500px">
                    <div class="card" style="border-width: 0">
                      <div>
                        <div>
                          <div class="mb-3 login-card">
                            <router-link :to="'/'" class="logo">
                              <!-- <img src="@/assets/images/logo_white.png" alt="logo" /> -->
                              <h1 style="color: white">ProjectFlow</h1>
                            </router-link>
                          </div>
                        </div>
                        <div class="p-5 pb-4 pt-2">
                          <p class="text-muted text-center">
                            {{ $t("company.welcome") }}
                          </p>
                          <el-form
                            class="form-horizontal"
                            :model="loginForm"
                            :rules="loginFormRules"
                            ref="loginForm"
                          >
                            <!-- <el-form class="form-horizontal" ref="loginForm"> -->
                            <div class="form-group auth-form-group-custom mb-4">
                              <el-form-item prop="email">
                                <el-input
                                  type="email"
                                  v-model="loginForm.email"
                                  placeholder="Email"
                                />
                              </el-form-item>
                              <el-form-item prop="password">
                                <el-input
                                  v-model="loginForm.password"
                                  type="password"
                                  id="userpassword"
                                  placeholder="Password"
                                  show-password
                                />
                              </el-form-item>
                            </div>
                            <div class="mt-4 text-center">
                              <!-- <el-button class="btn btn-primary w-md waves-effect waves-light" :disabled="addingRequest" @click="clickLogin($refs.loginForm)">Log In<span v-if="addingRequest">...</span></el-button> -->
                              <el-button
                                class="btn btn-primary w-md waves-effect waves-light"
                                :disabled="addingRequest"
                                @click.native.prevent="handleLogin"
                                >Log In<span v-if="addingRequest"
                                  >...</span
                                ></el-button
                              >
                            </div>
                            <div class="mt-4 text-center">
                              <router-link
                                tag="a"
                                to="/forgot-password"
                                class="text-muted"
                              >
                                <i class="mdi mdi-lock me-1"></i>
                                {{ $t("company.forgotPassword") }}
                              </router-link>
                            </div>
                          </el-form>
                          <div class="mt-4 text-center">
                            <p class="mb-0">
                              {{ $t("company.notAccount") }}
                              <router-link
                                to="/register"
                                class="font-weight-medium text-primary"
                                >{{ $t("company.register") }}</router-link
                              >
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addingRequest: false,
      loginForm: {
        email: "",
        password: "",
      },
      loginFormRules: {
        email: [
          {
            required: true,
            message: this.$t("company.emailIsRequired"),
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("company.passwordIsRequired"),
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.addingRequest = true;
          this.$store
            .dispatch("loginByUsername", this.loginForm)
            .then((loginResponse) => {
              this.$store
                .dispatch("GetUserInfo", loginResponse)
                .then((response) => {
                  this.loginRequest = false;
                  this.$message({ type: 'success', message: this.$t('user.loginSuccessfull')})
                  this.$router.push({ path: this.redirect || "/" });
                })
                .catch((error) => {
                  this.addingRequest = false;
                  this.$message({
                    type: "error",
                    message: error.message,
                  });
                });
            })
            .catch((error) => {
              this.addingRequest = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
