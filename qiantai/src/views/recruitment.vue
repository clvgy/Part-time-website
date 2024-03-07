<template>
    <div>
        <el-divider></el-divider>
        <el-card>
            <div style="padding: 14px">
                <el-form :inline="true" :model="searchObject" class="user-search">
                    <!-- <el-form-item label="">
                        <el-input size="small" v-model="searchObject.timumingcheng"
                            placeholder="输入题目名称"></el-input>
                        </el-form-item> -->
                    <el-form-item styxlexulxie2 prop="enterpriseId">
                        <el-select size="small" filterable v-model="searchObject.enterpriseId" placeholder="请选择公司">
                            <el-option v-for="item in enterpriseList" :key="item.id" :label="item.ename"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item styxlexulxie2 prop="positionId">
                        <el-select size="small" filterable v-model="searchObject.positionId" placeholder="请选择职位">
                            <el-option v-for="item in positionList" :key="item.id" :label="item.positionName"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item styxlexulxie2 prop="regionId">
                        <el-select size="small" filterable v-model="searchObject.regionId" placeholder="请选择地区">
                            <el-option v-for="item in regionList" :key="item.id" :label="item.regionName"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item styxlexulxie3 prop="timuleixing"><el-select size="small" v-model="formInline.timuleixing"
                            placeholder="请选择题目类型"><el-option selected label="请选择题目类型" value=""></el-option><el-option
                                label="简答" value="简答"></el-option><el-option label="单选" value="单选"></el-option><el-option
                                label="不定项" value="不定项"></el-option><el-option label="填空" value="填空"></el-option><el-option
                                label="编程" value="编程"></el-option><el-option label="面经"
                                value="面经"></el-option></el-select></el-form-item>
                    <el-form-item styxlexulxie4 prop="timunandu"><el-select size="small" v-model="formInline.timunandu"
                            placeholder="请选择题目难度"><el-option selected label="请选择题目难度" value=""></el-option><el-option
                                label="简单" value="简单"></el-option><el-option label="中等" value="中等"></el-option><el-option
                                label="困难" value="困难"></el-option></el-select></el-form-item> -->

                    <el-form-item>
                        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    </el-form-item>
                </el-form>
                <!-- <h3>职位：</h3> -->
                <!-- <div v-for="item in positionList" :key="item.id">
                    <ul style="float:left">
                        <li>
                            <div style="padding: 14px;">
                                <el-link type="default" @click="qurey(item.id)">{{ item.positionName }}</el-link>
                            </div>
                        </li>
                    </ul>
                </div> -->
            </div>
        </el-card>
        <!-- <el-divider></el-divider>
        <el-card>
            <div style="padding: 14px">
                <h3>地区：</h3>
                <div v-for="item in regionList" :key="item.id">
                    <ul style="float:left">
                        <li>
                            <div style="padding: 14px;">
                                <el-link type="default" @click="qurey(item.id)">{{ item.regionName }}</el-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </el-card> -->
        <!-- <el-divider></el-divider> -->
        <el-card>
            <h2>招聘信息:</h2>
            <!-- <el-divider></el-divider> -->
            <div v-for="item in recriutList" :key="item.id">
                <el-divider></el-divider>
                <el-descriptions class="margin-top" :title='item.recruitTitle' :column="3" :size="size" border>
                    <template slot="extra">
                        <el-button type="primary" size="small" @click="submit(item.id)">查看详情</el-button>
                    </template>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            公司名
                        </template>
                        <div v-for="item1 in enterpriseList" :key="item1.id">
                            <div v-if="item.enterpriseId == item1.id">{{ item1.ename }}</div>
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            联系人
                        </template>
                        {{ item.contatPeople }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-mobile-phone"></i>
                            联系电话
                        </template>
                        {{ item.contactPhone }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="icon iconfont icon-youxiang"></i>
                            联系邮箱
                        </template>
                        {{ item.email }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-location-outline"></i>
                            工作地
                        </template>
                        {{ item.workPlace }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-tickets"></i>
                            备注
                        </template>
                        <el-tag size="small">{{ item.posMemo }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            职位
                        </template>
                        <div v-for="item1 in positionList" :key="item1.id">
                            <div v-if="item.positionId == item1.id">{{ item1.positionName }}</div>
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="icon iconfont icon-xinzi_icon"></i>
                            薪资
                        </template>
                        {{ item.salary }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="icon iconfont icon-jiesuandanwei"></i>
                            结算单位
                        </template>
                        <div v-for="item1 in settleList" :key="item1.id">
                            <div v-if="item.settleId == item1.id">{{ item1.name }}</div>
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="icon iconfont icon-fabuxuqiu"></i>
                            职位要求
                        </template>
                        {{ item.requirement }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="icon iconfont icon-fabuxuqiu"></i>
                            是否需要面试
                        </template>
                        <div v-for="item1 in isList" :key="item1.id">
                            <div v-if="item.needInteview == item1.id">{{ item1.name }}</div>
                        </div>
                    </el-descriptions-item>
                </el-descriptions>
                <el-divider></el-divider>
            </div>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            size: '',
            searchObject: {},
            positionList: {},
            regionList: {},
            recriutList: {},
            enterpriseList: {},
            settleList: {},
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
        }
    }, created() {
        this.fetchData();
    },
    methods: {
        search(){
            // console.log(this.searchObject);
            // this.recriutList={};
            this.$axios
                .get("http://localhost:8085/user/system/search", {params: {regionId:this.searchObject.regionId,positionId:this.searchObject.positionId,enterpriseId:this.searchObject.enterpriseId}})
                .then(res => {
                    console.log(res.data);
                    this.recriutList = res.data.data;
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        submit(tid) {
            this.$router.push({ path: '/submitresume', query: { id: tid } });
        },
        getsttleList() {
            this.$axios
                .get("http://localhost:8085/user/system/settleList", {})
                .then(res => {
                    // console.log(res.data);
                    this.settleList = res.data.data;
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        getEnterpriseList() {
            this.$axios
                .get("http://localhost:8085/user/system/enterpriseList", {})
                .then(res => {
                    console.log(res.data);
                    this.enterpriseList = res.data.data;
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        getRecriutList() {
            this.$axios
                .get("http://localhost:8085/user/system/recruitList", {})
                .then(res => {
                    console.log(res.data.data);
                    this.recriutList = res.data.data;
                })
                .catch(err => {
                    return Promise.reject(err);
                });
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
                    // console.log(res.data.data);
                    this.positionList = res.data.data;
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        fetchData() {
            this.getsttleList();
            this.getpositionList();
            this.getRegionList();
            this.getRecriutList();
            this.getEnterpriseList();
        }
    }
}
</script>

<style>
.clear {
    clear: both;
}

.my-label {
    background: #E1F3D8;
}

.my-content {
    background: #FDE2E2;
}
</style>