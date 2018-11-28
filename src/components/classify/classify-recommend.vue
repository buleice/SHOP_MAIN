<template>
   <div class="classify-recommend">
       <div v-for="(item,index) in list" :key="index">
           <div class="divide"></div>
           <div class="recommend-box">
               <div class="recommend-banner"><span>{{item.title}}</span></div>
               <p class="recommend-desc">让孩子从不同的角度看待历史人物和故事，启发引导孩子思考和探究历史</p>
               <CourseBox class="course" v-for="(item2,index2) in item.goodsList" :data="item2"
                          :key="index2"></CourseBox>
           </div>
       </div>
   </div>
</template>

<script>
    import CourseBox from '../base/course-box/course-box'
    import {
        Request
    } from '../../api/request'
    import {mapGetters,mapActions} from 'vuex'
    export default {
        name: "classify-recommend",
        data(){
            return{
                list:[{
                    title:'专属推荐',
                    goodsList:[{
                        icon: "http://p9w8pmwcs.bkt.clouddn.com/20180921/2933190011Fvd5hs29ypo-XEF6r-mGiWFDXSQc.png",
                        id: "5ba477a3efcba41a35509af4",
                        subtitle: "<p>让孩子从不同的角度看待历史人物和故事，启发引导孩子思考和探究历史</p>",
                        title: "三国里的趣事",
                    },{
                        icon: "http://p9w8pmwcs.bkt.clouddn.com/20180921/2933190011Fvd5hs29ypo-XEF6r-mGiWFDXSQc.png",
                        id: "5ba477a3efcba41a35509af4",
                        subtitle: "<p>让孩子从不同的角度看待历史人物和故事，启发引导孩子思考和探究历史</p>",
                        title: "三国里的趣事",
                    }]
                }]
            }
        },
        activated(){

            // this._fetchCategory(this.$route.params.cid)
        },
        methods:{
            _fetchCategory(cid){
                new Request('/shop/category.json','GET',{
                    category: cid
                }).returnJson().then(res=>{
                    this.setData('list',res.list);
                })
            },
            setData(key, value) {
                this[key] = value
            },
            ...mapActions(['setClassifyId'])
        },
        computed:{
            ...mapGetters(['classifyId'])
        },
        components:{
            CourseBox
        },
    }
</script>

<style scoped lang="scss">
    .divide {
        width: 100%;
        height: .63rem;
        background: #f5f5f5;
    }
    .recommend-box {
        width: 100%;
        box-sizing: border-box;
        padding: 0 .5rem;
        margin: .63rem 0;
        .recommend-banner {
            display: flex;
            justify-content: flex-start;
            span {
                font-size: 1rem;
                font-weight: 700;
                position: relative;
                padding-left: .44rem;
                &::before{
                    content: '';
                    display: block;
                    width: .31rem;
                    height: 1.25rem;
                    background: #f69f00;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
            a {
                color: rgba(0, 0, 0, .7);
                position: relative;
                padding-right: 1.25rem;
                &::after {
                    content: "";
                    position: absolute;
                    width: 0.5rem;
                    height: 0.5rem;
                    top: 50%;
                    right: 0.63rem;
                    border-top: 1px solid #656565;
                    border-right: 1px solid #656565;
                    transform: translate(-50%, -50%) rotate(45deg);
                    -webkit-transform: translateY(-50%) rotate(45deg);
                }
            }
        }
        .recommend-desc{
            text-align: left;
            padding: .88rem 0;
            color: rgba(0,0,0,.5);
        }
        .course {
            border-bottom: 1px solid rgba(0, 0, 0, .2);
            &:last-child {
                border: none;
            }
        }
    }
</style>
