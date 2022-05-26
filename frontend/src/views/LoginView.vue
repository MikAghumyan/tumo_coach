<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: { email: "", password: "" },
      errorMessage: "",
    };
  },
  methods: {
    onChange(e) {
      this.formData[e.target.name] = e.target.value;
      console.log(this.formData);
    },
    async onSubmit(e) {
      console.log(this.formData);
      try {
        const response = await axios.post(
          "http://localhost:4000/api/coaches/login",
          this.formData
        );
        console.log(response);
        if (response.data.token) {
          localStorage.setItem("coach", JSON.stringify(response.data));
          this.$router.go("/students");
        } else {
          console.log(response.data);
        }
      } catch (err) {
        this.errorMessage = err.response.data.message;
        console.log(err.response.data);
      }
    },
  },
};
</script>

<template>
  <!-- <form @submit.prevent="onSubmit">
      <p class="warning">{{ this.errorMessage }}</p>
      <h2>Login</h2>
      <div>
        <input
          v-model="formData.email"
          name="email"
          label="Email"
          placeholder="vatozashita@gmail.com"
          @change="onChange"
          required
        />
        <br />
        <input
          v-model="formData.password"
          type="password"
          name="password"
          label="Password"
          placeholder="******"
          @change="onChange"
          required
        />
      </div>
      <div style="margin: 16px">
        <button className="submit" type="submit">Submit</button>
        <a class="redirect" href="/register">Register</a>
      </div>
    </form> -->
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
              <h1 class="fs-4 card-title fw-bold mb-4">Login</h1>
              <form
                method="POST"
                class="needs-validation"
                novalidate=""
                autocomplete="off"
                @submit.prevent="onSubmit"
              >
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
                  <div class="invalid-feedback">Email is invalid</div>
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
                  <div class="invalid-feedback">Password is required</div>
                </div>
                <div
                  class="alert alert-danger"
                  role="alert"
                  v-if="errorMessage !== ''"
                >
                  {{ errorMessage }}
                </div>
                <div class="">
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
            <div class="card-footer py-3 border-0">
              <div class="text-center">
                Don't have an account?
                <a href="/register" class="text-dark">Create One</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
</style>
