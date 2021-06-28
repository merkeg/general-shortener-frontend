<template>
  <div style="float: right; margin-top: 10px">
    <el-button size="small" type="danger" @click="logout">Logout</el-button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Navbar extends Vue {
  public logout(): void {
    localStorage.setItem("server", "");
    localStorage.setItem("token", "");
    this.$router.push("login");
  }
}
</script>
