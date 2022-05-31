<script>
import { useWorkshopsStore } from "../stores/workshops";
import Navbar from "../components/Navbar.vue";
import WorkshopsList from "../components/workshops/WorkshopsList.vue";
import WorkshopInfo from "../components/workshops/WorkshopInfo.vue";
import WorkshopStudents from "../components/workshops/WorkshopStudents.vue";

export default {
  setup() {
    const workshopStore = useWorkshopsStore();
    return { workshopStore };
  },
  components: { Navbar, WorkshopsList, WorkshopInfo, WorkshopStudents },
  methods: {
    redirectWorkshop(id) {
      console.log(id);
      this.$router.push("/workshops/" + id);
    },
  },
};
</script>
<template>
  <Navbar currentPage="workshops" redirectPage="students" />
  <main v-if="$route.params.id"><WorkshopInfo /> <WorkshopStudents /></main>
  <WorkshopsList v-else />
</template>
