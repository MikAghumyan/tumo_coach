<script>
import { useStudentsStore } from "@/stores/students";

export default {
  setup() {
    const studentsStore = useStudentsStore();
    return { studentsStore };
  },
  mounted() {
    this.studentsStore.getStudents();
  },
  methods: {
    redirectStudent(id) {
      console.log(id);
      this.$router.replace("/students/" + id);
    },
  },
};
</script>

<template>
  <main>
    <ul>
      <table>
        <thead class="green">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in studentsStore.students">
            <td>{{ student._id.substr(1, 10) }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.surname }}</td>
            <td>
              <a v-on:click="redirectStudent(student._id)" class="submit">
                Info
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </ul>
  </main>
</template>
