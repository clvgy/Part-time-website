<template>
  <div id="app" name="app">
    <el-container>
      <!-- 顶部导航栏 -->
      <div class="topbar">
        <div class="nav">
          <li style="float: left; color: #00feff; padding-left: 10px;">
            <span class="icon iconfont icon-zhiyuanzhaopin"></span>学生兼职网
          </li>
          <ul>
            <!-- <li>
              <el-input
            placeholder="请输入内容"
            v-model="input3"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="公司" value="1"></el-option>
              <el-option label="职位" value="2"></el-option>
              <el-option label="地区" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
            </li> -->
            <li v-if="!this.$store.getters.getUser">
              <el-button type="text" @click="login"><span class="el-icon-s-custom"></span>登录</el-button>
              <span class="sep">|</span>
              <el-button type="text" @click="register = true"><span class="el-icon-plus"></span>注册</el-button>
              <span class="sep">|</span>
              <!-- <el-button type="text" @click="personal"><span
                  class="icon iconfont icon-guanyuwomen"></span>个人中心</el-button> -->
            </li>
            <li v-else>

              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                style="margin-bottom;:0px"></el-avatar>
              <span>{{ user }}</span>
              <!-- <el-button type="text" @click="personal"><span
                  class="icon iconfont icon-guanyuwomen"></span>个人中心</el-button> -->
              <el-button type="text" @click="logout">退出</el-button>
              <el-popover placement="top" width="180" v-model="visible">
                <p>确定退出登录吗？</p>
                <div style="text-align: right; margin: 10px 0 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="logout">确定</el-button>
                </div>
                <el-button type="text" slot="reference">{{ this.$store.getters.getUser.userName }}</el-button>
              </el-popover>
            </li>
            <li v-if="!this.$store.getters.getUser">
              <el-button size='mini' type='default' style="background-color: #2b3b4e; "
                @click="hsghoutai()">跳转后台</el-button>
            </li>
          </ul>
        </div>
      </div>
      <!-- 顶部导航栏END -->


      <!-- 顶栏容器 -->
      <!-- 顶栏容器END -->
      <div class="block">
        <el-carousel indicator-position="outside" type="card">
          <el-carousel-item>
            <img style="height:460px; width: 100%" src="./assets/imgs/j1.jpg" />
          </el-carousel-item>
          <el-carousel-item>
            <img style="height:460px; width: 100%" src="./assets/imgs/j2.jpg" />
          </el-carousel-item>
          <el-carousel-item>
            <img style="height:460px; width: 100%" src="./assets/imgs/j3.jpg" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color="#409eff" router>

          <el-menu-item index="/recruitment"><span class="icon iconfont icon-zhaopin"></span>招聘资讯</el-menu-item>
          <el-menu-item index="/editresume"><span class="icon iconfont icon-wodejianli"></span>简历编辑</el-menu-item>
          <!-- <el-menu-item index="/personalcenter"><span class="icon iconfont icon-icon_dongmanmoxing"></span>个人中心</el-menu-item> -->
        </el-menu>
      </el-header>
      <!-- 登录模块 -->
      <MyLogin></MyLogin>
      <!-- 注册模块 -->
      <MyRegister :register="register" @fromChild="isRegister"></MyRegister>

      <!-- 主要区域容器 -->
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
      <!-- 主要区域容器END -->
      <el-footer>
        <div class="footer">
          <div class="ng-promise-box">
            <div class="ng-promise">
              <p class="text">

              </p>
            </div>
          </div>
          <div class="github">
            <a href="#" target="_blank">
              <span class="icon iconfont icon-100-2" style="font-size:80px"></span>
            </a>
          </div>
          <div class="mod_help">
            <p class="coty"> &copy; 2023-2024</p>
          </div>
        </div>
      </el-footer>
      <!-- 底栏容器END -->
    </el-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  beforeUpdate() {
    this.activeIndex = this.$route.path;
  },
  data() {
    return {
      // headurl:"",
      activeIndex: "", // 头部导航栏选中的标签
      search: "", // 搜索条件
      user: "",
      register: false, // 是否显示注册组件
      visible: false // 是否退出登录
    };
  },
  created() {
    // this.headurl=JSON.parse(localStorage.getItem("headUrl"));
    // alert(this.headurl);
    this.user = localStorage.getItem("user");
    // 获取浏览器localStorage，判断用户是否已经登录
    if (localStorage.getItem("user")) {
      // 如果已经登录，设置vuex登录状态
      this.setUser(JSON.parse(localStorage.getItem("user")));
    }
  },
  computed: {
    ...mapGetters(["getUser", "getNum"])
  },
  watch: {
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin", "setShoppingCart"]),
    login() {
      // 点击登录按钮, 通过更改vuex的showLogin值显示登录组件
      this.setShowLogin(true);
    },
    // personal() {
    //   let routeData = this.$router.resolve({
    //     name: "个人中心"
    //   });

    //   //因为在子页面内使用this.$route.params拿到的对象为{}，参数无法传过来，所以需要将参数记录到缓存中，在新页面中 通过缓存来拿
    //   // localStorage.setItem("geoId", id)；

    //   //必要操作，否则不会打开新页面
    //   window.open(routeData.href, '_blank');

    // },
    hsghoutai() { const w = window.open("about:blank"); w.location.href = 'http://localhost:9528'; },
    // 退出登录
    logout() {
      this.visible = false;
      // 清空本地登录信息
      localStorage.setItem("user", "");
      // 清空vuex登录信息
      this.setUser("");
      this.notifySucceed("成功退出登录");
    },
    // 接收注册子组件传过来的数据
    isRegister(val) {
      this.register = val;
    },
  }
};
</script>

<style>
/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}

#app .el-header {
  padding: 0;
}

#app .el-main {
  min-height: 300px;
  padding: 20px 0;
}

#app .el-footer {
  padding: 0;
}

a,
a:hover {
  text-decoration: none;
}

/* 全局CSS END */

/* 顶部导航栏CSS */
.topbar {
  height: 50px;
  /* background-color: #3d3d3d; */
  background-color: #3d3d3d;
  margin-bottom: 20px;
}

.topbar .nav {
  width: 1225px;
  margin: 0 auto;
}

.topbar .nav ul {
  float: right;
}

.topbar .nav li {
  float: left;
  height: 40px;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}

.topbar .nav .sep {
  color: #b0b0b0;
  font-size: 12px;
  margin: 0 5px;
}

.topbar .nav li .el-button {
  color: #b0b0b0;
}

.topbar .nav .el-button:hover {
  color: #fff;
}

.topbar .nav li a {
  color: #b0b0b0;
}

.topbar .nav a:hover {
  color: #fff;
}

.topbar .nav .shopCart {
  width: 120px;
  background: #424242;
}

.topbar .nav .shopCart:hover {
  background: #fff;
}

.topbar .nav .shopCart:hover a {
  color: #ff6700;
}

.topbar .nav .shopCart-full {
  width: 120px;
  background: #ff6700;
}

.topbar .nav .shopCart-full a {
  color: white;
}

/* 顶部导航栏CSS END */

/* 顶栏容器CSS */
.el-header .el-menu {
  max-width: 1225px;
  margin: 0 auto;
}

.el-header .logo {
  height: 60px;
  width: 189px;
  float: left;
  margin-right: 100px;
}

.el-header .so {
  margin-top: 10px;
  width: 300px;
  float: right;
}

/* 顶栏容器CSS END */

/* 底栏容器CSS */
.footer {
  width: 100%;
  text-align: center;
  background: #3d3d3d;
  padding-bottom: 20px;
}

.footer .ng-promise-box {
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}

.footer .ng-promise-box {
  margin: 0 auto;
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}

.footer .ng-promise-box .ng-promise p a {
  color: #fff;
  font-size: 20px;
  margin-right: 210px;
  padding-left: 44px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  text-decoration: none;
  background: url("./assets/imgs/us-icon.png") no-repeat left 0;
}

.footer .github {
  height: 50px;
  line-height: 50px;
  margin-top: 20px;
}

.footer .github .github-but {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background: url("./assets/imgs/github.png") no-repeat;
}

.footer .mod_help {
  text-align: center;
  color: #888888;
}

.footer .mod_help p {
  margin: 20px 0 16px 0;
}

.footer .mod_help p a {
  color: #888888;
  text-decoration: none;
}

.footer .mod_help p a:hover {
  color: #fff;
}

.footer .mod_help p span {
  padding: 0 22px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

/* 底栏容器CSS END */
</style>
