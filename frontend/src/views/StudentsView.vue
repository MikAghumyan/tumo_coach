<script>
import { useStudentsStore } from "@/stores/students";
import Navbar from "../components/Navbar.vue";

export default {
  setup() {
    const studentsStore = useStudentsStore();
    return { studentsStore };
  },
  mounted() {
    this.studentsStore.getStudents();
  },
  components: { Navbar },
  methods: {
    redirectStudent(id) {
      console.log(id);
      this.$router.replace("/students/" + id);
    },
  },
};
</script>
<template>
  <p>{{ $route.params.id }}</p>
  <Navbar currentPage="students" redirectPage="workshops" />
  <main>
    <ul>
      <table>
        <thead class="green">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in studentsStore.students">
            <td>{{ student._id.substr(1, 10) }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.surname }}</td>
            <td>
              <button v-on:click="redirectStudent(student._id)" class="submit">
                Info
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </ul>
  </main>
</template>

<style>
td,
th {
  padding: 1rem 2rem;
}
thead,
tr:nth-child(2n) {
  background-color: #242424;
}
</style>
