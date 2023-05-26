import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdWork } from "oh-vue-icons/icons/md";
import { IoPerson } from "oh-vue-icons/icons/io";

addIcons(MdWork, IoPerson);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.mount("#app");
