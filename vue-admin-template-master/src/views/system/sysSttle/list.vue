<template>
    <div>
        <!--查询表单-->
        <div class="search-div">
            <el-form label-width="70px" size="small">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="角色名称">
                            <el-input style="width: 100%" v-model="searchObj.roleName" placeholder="角色名称"
                                clearable></el-input>
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

        <el-table v-loading="listLoading" :data="list" stripe border style="width: 100%;margin-top: 10px;"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column label="序号" width="70" align="center">
                <template slot-scope="scope">
                    {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column prop="name" label="结算类型名称" />
            <el-table-column prop="createTime" label="创建时间" width="160" />
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <!-- {{scope.row}} -->
                    <!-- <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)" title="修改" /> -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)" title="修改" />
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)"
                        title="删除" />
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination :current-page="page" :total="total" :page-size="limit" style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper" @current-change="fetchData" />
        <!-- 添加/修改弹框 -->
        <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
            <el-form ref="dataForm" :model="sysSttle" label-width="150px" size="small" style="padding-right: 40px;">
                <el-form-item label="结算类型名称">
                    <el-input v-model="sysSttle.name" />
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
import api from '@/api/sttle/sttle.js'
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
            sysSttle: {},
            saveBtnDisabled: false,
            selectValueIds: [],
            ids: [],
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        // 取消
        cancel() {
            this.dialogVisible = false;
            this.fetchData();
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

            this.$confirm('此操作将永久删除这些结算类型, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                api.deleteBatchSttleByIds(ids).then(response => {
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

        // 根据id去删除一个角色
        removeDataById(id) {
            this.$confirm('此操作将永久删除该结算类型, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                api.deleteSttleById(id).then(response => {
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
        // 保存或修改
        saveOrUpdate() {
            if (this.sysSttle.id != null) {
                // 修改
                this.updateSttle();
            } else {
                // 添加
                this.addSttle();
            }

        },
        // 根据id进行查询回显
        edit(row) {

            // console.log(row);
            // 将row中数据赋给sysRole进行回显
            this.sysSttle = row;
            // 打开弹框
            this.dialogVisible = true;
        },
        addSttle() {
            api.addBySttle(this.sysSttle).then(response => {
                // 给出提示框
                this.$message.success("添加成功")
                // 关闭
                this.dialogVisible = false;
                // 刷新
                this.fetchData();
            })
        },
        updateSttle() {

            api.updateBySttle(this.sysSttle).then(response => {
                // 给出提示框
                this.$message.success("修改成功");
                // 关闭添加/修改框
                this.dialogVisible = false;
                // 刷新列表
                this.fetchData();
            })
        },
        // 添加功能的弹框
        add() {
            // 清空表单之前的数据
            this.sysSttle = {};

            this.dialogVisible = true;
        },
        // 重置功能
        resetData() {
            //a. 清空 搜索条件
            this.searchObj = {};
            // 
            //b.再次刷新列表
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