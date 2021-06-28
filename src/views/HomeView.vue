<template>
  <el-container>
    <el-header>
      <navbar></navbar>
    </el-header>
    <el-main>
      <entry-preview
        :trigger="dialogTrigger"
        :href="href"
        :mime="mime"
        :type="type"
      />
      <entries-table :entries="entries" @preview="preview" />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import GeneralShortenerController, {
  EntryModel,
} from "@/controllers/GeneralShortenerController";
import { Options, Vue } from "vue-class-component";
import EntriesTable, { PreviewPayload } from "@/components/EntriesTable.vue";
import Navbar from "@/components/Navbar.vue";
import EntryPreview from "@/components/EntryPreview.vue";

@Options({
  components: {
    EntriesTable,
    Navbar,
    EntryPreview,
  },
})
export default class HomeView extends Vue {
  entries: EntryModel[] | undefined;
  href = "";
  type = "";
  mime = "";
  dialogTrigger = 0;

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

  public preview(payload: PreviewPayload): boolean {
    console.log("I am here");
    this.href = payload.url;
    this.type = payload.type;
    this.mime = payload.mime;
    this.dialogTrigger++;
    return true;
  }
}
</script>
