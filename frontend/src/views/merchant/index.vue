<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="店铺名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="店铺简介">
            <span>{{ props.row.info }}</span>
          </el-form-item>
          <el-form-item label="店铺标语">
            <span>{{ props.row.slogan }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="联系电话">
            <span>{{ props.row.tel }}</span>
          </el-form-item>
          <el-form-item label="店铺分类">
            <span
              v-for="(item,index) in JSON.parse(props.row.category)"
              :key="index"
            >{{ item }}&nbsp;</span>
          </el-form-item>
          <el-form-item label="店铺特点">
            <span
              v-for="item in  JSON.parse(props.row.feature)"
              :key="item.id"
              v-if="item.flag"
            >{{ item.text }}&nbsp;</span>
          </el-form-item>
          <el-form-item label="配送费">
            <span>{{ props.row.delivery }}</span>
          </el-form-item>
          <el-form-item label="起送价">
            <span>{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="营业时间">
            <span>起送时间：{{ props.row.startTime }}</span>&nbsp;
            <span>结束时间：{{ props.row.endTime }}</span>
          </el-form-item>
          <el-form-item label="店铺头像">
            <img
              style="width:200px;height:200px;margin:10px 0"
              :src="props.row.logoUrl"
              v-if="props.row.logoUrl"
              alt="..."
            />
          </el-form-item>
          <el-form-item label="营业执照">
            <img
              style="width:200px;height:200px;margin:10px 0"
              :src="props.row.businessUrl"
              v-if="props.row.businessUrl"
              alt="..."
            />
          </el-form-item>
          <el-form-item label="餐饮服务许可证">
            <img
              style="width:200px;height:200px;margin:10px 0"
              :src="props.row.cateringUrl"
              v-if="props.row.cateringUrl"
              alt="..."
            />
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="店铺名称" prop="name"></el-table-column>
    <el-table-column label="店铺地址" prop="address"></el-table-column>
    <el-table-column label="店铺简介" prop="info"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      options: [
        {
          value: "yiguoliaoli",
          label: "异国料理",
          children: [
            {
              value: "jiancan",
              label: "简餐"
            },
            {
              value: "gaijiaofan",
              label: "盖浇饭"
            }
          ]
        }
      ]
    };
  },
  methods: {
    ...mapActions(["query", "del"]),
    // 编辑
    handleEdit(data) {
      this.$router.push({
        name: "shop_update",
        query: data
      });
    },
    // 删除
    handleDelete(_id) {
      // console.log(_id);
      this.del(_id).then(res => {
        switch (res.data.status) {
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
    }
  },
  computed: {
    ...mapState({
      data: state => state.shop.data
    })
    // arr() {
    //   let category = JSON.parse(this.data.category);
    //   let str = "";

    //   this.options.map(item => {
    //     category.map(val => {
    //       if (item.value == val.value) {
    //         str += item.label;
    //       }
    //     });
    //   });

    //   return str;
    // }
  },
  mounted() {
    this.query();
    // console.log(this.data);

    // const { feature } = this.data;
    // this.feature = JSON.parse(feature);
  }
};
</script>