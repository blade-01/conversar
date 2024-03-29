import config from "primevue/config";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Avatar from "primevue/avatar";
import Menu from "primevue/menu";
import Sidebar from "primevue/sidebar";
import Skeleton from "primevue/skeleton";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmationService from "primevue/confirmationservice";
import Dialog from "primevue/dialog";
import ContextMenu from "primevue/contextmenu";
import AutoComplete from "primevue/autocomplete";
import FileUpload from "primevue/fileupload";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import MultiSelect from "primevue/multiselect";
import Chips from "primevue/chips";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(config).use(ConfirmationService);

  nuxtApp.vueApp.component("PvDropdown", Dropdown);
  nuxtApp.vueApp.component("PvCalendar", Calendar);
  nuxtApp.vueApp.component("PvAvatar", Avatar);
  nuxtApp.vueApp.component("PvMenu", Menu);
  nuxtApp.vueApp.component("PvSidebar", Sidebar);
  nuxtApp.vueApp.component("PvSkeleton", Skeleton);
  nuxtApp.vueApp.component("PvPopup", ConfirmPopup);
  nuxtApp.vueApp.component("PvDialog", Dialog);
  nuxtApp.vueApp.component("PvContextMenu", ContextMenu);
  nuxtApp.vueApp.component("PvAutoComplete", AutoComplete);
  nuxtApp.vueApp.component("PvFileUpload", FileUpload);
  nuxtApp.vueApp.component("PvInputNumber", InputNumber);
  nuxtApp.vueApp.component("PvInputSwitch", InputSwitch);
  nuxtApp.vueApp.component("PvMultiSelect", MultiSelect);
  nuxtApp.vueApp.component("PvChips", Chips);
});
