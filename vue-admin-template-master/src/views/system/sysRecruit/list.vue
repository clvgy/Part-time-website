<template>
  <div>
    <!-- 搜索 -->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input style="width: 95%" v-model="searchObj.keyword" placeholder="招聘信息标题\职位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作时间">
              <el-date-picker v-model="createTimes" type="datetimerange" range-separator="至" start-placeholder="开始时间"
                end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss" style="margin-right: 10px;width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
    </div>

    <!-- 工具条 -->
    <div class="tools-div">
      <el-button type="success" icon="icon iconfont icon-add-role-copy" size="mini" @click="add">&nbsp;添 加</el-button>
      <el-button class="btn-add" size="mini" @click="batchRemove()">批量删除</el-button>
    </div>

    <!-- 数据显示区 -->
    <div class="app-container">
      <!-- 列表 -->
      <el-table v-loading="listLoading" :data="list" stripe border style="width: 100%;margin-top: 10px;"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column prop="enterpriseId" label="公司" :formatter="formatterEnterprise" />
        <el-table-column prop="regionId" label="地区" :formatter="formatterRegion" />
        <el-table-column prop="positionId" label="职位" :formatter="formatterPosition" />


        <el-table-column prop="recruitNum" label="招聘人数" />
        <el-table-column prop="recruitTitle" label="招聘信息标题" />
        <el-table-column prop="salary" label="工作薪资" />
        <el-table-column prop="timeunit" label="日期单位" />
        <el-table-column prop="settleId" label="结算单位编号" :formatter="formatterSttle" />
        <el-table-column prop="welfare" label="福利" />
        <el-table-column prop="salaryMemo" label="薪资备注" />
        <el-table-column prop="startTime" label="工作开始日期" />
        <el-table-column prop="endTime" label="工作结束日期" />
        <el-table-column prop="supEndTime" label="报名截止日期" />
        <el-table-column prop="workTime" label="工作时间" />
        <el-table-column prop="workPlace" label="工作地点" />
        <el-table-column prop="posMemo" label="职位备注" />
        <el-table-column prop="requirement" label="职位要求" />
        <el-table-column prop="needInteview" label="是否需要面试" :formatter="formatterNeed"/>
        <el-table-column prop="contatPeople" label="联系人姓名" />
        <el-table-column prop="contactPhone" label="联系电话" />
        <el-table-column prop="email" label="电子邮箱" />
        <el-table-column prop="browseTimes" label="浏览次数" />
        <el-table-column prop="applyTimes" label="申请次数" />

        <el-table-column prop="createTime" label="创建时间" />

        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)" title="修改" />
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)" title="删除" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <el-pagination :current-page="page" :total="total" :page-size="limit" style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper" @current-change="fetchData" />

    <!-- 添加或修改 -->
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form ref="dataForm" :model="sysRecruit" label-width="100px" size="small" style="padding-right: 40px;">
        <el-form-item label="地区" prop="regionId">
          <el-select v-model="sysRecruit.regionId" placeholder="请选择地区">
            <el-option v-for="item in regionList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="positionId">
          <el-select v-model="sysRecruit.positionId" placeholder="请选择职位">
            <el-option v-for="item in positionList" :key="item.id" :label="item.positionName"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="招聘人数" prop="recruitNum">
          <el-input v-model="sysRecruit.recruitNum" />
        </el-form-item>
        <el-form-item label="招聘信息标题" prop="recruitTitle">
          <el-input v-model="sysRecruit.recruitTitle" />
        </el-form-item>
        <el-form-item label="工作薪资" prop="salary">
          <el-input v-model="sysRecruit.salary" />
        </el-form-item>
        <el-form-item label="日期单位" prop="timeunit">
          <el-input v-model="sysRecruit.timeunit" />
        </el-form-item>
        <el-form-item label="结算单位编号" prop="settleId">
          <el-select v-model="sysRecruit.settleId" placeholder="请选择结算单位">
            <el-option v-for="item in sttleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="福利" prop="welfare">
          <el-input v-model="sysRecruit.welfare" />
        </el-form-item>
        <el-form-item label="薪资备注" prop="salaryMemo">
          <el-input v-model="sysRecruit.salaryMemo" />
        </el-form-item>
        <el-form-item label="工作开始日期" prop="startTime">
          <el-date-picker v-model="sysRecruit.startTime" align="right" type="date" placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工作结束日期" prop="endTime">
          <el-date-picker v-model="sysRecruit.endTime" align="right" type="date" placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止日期" prop="supEndTime">
          <el-date-picker v-model="sysRecruit.supEndTime" align="right" type="date" placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工作时间" prop="workTime">
          <el-input v-model="sysRecruit.workTime" />
        </el-form-item>
        <el-form-item label="工作地点" prop="workPlace">
          <el-input v-model="sysRecruit.workPlace" />
        </el-form-item>
        <el-form-item label="职位备注" prop="posMemo">
          <el-input v-model="sysRecruit.posMemo" />
        </el-form-item>
        <el-form-item label="职位要求" prop="requirement">
          <el-input v-model="sysRecruit.requirement" />
        </el-form-item>
        <el-form-item label="是否需要面试" prop="needInteview">
          <el-select v-model="sysRecruit.needInteview" placeholder="请选择职位">
            <el-option v-for="item in isList" :key="item.id" :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="联系人姓名" prop="contatPeople">
          <el-input v-model="sysRecruit.contatPeople" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="sysRecruit.contactPhone" />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="sysRecruit.email" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="saveOrUpdate()" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import api from '@/api/recruit/recruit.js'
import regionApi from '@/api/region/region.js'
import enterpriseApi from '@/api/enterprise/enterprise.js'
import positionApi from '@/api/position/position.js'
import sttleApi from '@/api/sttle/sttle.js'

export default {
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: [], // 数据列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 5, // 每页记录数
      searchObj: {}, // 查询表单对象
      // 处理时间范围条件的
      createTimes: [],
      dialogVisible: false,

      sysRecruit: {},
      saveBtnDisabled: false,
      selectValueIds: [],
      ids: [],

      regionList: {},
      enterpriseList: {},
      positionList: {},
      sttleList: {},

      isList: [
        {
          id: 1,
          name: '是'
        },
        {
          id: 0,
          name: '否'
        }
      ],

      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now();
        // },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      startTime: '',



    }
  },
  created() {
    sttleApi.findAll().then(res => {
      this.sttleList = res.data;
    });
    enterpriseApi.findAll().then(res => {
      this.enterpriseList = res.data;
    });
    regionApi.findAll().then(res => {
      this.regionList = res.data;
    });
    positionApi.findAll().then(res => {
      this.positionList = res.data;
    });
    this.fetchData();
  },
  methods: {

    formatterNeed(rows, colum) {
      for (var i = 0; i < this.isList.length; i++) {
        if (rows.needInteview == this.isList[i].id) {
          return this.isList[i].name;
        }
      }
    },
    formatterSttle(rows, colum) {
      for (var i = 0; i < this.sttleList.length; i++) {
        if (rows.settleId == this.sttleList[i].id) {
          return this.sttleList[i].name;
        }
      }
    },
    formatterPosition(rows, colum) {
      for (var i = 0; i < this.positionList.length; i++) {
        if (rows.positionId == this.positionList[i].id) {
          return this.positionList[i].positionName;
        }
      }
    },
    formatterRegion(rows, colum) {
      for (var i = 0; i < this.regionList.length; i++) {
        if (rows.regionId == this.regionList[i].id) {
          return this.regionList[i].regionName;
        }
      }
    },
    formatterEnterprise(rows, colum) {
      for (var i = 0; i < this.enterpriseList.length; i++) {
        if (rows.enterpriseId == this.enterpriseList[i].id) {
          return this.enterpriseList[i].ename;
        }
      }
    },


    // 批量删除的实现
    batchRemove() {

      // 判断是否选中
      if (this.selectValueIds.length == 0) {
        // 提示
        this.$message.warning("请选择至少一行数据!!!");

        return;

      }

      // 循环之前1对象数组
      var ids = [];
      // 取出每个对象中id
      for (var i = 0; i < this.selectValueIds.length; i++) {
        ids.push(this.selectValueIds[i].id);
      }

      this.$confirm('此操作将永久删除这些招聘信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        api.deleteBatchRecruitByIds(ids).then(response => {
          // a.给出提示
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

          // 刷新列表
          this.fetchData();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 获取checkbox选中的数据
    handleSelectionChange(selectValue) {
      this.selectValueIds = selectValue;
    },
    // 根据id删除
    removeDataById(id) {
      this.$confirm('此操作将永久删除该招聘信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        api.deleteRecruitById(id).then(response => {
          // a.给出提示
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

          // 刷新列表
          this.fetchData();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 添加修改取消按钮
    cancel() {
      this.sysRecruit = {};
      this.dialogVisible = false;
      this.fetchData();
    },
    // 更新用户
    updateRecruit() {
      // this.sysRecruit.startTime = this.startTime;
      api.updateByRecruit(this.sysRecruit).then(response => {
        this.sysRecruit = {};
        // 给出提示框
        this.$message.success("修改招聘信息成功");
        // 关闭添加/修改框
        this.dialogVisible = false;
        // 刷新列表
        this.fetchData();
      })
    },
    // 根据id进行查询回显
    edit(row) {

      // console.log(row);
      // 将row中数据赋给sysRole进行回显
      this.sysRecruit = row;
      // 打开弹框
      this.dialogVisible = true;
    },
    addRecruit() {
      // this.sysRecruit.startTime = this.startTime;
      api.addByRecruit(this.sysRecruit).then(response => {
        // 提示语
        this.$message.success("添加招聘信息成功！");
        // 关闭弹框
        this.dialogVisible = false;
        // 刷新
        this.fetchData();
      })
    },
    // 保存或修改判断
    saveOrUpdate() {
      if (this.sysRecruit.id != null) {
        // 修改
        this.updateRecruit();
      } else {
        // 添加
        this.addRecruit();
      }

    },
    // 添加/修改弹框
    add() {
      this.sysRecruit = {};
      this.dialogVisible = true;
    },
    // 重置表单
    resetData() {
      // 1、清空条件搜索
      this.searchObj = {};
      // 2、清空日期
      this.createTimes = [];
      // 3、刷新数据
      this.fetchData();
    },
    // 刷新数据
    fetchData(page = 1) {
      this.page = page;
      if (this.createTimes && this.createTimes.length == 2) {
        this.searchObj.createTimeBegin = this.createTimes[0];
        this.searchObj.createTimeEnd = this.createTimes[1];
      }

      api.getPageList(this.page, this.limit, this.searchObj).then(
        response => {
          //this.list = response.data.list
          this.list = response.data.records;
          this.total = response.data.total;
          // 数据加载并绑定成功
          this.listLoading = false;
        }
      )
    }
  }
}
</script>

<style></style>