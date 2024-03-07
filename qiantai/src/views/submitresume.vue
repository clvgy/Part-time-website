<template>
  <div style="margin: 0 auto">
    <el-row :gutter="12" type="flex" justify="center">
      <el-col :span="12">
        <el-card shadow="always" style="padding: 14px;">
          <div slot="header" class="clearfix">
            <h1>java开发工程师</h1>
            <br>
            <p style="color:#409EFF">薪资{{ this.sysRecruit.salary }}&nbsp;|&nbsp;结算单位人民币</p>
            <el-row>
              <el-col :span="8">创建:{{ this.sysRecruit.createTime }}</el-col>
              <el-col :span="8"><span class="icon iconfont">&#xe638;</span>浏览:{{ this.sysRecruit.browseTimes }}次</el-col>
              <el-col :span="8"><span class="el-icon-s-marketing"></span>申请:{{ this.sysRecruit.applyTimes }}次</el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="12">招聘人数:{{ this.sysRecruit.recruitNum }}</el-col>
            <el-col :span="12">开始时间:{{ this.sysRecruit.startTime }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">工作区域:{{ this.sysRecruit.workPlace }}</el-col>
            <el-col :span="12">结束时间:{{ this.sysRecruit.endTime }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">申请截至时间:{{ this.sysRecruit.supEndTime }}</el-col>
          </el-row>
          <br>
          <el-button type="primary" plain @click="chooseResume()">申请职位</el-button>
        </el-card>
        <el-card shadow="always" style="padding: 14px; margin-top:20px">
          <div slot="header" class="clearfix">
            <h1>职位详情</h1>
          </div>
          <h3>工作时间</h3>
          <p>{{ this.sysRecruit.workTime }}</p>
          <br>
          <h3>职位描述</h3>
          <p>{{ this.sysRecruit.posMemo }}</p>
          <br>
          <h3>薪资备注</h3>
          <p>{{ this.sysRecruit.salaryMemo }}</p>
        </el-card>
        <el-card shadow="always" style="padding: 14px; margin-top:20px">
          <div slot="header" class="clearfix">
            <h1><span class="icon iconfont">&#xe636;</span>要求和福利</h1>
          </div>
          <h3><span class="icon iconfont">&#xe637;</span>福利</h3>
          <p><el-tag size="small">{{ this.sysRecruit.welfare }}</el-tag></p>
          <br>
          <h3>要求</h3>
          <p><el-tag size="small">{{ this.sysRecruit.requirement }}</el-tag></p>
          <br>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="hover">
          <div slot="header" class="clearfix" style="text-align: center">
            <h1><span class="icon iconfont icon-B-"></span>简介</h1>
          </div>
          <div class="clearfix" style="text-align: center">
            <h1 style="color:#409EFF">{{ this.sysEnterprise.ename }}</h1>
            <br>
            <p>所属行业:{{ this.sysEnterprise.eindustry }}</p>
            <br>
            <h1>公司简介</h1>
            <span>{{ this.sysEnterprise.eintroduce }}</span>

          </div>
        </el-card>
        <el-card shadow="hover" style="padding: 14px; margin-top:20px">
          <div slot="header" class="clearfix" style="text-align: center">
            <h1><span class="icon iconfont" style="font-size:20px">&#xe652;</span>地址</h1>
          </div>
          <div class="clearfix" style="text-align: center">
            <div id="container">

            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 添加/修改弹框 -->
    <el-dialog title="选择简历" :visible.sync="dialogVisible" width="40%">
      <div v-if="Object.keys(resumeList).length == 0">
        您还没有创建简历，需要创建
      </div>
      <div v-else>
        <el-table :data="resumeList" @select="handleSelectionChange" ref="tableDataRefs"
          :header-cell-class-name="leftheaderStyle">

          <el-table-column type="selection" width="55" />
          <el-table-column prop="title" label="简历标题">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="save()" size="small">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      user: '',
      sysAddress: {},
      sysEnterprise: {},
      sysRecruit: {},
      resumeList: {},
      dialogVisible: false,
      checkId: '',
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.id = this.$route.query.id;
    this.getResumeList();
    this.getRecriutById();
    this.getEnterpriseById();
    this.getAddressById();
  },
  mounted() {
    // this.mapdata();
  },
  methods: {
    save() {
      if (this.checkId == '') {
        // 提示
        this.$message.warning("请选择至少一行数据!!!");

        return;

      }
      this.uploadResume();
      this.dialogVisible = false;
    },
    uploadResume() {
      this.$axios
        .get("http://localhost:8085/user/system/applyPosition", { params: { resumeId: this.checkId, recruitId: this.id, enterpriseId: this.sysRecruit.enterpriseId, applyTimes: this.sysRecruit.applyTimes } })
        .then(res => {
          // console.log(res.data);
          // this.resumeList = res.data.data;
          this.getRecriutById();
          this.$message({
            type: 'success',
            message: '提交成功!'
          });

        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '提交失败！'
          });
        });
    },
    handleSelectionChange(selection, row) {
      // 判断长度等于1 获取
      if (selection.length === 1) {
        this.checkId = selection[0].id;
      }
      if (selection.length > 1) {
        this.checkId = selection[1].id;
        // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
        // 该方法不创建新数组，而是直接修改原有的 arrayObject。
        let del_row = selection.shift()
        // 其余的都不选中
        this.$refs.tableDataRefs.toggleRowSelection(del_row, false)
      }
      console.log(this.checkId);
    },
    getResumeList() {
      this.$axios
        .get("http://localhost:8085/user/system/findAll", { params: { username: this.user } })
        .then(res => {
          // console.log(res.data);
          this.resumeList = res.data.data;

        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    chooseResume() {
      this.dialogVisible = true;
    },
    getAddressById() {
      this.$axios
        .get("http://localhost:8085/user/system/baiduMap", { params: { id: this.id } })
        .then(res => {
          this.sysAddress = res.data.data;
          // alert(this.sysAddress.longitude);
          this.mapdata();
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    getEnterpriseById() {
      this.$axios
        .get("http://localhost:8085/user/system/getEnterpriseById", { params: { id: this.id } })
        .then(res => {
          this.sysEnterprise = res.data.data;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    getRecriutById() {
      this.$axios
        .get("http://localhost:8085/user/system/getRecriutById", { params: { id: this.id } })
        .then(res => {
          this.sysRecruit = res.data.data;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    leftheaderStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "seltAllbtnDis";
      }
    },
    // 地图数据
    mapdata() {
      var map = new BMapGL.Map("container");          // 创建地图实例 
      var point = new BMapGL.Point(this.sysAddress.longitude, this.sysAddress.latitude);  // 创建点坐标 
      map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      // map.setHeading(64.5);   //设置地图旋转角度
      // map.setTilt(73);       //设置地图的倾斜角度
      map.addControl(new BMapGL.ScaleControl()); // 添加比例尺控件 左下角显示
      map.addControl(new BMapGL.ZoomControl());// 添加缩放控件 右下角显示
      map.addControl(new BMapGL.CityListControl());  // 添加城市列表控件 左上角
      map.addControl(new BMapGL.MapTypeControl());// 地图类型 右上角显示
      var marker = new BMapGL.Marker(point);        // 创建标注
      map.addOverlay(marker);
    }
  }
}
</script>

<style scoped>
/* ::v-deep .el-table__header-wrapper .el-checkbox {
 
 display: none;

} */

::v-deep .seltAllbtnDis .cell {
  visibility: hidden;
}

#container {
  width: 500px;
  height: 300px;
}
</style>