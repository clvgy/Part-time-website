<template>
  <div class="box">
    <h1>我的简历</h1>
    <!-- 工具条 -->
    <div class="tools-div">
      <span style="font-size:11px;color:#808080;">管理简历，求职第一步！</span><el-button type="success"
        icon="icon iconfont icon-add-role-copy" size="mini" @click="createResume()">&nbsp;创建简历</el-button>
    </div>
    <!-- 数据显示区 -->
    <div class="app-container">
      <el-table :data="list" v-loading="listLoading" style="width: 100%" height="250">
        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="简历标题" width="150">
        </el-table-column>
        <el-table-column prop="positionId" label="意向职位" width="120" :formatter="formatterPosition">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="120">
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-info" size="mini" @click="information(scope.row)" title="详情" />
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)" title="修改" />
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)" title="删除" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加或修改 -->
    <el-dialog :title="sysResume.title" :visible.sync="dialogVisible" width="40%">
      <el-form ref="dataForm" :model="sysResume" label-width="100px" size="small" style="padding-right: 40px;">
        <el-form-item label="真实姓名" prop="trueName">
          <el-input v-model="sysResume.trueName" disabled />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="sysResume.gender" disabled />
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-input v-model="sysResume.birthday" disabled />
        </el-form-item>
        <el-form-item label="户籍所在省" prop="regionId">
          <el-select v-model="sysResume.regionId" placeholder="请选择地区" disabled>
            <el-option v-for="item in regionList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        家庭地址：
        <el-form-item label="省" prop="province">
          <el-input v-model="sysResume.province" disabled />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="sysResume.city" disabled />
        </el-form-item>
        <el-form-item label="街道" prop="street">
          <el-input v-model="sysResume.street" disabled />
        </el-form-item>
        <el-form-item label="学校" prop="schoolId">
          <el-select v-model="sysResume.schoolId" placeholder="请选择学校" disabled>
            <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有无工作经验" prop="experience">
          <el-input v-model="sysResume.experience" disabled />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="sysResume.email" disabled />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="sysResume.phone" disabled />
        </el-form-item>
        <el-form-item label="自我介绍" prop="introduction">
          <el-input v-model="sysResume.introduction" disabled />
        </el-form-item>
        <el-form-item label="意向职位" prop="positionId">
          <el-select v-model="sysResume.positionId" placeholder="请选择职位" disabled>
            <el-option v-for="item in positionList" :key="item.id" :label="item.positionName"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期望薪资" prop="expectSalary">
          <el-input v-model="sysResume.expectSalary" disabled />
        </el-form-item>
        <el-form-item label="意向地区" prop="workRgonId">
          <el-select v-model="sysResume.workRgonId" placeholder="请选择地区" disabled>
            <el-option v-for="item in regionList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公开程度" prop="openness">
          <el-select v-model="sysResume.openness" placeholder="请选择公开程度" disabled>
            <el-option v-for="item in isList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="success" round><el-link type="default" :href="sysResume.resumeFileUrl" target="_blank">查看简历</el-link></el-button>
        <!-- <el-link type="primary" :href="sysResume.resumeFileUrl" target="_blank">已上传简历下载链接</el-link> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="dialogVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog :title="sysResume.title" :visible.sync="dialogReditVisible" width="40%">
      <el-form :ref="dataForm" :model="sysResume" label-width="100px" size="small" style="padding-right: 40px;">
        <el-form-item label="简历标题" prop="title">
          <el-input v-model="sysResume.title" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="trueName">
          <el-input v-model="sysResume.trueName" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="sysResume.gender" />
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker v-model="sysResume.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="户籍所在省" prop="regionId">
          <el-select v-model="sysResume.regionId" placeholder="请选择地区">
            <el-option v-for="item in regionList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        家庭地址：
        <el-form-item label="省" prop="province">
          <el-input v-model="sysResume.province" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="sysResume.city" />
        </el-form-item>
        <el-form-item label="街道" prop="street">
          <el-input v-model="sysResume.street" />
        </el-form-item>
        <el-form-item label="学校" prop="schoolId">
          <el-select v-model="sysResume.schoolId" placeholder="请选择学校">
            <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有无工作经验" prop="experience">
          <el-input v-model="sysResume.experience" />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="sysResume.email" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="sysResume.phone" />
        </el-form-item>
        <el-form-item label="自我介绍" prop="introduction">
          <el-input v-model="sysResume.introduction" />
        </el-form-item>
        <el-form-item label="意向职位" prop="positionId">
          <el-select v-model="sysResume.positionId" placeholder="请选择职位">
            <el-option v-for="item in positionList" :key="item.id" :label="item.positionName"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期望薪资" prop="expectSalary">
          <el-input v-model="sysResume.expectSalary" />
        </el-form-item>
        <el-form-item label="意向地区" prop="workRgonId">
          <el-select v-model="sysResume.workRgonId" placeholder="请选择地区">
            <el-option v-for="item in regionList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公开程度" prop="openness">
          <el-select v-model="sysResume.openness" placeholder="请选择公开程度">
            <el-option v-for="item in isList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简历文件上传" prop="resumeFileUrl">
          <el-upload class="upload-demo" name="uploadImage" drag
            action="http://localhost:8085/admin/system/upload/uploadImage" multiple :limit="1" :on-success="handleSuccess"
            :before-upload="handleBeforeUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogReditVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="update()" size="small">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 添加 -->
    <el-dialog :title="sysResume.title" :visible.sync="dialogAddVisible" width="40%">
      <el-form :ref="adddataForm" :rules="rules" :model="sysResume" label-width="100px" size="small"
        style="padding-right: 40px;">
        <el-form-item label="简历标题" prop="title">
          <el-input v-model="sysResume.title" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="trueName">
          <el-input v-model="sysResume.trueName" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <!-- <el-input v-model="sysResume.gender" /> -->
          <el-select v-model="sysResume.gender" placeholder="请选择地区">
            <el-option v-for="item in genderList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker v-model="sysResume.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
          </el-date-picker>
          <!-- <el-input v-model="sysResume.birthday" /> -->
        </el-form-item>
        <el-form-item label="户籍所在省" prop="regionId">
          <el-select v-model="sysResume.regionId" placeholder="请选择地区">
            <el-option v-for="item in regionList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        家庭地址：
        <el-form-item label="省" prop="province">
          <el-input v-model="sysResume.province" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="sysResume.city" />
        </el-form-item>
        <el-form-item label="街道" prop="street">
          <el-input v-model="sysResume.street" />
        </el-form-item>
        <el-form-item label="学校" prop="schoolId">
          <el-select v-model="sysResume.schoolId" placeholder="请选择学校">
            <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有无工作经验" prop="experience">
          <el-input v-model="sysResume.experience" />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="sysResume.email" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="sysResume.phone" />
        </el-form-item>
        <el-form-item label="自我介绍" prop="introduction">
          <el-input v-model="sysResume.introduction" />
        </el-form-item>
        <el-form-item label="意向职位" prop="positionId">
          <el-select v-model="sysResume.positionId" placeholder="请选择职位">
            <el-option v-for="item in positionList" :key="item.id" :label="item.positionName"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期望薪资" prop="expectSalary">
          <el-input v-model="sysResume.expectSalary" />
        </el-form-item>
        <el-form-item label="意向地区" prop="workRgonId">
          <el-select v-model="sysResume.workRgonId" placeholder="请选择地区">
            <el-option v-for="item in regionList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公开程度" prop="openness">
          <el-select v-model="sysResume.openness" placeholder="请选择公开程度">
            <el-option v-for="item in isList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简历文件上传" prop="resumeFileUrl">

          <el-upload class="upload-demo" name="uploadImage" drag
            action="http://localhost:8085/admin/system/upload/uploadImage" multiple :limit="1" :on-success="handleSuccess"
            :before-upload="handleBeforeUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="add(dataForm)" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
const defaultForm = {
  id: '',
  userId: '',
  trueName: '',
  gender: '',
  birthday: '',
  regionId: '',
  province: '',
  city: '',
  street: '',
  schoolId: '',
  experience: '',
  email: '',
  phone: '',
  introduction: '',
  title: '',
  positionId: '',
  expectSalary: '',
  workRgonId: '',
  openness: '',
  resumeFileUrl: '',
  isDeleted: 0,
}
export default {
  data() {
    //自定义邮箱验证
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/;
      if (regEmail.test(value)) {
        return callback;
      } else {
        callback(new Error("请输入合法邮箱!"))
      }
    };
    //自定义手机验证
    var checkPhone = (rule, value, callback) => {
      const regEmail = /^1[3|4|5|7|8|9][0-9]{9}$/;
      if (!Number.isInteger(+value)) {
        callback(new Error("请输入数字值!"))
      } else {
        if (regEmail.test(value)) {
          return callback;
        } else {
          callback(new Error("电话号码格式不正确!"))
        }
      }
    };
    return {
      listLoading: true, // 数据是否正在加载
      list: [], // 数据列表
      userid: '',

      positionList: {},
      regionList: {},
      schoolList: {},
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
      genderList: [
        {
          id: '男',
          name: '男'
        },
        {
          id: '女',
          name: '女'
        }
      ],
      dialogVisible: false,
      dialogReditVisible: false,
      dialogAddVisible: false,


      sysResume: defaultForm,
      dataForm: defaultForm,
      adddataForm: defaultForm,
      rules: {
        trueName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birthday: [
          { required: true, message: '请选择生日', trigger: 'change' }
        ],
        regionId: [
          { required: true, message: '请选择地区', trigger: 'change' }
        ],
        province: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        street: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        schoolId: [
          { required: true, message: '请选择院校', trigger: 'change' }
        ],
        experience: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        phone:  [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        // introduction: '',
        title: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        positionId: [
          { required: true, message: '请选择职位', trigger: 'change' }
        ],
        expectSalary: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        workRgonId: [
          { required: true, message: '请选择意向地区', trigger: 'change' }
        ],
        openness: [
          { required: true, message: '请选择是否公开', trigger: 'change' }
        ],
        // resumeFileUrl: '',
      },
      saveBtnDisabled: false,
      selectValueIds: [],
      ids: [],
      user: '',
      users: {},
    }
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem("userId"));
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getpositionList();
    this.getRegionList();
    this.getSchoolList();
    this.fetchData();
  },
  methods: {
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            // alert(this.sysResume.id)
            .post("http://localhost:8085/user/system/addResume", { sysResume: this.sysResume })
            .then(res => {
              this.$message({
                type: "info",
                message: "添加成功",
                duration: 6000,
              });
              this.fetchData();
              this.dialogAddVisible = false;
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "添加失败",
                duration: 6000,
              });
            });
        } else {
          this.$message({
            type: "info",
            message: "有内容没有输入!",
            duration: 6000,
          });
          return false;
        }
      });
    },
    createResume() {
      this.dataForm = defaultForm;
      this.sysResume = defaultForm;
      this.sysResume.userId = this.userId;
      this.dialogAddVisible = true;
    },
    update() {
      // console.log(this.sysResume);
      this.$axios
        // alert(this.sysResume.id)

        .post("http://localhost:8085/user/system/updateResume", { sysResume: this.sysResume })
        .then(res => {
          this.$message({
            type: "info",
            message: "修改成功",
            duration: 6000,
          });
          this.fetchData();
          this.dialogReditVisible = false;
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "修改失败",
            duration: 6000,
          });
        });
    },
    //图片上传成功的钩子函数
    handleSuccess(res, file) {
      this.loading = false;
      // alert(file.response)
      if (file.response != "") {
        this.sysResume.resumeFileUrl = file.response;
        this.$message({
          type: "info",
          message: "文件上传成功",
          duration: 6000,
        });
      } else {
        this.$message({
          type: "info",
          message: "文件上传失败",
          duration: 6000,
        });
      }
    },


    //文件开始上传,开始屏幕遮罩
    handleBeforeUpload() {
      this.loading = true;
    },
    // 根据id去删除一个角色
    removeDataById(id) {
      this.$confirm('此操作将永久删除该简历, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeById(id);
        // a.给出提示
        this.$message({
          type: 'success',
          message: '删除成功!'
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    removeById(id) {
      this.$axios
        .delete("http://localhost:8085/user/system/removeResume", { params: { id: id } })
        .then(res => {
          this.fetchData();
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    formatterPosition(rows, colum) {
      for (var i = 0; i < this.positionList.length; i++) {
        if (rows.positionId == this.positionList[i].id) {
          return this.positionList[i].positionName;
        }
      }
    },
    // 根据id进行查询回显
    edit(row) {
      // console.log(row);
      // 将row中数据赋给sysRole进行回显
      this.sysResume = row;
      // 打开弹框
      this.dialogReditVisible = true;
    },
    // 根据id进行查询回显
    information(row) {

      // console.log(row);
      // 将row中数据赋给sysRole进行回显
      this.sysResume = row;
      // 打开弹框
      this.dialogVisible = true;
    },
    // 刷新数据
    fetchData() {
      this.getResumeList();
    },
    getRegionList() {
      this.$axios
        .get("http://localhost:8085/user/system/regionList", {})
        .then(res => {
          console.log(res.data.data);
          this.regionList = res.data.data;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    getpositionList() {
      this.$axios
        .get("http://localhost:8085/user/system/positionList", {})
        .then(res => {
          this.positionList = res.data.data;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    getSchoolList() {
      this.$axios
        .get("http://localhost:8085/user/system/schoolList", {})
        .then(res => {
          this.schoolList = res.data.data;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    getResumeList() {
      this.$axios
        .get("http://localhost:8085/user/system/findAll", { params: { username: this.user } })
        .then(res => {
          // console.log(res.data);
          this.list = res.data.data;
          // 数据加载并绑定成功
          this.listLoading = false;

        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
  }
}
</script>

<style>
.box{
  padding: 50px;
}
</style>