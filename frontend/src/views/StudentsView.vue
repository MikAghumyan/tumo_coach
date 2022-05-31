<script>
import { useStudentsStore } from "@/stores/students";
import Navbar from "../components/Navbar.vue";
import StudentsList from "../components/students/StudentsList.vue";
import StudentInfo from "../components/students/StudentInfo.vue";
import StudentWorkshops from "../components/students/StudentWorkshops.vue";

export default {
  setup() {
    const studentsStore = useStudentsStore();
    return { studentsStore };
  },
  components: { Navbar, StudentsList, StudentInfo, StudentWorkshops },
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
  <main v-if="$route.params.id"><StudentInfo /> <StudentWorkshops /></main>
  <StudentsList v-else />
</template>
