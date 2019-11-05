<template>
  <div id="login">
    <h3>elm后台管理系统</h3>
    <div id="box">
      <el-input v-model="username" placeholder="用户名"></el-input>
      <el-input v-model="password" placeholder="密码" show-password></el-input>
      <el-row>
        <el-button type="primary" :plain="true" @click="submit">登录</el-button>
      </el-row>
      <el-row class="register">
        <el-button @click="skip">前往注册</el-button>
      </el-row>
      <!-- <div class="tip">
        <p>温馨提示：</p>
        <p>未登录过的新用户，自动注册</p>
        <p>注册过的用户可凭账号密码登录</p>
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["user_query"]),
    submit() {
      this.user_query({
        username: this.username,
        password: this.password
      }).then(res => {
        // console.log(res);

        switch (res.data.data.status) {
          case 0:
            this.$message({
              showClose: true,
              message: "用户名不存在",
              type: "info",
              duration: 1000
            });
            break;
          case 1:
            this.$message({
              showClose: true,
              message: "用户名或密码错误",
              type: "error",
              duration: 1000
            });
            break;
          case 2:
            this.$message({
              showClose: true,
              message: "登录成功",
              type: "success",
              duration: 1000
            });
            setTimeout(() => {
              localStorage.setItem("token", this.username);
              this.$router.push({
                name: "home",
                query: {
                  token: this.username
                }
              });
            }, 1000);
            break;
          default:
            break;
        }
      });
    },
    skip() {
      this.$router.push("/register");
    }
  }
};
</script>

<style lang="stylus" scoped>
#login {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: #324057;

  h3 {
    color: white;
    text-align: center;
    margin-top: 160px;
    font-size: 34px;
    font-weight: normal;
  }

  #box {
    width: 370px;
    height: 250px;
    box-sizing: border-box;
    padding: 30px;
    background-color: #fff;
    margin: 50px auto;
    border-radius: 10px;

    .el-input {
      margin-bottom: 15px;
    }

    .el-row {
      .el-button {
        width: 100%;
      }
    }

    .tip {
      margin-top: 10px;
      text-align: center;

      p {
        font-size: 12px;
        color: red;
      }
    }

    .register {
      margin-top: 10px;
      text-align: right;

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>3