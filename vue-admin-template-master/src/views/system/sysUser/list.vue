<template>
  <div>
    <!-- 搜索 -->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input style="width: 95%" v-model="searchObj.keyword" placeholder="用户名/姓名/手机号码"></el-input>
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

        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="phone" label="手机" />
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
            <el-button type="warning" icon="el-icon-baseball" size="mini" @click="showAssignRole(scope.row)" title="分配角色"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <el-pagination :current-page="page" :total="total" :page-size="limit" style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper" @current-change="fetchData" />
    <!-- 添加或修改 -->
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form ref="dataForm" :model="sysUser" label-width="100px" size="small" style="padding-right: 40px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="sysUser.username" />
        </el-form-item>
        <el-form-item v-if="!sysUser.id" label="密码" prop="password">
          <el-input v-model="sysUser.password" type="password" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="sysUser.phone" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="saveOrUpdate()" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogRoleVisible">
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input disabled :value="sysUser.username"></el-input>
        </el-form-item>

        <el-form-item label="角色列表">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="userRoleIds" @change="handleCheckedChange">
            <el-checkbox v-for="role in allRoles" :key="role.id" :label="role.id">{{role.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="assignRole" size="small">保存</el-button>
        <el-button @click="dialogRoleVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import api from '@/api/user/user.js'
import roleApi from '@/api/role/role.js'
const defaultForm = {
  id:'',
  username:'',
  password:'',
  phone:'',
  status: 1
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
      sysUser: defaultForm,
      saveBtnDisabled: false,
      selectValueIds: [],
      ids: [],


      // 角色分配
      dialogRoleVisible:false, //角色弹框显示
      allRoles: [], // 所有角色列表
      userRoleIds: [], // 用户的角色ID的列表
      isIndeterminate: false, // 是否是不确定的
      checkAll: false // 是否全选
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 权限分配弹框
    showAssignRole(row){
      this.sysUser=row;
      this.dialogRoleVisible=true;
      this.dialogRoleVisible = true
       roleApi.getRolesByUserId(row.id).then(response => {
        this.allRoles = response.data.allRoles
        this.userRoleIds = response.data.userRoleIds
        this.checkAll = this.userRoleIds.length===this.allRoles.length
        this.isIndeterminate = this.userRoleIds.length>0 && this.userRoleIds.length<this.allRoles.length
      })
    },
    /*
    全选勾选状态发生改变的监听
    */
    handleCheckAllChange (value) {// value 当前勾选状态true/false
      // 如果当前全选, userRoleIds就是所有角色id的数组, 否则是空数组
      this.userRoleIds = value ? this.allRoles.map(item => item.id) : []
      // 如果当前不是全选也不全不选时, 指定为false
      this.isIndeterminate = false
    },

    /*
    角色列表选中项发生改变的监听
    */
    handleCheckedChange (value) {
      const {userRoleIds, allRoles} = this
      this.checkAll = userRoleIds.length === allRoles.length && allRoles.length>0
      this.isIndeterminate = userRoleIds.length>0 && userRoleIds.length<allRoles.length
    },

    //分配角色
    assignRole () {
      let assginRoleVo = {
        userId: this.sysUser.id,
        roleIdList: this.userRoleIds
      }
      roleApi.assignRoles(assginRoleVo).then(response => {
        this.$message.success(response.message || '分配角色成功')
        this.dialogRoleVisible = false
        this.fetchData(this.page)
      })
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

      this.$confirm('此操作将永久删除这些用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        api.deleteBatchUserByIds(ids).then(response => {
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
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        api.deleteUserById(id).then(response => {
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
      this.dialogVisible = false;
      this.sysUser=defaultForm;
      this.fetchData();
    },
    // 更新用户
    updateUser() {
      api.updateUser(this.sysUser).then(response => {
        this.sysUser=defaultForm;
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

      // console.log(row);
      // 将row中数据赋给sysRole进行回显
      this.sysUser = row;
      // 打开弹框
      this.dialogVisible = true;
    },

    // 添加用户
    addUser() {
      // alert(1)
      api.saveUser(this.sysUser).then(response => {
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
      console.log(this.sysUser.id);
      if (this.sysUser.id != null && this.sysUser.id!='') {
        // 修改
        this.updateUser();
      } else {
        // 添加
        this.addUser();
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

      this.$confirm('确认要' + text  + row.username + '吗?', '警告', {
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

      api.getUserPageInfo(this.page, this.limit, this.searchObj).then(
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