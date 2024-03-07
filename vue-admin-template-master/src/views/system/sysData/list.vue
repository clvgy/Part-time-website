<template>
  <div>
    <el-row>
      <el-col :span="12"
        ><div id="regesiter_num" :style="{ height: '300px' }"></div
      ></el-col>
      <el-col :span="12"
        ><div id="login_num" :style="{ height: '300px' }"></div
      ></el-col>
    </el-row>

    <el-row>
      <el-col :span="12"
        ><div id="video_view_num" :style="{ height: '300px' }"></div
      ></el-col>
      <el-col :span="12"
        ><div id="pic_view_num" :style="{ height: '300px' }"></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {};
  },
  mounted() {
    this.initCharts("regesiter_num", "注册人数统计");
    this.initCharts("login_num", "登录人数统计");
    this.initCharts("video_view_num", "视频访问人数统计");
    this.initCharts("pic_view_num", "图片访问人数统计");
  },
  created() {},
  methods: {
    initCharts(type, title) {
      //   alert(1);
      // 基于准备好的dom，初始化echarts实例
      // 基于准备好的dom，初始化echarts实例
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(type));

      myChart.setOption({
        title: {
          text: title,
        },
        tooltip: {},
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20,20],
          },
        ],
      });
    },
  },
};
</script>

<style>
/* .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  } */
</style>