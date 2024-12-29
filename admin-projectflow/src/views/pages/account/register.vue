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
                              <h1 style="color: white">ProjectFlow</h1>
                            </router-link>
                          </div>
                        </div>
                        <div class="p-5 pb-4 pt-2">
                          <p class="text-muted text-center">
                            {{ $t("company.createAccount") }}
                          </p>
                          <el-form
                            class="form-horizontal"
                            :model="registerForm"
                            :rules="registerFormRules"
                            ref="registerForm"
                          >
                            <div class="form-group auth-form-group-custom mb-4">
                              <el-form-item prop="email">
                                <el-input
                                  type="email"
                                  v-model="registerForm.email"
                                  placeholder="Enter email"
                                />
                              </el-form-item>
                              <el-form-item prop="password">
                                <el-input
                                  v-model="registerForm.password"
                                  type="password"
                                  placeholder="Enter password"
                                  show-password
                                />
                              </el-form-item>
                            </div>
                            <div class="mt-4 text-center">
                              <el-button
                                class="btn btn-primary w-md waves-effect waves-light"
                                :disabled="addingRequest"
                                @click="doSignUp"
                                >{{ $t("company.register")
                                }}<span v-if="addingRequest"
                                  >...</span
                                ></el-button
                              >
                            </div>
                          </el-form>
                          <div class="mt-4 text-center">
                            <p class="mb-0">
                              {{ $t("company.alreadyAccount") }}
                              <router-link
                                to="/login"
                                class="font-weight-medium text-primary"
                                >Login</router-link
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
import { doSignUp } from "@/api/login";
export default {
  data() {
    return {
      registerForm: {
        email: "",
        password: "",
      },
      registerFormRules: {
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
      addingRequest: false,
    };
  },
  methods: {
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    doSignUp() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          if (!this.validEmail(this.registerForm.email)) {
            this.registerForm.email = "";
            return false;
          }
          const { email, password } = this.registerForm;
          const opts = { email, password, userType: 2 };
          this.addingRequest = true;
          doSignUp(opts)
            .then((response) => {
              this.$message({
                type: "success",
                message: response.data.message,
              });
              this.addingRequest = false;
              this.$router.push("/login");
            })
            .catch((error) => {
              console.log(error);
              this.addingRequest = false;
              this.$message({
                type: "error",
                message: error.message,
              });
              console.log(error, "Registration Error");
            });
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
  },
};
</script>
