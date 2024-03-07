<template>
    <div>
        <!-- header -->
        <Header></Header>
        <!-- 导航菜单 -->
        <Navigation></Navigation>

        <!-- 轮播图 -->
        <Rotation></Rotation>

        <!--猜你喜欢 -->
        <GuessYou></GuessYou>

        <!-- 热播 -->
        <Airplay></Airplay>

        <!-- 电视剧-->
        <TVPlay></TVPlay>

        <!-- 电影 -->
        <Movieplay></Movieplay>

        <!-- 综艺 -->
        <Varietyplay></Varietyplay>

        <!-- 纪录片 -->
        <Documentary></Documentary>

        <!-- 底部区域 -->
        <Foolter></Foolter>

    </div>
</template>
  
<script>
import Header from '@/views/system/indexModule/Header.vue'
import TVPlay from '@/views/system/indexModule/TVPlay.vue';
import Foolter from '@/views/system/indexModule/Foolter.vue';
import GuessYou from '@/views/system/indexModule/GuessYou.vue';
import Navigation from '@/views/system/indexModule/Navigation.vue';
import Rotation from '@/views/system/indexModule/Rotation.vue';
import Airplay from '@/views/system/indexModule/Airplay.vue';
import Movieplay from '@/views/system/indexModule/Movieplay.vue';
import Varietyplay from '@/views/system/indexModule/Varietyplay.vue';
import Documentary from '@/views/system/indexModule/Documentary.vue';

export default {
    components: {
        Header,
        Foolter,
        Rotation,
        GuessYou,
        TVPlay,
        Navigation,
        Airplay,
        Movieplay,
        Varietyplay,
        Documentary
    }
}
</script>
  
<style></style>