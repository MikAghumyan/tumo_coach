import { defineStore } from "pinia";
import axios from "axios";

export const useStudentsStore = defineStore({
  id: "students",
  state: () => ({
    students: [],
    errorMessage: "",
  }),
  getters: {},
  actions: {
    async getStudents() {
      try {
        const res = await axios.get("http://localhost:4000/api/students", {
          params: {},
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("coach")).token
            }`,
          },
        });
        this.students = res.data.students;
        console.log(res.data, this.students);
      } catch (error) {
        this.errorMessage = error.response.data.message;
        console.log(error);
      }
      console.log(this.students);
    },
  },
});
