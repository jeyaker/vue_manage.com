

<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="160px"
    class="demo-ruleForm"
  >
    <!-- input -->
    <el-form-item label="店铺名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-input v-model="ruleForm.address"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="tel">
      <el-input v-model="ruleForm.tel"></el-input>
    </el-form-item>
    <el-form-item label="店铺简介" prop="info">
      <el-input v-model="ruleForm.info"></el-input>
    </el-form-item>
    <el-form-item label="店铺标语" prop="slogan">
      <el-input v-model="ruleForm.slogan"></el-input>
    </el-form-item>
    <!-- 级联菜单 -->
    <el-form-item label="店铺分类">
      <div class="block">
        <el-cascader :options="options" :props="{ checkStrictly: true }" clearable></el-cascader>
      </div>
    </el-form-item>
    <el-form-item label="店铺特点">
      <ul style="display:flex;flex-wrap:wrap;width:380px;">
        <li v-for="item in feature" :key="item.id" style="margin:0 10px;">
          <label style="margin:0 4px;">{{item.text}}</label>
          <el-switch active-color="#13ce66" v-model="item.flag" inactive-color="#bfcbd9"></el-switch>
        </li>
      </ul>
    </el-form-item>
    <el-form-item label="配送费">
      <el-input-number v-model="delivery" :min="5" :max="15" label="描述文字"></el-input-number>
    </el-form-item>
    <el-form-item label="起送价">
      <el-input-number v-model="price" :min="1" label="描述文字"></el-input-number>
    </el-form-item>
    <el-form-item label="营业时间">
      <el-time-select
        placeholder="起始时间"
        v-model="startTime"
        :picker-options="{
          start: '05:30',
          step: '00:15',
          end: '23:30'
        }"
      ></el-time-select>
      <el-time-select
        placeholder="结束时间"
        v-model="endTime"
        :picker-options="{
          start: '05:30',
          step: '00:15',
          end: '23:30',
          minTime: startTime
        }"
      ></el-time-select>
    </el-form-item>
    <el-form-item label="上传店铺头像">
      <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :on-success="logoSuccess"
      >
        <img v-if="logoUrl" :src="logoUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="上传营业执照">
      <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :on-success="businessSuccess"
      >
        <img v-if="businessUrl" :src="businessUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="上传餐饮服务许可证">
      <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :on-success="cateringSuccess"
      >
        <img v-if="cateringUrl" :src="cateringUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <!-- <el-form-item label="优惠活动">
      <el-select v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in activities"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>-->
    <el-form-item class="btn">
      <el-button type="primary" @click="submitForm('ruleForm')" :plain="true">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      // input
      ruleForm: {
        name: this.$route.query.name,
        address: this.$route.query.address,
        tel: this.$route.query.tel,
        info: this.$route.query.info,
        slogan: this.$route.query.slogan
      },
      // 店铺特点
      feature: JSON.parse(this.$route.query.feature),
      // 店铺分类---级联菜单
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
      ],
      // 验证
      rules: {
        name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        info: [
          { required: false, message: "请输入店铺简介", trigger: "blur" },
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ],
        slogan: [
          { required: false, message: "请输入店铺标语", trigger: "blur" },
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ]
      },
      // 配送费 起送价
      delivery: this.$route.query.delivery,
      price: this.$route.query.price,
      // 营业时间
      startTime: this.$route.query.startTime,
      endTime: this.$route.query.endTime,
      // 上传图片
      logoUrl: this.$route.query.logoUrl,
      businessUrl: this.$route.query.businessUrl,
      cateringUrl: this.$route.query.cateringUrl,
      action: "http://localhost:3000/upload",
      // 优惠活动
      activities: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      // table
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      data: state => state.shop.data
    })
  },
  mounted() {
    // console.log(this.$route.query);
    // console.log(JSON.parse(this.$route.query.feature));
    // console.log(JSON.parse(this.$route.query.category));
  },
  methods: {
    ...mapActions(["update"]),
    // 上传图片
    logoSuccess(res, file, filelist) {
      this.logoUrl = res.url;
    },
    businessSuccess(res, file) {
      this.businessUrl = res.url;
    },
    cateringSuccess(res, file) {
      this.cateringUrl = res.url;
    },
    // table
    handleDelete(index, row) {
      console.log(index, row);
    },
    submitForm(formName) {
      const { _id, id, _v } = this.$route.query;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.update({
            _id,
            name: this.ruleForm.name,
            address: this.ruleForm.address,
            tel: this.ruleForm.tel,
            info: this.ruleForm.info,
            slogan: this.ruleForm.slogan,
            feature: JSON.stringify(this.feature),
            category: JSON.stringify(this.category),
            delivery: this.delivery,
            price: this.price,
            startTime: this.startTime,
            endTime: this.endTime,
            logoUrl: this.logoUrl,
            businessUrl: this.businessUrl,
            cateringUrl: this.cateringUrl
          }).then(res => {
            switch (res.data.status) {
              case 0:
                this.$message({
                  showClose: true,
                  message: "修改失败",
                  type: "error",
                  duration: 1000
                });
                break;
              case 2:
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: "success",
                  duration: 1000
                });
                setTimeout(() => {
                  this.$router.push("/merchant");
                }, 1000);
                break;
              default:
                break;
            }
          });
          // if (this.$store.state.shop.data) {
          //   console.log(this.$store.state.shop.data);
          // }

          // this.$message({
          //   showClose: true,
          //   message: "添加成功",
          //   type: "success",
          //   duration: 1000
          // });
          this.$refs[formName].resetFields();
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-date-editor {
  margin-right: 10px;
}
</style>