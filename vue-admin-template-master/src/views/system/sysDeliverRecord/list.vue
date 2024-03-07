<template>
    <div>

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

                <el-table-column prop="resumeId" label="简历投递人" width="180" :formatter="formatterResume" />
                <el-table-column prop="recruitId" label="招聘信息编号" width="110" :formatter="formatterRecruit" />
                <el-table-column prop="enterpriseId" label="企业" :formatter="formatterEnterprise" />
                <el-table-column prop="createTime" label="创建时间" />

                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="warning" icon="el-icon-baseball" size="mini" @click="showResume(scope.row)"
                            title="查看简历" />
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页组件 -->
        <el-pagination :current-page="page" :total="total" :page-size="limit" style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper" @current-change="fetchData" />

        <!-- 分配角色 -->
        <el-dialog title="简历" :visible.sync="dialogResumeVisible">
            <el-form label-width="80px">
                <el-form-item label="用户名">
                    <el-input readonly="true" :value="sysResume.trueName"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input readonly="true" :value="sysResume.gender"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-input readonly="true" :value="sysResume.birthday"></el-input>
                </el-form-item>
                <el-form-item label="地区编号">
                    <el-input readonly="true" :value="sysResume.regionId"></el-input>
                </el-form-item>
                <el-form-item label="省份">
                    <el-input readonly="true" :value="sysResume.province"></el-input>
                </el-form-item>
                <el-form-item label="城市">
                    <el-input readonly="true" :value="sysResume.city"></el-input>
                </el-form-item>
                <el-form-item label="街道">
                    <el-input readonly="true" :value="sysResume.street"></el-input>
                </el-form-item>
                <el-form-item label="学校">
                    <el-input readonly="true" :value="sysResume.schoolId"></el-input>
                </el-form-item>
                <el-form-item label="有无工作经验">
                    <el-input readonly="true" :value="sysResume.experience"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input readonly="true" :value="sysResume.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input readonly="true" :value="sysResume.phone"></el-input>
                </el-form-item>

                <el-form-item label="自我介绍">
                    <el-input readonly="true" :value="sysResume.introduction"></el-input>
                </el-form-item>
                <el-form-item label="职位编号">
                    <el-input readonly="true" :value="sysResume.positionId"></el-input>
                </el-form-item>
                <el-form-item label="期望薪资">
                    <el-input readonly="true" :value="sysResume.expectSalary"></el-input>
                </el-form-item>
                <el-form-item label="意向地区编号">
                    <el-input readonly="true" :value="sysResume.workRgonId"></el-input>
                </el-form-item>
                <!-- <el-form-item label="简历文件地址">
                    <el-input readonly="true" :value="sysResume.resumeFileUrl"></el-input>
                </el-form-item> -->
                <el-link type="primary" :href="sysResume.resumeFileUrl" target="_blank">简历下载链接</el-link>


            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="dialogRoleVisible = false" size="small">确定</el-button>
                <el-button @click="dialogRoleVisible = false" size="small">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from '@/api/deliverrecord/deliverrecord.js'
import recruitApi from '@/api/recruit/recruit.js'
import resumeApi from '@/api/resume/resume.js'
import enterpriseApi from '@/api/enterprise/enterprise.js'
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

            enterpriseList: {},
            recruitList: {},
            resumeList: {},

            sysResume: {},
            dialogResumeVisible: false,
        }
    },
    created() {
        enterpriseApi.findAll().then(res => {
            this.enterpriseList = res.data;
        });
        recruitApi.findAll().then(res => {
            this.recruitList = res.data;
        });
        resumeApi.findAll().then(res => {
            this.resumeList = res.data;
        });
        this.fetchData();
    },
    methods: {
        showResume(row) {
            resumeApi.findByid(row.resumeId).then(
                res => {
                    this.sysResume = res.data;
                }
            )
            this.dialogResumeVisible=true;
        },
        formatterEnterprise(rows, colum) {
            for (var i = 0; i < this.enterpriseList.length; i++) {
                if (rows.enterpriseId == this.enterpriseList[i].id) {
                    return this.enterpriseList[i].ename;
                }
            }
        },
        formatterRecruit(rows, colum) {
            for (var i = 0; i < this.recruitList.length; i++) {
                if (rows.recruitId == this.recruitList[i].id) {
                    return this.recruitList[i].recruitTitle;
                }
            }
        },
        formatterResume(rows, colum) {
            // alert(this.resumeList[0].id)
            for (var i = 0; i < this.resumeList.length; i++) {
                if (rows.resumeId == this.resumeList[i].id) {
                    // alert(this.resumeList[0].trueName)
                    return this.resumeList[i].trueName;
                }
            }
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