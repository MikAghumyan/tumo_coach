<script>
import { useWorkshopsStore } from "../../stores/workshops";

export default {
  setup(props) {
    const workshopsStore = useWorkshopsStore();
    return { workshopsStore };
  },
  data() {
    return {
      errorMessage: "",
      successMessage: "",
      students: [],
      emailInput: "",
    };
  },
  async mounted() {
    this.getStudents();
  },
  methods: {
    async onSubmit() {
      const res = await this.workshopsStore.attachStudent(
        this.$route.params.id,
        this.emailInput
      );
      if (res.message) this.errorMessage = res.message;
      else this.getStudents();
    },
    async onDetatch(studentId) {
      console.log(studentId);
      const res = await this.workshopsStore.detatchStudent(
        studentId,
        this.$route.params.id
      );
      if (res.message) this.errorMessage = res.message;
      else this.getStudents();
    },
    async getStudents() {
      const res = await this.workshopsStore.getWorkshopStudents(
        this.$route.params.id
      );
      console.log(res);
      if (res.message) this.errorMessage = res.message;
      else console.log(this.errorMessage);
      this.students = res;
    },
  },
};
</script>

<template>
  <section>
    <div class="mx-auto mt-5 mb-2 w-50">
      <h4 class="text-end">Students</h4>
      <ul class="list-group">
        <li
          v-for="student in students"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {{ `${student.name} ${student.surname}` }}
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="onDetatch(student._id)"
          ></button>
        </li>
      </ul>
    </div>
    <form class="mx-auto w-50" @submit.prevent="onSubmit">
      <div class="form-group row mb-3">
        <label class="col-sm-2 col-form-label col-form-label-sm"
          >Add student</label
        >
        <div class="col-sm-10">
          <input
            v-model="emailInput"
            type="email"
            class="form-control form-control-sm"
            name="email"
            label="Email"
            required
          />
        </div>
      </div>
      <div
        class="alert alert-success"
        role="alert"
        v-if="successMessage !== ''"
      >
        {{ successMessage }}
      </div>
      <div
        class="alert alert-danger"
        role="alert"
        v-else-if="errorMessage !== ''"
      >
        {{ errorMessage }}
      </div>
      <button
        type="submit"
        class="btn btn-primary me-3"
        :disabled="emailInput === ''"
      >
        Save
      </button>
    </form>
  </section>
</template>
