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
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in studentsStore.students">
            <td>{{ student._id.substr(1, 10) }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.surname }}</td>
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
