<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="_id" label="_id" width="280"></el-table-column>
    <el-table-column prop="username" label="用户名" width="280"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
        <el-button size="mini" :plain="true" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["user_query", "user_del"]),
    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
    handleDelete(val) {
      // console.log(val);

      if (val.username == localStorage.getItem("token")) {
        this.$confirm("确定要删除自己吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.user_del(val._id).then(res => {
              switch (res.data.data.status) {
                case 0:
                  this.$message({
                    showClose: true,
                    message: "数据不存在",
                    type: "info",
                    duration: 1000
                  });
                  break;
                case 1:
                  this.$message({
                    showClose: true,
                    message: "删除失败",
                    type: "error",
                    duration: 1000
                  });
                  break;
                case 2:
                  this.$message({
                    showClose: true,
                    message: "删除成功",
                    type: "success",
                    duration: 1000
                  });
                  setTimeout(() => {
                    localStorage.setItem("token", "");
                    this.$router.push("/register");
                  }, 1000);
                  break;
                default:
                  break;
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除",
              showClose: true,
              duration: 1000
            });
          });
      } else {
        this.$confirm("确定要删除该用户吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.user_del(val._id).then(res => {
              switch (res.data.data.status) {
                case 0:
                  this.$message({
                    showClose: true,
                    message: "数据不存在",
                    type: "info",
                    duration: 1000
                  });
                  break;
                case 1:
                  this.$message({
                    showClose: true,
                    message: "删除失败",
                    type: "error",
                    duration: 1000
                  });
                  break;
                case 2:
                  this.$message({
                    showClose: true,
                    message: "删除成功",
                    type: "success",
                    duration: 1000
                  });
                  break;
                default:
                  break;
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除",
              showClose: true,
              duration: 1000
            });
          });
      }
    }
  },
  computed: {
    ...mapState({
      data: state => state.user.data
    })
  },
  mounted() {
    this.user_query();
  }
};
</script>

<style>
</style>