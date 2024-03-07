<template>
    <div>
        <!-- 搜索 -->
        <div class="search-div">
            <el-form label-width="70px" size="small">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="关 键 字">
                            <el-input style="width: 95%" v-model="searchObj.keyword" placeholder="职位名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="操作时间">
                            <el-date-picker v-model="createTimes" type="datetimerange" range-separator="至"
                                start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"
                                style="margin-right: 10px;width: 100%;" />
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

                <el-table-column prop="posTypeId" label="职位类别编号" :formatter="formatterPosType" width="110" />
                <el-table-column prop="positionName" label="职位名称" width="110" />
                <el-table-column prop="isHot" label="是否热门职位" :formatter="formatterHot" />
                <el-table-column prop="createTime" label="创建时间" />

                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)" title="修改" />
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)"
                            title="删除" />
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页组件 -->
        <el-pagination :current-page="page" :total="total" :page-size="limit" style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper" @current-change="fetchData" />
        <!-- 添加或修改 -->
        <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
            <el-form ref="dataForm" :model="sysPosition" label-width="100px" size="small" style="padding-right: 40px;">
                <el-form-item label="职位类别" prop="posTypeId">
                    <el-select v-model="sysPosition.posTypeId" placeholder="请选择职位类别">
                        <el-option v-for="item in posTypeList" :key="item.id" :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位名称" prop="positionName">
                    <el-input v-model="sysPosition.positionName" />
                </el-form-item>
                <el-form-item label="是否热门职业" prop="isHot">
                    <el-select v-model="sysPosition.isHot" placeholder="请选择">
                        <el-option v-for="item in isHotList" :key="item.id" :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
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
import api from '@/api/position/position.js'
import posTypeApi from '@/api/postype/postype.js'
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
            // sysUser: {},
            sysPosition: {},
            saveBtnDisabled: false,
            selectValueIds: [],
            ids: [],

            posTypeList:{},

            isHotList:[
                {
                    id:1,
                    name:'是'
                },
                {
                    id:0,
                    name:'否'
                }
            ]


        }
    },
    created() {
        posTypeApi.findAll().then(res=>{
                this.posTypeList = res.data;
            })
        this.fetchData();
    },
    methods: {
        formatterPosType(rows,colum){
            for(var i = 0;i<this.posTypeList.length;i++){
                if(rows.posTypeId==this.posTypeList[i].id){
                    return this.posTypeList[i].name;
                }
            }
        },

        formatterHot(rows,colum){
            if(rows.isHot==1){
                return '是'
            }
            if(rows.isHot==0){
                return '否'
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

            this.$confirm('此操作将永久删除这些职位, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                api.deleteBatchPositionByIds(ids).then(response => {
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
            this.$confirm('此操作将永久删除该职位, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                api.deletePositionById(id).then(response => {
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
            this.sysPosition = {};
            this.dialogVisible = false;
            this.fetchData();
        },

        // 更新用户
        updatePosition() {
            api.updateByPosition(this.sysPosition).then(response => {
                this.sysPosition = {};
                // 给出提示框
                this.$message.success("修改职位成功");
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
            this.sysPosition = row;
            // 打开弹框
            this.dialogVisible = true;
        },

        // 添加用户
        addPosition() {
            api.addByPosition(this.sysPosition).then(response => {
                // 提示语
                this.$message.success("添加职位成功！");
                // 关闭弹框
                this.dialogVisible = false;
                // 刷新
                this.fetchData();
            })
        },

        // 保存或修改判断
        saveOrUpdate() {
            if (this.sysPosition.id != null) {
                // 修改
                this.updatePosition();
            } else {
                // 添加
                this.addPosition();
            }

        },
        // 添加/修改弹框
        add() {
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