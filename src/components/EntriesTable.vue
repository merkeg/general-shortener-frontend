<template>
  <el-table :data="entries">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="slug" label="Slug" width="200">
      <template #default="scope">
        <el-link target="_blank" :href="getUrl(scope.row.slug)">
          <i class="el-icon-link"></i>
          <span style="margin-left: 10px">{{ scope.row.slug }}</span>
        </el-link>
      </template>
    </el-table-column>

    <el-table-column prop="type" label="Type" width="100">
      <template #default="scope">
        <el-tag :type="this.tagColors[scope.row.type]" disable-transitions>{{
          scope.row.type
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="mime" label="Mimetype" width="150" />
    <el-table-column label="Actions" width="200">
      <template #default="scope">
        <el-button-group>
          <el-link
            :underline="false"
            :href="getUrl(scope.row.slug)"
            target="_blank"
          >
            <el-button
              type="primary"
              icon="el-icon-folder-opened"
              size="small"
            ></el-button>
          </el-link>
          <el-link
            :underline="false"
            :href="getDeletionUrl(scope.row.slug, scope.row.deletionCode)"
            target="_blank"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
            ></el-button>
          </el-link>
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
}
</script>
