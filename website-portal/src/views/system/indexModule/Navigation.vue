<template>
  <div>
    <!-- 导航栏 -->
    <div id="nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1"><span class="icon iconfont icon-B-"></span>首页</el-menu-item>
        <el-menu-item index="3"><span class="icon iconfont icon-huiyuan"></span>会员中心</el-menu-item>
        <el-menu-item index="4"><span class="icon iconfont icon-guanyuwomen"></span>关于我们</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    activeIndex(){

    },
    handleSelect(){
      
    }
  }
}
</script>

<style>

</style>