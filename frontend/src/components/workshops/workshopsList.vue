<script>
import { useWorkshopsStore } from "../../stores/workshops";

export default {
  setup() {
    const workshopsStore = useWorkshopsStore();
    return { workshopsStore };
  },
  async mounted() {
    await this.workshopsStore.getWorkshops(this.$route.query.search);
    console.log("mounted");
  },
  redirectWorkshop(id) {
    this.$router.push("/workshop/" + id);
  },
  // watch: {
  //   "$route.query.search": {
  //     handler: async function (search) {
  //       await this.workshopsStore.getWorkshops(search);
  //       console.log("mounted");
  //     },
  //     deep: true,
  //   },
  // },
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
            <th>Level</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="workshop in workshopsStore.workshops">
            <td>{{ workshop._id.substr(1, 10) }}</td>
            <td>{{ workshop.name }}</td>
            <td>{{ workshop.level }}</td>
            <td>
              <a v-on:click="redirectWorkshop(workshop._id)" class="submit">
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
