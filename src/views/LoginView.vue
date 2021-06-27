<template>
  <el-container class="center">
    <login-form @submitLogin="loginSubmit"></login-form>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginForm, { LoginSubmitPayloadModel } from "@/components/LoginForm.vue";
import GeneralShortenerController from "@/controllers/GeneralShortenerController";
import { ElNotification } from "element-plus";
@Options({
  components: {
    LoginForm,
  },
})
export default class LoginView extends Vue {
  public async loginSubmit(payload: LoginSubmitPayloadModel): Promise<void> {
    const [data, error] = await GeneralShortenerController.listEntries(
      this.axios,
      payload.server,
      payload.token
    );

    if (error) {
      ElNotification({
        title: "Error",
        message: "Wrong credentials",
        type: "error",
      });
    } else {
      localStorage.setItem("server", payload.server);
      localStorage.setItem("token", payload.token);
      ElNotification({
        title: "Success",
        message: "Successfully signed in!",
        type: "success",
      });
      this.$router.push("/");
    }
  }
}
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.align-right {
  text-align: right;
}
</style>
