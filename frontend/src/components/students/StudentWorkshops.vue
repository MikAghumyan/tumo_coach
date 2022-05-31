<script>
import { useStudentsStore } from "../../stores/students";

export default {
  setup(props) {
    const studentsStore = useStudentsStore();
    return { studentsStore };
  },
  data() {
    return {
      errorMessage: "",
      successMessage: "",
      workshops: [],
      input: { name: "", level: null },
    };
  },
  async mounted() {
    this.getWorkshops();
  },
  methods: {
    async onSubmit() {
      const res = await this.studentsStore.attachWorkshop(
        this.$route.params.id,
        this.input.name,
        this.input.level
      );
      if (res.message) this.errorMessage = res.message;
      else this.getWorkshops();
    },
    async onDetatch(workshopId) {
      const res = await this.studentsStore.detatchWorkshop(
        this.$route.params.id,
        workshopId
      );
      if (res.message) this.errorMessage = res.message;
      else this.getWorkshops();
    },
    async getWorkshops() {
      const res = await this.studentsStore.getStudentWorkshops(
        this.$route.params.id
      );
      console.log(res);
      if (res.message) this.errorMessage = res.message;
      else console.log(this.errorMessage);
      this.workshops = res;
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
          v-for="workshop in workshops"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {{ `${workshop.name} - level ${workshop.level}` }}
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="onDetatch(workshop._id)"
          ></button>
        </li>
      </ul>
    </div>
    <form class="mx-auto w-50" @submit.prevent="onSubmit">
      <div class="form-group row mb-3">
        <label class="col-sm-2 col-form-label col-form-label-sm">Name</label>
        <div class="col-sm-10">
          <input
            v-model="input.name"
            type="text"
            class="form-control form-control-sm"
            name="name"
            label="Name"
            required
          />
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-sm-2 col-form-label col-form-label-sm">Level</label>
        <div class="col-sm-10">
          <input
            v-model="input.level"
            type="number"
            class="form-control form-control-sm"
            name="level"
            label="Level"
            required
            min="1"
            max="3"
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
        :disabled="input.name === '' || input.level === null"
      >
        Save
      </button>
    </form>
  </section>
</template>
