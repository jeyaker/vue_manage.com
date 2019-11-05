<template>
  <el-container id="system">
    <el-aside width="200px">
      <!-- <h3 class="logo">首页</h3> -->
      <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <router-link :to="{
          name:'home'
        }" class="home">
          <el-menu-item index="1">
            <!-- <template slot="title"> -->
            <i class="el-icon-menu"></i>
            首页
            <!-- </template> -->
          </el-menu-item>
        </router-link>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-document"></i>数据管理
          </template>
          <router-link :to="{name:'user'}">
            <el-menu-item index="2-1">用户列表</el-menu-item>
          </router-link>
          <router-link :to="{name:'merchant'}">
            <el-menu-item index="2-2">商家列表</el-menu-item>
          </router-link>
          <router-link :to="{name:'food'}">
            <el-menu-item index="2-3">食品列表</el-menu-item>
          </router-link>
          <router-link :to="{name:'order'}">
            <el-menu-item index="2-4">订单列表</el-menu-item>
          </router-link>
          <router-link :to="{name:'admin'}">
            <el-menu-item index="2-5">管理员列表</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-plus"></i>添加数据
          </template>
          <router-link :to="{name:'shop_add'}">
            <el-menu-item index="3-1">添加商铺</el-menu-item>
          </router-link>
          <router-link :to="{name:'goods_add'}">
            <el-menu-item index="3-2">添加商品</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-star-on"></i>图表
          </template>
          <router-link :to="{name:'chart'}">
            <el-menu-item index="4-1">用户发布</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-edit"></i>编辑
          </template>
          <router-link :to="{name:'edit'}">
            <el-menu-item index="5-1">文本编辑</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-setting"></i>设置
          </template>
          <router-link :to="{name:'setting'}">
            <el-menu-item index="6-1">管理员设置</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-warning"></i>说明
          </template>
          <router-link :to="{name:'explain'}">
            <el-menu-item index="7-1">说明</el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <!-- <span class="title">
          <span>{{}}</span> /
          <span>{{}}</span>
        </span>-->
        <span style="cursor: pointer;">{{username}}</span>&nbsp;
        <span style="cursor: pointer;" @click="quit">退出</span>
      </el-header>
      <transition
        mode="out-in"
        enter-active-class="animated slideInDown"
        leave-active-class="animated fadeOut"
      >
        <el-main class="main">
          <keep-alive :include="this.$route.meta.name">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </transition>
    </el-container>
  </el-container>
</template>




<script>
export default {
  data() {
    return {};
  },
  computed: {
    username() {
      return this.$route.query.token || localStorage.getItem("token");
    }
  },
  mounted() {
    // console.log(this.$route.meta);
  },
  methods: {
    skip() {
      this.$router.push("/login");
    },
    quit() {
      this.$confirm("退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
            showClose: true,
            duration: 1000
          });
          setTimeout(() => {
            localStorage.setItem("token", "");
            this.$router.push("/login");
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
            showClose: true,
            duration: 1000
          });
        });
    }
  }
};
</script>

<style lang="stylus">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar-uploader-icon:before {
  line-height: 178px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

#system {
  border: 1px solid #eee;
  height: 100%;

  .home {
    color: #fff;
    font-size: 14px;
  }

  .el-aside {
    color: #333;
    overflow: visible;
    background-color: #545c64;

    .logo {
      height: 60px;
      line-height: 60px;
      border-right: 1px solid white;
    }

    .el-menu-item {
      width: 200px;

      a {
        color: #fff;
        font-size: 14px;
      }
    }

    .el-submenu {
      width: 200px;
    }
  }

  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;

    .title {
      float: left;
    }
  }

  .main {
    padding: 20px 100px;
  }

  .table {
    .el-form-item__content {
      margin-left: 80px !important;
    }
  }

  .btn {
    .el-form-item__content {
      margin-left: 450px !important;
    }
  }
}
</style>