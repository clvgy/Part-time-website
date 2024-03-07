<template>
  <div>
    <!-- 猜你喜欢 -->
    <div id="cainixihuan">
      <!-- <h1><span class="icon iconfont icon-cainixihuan"></span>猜你喜欢</h1> -->
      <el-row>
      <el-col :span="12">
        <h1><span class="icon iconfont icon-cainixihuan"></span>猜你喜欢</h1>
      </el-col>
      <el-col :span="12" style="margin-top:10px;margin-bottom:20px"><el-pagination background layout="prev, next" :total="10">
        </el-pagination></el-col>
    </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="4">
          <el-card>
            <img
              src="https://imgs.qunarzz.com/sight/p0/1603/b1/b19c46c888b4b6e790.water.jpg_224x148_49d3dd5c.jpg"
              class="image"
            />
            <div style="padding: 14px">
              <span
                >【买贵退安心游】长白山4日3晚自由行●宿万达锦华度假酒店（含双早</span
              >
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="danger" @click="todetail('1')" round><span class="icon iconfont icon-huobao"></span>&nbsp;火爆预约</el-button>
              </div>
            </div>
          </el-card></el-col
        >
        <el-col :span="4">
          <el-card>
            <img
              src="https://imgs.qunarzz.com/sight/p0/1508/80/29eaf59b380bef97acacba8a8f6efd2a.water.jpg_224x148_ce6abc14.jpg"
              class="image"
            />
            <div style="padding: 14px">
              <span
                >【纯玩0购物】张家界森林公园+袁家界+天子山+天门山玻璃栈道+云天</span
              >
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="danger" round><span class="icon iconfont icon-huobao"></span>&nbsp;火爆预约</el-button>
              </div>
            </div>
          </el-card></el-col
        >
        <el-col :span="4">
          <el-card>
            <img
              src="https://imgs.qunarzz.com/sight/p0/1610/2c/2cd816350fe8219da3.water.jpg_224x148_cb0dcc18.jpg"
              class="image"
            />
            <div style="padding: 14px">
              <span
                >【爱购上海】广东汕头纳轩酒店双飞4日3晚自由行（位于汕头老城区+</span
              >
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="danger" round><span class="icon iconfont icon-huobao"></span>&nbsp;火爆预约</el-button>
              </div>
            </div>
          </el-card></el-col
        >
        <el-col :span="4">
          <el-card>
            <img
              src="https://imgs.qunarzz.com/sight/p0/2001/78/78cf0b84b66945da3.img.png_224x148_1b3d5cd7.png"
              class="image"
            />
            <div style="padding: 14px">
              <span
                >【邻网红打卡景区】厦门4日3晚自由行●宿3晚龙佳铂颐酒酒店（含双早</span
              >
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="danger" round><span class="icon iconfont icon-huobao"></span>&nbsp;火爆预约</el-button>
              </div>
            </div>
          </el-card></el-col
        >
        <el-col :span="4">
          <el-card>
            <img
              src="https://imgs.qunarzz.com/sight/p0/1912/62/6203253b6ea0d27ea3.img.jpg_224x148_619189cc.jpg"
              class="image"
            />
            <div style="padding: 14px">
              <span>【纯玩0购物】张家界森林公园+袁家界+天子山+天门山玻璃栈道+云天</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="danger" round><span class="icon iconfont icon-huobao"></span>&nbsp;火爆预约</el-button>
              </div>
            </div>
          </el-card></el-col
        >

        <el-col :span="4">
          <el-card>
            <img
              src="https://imgs.qunarzz.com/sight/p0/1604/99/99a032f6308efbd90.water.jpg_224x148_7e73942e.jpg"
              class="image"
            />
            <div style="padding: 14px">
              <span>【纯玩0购物】张家界森林公园+袁家界+天子山+天门山玻璃栈道+云天</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="danger" round><span class="icon iconfont icon-huobao"></span>&nbsp;火爆预约</el-button>
              </div>
            </div>
          </el-card></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
      },
      todetail(id){
        // console.log(id);
        this.$router.push({
          name:'detail',
          params:{
            id:id
          }
        })
        // 路径跳转
       // location.href="#/detail";
       //this.$router.push('/detail/${id}');
      }
  }

}
</script>

<style>

</style>