import h404 from './components/404'
// import RelationGraph from './components/RelationGraph'
import layout from './components/layout'

export default {
    routes: [
        {
            path: '/404',    //配置访问路径
            name: '404',
            component: h404  //绑定组件
        },
        {
            path: '/',
            component: layout,
            name:'检验图序列',
            // children: [
            //     {path: '/gs2graph',name: 'gs2graph', component: RelationGraph, props: true},
            // ]
        }
    ]
}
