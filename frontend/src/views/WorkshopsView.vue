<script>
import { useWorkshopsStore } from "../stores/workshops";
import Navbar from "../components/Navbar.vue";
import WorkshopsList from "../components/workshops/workshopsList.vue";
import WorkshopInfo from "../components/workshops/workshopInfo.vue";

export default {
  setup() {
    const workshopStore = useWorkshopsStore();
    return { workshopStore };
  },
  components: { Navbar, WorkshopsList, WorkshopInfo },
  methods: {
    redirectStudent(id) {
      console.log(id);
      this.$router.push("/workshops/" + id);
    },
  },
};
</script>
<template>
  <Navbar currentPage="workshops" redirectPage="students" />
  <WorkshopInfo v-if="$route.params.id" />
  <WorkshopsList v-else />
</template>
