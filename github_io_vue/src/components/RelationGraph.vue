<template>
    <div :id="id" class="main"></div>
</template>

<script>
    export default {
        name: "RelationGraph",
        props: {
            id: String,
            // data: Object,
            nodes:Array,
            links:Array,
            table_name: String,
        },
        data:function(){
            return {
                myChart:0,
            }
        },
        watch: {
            nodes: function () {
                this.myChart.clear()
                this.drawChart()
            },
            links: function(){
                this.myChart.clear()
                this.drawChart()
            }
        },
        methods:{
            clearChart(){
                this.myChart.clear()
            },
            drawChart(){
                this.myChart = this.$echarts.init(document.getElementById(this.id));
                // //创建Nodes
                // let nodes=[
                //     {category:0, name: '乔布斯', value : 10, label: '乔布斯\n（主要）'},
                //     {category:1, name: '丽萨-乔布斯',value : 2},
                //     {category:1, name: '保罗-乔布斯',value : 3},
                //     {category:1, name: '克拉拉-乔布斯',value : 3},
                //     {category:1, name: '劳伦-鲍威尔',value : 7},
                //     {category:2, name: '史蒂夫-沃兹尼艾克',value : 5},
                //     {category:2, name: '奥巴马',value : 8},
                //     {category:2, name: '比尔-盖茨',value : 9},
                //     {category:2, name: '乔纳森-艾夫',value : 4},
                //     {category:2, name: '蒂姆-库克',value : 4},
                //     {category:2, name: '龙-韦恩',value : 1},
                // ];
                // //创建links
                // let links = [
                //     {source: '丽萨-乔布斯', target: '乔布斯', weight: 1, name: '女儿\r'},
                //     {source: '保罗-乔布斯', target: '乔布斯', weight: 2, name: '父亲'},
                //     {source: '克拉拉-乔布斯', target: '乔布斯', weight: 1, name: '母亲'},
                //     {source: '劳伦-鲍威尔', target: '乔布斯', weight: 2},
                //     {source: '史蒂夫-沃兹尼艾克', target: '乔布斯', weight: 3, name: '合伙人'},
                //     {source: '奥巴马', target: '乔布斯', weight: 1},
                //     {source: '比尔-盖茨', target: '乔布斯', weight: 6, name: '竞争对手'},
                //     {source: '乔纳森-艾夫', target: '乔布斯', weight: 1, name: '爱将'},
                //     {source: '蒂姆-库克', target: '乔布斯', weight: 1},
                //     {source: '龙-韦恩', target: '乔布斯', weight: 1},
                //     {source: '克拉拉-乔布斯', target: '保罗-乔布斯', weight: 1},
                //     {source: '奥巴马', target: '保罗-乔布斯', weight: 1},
                //     {source: '奥巴马', target: '克拉拉-乔布斯', weight: 1},
                //     {source: '奥巴马', target: '劳伦-鲍威尔', weight: 1},
                //     {source: '奥巴马', target: '史蒂夫-沃兹尼艾克', weight: 1},
                //     {source: '比尔-盖茨', target: '奥巴马', weight: 6},
                //     {source: '比尔-盖茨', target: '克拉拉-乔布斯', weight: 1},
                //     {source: '蒂姆-库克', target: '奥巴马', weight: 1}
                // ];
                // let categoryArray=[{name:"核心人物"},{name:"家人"},{name:"朋友"}];
                // let jsondata={"categories":categoryArray,"nodes":nodes,"links":links};
                // alert(this.data['nodes']);
                let jsondata={"nodes":this.nodes,"links":this.links};
                jsondata.nodes.forEach(function (node) {
                    //node.itemStyle = null;//
                    node.symbolSize = 10;//强制指定节点的大小
                    // Use random x, y
                    node.x = node.y = null;
                    node.draggable = true;
                    // node.label = {
                    //     show: node.symbolSize > 30
                    // };
                });

                let option = {
                    title: {
                        text: this.table_name,
                        subtext: 'Default layout',
                        top: 'bottom',
                        left: 'right'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params){
                            return params.data.name;
                        },
                    },
                    toolbox:{
                        // 显示工具箱
                        show: true,
                        feature: {
                            mark: {
                                show: true
                            },
                            // 还原
                            restore: {
                                show: true
                            },
                            // 保存为图片
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    // legend: [{
                    //     // selectedMode: 'single',
                    //     data: jsondata.categories.map(function (a) {
                    //         return a.name;
                    //     })
                    // }],
                    // animationDurationUpdate: 1500,
                    // animationEasingUpdate: 'quinticInOut',
                    // force : { //力引导图基本配置
                    //     //initLayout: ,//力引导的初始化布局，默认使用xy轴的标点
                    //     repulsion : 100,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                    //     gravity : 0.03,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                    //     edgeLength :80,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                    //     layoutAnimation : true
                    //     //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
                    // },
                    series : [
                        {
                            name: 'Les Miserables',
                            type: 'graph',
                            layout: 'force',
                            data: jsondata.nodes,
                            links: jsondata.links,
                            categories: jsondata.categories,
                            roam: true,
                            draggable: true,
                            // legendHoverLink : true,//是否启用图例 hover(悬停) 时的联动高亮。
                            focusNodeAdjacency: true,
                            label: {//图形上的文本标签，可用于说明图形的一些数据信息
                                normal: {
                                    show : true,//显示
                                    position: 'right',//相对于节点标签的位置，默认在节点中间
                                    //回调函数，你期望节点标签上显示什么
                                    formatter: function(params){
                                        return params.data.name;
                                    },
                                }
                            },
                            lineStyle: {
                                color: 'source',
                                curveness: 0.2
                            },
                            emphasis: {
                                lineStyle: {
                                    width: 5
                                },
                            },
                            // edgeLabel: {//线条的边缘标签
                            //     normal: {
                            //         show: true,
                            //         //通过回调函数设置连线上的标签
                            //         formatter: function (x) {
                            //             return x.data.name;
                            //         }
                            //
                            //     }
                            // },
                            force: {
                                repulsion: 1000,
                                edgeLength: 100,
                                layoutAnimation: true,
                                gravity: 0.3

                            }
                        }
                    ]
                };
                this.myChart.setOption(option);
            },
        },
        mounted() {
            this.drawChart();
        },
    }
</script>

<style scoped>
    .main{
            width: 100%;
            height: 500px;
        }
</style>