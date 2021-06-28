<template>
  <el-dialog
    title="Preview"
    v-model="dialogVisible"
    width="80%"
    top="5vh"
    center
  >
    <div class="preview_window">
      <img class="preview_item" v-if="mime?.startsWith('image')" :src="href" />
      <video
        class="preview_item"
        controls
        autoplay
        v-if="mime?.startsWith('video') && dialogVisible"
      >
        <source :src="href" :type="mime" />
      </video>

      <iframe
        frameborder="0"
        class="preview_item_text"
        v-if="
          type == 'text' ||
          mime?.startsWith('text') ||
          mime?.startsWith('application')
        "
        :src="href"
      />
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    type: "",
    href: "",
    mime: "",
    trigger: 0,
  },
})
export default class EntryPreview extends Vue {
  dialogVisible = false;
  type = "";
  href = "";
  mime = "";

  public created(): void {
    // https://github.com/vuejs/vue-class-component/issues/406#issuecomment-784470556
    this.$watch("trigger", () => {
      this.dialogVisible = true;
    });
  }
}
</script>

<style scoped>
.preview_window {
  display: flex;
  justify-content: center;
  align-items: center;
}
.preview_item {
  max-width: 100%;
  max-height: 80%;
  width: auto;
  height: auto;
}

.preview_item_text {
  width: 100%;
  height: 600px;
}
</style>
