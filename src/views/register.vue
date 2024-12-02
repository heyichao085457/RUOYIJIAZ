<template>
  <div class="register">
    <div class="top">
      <span>陕 西 省 卫 片 执 法 综 合 监 管 平 台 V2.0</span>
    </div>
    <div class="block">
      <el-carousel autoplay indicator-position="none" class="el-carousel">
        <el-carousel-item v-for="item in imgrow" :key="item">
          <img
            :src="item"
            alt="Image"
            style="width: 100%; height: 100%; object-fit: cover"
          />
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
    >
      <h3 class="title"></h3>
      <el-row class="row-elop">
        <el-col :span="11">
          <el-form-item prop="nickName">
            <el-input
              v-model="registerForm.nickName"
              type="text"
              auto-complete="off"
              placeholder="账号"
            >
              <svg-icon
                slot="prefix"
                icon-class="user"
                class="el-input__icon input-icon"
              />
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="deptId">
            <treeselect
              v-model="registerForm.deptId"
              :options="deptOptions"
              :show-count="true"
              placeholder="请选择归属部门"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-elop">
        <el-col :span="11">
          <el-form-item prop="userName">
            <el-input
              v-model="registerForm.userName"
              placeholder="请输入用户名称"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              auto-complete="off"
              placeholder="密码"
              @keyup.enter.native="handleRegister"
            >
              <svg-icon
                slot="prefix"
                icon-class="password"
                class="el-input__icon input-icon"
              />
            </el-input>
          </el-form-item>
        </el-col>
        <!--  -->
      </el-row>
      <el-row class="row-elop">
        <el-col :span="11">
          <el-form-item prop="sex">
            <el-select
              style="width: 100%"
              v-model="registerForm.sex"
              placeholder="请选择性别"
            >
              <el-option
                v-for="dict in dict"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="selectXZQ">
            <el-cascader
              ref="cascader"
              clearable
              v-model="registerForm.selectXZQ"
              :options="xzq"
              :style="{ width: '100%' }"
              :props="{
                value: 'value',
                label: 'label',
                children: 'children',
              }"
              collapse-tags
              @change="handleChangeXzq"
              placeholder="请选择行政区"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 
     
       
      -->
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleRegister"
        >
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </el-button>
        <div style="float: right">
          <router-link class="link-type" :to="'/login'"
            >使用已有账户登录</router-link
          >
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>版权所有：@自然资源陕西省卫星应用技术中心</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg, register } from "@/api/login";
import {
  deptTreeSelectregister,
  getUser,
  registersex,
  registeregisterrsex,
  zusersc,
} from "@/api/system/user";
import { areas } from "../api/document/index";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Register",
  components: { Treeselect },
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      // 岗位选项
      postOptions: [],
      imgrow: [
        require("@/assets/logo/por1.jpg"),
        require("@/assets/logo/por2.jpg"),
        require("@/assets/logo/por3.jpg"),
        require("@/assets/logo/por4.jpg"),
        require("@/assets/logo/por5.jpg"),
      ],
      xzq: [],
      dict: [],
      // 部门树选项
      deptOptions: undefined,
      codeUrl: "",
      registerForm: {
        nickName: "",
        userName: "",
        sex: undefined,
        deptId: undefined,
        password: "",
        city: "",
        county: "",
        selectXZQ: "",
      },

      registerRules: {
        userName: [
          { required: true, message: "请输入您的名称", trigger: "change" },
        ],
        deptId: [{ required: true, message: "请选择部门", trigger: "change" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        selectXZQ: [
          { required: true, message: "请选择行政区", trigger: "change" },
        ],
        nickName: [
          { required: true, trigger: "blur", message: "请输入您的账号" },
          {
            min: 2,
            max: 20,
            message: "用户账号长度必须介于 2 和 20 之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
          {
            min: 5,
            max: 20,
            message: "用户密码长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请再次输入您的密码" },
          { required: true, validator: equalToPassword, trigger: "blur" },
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }],
      },
      loading: false,
      captchaEnabled: true,
    };
  },
  created() {
    this.getCode();
    this.getDeptTree();
    this.getXzqhh();
    // this.add();
  },
  methods: {
    getXzqhh() {
      registeregisterrsex().then((res) => {
        // console.log(res, "res");
        if (res.code == 200) {
          const formattedData = res.data.map((ele) => ({
            value: ele.city,
            label: ele.city,
            children: ele.county.map((county) => ({
              value: county,
              label: county,
            })),
          }));

          this.xzq = formattedData;
          // console.log(this.xzq);
        }
      });
      registersex().then((ok) => {
        // console.log(ok);
        this.dict = ok.data.map((ele) => ({
          value: ele,
          label: ele,
        }));
      });
    },
    handleChangeXzq(value) {
      this.registerForm.city = value[0];
      this.registerForm.county = value[1];
    },

    //数组转对象
    arrayToObject(arr) {
      let obj = {};
      arr.forEach((item, index) => {
        obj[index] = item;
      });
      return obj;
    },
    // add() {
    //   getUser().then((response) => {
    //     this.postOptions = response.posts;
    //     this.roleOptions = response.roles;
    //   });
    // },
    getDeptTree() {
      deptTreeSelectregister().then((response) => {
        this.deptOptions = response.data;
      });
    },
    getCode() {
      getCodeImg().then((res) => {
        this.captchaEnabled =
          res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.registerForm.uuid = res.uuid;
        }
      });
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          zusersc(this.registerForm)
            .then((res) => {
              const username = this.registerForm.nickName;
              if (res.code == 200) {
                this.$message({
                  showClose: true,
                  message: "注册成功，请等待管理员审核!",
                  type: "success",
                });
                this.$router.push("/login");
              }

              // this.$alert(
              //   "<font color='red'>注册成功，您的账号 " +
              //     username +
              //     "请等待管理员审核!</font>",
              //   "系统提示",
              //   {
              //     dangerouslyUseHTMLString: true,
              //     type: "success",
              //   }
              // )
              //   .then(() => {
              //     this.$router.push("/login");
              //   })
              //   .catch(() => {});
            })
            .catch(() => {
              this.loading = false;
              if (this.captchaEnabled) {
                this.getCode();
              }
            });
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.register {
  display: flex;
  flex-direction: column;
  // align-items: center;
  height: 100%;
  // background-image: url("../assets/pochen.jpg");
  // background-size: cover;
  .top {
    height: 15%;
    width: 100%;
    text-align: center;
    font-family: Arial;
    line-height: 140px;
    font-size: 40px;
    font-weight: 900;
  }
}
.block {
  position: relative;
  height: 70%;
  .el-carousel {
    height: 100% !important;
    .el-carousel__container {
      height: 100% !important;
    }
  }
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.register-form {
  border-radius: 6px;
  background: #ffffff;
  width: 600px;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 350px;
  z-index: 999;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
  .row-elop {
    display: flex;
    justify-content: space-between;
  }
}
.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.register-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-register-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.register-code-img {
  height: 38px;
}
.el-login-footer {
  height: 15%;
  line-height: 150px;

  width: 100%;
  text-align: center;

  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
