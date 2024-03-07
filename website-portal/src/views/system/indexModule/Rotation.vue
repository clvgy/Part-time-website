<template>
  <div>
    <!-- 轮播图 -->
    <div id="carousel">
      <!-- <el-carousel height="400px">
        <el-carousel-item v-for="item in items" :key="item">
          <h3 class="small">{{ item.itemname }}</h3>
          <img :src="item.url" alt="" />
        </el-carousel-item>
      </el-carousel> -->
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in items" :key="item">
          <h3 class="small">{{ item.itemname }}</h3>
          <img :src="item.url" alt="" @click="playMovice(item.play_id)" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script scope>
import axios from 'axios';
const base_url = "http://localhost:8085/admin/system/sysPlay";
export default {
  data() {
    return {
      items: [
        {
          itemid: '',
          itemname: "",
          url: "",
          play_id: ''
        },
        {
          itemid: '',
          itemname: "",
          url: "",
          play_id: ''
        },
        {
          itemid: '',
          itemname: "",
          url: "",
          play_id: ''
        },
        {
          itemid: '',
          itemname: "",
          url: "",
          play_id: ''
        },
        {
          itemid: '',
          itemname: "",
          url: "",
          play_id: ''
        },
      ],
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios({
        method: 'get',
        url: base_url + '/page'
      }).then(res => {
        console.log(res.data.data.records)
        for (var i = 0; i < res.data.data.records.length; i++) {
          this.items[i].itemid = 1;
          this.items[i].itemname = res.data.data.records[i].name;
          this.items[i].url = res.data.data.records[i].image;
          this.items[i].play_id =  res.data.data.records[i].cid;
        }
      })
    },
    playMovice(play_id){
      var id =play_id
      alert(id)
      axios({
        method: 'get',
        url: base_url + '/getPlayAuth',
        params:{'id':id}
      }).then(res => {
        console.log(res)
      })
    }
  }

}
</script>

<style></style>