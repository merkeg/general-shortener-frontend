<template>
  <el-card shadow="always">
    <p style="text-align: center">General shortener login</p>
    <el-form ref="form">
      <el-form-item label="Server" prop="server">
        <el-input
          prefix-icon="el-icon-takeaway-box"
          v-model="this.server"
        ></el-input>
      </el-form-item>

      <el-form-item label="Token" prop="token">
        <el-input
          prefix-icon="el-icon-key"
          v-model="this.token"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="submit">Login</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class LoginForm extends Vue {
  rules = {
    server: [{ required: true, validator: this.checkIsUrl }],
    token: [{ required: true }],
  };

  server = "";
  token = "";

  public submit(): void {
    let payload: LoginSubmitPayloadModel = {
      server: this.server,
      token: this.token,
    };

    this.$emit("submitLogin", payload);
  }

  // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  private checkIsUrl(
    rule: unknown,
    value: string,
    callback: (error?: Error) => void
  ) {
    if (!value) {
      callback(new Error("server is required"));
      return;
    }

    let url;

    try {
      url = new URL(value);
    } catch (_) {
      callback(new Error("Url is invalid"));
      return;
    }
    if (url.protocol === "http:" || url.protocol === "https:") {
      callback();
    } else {
      callback(new Error("Url is invalid"));
    }
  }
}

export interface LoginSubmitPayloadModel {
  server: string;
  token: string;
}
</script>
