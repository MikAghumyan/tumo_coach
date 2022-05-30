<script>
import { useStudentsStore } from "@/stores/students";
import { useWorkshopsStore } from "../stores/workshops";

export default {
  setup() {
    const studentsStore = useStudentsStore();
    const workshopsStore = useWorkshopsStore();
    return { studentsStore, workshopsStore };
  },
  data() {
    return { searchInput: this.$route.query.search };
  },
  props: {
    currentPage: { required: true, type: String },
    redirectPage: { required: true, type: String },
  },
  methods: {
    async logout() {
      localStorage.removeItem("coach");
      this.$router.go("/students");
    },
    onChange(e) {
      this.searchInput = e.target.value;
    },
    search() {
      switch (this.currentPage) {
        case "students":
          this.studentsStore.getStudents(this.searchInput);
          break;
        case "workshops":
          this.workshopsStore.getWorkshops(this.searchInput);
          break;
        default:
          break;
      }
      this.$router.push(`/${this.currentPage}?search=${this.searchInput}`);
    },
  },
  watch: {
    searchInput(newValue) {
      newValue === "" && this.search();
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-success bg-opacity-10">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"
        ><img
          src="https://careercenter.am/storage/logos/1583311188132303990.png"
          alt="TUMO"
          height="24"
      /></a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              a
              :href="'/' + redirectPage"
              >{{
                redirectPage.charAt(0).toUpperCase() + redirectPage.slice(1)
              }}</a
            >
          </li>
          <li class="nav-item">
            <form class="d-flex" role="search" @submit.prevent="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                v-model="searchInput"
                v-on:change="onChange"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </li>
        </ul>
        <div class="d-flex">
          <button
            class="btn btn-primary me-2"
            type="submit"
            v-on:click="$router.push(`/${currentPage}/add`)"
          >
            Add
          </button>
          <button class="btn btn-danger" type="submit" v-on:click="logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
/* input {
  max-width: 300px;
} */
</style>
