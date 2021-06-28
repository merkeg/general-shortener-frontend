<template>
  <el-table :data="entries">
    <el-table-column prop="slug" label="Slug">
      <template #default="scope">
        <el-link target="_blank" :href="getUrl(scope.row.slug)">
          <i class="el-icon-link"></i>
          <span style="margin-left: 10px">{{ getUrl(scope.row.slug) }}</span>
        </el-link>
      </template>
    </el-table-column>

    <el-table-column
      prop="type"
      label="Type"
      :filters="[
        { text: 'File', value: 'file' },
        { text: 'Text', value: 'text' },
        { text: 'URL', value: 'url' },
      ]"
      :filter-method="filterType"
    >
      <template #default="scope">
        <el-tag :type="this.tagColors[scope.row.type]" disable-transitions>{{
          scope.row.type
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="mime"
      label="Mimetype"
      :filters="[
        { text: 'image/png', value: 'image/png' },
        { text: 'image/jpeg', value: 'image/jpeg' },
        { text: 'image/gif', value: 'image/gif' },
        { text: 'video/mp4', value: 'video/mp4' },
        {
          text: 'application/x-zip-compressed',
          value: 'application/x-zip-compressed',
        },
        { text: 'text/plain', value: 'text/plain' },
      ]"
      :filter-method="filterMime"
    />
    <el-table-column label="Actions">
      <template #default="scope">
        <el-button-group>
          <el-button
            type="primary"
            icon="el-icon-folder-opened"
            size="mini"
            @click="
              this.requestPreview(
                getUrl(scope.row.slug),
                scope.row.type,
                scope.row.mime
              )
            "
          ></el-button>
          <el-popconfirm
            title="Are you sure?"
            @confirm="requestDeletion(scope.row.slug)"
          >
            <template #reference>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-popconfirm>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { EntryModel } from "@/controllers/GeneralShortenerController";
import urlJoin from "proper-url-join";

@Options({
  props: {
    entries: "",
  },
})
export default class EntriesTable extends Vue {
  entries!: EntryModel[];

  tagColors = {
    file: "primary",
    text: "success",
    url: "warning",
  };

  public getUrl(slug: string): string {
    return urlJoin(localStorage.getItem("server"), slug);
  }

  public getDeletionUrl(slug: string, deletionCode: string): string {
    return urlJoin(localStorage.getItem("server"), slug, deletionCode);
  }

  public filterType(value: string, row: any): boolean {
    return row.type === value;
  }

  public filterMime(value: string, row: any): boolean {
    return row.mime === value;
  }

  public requestPreview(url: string, type: string, mime: string): void {
    const payload: PreviewPayload = {
      url,
      type,
      mime,
    };
    this.$emit("preview", payload);
  }

  public requestDeletion(slug: string): void {
    const payload: DeletionPayload = {
      slug,
    };

    this.$emit("deletion", payload);
    return;
  }
}

export interface DeletionPayload {
  slug: string;
}

export interface PreviewPayload {
  url: string;
  type: string;
  mime: string;
}
</script>
