<script>
import { useWorkshopsStore } from "../../stores/workshops";

export default {
  setup(props) {
    const workshopsStore = useWorkshopsStore();
    return { workshopsStore };
  },
  data() {
    return {
      name: "",
      level: null,
      description: "",
      errorMessage: "",
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    async onSubmit() {
      this.errorMessage = await this.workshopsStore.addWorkshop({
        name: this.name,
        level: this.level,
        description: this.description,
      });
      !this.errorMessage && this.$router.push("/workshops");
    },
  },
};
</script>

<template>
  <section class="h-100">
    <div class="container h-100">
      <div class="row justify-content-sm-center h-100">
        <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
          <div class="card shadow-lg">
            <div class="card-body p-5">
              <div class="row">
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
                <h2 class="text-end col-10">Add Workshop</h2>
              </div>
              <form
                method="POST"
                class="needs-validation"
                novalidate=""
                autocomplete="off"
                @submit.prevent="onSubmit"
              >
                <div class="mb-3">
                  <label class="mb-2 text-muted" for="name">Name</label>
                  <input
                    class="form-control"
                    v-model="name"
                    name="name"
                    label="Name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <div class="mb-2 w-100">
                    <label class="text-muted" for="level">Level</label>
                  </div>
                  <input
                    class="form-control"
                    v-model="level"
                    type="number"
                    name="level"
                    label="Level"
                    required
                  />
                </div>
                <div class="mb-3">
                  <div class="mb-2 w-100">
                    <label class="text-muted" for="description  "
                      >Description</label
                    >
                  </div>
                  <textarea
                    class="form-control"
                    v-model="description"
                    name="description"
                    label="description"
                    required
                  ></textarea>
                </div>
                <div
                  class="alert alert-danger"
                  role="alert"
                  v-if="errorMessage !== ''"
                >
                  {{ errorMessage }}
                </div>
                <div class="">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
