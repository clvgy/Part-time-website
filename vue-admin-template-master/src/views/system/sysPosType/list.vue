<template>
    <div>
        <!-- 搜索 -->
        <div class="search-div">
            <el-form label-width="70px" size="small">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="关 键 字">
                            <el-input style="width: 95%" v-model="searchObj.keyword" placeholder="地区"></el-input>
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


        <el-table v-loading="listLoading" :data="list" stripe border style="width: 100%;margin-top: 10px;"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column label="序号" width="70" align="center">
                <template slot-scope="scope">
                    {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column prop="name" label="职位分类名称" />
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
            <el-form ref="dataForm" :model="sysPosType" label-width="150px" size="small" style="padding-right: 40px;">
                <el-form-item label="职位分类名称">
                    <el-input v-model="sysPosType.name" />
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

import api from '@/api/postype/postype.js'
export default {
    data() {
        return {
            // 定义table的数据源
            list: [],
            // 菊花显示
            listLoading: true,

            // 总记录数
            total: 0,
            // 当前页码
            page: 1,
            // 每次显示2条
            limit: 10,
            // 查询条件
            searchObj: {},

            // 弹框的控制属性
            dialogVisible: false,
            // 角色信息 对象
            sysPosType: {},
            // 封装id数组
            selectValueIds: [],
            // ids
            ids: [],

        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        // 取消
        cancel() {
            this.sysPosType={};
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

            this.$confirm('此操作将永久删除这些分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                api.deleteBatchPosTypeByIds(ids).then(response => {
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
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                api.deletePosTypeById(id).then(response => {
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
            if (this.sysPosType.id != null) {
                // 修改
                this.updatePosType();
            } else {
                // 添加
                this.addPosType();
            }

        },

        // 根据id进行查询回显
        edit(row) {

            // console.log(row);
            // 将row中数据赋给sysRole进行回显
            this.sysPosType = row;
            // 打开弹框
            this.dialogVisible = true;
        },

        addPosType() {
            api.addByPosType(this.sysPosType).then(response => {
                // 给出提示框
                this.$message.success("添加成功")
                // 关闭
                this.dialogVisible = false;
                // 刷新
                this.fetchData();
            })
        },

        updatePosType() {

            api.updateByPosType(this.sysPosType).then(response => {
                this.sysRegion={};
                // 给出提示框
                this.$message.success("修改地区成功");
                // 关闭添加/修改框
                this.dialogVisible = false;
                // 刷新列表
                this.fetchData();
            })
        },

        // 添加功能的弹框
        add() {
            // 清空表单之前的数据
            this.sysPosType = {};

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
        fetchData(page = 1) {
            this.page = page;
            api.getPageList(this.page, this.limit, this.searchObj).then(response => {
                // 延迟 
                this.listLoading = false;
                this.list = response.data.records;
                this.total = response.data.total;
            })
        }
    }
}
</script>

<style></style>