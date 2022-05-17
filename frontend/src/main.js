import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { createPinia } from "pinia";
// import { createVuestic } from "vuestic-ui"; // <-
// import "vuestic-ui/dist/vuestic-ui.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
// app.use(createVuestic());

app.mount("#app");
