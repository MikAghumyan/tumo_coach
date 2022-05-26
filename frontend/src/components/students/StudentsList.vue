<script>
import { useStudentsStore } from "@/stores/students";

export default {
  setup() {
    const studentsStore = useStudentsStore();
    return { studentsStore };
  },
  data() {
    return {};
  },
  async mounted() {
    await this.studentsStore.getStudents(this.$route.query.search);
  },
  methods: {
    redirectStudent(id) {
      this.$router.replace("/students/" + id);
    },
  },
};
</script>

<template>
  <main>
    <ul>
      <table class="table">
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
                <svg
                  id="i-info"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentcolor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M16 14 L16 23 M16 8 L16 10" />
                  <circle cx="16" cy="16" r="14" />
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </ul>
  </main>
</template>
