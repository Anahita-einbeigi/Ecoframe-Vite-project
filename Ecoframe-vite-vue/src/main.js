import "./assets/custom.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();
pinia.use(({ store }) => {
  if (store.$id === "EcommerceApp") {
    store.restoreCartFromSession();
  }
});

app.use(pinia);
// app.use(createPinia());
app.use(router);

app.mount("#app");
