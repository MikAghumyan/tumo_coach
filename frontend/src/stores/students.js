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
    async updateStudent(id, { name, surname, email, phoneNumber }) {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/students/${id}`,
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
        }
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getStudentWorkshops(id) {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/students/${id}/workshops`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("coach")).token
              }`,
            },
          }
        );
        return res.data;
      } catch (error) {
        return error.response.data;
      }
    },
    async attachWorkshop(id, name, level) {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/students/${id}/attach`,
          {
            name,
            level,
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
          return response.data;
        }
      } catch (error) {
        return error.response.data;
      }
    },
    async detatchWorkshop(studentId, workshopId) {
      console.log(studentId, workshopId);
      try {
        const response = await axios.put(
          `http://localhost:4000/api/workshops/detach`,
          {
            studentId,
            workshopId,
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
          return response.data;
        }
      } catch (error) {
        return error.response.data;
      }
    },
  },
});
