<template>
    <div>
        <el-container>
            <!-- <el-header>
                <el-row>
                    <el-col :span="24">
                    </el-col>
                </el-row>
            </el-header> -->
            <el-container>
                <el-aside width="auto">
                </el-aside>
                <el-container>
                    <el-main style="border-radius: 0; background-color: #d4deef">
                        <!-- <router-view></router-view> -->
                        <el-row type="flex" justify="center">
                            <el-col :span="22">
                                <el-tag type="success">请输入序列，数值之间以英文逗号或空格分隔</el-tag>
                            </el-col>
                        </el-row>
                        <el-row type="flex" justify="center">
                            <el-col :span="15">
                                <el-input
                                    type="textarea"
                                    autosize
                                    placeholder="请输入内容"
                                    v-model="textarea">
                                </el-input>
                            </el-col>
                            <el-col :span="1"></el-col>
                            <el-col :span="6">
                                <el-button type="primary" @click="doo">确定</el-button>
                            </el-col>
                        </el-row>
                        <el-row type="flex" justify="center">
                            <el-col :span="24" class="box_charts_out">
                                <div class="box_charts_in">
                                    <relation-graph ref="child" :id="'rela_chart1'" :nodes="nodes" :links="links" :table_name="'图序列生成图'"></relation-graph>
                                </div>
                            </el-col>
                        </el-row>
                    </el-main>
                    <el-footer style="background-color: #d4deef; text-align: center">
                        <hr/>
                        <div>Built by 孙相鹏</div>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import RelationGraph from './RelationGraph.vue'
import test_gs from '../assets/js/test_graph_sequence_and_produce'
    export default {
        components: { RelationGraph },
        name: "layout",
        props: {
        },
        data:function(){
            return {
                page_name: 'index',
                nodes: [],
                links: [],
                sequence: [5,5,3,3,2,2,2],
                textarea: "",
                is_gs:false
            }
        },
        watch:{
            
        },
        methods:{
            test:function(){
                try {
                    let is_gs = test_gs(this.sequence, this.nodes, this.links)
                    if(this.links.length === 0) alert('是空图')
                    this.is_gs = true
                    return is_gs
                } catch (error) {
                    this.is_gs = false
                    if(error.message == 'not GS') alert('不是图序列')
                    else if(error.message == 'invalid data') alert('无效数据')
                    else alert('出bug了')
                    
                }
            },
            text2seq:function(text){
                if(text.indexOf(',') >= 0)
                    return text.split(',')
                else
                    return text.split(' ')
            },
            doo:function(){
                this.sequence = this.text2seq(this.textarea)
                console.log(this.test())
                if(this.is_gs)
                    this.$refs.child.drawChart()
                else
                    this.$refs.child.clearChart()
                
            }
        },
        mounted() {
            
        }
    }
</script>

<style scoped>
    .box_charts_out{
        border-radius: 10px;
        background-color: white;
        box-shadow: 10px 10px 5px #888888;
        margin: 1%;
    }
    .box_charts_in{
        margin: 10%;
    }
</style>