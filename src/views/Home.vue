<template>
  <div class="home">
    <entries-table :entries="entries" />
  </div>
</template>

<script lang="ts">
import GeneralShortenerController, {
  EntryModel,
} from "@/controllers/GeneralShortenerController";
import { Options, Vue } from "vue-class-component";
import EntriesTable from "@/components/EntriesTable.vue";
@Options({
  components: {
    EntriesTable,
  },
})
export default class Home extends Vue {
  entries: EntryModel[] | undefined;

  public async mounted(): Promise<void> {
    if (!localStorage.getItem("server")) {
      // https://michaelnthiessen.com/redirect-in-vue/
      this.$router.push("login");
    } else {
      const [data, error] = await GeneralShortenerController.listEntries(
        this.axios,
        localStorage.getItem("server") || "",
        localStorage.getItem("token") || ""
      );
      if (error) {
        localStorage.setItem("server", "");
        localStorage.setItem("token", "");
        this.$router.push("login");
      } else {
        this.entries = data;
        this.$forceUpdate();
      }
    }
    return;
  }
}
</script>
