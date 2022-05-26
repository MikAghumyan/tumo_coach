<script>
import { useStudentsStore } from "@/stores/students";

export default {
  setup(props) {
    const studentsStore = useStudentsStore();
    return { studentsStore };
  },
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
      errorMessage: "",
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    async onSubmit() {
      this.errorMessage = await this.studentsStore.addStudent({
        name: this.name,
        surname: this.surname,
        email: this.email,
        phoneNumber: this.phoneNumber,
      });
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
                <h2 class="text-end col-10">Add Student</h2>
              </div>
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
                    v-model="this.name"
                    name="name"
                    label="Name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <div class="mb-2 w-100">
                    <label class="text-muted" for="password">Surname</label>
                  </div>
                  <input
                    class="form-control"
                    v-model="this.surname"
                    type="text"
                    name="surname"
                    label="Surname"
                    required
                  />
                </div>
                <div class="mb-3">
                  <div class="mb-2 w-100">
                    <label class="text-muted" for="password">Email</label>
                  </div>
                  <input
                    class="form-control"
                    v-model="this.email"
                    type="email"
                    name="email"
                    label="Email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <div class="mb-2 w-100">
                    <label class="text-muted" for="password"
                      >Phone Number</label
                    >
                  </div>
                  <input
                    class="form-control"
                    v-model="this.phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    label="PhoneNumber"
                    required
                  />
                </div>
                <div
                  class="alert alert-danger"
                  role="alert"
                  v-if="this.errorMessage !== ''"
                >
                  {{ this.errorMessage }}
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
