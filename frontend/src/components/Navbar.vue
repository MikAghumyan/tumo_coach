<script>
import { useStudentsStore } from "@/stores/students";

export default {
  setup() {
    const studentsStore = useStudentsStore();
    return { studentsStore };
  },
  data() {
    return { searchInput: "" };
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
  },
};
</script>

<template>
  <!-- <header>
    <ul>
      <li>
        <input v-on:change="onChange" type="text" placeholder="Search.." />
        {{ " "
        }}<a
          v-on:click="
            currentPage === 'students' &&
              studentsStore.getStudents(this.searchInput)
          "
          className="submit"
        >
          Search
        </a>
      </li>
      <li>
        <a a :href="'/' + redirectPage">{{
          redirectPage.charAt(0).toUpperCase() + redirectPage.slice(1)
        }}</a>
      </li>
      <li>
        <a class="active" style="color: var(--color-text)" v-on:click="logout"
          >Logout</a
        >
      </li>
    </ul>
  </header> -->
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
            <form
              class="d-flex"
              role="search"
              @submit.prevent="
                currentPage === 'students' &&
                  studentsStore.getStudents(this.searchInput)
              "
            >
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                v-model="this.searchInput"
                v-on:change="onChange"
              />
              <button
                class="btn btn-outline-success"
                type="submit"
                v-on:click="
                  currentPage === 'students' &&
                    studentsStore.getStudents(this.searchInput)
                "
              >
                Search
              </button>
            </form>
          </li>
        </ul>
        <div class="d-flex">
          <button class="btn btn-primary me-2" type="submit">Add</button>
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
