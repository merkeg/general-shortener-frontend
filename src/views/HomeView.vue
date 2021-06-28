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
      <entries-table
        :entries="entries"
        @preview="handlePreview"
        @deletion="handleDeletion"
      />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import GeneralShortenerController, {
  EntryModel,
} from "@/controllers/GeneralShortenerController";
import { Options, Vue } from "vue-class-component";
import EntriesTable, {
  DeletionPayload,
  PreviewPayload,
} from "@/components/EntriesTable.vue";
import Navbar from "@/components/Navbar.vue";
import EntryPreview from "@/components/EntryPreview.vue";
import { ElNotification } from "element-plus";

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
      await this.updateData();
    }
  }

  public handlePreview(payload: PreviewPayload): void {
    console.log("I am here");
    this.href = payload.url;
    this.type = payload.type;
    this.mime = payload.mime;
    this.dialogTrigger++;
  }

  public async handleDeletion(payload: DeletionPayload): Promise<void> {
    const result = await GeneralShortenerController.deleteEntry(
      this.axios,
      localStorage.getItem("server") || "",
      localStorage.getItem("token") || "",
      payload.slug
    );
    ElNotification({
      title: "Success",
      message: "Successfully deleted entry",
      type: "success",
    });
    await this.updateData();
  }

  private async updateData(): Promise<void> {
    const [data, error] = await GeneralShortenerController.listEntries(
      this.axios,
      localStorage.getItem("server") || "",
      localStorage.getItem("token") || ""
    );
    if (error) {
      localStorage.setItem("server", "");
      localStorage.setItem("token", "");
      this.$router.push("login");
      ElNotification({
        title: "Error",
        message: "Error gathering list",
        type: "error",
      });
    } else {
      this.entries = data;
      this.$forceUpdate();
    }
  }
}
</script>
