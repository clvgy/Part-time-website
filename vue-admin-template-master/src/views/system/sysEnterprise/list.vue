<template>
  <div>
    <!-- 搜索 -->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input style="width: 95%" v-model="searchObj.keyword" placeholder="企业名称/行业/地址/负责人名字/负责人电话"></el-input>
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
        <el-table-column prop="userId" label="使用账号" width="110" :formatter="formatterUsername" />
        <el-table-column prop="ename" label="企业名称" width="110" />
        <el-table-column prop="eindustry" label="所处行业" width="110" />
        <el-table-column prop="eaddress" label="地址" width="180" />
        <el-table-column prop="eintroduce" label="企业简介" width="180" />
        <el-table-column prop="edutyname" label="负责人名字" width="110" />
        <el-table-column prop="edutyphone" label="负责人电话" width="110" />
        <el-table-column prop="ephonenum" label="座机号" width="110" />
        <el-table-column prop="eemail" label="电子邮箱" width="180" />
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <!-- {{ scope.row.status }} -->
            <el-switch v-model="scope.row.status" @change="switchStatus(scope.row)" active-color="#13ce66"
              inactive-color="#ff4949" :active-value="1" :inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
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
      <el-form ref="dataForm" :model="sysEnterprise" label-width="100px" size="small" style="padding-right: 40px;">

        <el-form-item label="使用账号" prop="userId">
          <el-select v-model="sysEnterprise.userId" placeholder="请选择用户">
            <el-option v-for="item in users" :key="item.id" :label="item.username" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业名称" prop="ename">
          <el-input v-model="sysEnterprise.ename" />
        </el-form-item>

        <el-form-item label="所处行业" prop="eindustry">
          <el-input v-model="sysEnterprise.eindustry" />
        </el-form-item>

        <el-form-item label="地址" prop="eaddress">
          <el-input v-model="sysEnterprise.eaddress" />
        </el-form-item>

        <el-form-item label="企业简历" prop="eintroduce">
          <el-input v-model="sysEnterprise.eintroduce" />
        </el-form-item>

        <el-form-item label="负责人名字" prop="edutyname">
          <el-input v-model="sysEnterprise.edutyname" />
        </el-form-item>

        <el-form-item label="负责人电话" prop="edutyphone">
          <el-input v-model="sysEnterprise.edutyphone" />
        </el-form-item>

        <el-form-item label="座机号" prop="ephonenum">
          <el-input v-model="sysEnterprise.ephonenum" />
        </el-form-item>

        <el-form-item label="电子邮箱" prop="eemail">
          <el-input v-model="sysEnterprise.eemail" />
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
import api from '@/api/enterprise/enterprise.js'

import userApi from '@/api/user/user.js'

const defaultForm = {
  id: '',
  userId: '',
  ename: '',
  eindustry: '',
  eaddress: '',
  eintroduce:'',
  edutyname: '',
  edutyphone: '',
  ephonenum: '',
  eemail: '',
  status: 1,
  createTime: '',
  updateTime: ''
}
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

      sysEnterprise: defaultForm,
      saveBtnDisabled: false,
      selectValueIds: [],
      ids: [],

      users: {},
    }
  },
  created() {
    userApi.findAllEnterpriseUser().then(res => {
      this.users = res.data;
    });
    console.log(this.users);
    this.fetchData();

  },
  methods: {
    formatterUsername(rows, colum) {
      for (var i = 0; i < this.users.length; i++) {
        if (rows.userId == this.users[i].id) {
          return this.users[i].username;
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

      this.$confirm('此操作将永久删除这些企业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        api.deleteBatchEnterpriseByIds(ids).then(response => {
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
      this.$confirm('此操作将永久删除该企业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        api.deleteEnterpriseById(id).then(response => {
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
      this.sysEnterprise = defaultForm;
      this.dialogVisible = false;
      this.fetchData();
    },
    // 更新
    updateEnterprise() {
      api.updateEnterprise(this.sysEnterprise).then(response => {
        this.sysEnterprise = defaultForm;
        // 给出提示框
        this.$message.success("修改用户成功");
        // 关闭添加/修改框
        this.dialogVisible = false;
        // 刷新列表
        this.fetchData();
      })
    },


    // 根据id进行查询回显
    edit(row) {

      // console.log("11111"+row);
      // alert(row.ename)
      // 将row中数据赋给sysRole进行回显
      this.sysEnterprise = row;
      // 打开弹框
      // alert(this.SysEnterprise.ename)
      this.dialogVisible = true;
    },
    // 添加
    addEnterprise() {
      api.saveEnterprise(this.sysEnterprise).then(response => {
        // 提示语
        this.$message.success("添加用户成功！");
        // 关闭弹框
        this.dialogVisible = false;
        // 刷新
        this.fetchData();
      })
    },
    // 保存或修改判断
    saveOrUpdate() {
      if (this.sysEnterprise.id != null && this.sysEnterprise.id != '') {
        // alert(this.sysEnterprise.id)
        // 修改
        this.updateEnterprise();
      } else {
        // 添加
        this.addEnterprise();
      }

    },
    // 添加/修改用户弹框
    add() {
      this.dialogVisible = true;
    },

    // Switch 开关
    switchStatus(row) {

      let text = row.status === 1 ? '启用' : '停用';
      console.log(text);

      this.$confirm('确认要' + text + row.username + '吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        api.changeStatus(row.id, row.status).then(response => {
          // a.给出提示
          this.$message({
            type: 'success',
            message: text + '' + row.username + '成功!'
          });
          this.fetchData();
        })
      }).catch(() => {
        row.status = row.status === 0 ? 1 : 0;
      });

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

      api.getEnterprisePageInfo(this.page, this.limit, this.searchObj).then(
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