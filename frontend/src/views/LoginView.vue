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
  <header>
    <img
      src="https://tumo.org/wp-content/uploads/2018/02/ENG003_Stroke-Black-H80px-1.png"
      alt="TUMO"
    />
  </header>
  <main>
    <form @submit.prevent="onSubmit">
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
    </form>
  </main>
</template>
