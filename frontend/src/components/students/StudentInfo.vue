<script>
import axios from "axios";

export default {
  methods: {
    goBack() {
      this.$router.replace("/students/");
    },
    onChange() {},
  },
  data() {
    return { student: {}, errorMessage: "" };
  },
  props: ["studentId"],
  async mounted() {
    console.log(this.$route);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/students/${this.$route.params.id}/`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("coach")).token
            }`,
          },
        }
      );
      console.log(res.data.student);
      this.student = res.data.student;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<template>
  <main>
    <form @submit.prevent="onSubmit">
      <div>
        <p class="warning">{{ this.errorMessage }}</p>
        <h2>
          <a v-on:click="goBack">Go back</a>
        </h2>
      </div>

      <div>
        <input
          v-model="this.student.name"
          type="text"
          name="name"
          label="Name"
          @change="onChange"
          required
        />
        <br />
        <input
          v-model="this.student.surname"
          type="text"
          name="surname"
          label="Surname"
          @change="onChange"
          required
        />
        <br />
        <input
          v-model="this.student.email"
          type="email"
          name="email"
          label="Email"
          @change="onChange"
          required
        /><br />
        <input
          v-model="this.student.phoneNumber"
          type="text"
          name="email"
          label="Email"
          placeholder="vatozashita@gmail.com"
          @change="onChange"
          required
        />
        <br />
        <br />
      </div>
      <!-- <div style="margin: 16px">
        <a className="submit" type="submit">Submit</a>
        <a class="redirect" href="/register">Register</a>
      </div> -->
    </form>
  </main>
</template>
