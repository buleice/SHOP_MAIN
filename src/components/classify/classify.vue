<template>
    <div class="classify-page">
        <scroll class="classify-content"  @showToTop="fshowToTop" @hideToTop="hideToTop" ref="scroll" :tap="true" :probeType="2" :click="true">
            <div>
                <ul class="classify-banner">
                    <li v-for="item in categorys" :key="item.title">
                        <div v-if="item.id==101" @tap="hrefTo('c-recommend',item.id)"
                             :class="[locationId==item.id?'active':'']">
                            <img :src="item.icon" alt="">
                            <span>{{item.title}}</span>
                        </div>
                        <div v-else @tap="hrefTo('c-normal',item.id)"
                             :class="[locationId==item.id?'active':'']">
                            <img :src="item.icon" alt="">
                            <span>{{item.title}}</span>
                        </div>
                    </li>
                    <li v-if="!allCategory" @tap="allCategory=true;categorys=category">
                        <b class="pack-down"></b>
                        <span>展开</span>
                    </li>
                    <li v-else @tap="allCategory=false;categorys=category.slice(0,9)">
                        <b class="pack-up"></b>
                        <span>收起</span>
                    </li>
                </ul>
                <div class="personalDiy" v-if="diyList.length>0&&locationId==101"><span>{{diyList[0]}}</span><b @click="userDiy">重新选择</b></div>
                <ClassifyRecommend :list="recommendList" @imgLoad="imgLoad" v-if="showRecommend"></ClassifyRecommend>
                <ClassifyNormal :lessonList="normalList" v-else @imgLoad="imgLoad"></ClassifyNormal>
            </div>
        </scroll>
        <div v-if="showToTop" class="sc-htoDjs iOMeRW" @click="_topFunction"><span class="iconfont"></span>顶部</div>
    </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'
    import Scroll from '../base/scroll/scroll'

    const ClassifyRecommend = () => import('./classify-recommend');
    const ClassifyNormal = () => import('../base/lesson-list');

    import {Request} from "../../api/request";

    export default {
        name: "calssify",
        data() {
            return {
                categorys: [],
                allCategory: false,
                name: 'c-recommend',
                showRecommend: false,
                normalList: [],
                recommendList: [],
                locationId: 100,
                timeLimit: false,
                showToTop:false
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.hrefTo('classify', parseInt(to.params.cid));
                vm.setData('locationId', to.params.cid)
                if (to.params.cid == 101) {
                    vm.setData('showRecommend', true);
                }
            })
        },
        created() {
            this.categorys = this.category.slice(0, 9);
        },
        methods: {
            hrefTo(cname, cid) {
                this.showToTop=false
                this.setData('locationId', cid)
                if (cid == 101) {
                    this.setData('showRecommend', true);
                    new Request('/shop/category.json', 'GET', {
                        category: cid
                    }).returnJson().then(res => {
                        this.setData('recommendList', res.list);
                        this.imgLoad()
                    })
                } else if (cid != 101) {
                    this.setData('showRecommend', false);
                    new Request('/shop/category.json', 'GET', {
                        category: cid
                    }).returnJson().then(res => {
                        this.setData('normalList', res.list);
                        this.imgLoad()
                    })
                }
            },
            imgLoad() {
                this.$refs.scroll.refresh();
            },
            setData(key, value) {
                this[key] = value
            },
            hideToTop(){
                this.showToTop=false
            },
            fshowToTop(){
                this.showToTop=true
            },
            _topFunction(){
                this.$refs.scroll.scrollTo(0,0,300);
                this.showToTop=false
            },
            userDiy(){
                this.setFirstVisit(0)
                this.$router.go(-1)
            },
            ...mapActions(['setFirstVisit'])
        },
        computed: {
            ...mapGetters(['category','diyList'])
        },
        components: {
            Scroll,
            ClassifyRecommend,
            ClassifyNormal
        }
    }
</script>
<style lang="css" scoped>
    .iOMeRW{position:absolute;color:#bbb;background-color:#fff;border:1px solid #ccc;line-height:3.75rem;border-radius:50%;width:2.75rem;height:2.75rem;font-size:0.8rem;text-align:center;right: 1rem;bottom: 1rem}
    .iOMeRW span{color:#999;position:absolute;left:0;top:0;width:100%;height:100%;font-size:1.25rem;line-height:1.5rem}
    .iconfont{font-family:h5index-iconfont;font-style:normal;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:.2px;-moz-osx-font-smoothing:grayscale;font-size:1rem;color:#333}
</style>
<style scoped lang="scss">
    .classify-page {
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 0;
        background-color: #ffffff;
        z-index: 100;
        .classify-content {
            height: 100%;
            overflow: hidden;
            .classify-banner {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                padding-bottom: 0.94rem;
                li {
                    width: 20%;
                    height: 5.38rem;
                    box-sizing: border-box;
                    padding: .94rem 0 0 0;
                    div {
                        display: block;
                        width: 100%;
                        position: relative;
                        img {
                            display: inline-block;
                            width: 3rem;
                            margin: auto;
                            position: relative;
                        }
                        span {
                            display: block;
                        }
                        &.active::after {
                            content: '';
                            display: block;
                            position: relative;
                            width: 2.19rem;
                            height: 0;
                            border-bottom: .13rem solid #f69f00;
                            margin: auto;
                        }
                    }
                    b {
                        display: inline-block;
                        width: 3rem;
                        height: 3rem;
                        margin: auto;
                        position: relative;
                        &.pack-up::after {
                            content: "";
                            position: absolute;
                            width: 0.5rem;
                            height: 0.5rem;
                            border-top: 1px solid #656565;
                            border-right: 1px solid #656565;
                            top: 50%;
                            transform: translate(-50%, -50%) rotate(-45deg);
                        }
                        &.pack-down::after {
                            content: "";
                            position: absolute;
                            width: 0.5rem;
                            height: 0.5rem;
                            border-top: 1px solid #656565;
                            border-right: 1px solid #656565;
                            top: 50%;
                            transform: translate(-50%, -50%) rotate(-225deg);
                        }
                    }
                    span {
                        display: block;
                    }
                }
            }
            .personalDiy{
                width: 100%;
                line-height: 2rem;
                box-sizing: border-box;
                padding: 0 0px 0 .625rem;
                border-top: 3px solid #f5f5f5;
                line-height: 2rem;
                span{
                    float: left;
                    display: inline-block;
                    height: 1.5rem;
                    line-height: 1.5rem;
                    padding: 0 .8rem;
                    background-color: #f69f00;
                    color: #ffffff;
                    border-radius: .5rem;
                    margin-top: .25rem;
                }
                b{
                    float: right;
                    position: relative;
                    padding-right: 1.25rem;
                    color: #656565;
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
                &::after{
                    content: '';
                    display: block;
                    clear: both;
                }
            }
        }
    }

</style>
