<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        name: "",
        surname: "",
        email: "",
        password: "",
        password2: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async onSubmit() {
      if (this.formData.password === this.formData.password2) {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/coaches/",
            {
              name: this.formData.name,
              surname: this.formData.surname,
              email: this.formData.email,
              password: this.formData.password,
            }
          );
          if (response.data.token) {
            localStorage.setItem("coach", JSON.stringify(response.data));
            this.$router.go("/students");
          } else {
            return response.data;
          }
        } catch (err) {
          this.errorMessage = err.response.data.message;
        }
      } else this.errorMessage = "Passwords don't match";
    },
  },
};
</script>

<template>
  <main>
    <section class="h-100">
      <div class="container h-100">
        <div class="row justify-content-sm-center h-100">
          <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div class="text-center my-5">
              <img
                src="https://careercenter.am/storage/logos/1583311188132303990.png"
                alt="logo"
                width="200"
              />
            </div>
            <div class="card shadow-lg">
              <div class="card-body p-5">
                <h1 class="fs-4 card-title fw-bold mb-4">Register</h1>
                <form
                  method="POST"
                  class="needs-validation"
                  novalidate=""
                  autocomplete="off"
                  @submit.prevent="onSubmit"
                >
                  <div class="mb-3">
                    <label class="mb-2 text-muted" for="email">Name</label>
                    <input
                      class="form-control"
                      v-model="formData.name"
                      name="name"
                      label="Name"
                      placeholder="Varazdat"
                      @change="onChange"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label class="mb-2 text-muted" for="email">Surname</label>
                    <input
                      class="form-control"
                      v-model="formData.surname"
                      name="surname"
                      label="Surname"
                      placeholder="Haroyan"
                      @change="onChange"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label class="mb-2 text-muted" for="email"
                      >E-Mail Address</label
                    >
                    <input
                      class="form-control"
                      v-model="formData.email"
                      name="email"
                      label="Email"
                      placeholder="vatozashita@gmail.com"
                      @change="onChange"
                      required
                    />
                  </div>

                  <div class="mb-3">
                    <div class="mb-2 w-100">
                      <label class="text-muted" for="password">Password</label>
                    </div>
                    <input
                      class="form-control"
                      v-model="formData.password"
                      type="password"
                      name="password"
                      label="Password"
                      placeholder="******"
                      @change="onChange"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <div class="mb-2 w-100">
                      <label class="text-muted" for="password">Password</label>
                    </div>
                    <input
                      class="form-control"
                      v-model="formData.password2"
                      type="password"
                      name="password2"
                      label="Password2"
                      placeholder="******"
                      @change="onChange"
                      required
                    />
                  </div>
                  <div
                    class="alert alert-danger"
                    role="alert"
                    v-if="errorMessage !== ''"
                  >
                    {{ errorMessage }}
                  </div>
                  <div class="">
                    <button type="submit" class="btn btn-primary">
                      Register
                    </button>
                  </div>
                </form>
              </div>
              <div class="card-footer py-3 border-0">
                <div class="text-center">
                  Do you have an account already?
                  <a href="/register" class="text-dark">Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
