import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import VueAxios from "vue-axios";
import axios from "axios";
import "element-plus/lib/theme-chalk/index.css";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.use(VueAxios, axios);
app.mount("#app");
