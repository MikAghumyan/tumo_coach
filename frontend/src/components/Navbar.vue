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
  <ul>
    <li>
      <input v-on:change="onChange" type="text" placeholder="Search.." />
      {{ " "
      }}<button
        v-on:click="
          currentPage === 'students' &&
            studentsStore.getStudents(this.searchInput)
        "
        className="submit"
      >
        Search
      </button>
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
</template>

<style>
/* input {
  max-width: 300px;
} */
</style>
