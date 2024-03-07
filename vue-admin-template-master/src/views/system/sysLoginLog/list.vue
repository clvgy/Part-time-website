<template>
    <div>
        <!-- 搜索 -->
        <div class="search-div">
            <el-form label-width="70px" size="small">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="关 键 字">
                            <el-input style="width: 95%" v-model="searchObj.username" placeholder="登录账号"></el-input>
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

                <el-table-column prop="username" label="登录账号" width="180" />
                <el-table-column prop="ipaddr" label="登录ip地址" width="110" />
                <el-table-column prop="status" label="状态" width="110" />
                <el-table-column prop="msg" label="提示信息" />
                <el-table-column prop="createTime" label="创建时间" />

                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)"
                            title="删除" />
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页组件 -->
        <el-pagination :current-page="page" :total="total" :page-size="limit" style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper" @current-change="fetchData" />
    </div>
</template>

<script>
import api from '@/api/loginlog/loginlog';
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


            selectValueIds: [],
            ids: [],
        }
    },
    created() {
        this.fetchData();
    },
    methods: {

        // 批量删除的实现
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

            this.$confirm('此操作将永久删除这些角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                api.deleteBatchIds(ids).then(response => {
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
            this.$confirm('此操作将永久删除该日志, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // alert(1)
                api.deleteById(id).then(response => {
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