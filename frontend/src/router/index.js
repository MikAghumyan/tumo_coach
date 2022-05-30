import { createRouter, createWebHistory } from "vue-router";
import StudentsView from "../views/StudentsView.vue";
import AddStudent from "../components/students/AddStudent.vue";
import AddWorkshop from "../components/workshops/addWorkshop.vue";
import WorkshopsView from "../views/WorkshopsView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      redirect: localStorage.getItem("coach") && "/",
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      redirect: localStorage.getItem("coach") && "/",
    },
    {
      path: "/",
      name: "home",
      redirect: localStorage.getItem("coach") ? "/students" : "/login",
    },
    {
      path: "/workshops/add",
      name: "addWorkshop",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AddWorkshop,
      redirect: !localStorage.getItem("coach") && "/login",
    },
    {
      path: "/workshops/:id",
      name: "workshop",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: StudentsView,
      redirect: !localStorage.getItem("coach") && "/login",
    },
    {
      path: "/workshops",
      name: "workshops",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: WorkshopsView,
      redirect: !localStorage.getItem("coach") && "/login",
    },

    {
      path: "/students/add",
      name: "addStudent",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AddStudent,
      redirect: !localStorage.getItem("coach") && "/login",
    },
    {
      path: "/students/:id",
      name: "student",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: StudentsView,
      redirect: !localStorage.getItem("coach") && "/login",
    },
    {
      path: "/students",
      name: "students",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: StudentsView,
      redirect: !localStorage.getItem("coach") && "/login",
    },
  ],
});

export default router;
