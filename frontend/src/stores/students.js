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
    async getStudents(searchParam) {
      try {
        console.log(searchParam);
        const res = await axios.get("http://localhost:4000/api/students", {
          params: { search: searchParam },
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
    async addStudent({ name, surname, email, phoneNumber }) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/students/",
          {
            name,
            surname,
            email,
            phoneNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("coach")).token
              }`,
            },
          }
        );
        if (response.data) {
          this.getStudents();
        }
      } catch (error) {
        return error.response.data.message;
      }
    },
  },
});
