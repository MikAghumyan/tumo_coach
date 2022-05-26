<script>
import axios from "axios";

import { useStudentsStore } from "@/stores/students";

export default {
  setup(props) {
    const studentsStore = useStudentsStore();
    return { studentsStore };
  },
  data() {
    return { studentDefault: {}, student: {}, errorMessage: "" };
  },
  props: ["studentId"],
  async mounted() {
    console.log();
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
      this.studentDefault = res.data.student;
      console.log(this.student);
      console.log(this.studentDefault);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    onSubmit() {
      this.studentsStore.updateStudent(this.student._id, {
        name: this.student.name,
        surname: this.student.surname,
        email: this.student.email,
        phoneNumber: this.student.phoneNumber,
      });
    },
  },
  computed: {
    setButtonActivity() {
      if (
        this.student.name !== this.studentDefault.name ||
        this.student.surname !== this.studentDefault.surname ||
        this.student.email !== this.studentDefault.email ||
        this.student.phoneNumber !== this.studentDefault.phoneNumber
      )
        return false;
      else return true;
    },
  },
};
</script>

<template>
  <main>
    <form class="mx-auto w-50" @submit.prevent="onSubmit">
      <p class="warning">{{ this.errorMessage }}</p>
      <div class="row py-4">
        <a v-on:click="goBack" class="col-2"
          ><svg
            id="i-chevron-left"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="28"
            height="28"
            fill="none"
            stroke="currentcolor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M20 30 L8 16 20 2" />
          </svg>
        </a>
        <h2 class="text-end col-10">Student Info</h2>
      </div>
      <div class="form-group row mb-3">
        <label class="col-sm-2 col-form-label col-form-label-sm">Name</label>
        <div class="col-sm-10">
          <input
            v-model="this.student.name"
            type="text"
            class="form-control form-control-sm"
            name="name"
            label="Name"
            required
          />
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-sm-2 col-form-label col-form-label-sm">Surname</label>
        <div class="col-sm-10">
          <input
            v-model="this.student.surname"
            type="text"
            class="form-control form-control-sm"
            name="surname"
            label="Surname"
            required
          />
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-sm-2 col-form-label col-form-label-sm">Email</label>
        <div class="col-sm-10">
          <input
            v-model="this.student.email"
            type="email"
            class="form-control form-control-sm"
            name="email"
            label="Email"
            required
          />
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-sm-2 col-form-label col-form-label-sm"
          >Phone Number</label
        >
        <div class="col-sm-10">
          <input
            v-model="this.student.phoneNumber"
            type="tel"
            class="form-control form-control-sm"
            name="email"
            label="Email"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary me-3">Save</button>
      <button class="btn btn-primary">Reset</button>
    </form>
  </main>
</template>
