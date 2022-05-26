<script>
import { useStudentsStore } from "@/stores/students";
import Navbar from "../components/Navbar.vue";
import StudentsList from "../components/students/StudentsList.vue";
import StudentInfo from "../components/students/StudentInfo.vue";

export default {
  setup() {
    const studentsStore = useStudentsStore();
    return { studentsStore };
  },
  mounted() {
    this.studentsStore.getStudents();
  },
  components: { Navbar, StudentsList, StudentInfo },
  methods: {
    redirectStudent(id) {
      console.log(id);
      this.$router.push("/students/" + id);
    },
  },
};
</script>
<template>
  <Navbar currentPage="students" redirectPage="workshops" />
  <StudentInfo v-if="$route.params.id" />
  <StudentsList v-else />
</template>
