import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTelInput as any);
  nuxtApp.vueApp.component("vue-tel-input", VueTelInput);
});
