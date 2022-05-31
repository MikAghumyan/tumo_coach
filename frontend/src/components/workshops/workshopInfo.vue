<script>
import axios from "axios";
import { useWorkshopsStore } from "../../stores/workshops";

export default {
  setup(props) {
    const workshopsStore = useWorkshopsStore();
    return { workshopsStore };
  },
  data() {
    return {
      workshopDefault: {
        name: "",
        level: null,
        description: "",
        _id: "",
      },
      workshop: { name: "", level: null, description: "", _id: "" },
      errorMessage: "",
      successMessage: "",
    };
  },
  props: ["workshopId"],
  async mounted() {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/workshops/${this.$route.params.id}/`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("coach")).token
            }`,
          },
        }
      );
      Object.assign(this.workshop, res.data.workshop);
      Object.assign(this.workshopDefault, res.data.workshop);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    async onSubmit() {
      this.errorMessage = await this.workshopsStore.updateWorkshop(
        this.workshop._id,
        { ...this.workshop }
      );
      if (!this.errorMessage)
        this.successMessage = "Workshop updated successfully";
    },
    reset() {
      Object.assign(this.workshop, this.workshopDefault);
    },
  },
  computed: {
    buttonDisabled() {
      if (
        this.workshop.name !== this.workshopDefault.name ||
        this.workshop.level !== this.workshopDefault.level ||
        this.workshop.description !== this.workshopDefault.description
      )
        return false;
      else return true;
    },
  },
};
</script>

<template>
  <main>
    <form class="mx-auto w-50" @submit.prevent="onSubmit">
      <div class="row py-4">
        <a v-on:click="goBack" class="col-2"
          ><svg
            id="i-chevron-left"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="28"
            height="28"
            fill="none"
            stroke="currentcolor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M20 30 L8 16 20 2" />
          </svg>
        </a>
        <h2 class="text-end col-10">Workshop Info</h2>
      </div>
      <div class="form-group row mb-3">
        <label class="col-sm-2 col-form-label col-form-label-sm">Name</label>
        <div class="col-sm-10">
          <input
            v-model="workshop.name"
            type="text"
            class="form-control form-control-sm"
            name="name"
            label="Name"
            required
          />
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-sm-2 col-form-label col-form-label-sm">Level</label>
        <div class="col-sm-10">
          <input
            v-model="workshop.level"
            type="number"
            class="form-control form-control-sm"
            name="level"
            label="Level"
            required
            min="1"
            max="3"
          />
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-sm-2 col-form-label col-form-label-sm"
          >Description</label
        >
        <div class="col-sm-10">
          <textarea
            class="form-control"
            v-model="workshop.description"
            name="description"
            label="description"
            required
          ></textarea>
        </div>
      </div>
      <div
        class="alert alert-success"
        role="alert"
        v-if="successMessage !== ''"
      >
        {{ successMessage }}
      </div>
      <div
        class="alert alert-danger"
        role="alert"
        v-else-if="errorMessage !== ''"
      >
        {{ errorMessage }}
      </div>
      <button
        type="submit"
        class="btn btn-primary me-3"
        :disabled="buttonDisabled"
      >
        Save
      </button>
      <button class="btn btn-primary" @click="reset" :disabled="buttonDisabled">
        Reset
      </button>
    </form>
  </main>
</template>
