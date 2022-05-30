import { defineStore } from "pinia";
import axios from "axios";

export const useWorkshopsStore = defineStore({
  id: "workshops",
  state: () => ({
    workshops: [],
    errorMessage: "",
  }),
  getters: {},
  actions: {
    async getWorkshops(searchParam) {
      try {
        console.log(searchParam);
        const res = await axios.get("http://localhost:4000/api/workshops", {
          params: { search: searchParam },
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("coach")).token
            }`,
          },
        });
        this.workshops = res.data.workshops;
        console.log(res.data, this.workshops);
      } catch (error) {
        this.errorMessage = error.response.data.message;
        console.log(error);
      }
      console.log(this.workshops);
    },
    async addWorkshop({ name, level, description }) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/workshops/",
          {
            name,
            level,
            description,
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
          this.getWorkshops();
        }
      } catch (error) {
        return error.response.data.message;
      }
    },
    async updateWorkshop(id, { name, level, description }) {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/workshops/${id}`,
          {
            name,
            level,
            description,
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
  },
});
