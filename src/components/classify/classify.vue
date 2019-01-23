<template>
    <div class="classify-page">
        <div class="classify-content">
            <div>
                <ul class="classify-banner">
                    <li v-for="item in categorys" :key="item.title">
                        <div v-if="item.id==101" @click="hrefTo('c-recommend',item.id)"
                             :class="[locationId==item.id?'active':'']">
                            <img :src="item.icon" alt="">
                            <span>{{item.title}}</span>
                        </div>
                        <div v-else @click="hrefTo('c-normal',item.id)"
                             :class="[locationId==item.id?'active':'']">
                            <img :src="item.icon" alt="">
                            <span>{{item.title}}</span>
                        </div>
                    </li>
                    <li v-if="!allCategory&&category2.length>10" @click="allCategory=true;categorys=category2">
                        <b class="pack-down"></b>
                        <span>展开</span>
                    </li>
                    <li v-if="allCategory&&category2.length>10" @click="allCategory=false;categorys=category2.slice(0,9)">
                        <b class="pack-up"></b>
                        <span>收起</span>
                    </li>
                </ul>
                <ClassifyRecommend :list="recommendList"  v-if="showRecommend&&!showLoading"></ClassifyRecommend>
                <ClassifyNormal :lessonList="normalList"  v-if="!showRecommend&&!showLoading" ></ClassifyNormal>
                <Loading v-if="showLoading"></Loading>

            </div>
        </div>
        <div v-if="showToTop" class="sc-htoDjs iOMeRW" @click="_topFunction"><span class="iconfont"></span>顶部</div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    const ClassifyRecommend = () => import('./classify-recommend');
    const ClassifyNormal = () => import('../base/lesson-list');
    import Loading from '../base/loading'

    import {Request} from "../../api/request";

    export default {
        name: "calssify",
        data() {
            return {
                categorys: [],
                category2:[],
                allCategory: false,
                name: 'c-recommend',
                showRecommend: false,
                normalList: [],
                recommendList: [],
                locationId: 100,
                timeLimit: false,
                showToTop:false,
                showLoading:false
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.hrefTo('classify', parseInt(to.params.cid));
                vm.setData('locationId', to.params.cid)
                vm.setShowTabBar(false)
                if (to.params.cid == 101) {
                    vm.setData('showRecommend', true);
                }

            })
        },
        beforeRouteLeave (to, from, next) {
            this.setShowTabBar(true)
            next()
        },
        methods: {
            hrefTo(cname, cid) {
                this.showToTop=false;
                this.allCategory=false;
                this.showLoading=true;
                this.setData('locationId', cid)
                if (cid == 101) {
                    this.setData('showRecommend', true);
                    new Request('/shop/category.json', 'GET', {
                        category: cid
                    }).returnJson().then(res => {
                        this.category2=res.category2;
                        this.allCategory=false;
                        this.categorys=res.category2.slice(0,9)
                        this.setData('recommendList', res.list);
                        setTimeout(()=>{
                            this.showLoading=false;
                        },300)
                    })
                } else if (cid != 101) {
                    this.setData('showRecommend', false);
                    new Request('/shop/category.json', 'GET', {
                        category: cid
                    }).returnJson().then(res => {
                        this.category2=res.category2;
                        this.allCategory=false;
                        this.categorys=res.category2.slice(0,9)
                        this.setData('normalList', res.list);
                        setTimeout(()=>{
                            this.showLoading=false;
                        },300)
                    })
                }
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
            ...mapActions(['setFirstVisit','setCategory','setShowTabBar'])
        },
        components: {
            ClassifyRecommend,
            ClassifyNormal,
            Loading
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
        .classify-content {
            .classify-banner {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                padding:.5rem 0;
                li {
                    width: 20%;
                    /*height: 5.38rem;*/
                    box-sizing: border-box;
                    /*box-sizing: border-box;*/
                    /*margin-top: .94rem;*/
                    div {
                        display: inline-block;
                        margin: auto;
                        height: auto;
                        position: relative;
                        box-sizing: border-box;
                        padding: .5rem;
                        img {
                            display: inline-block;
                            width: 2.5rem;
                            margin: auto;
                            position: relative;
                        }
                        span {
                            display: block;
                        }
                        &.active{
                            background: #e5e5e5;
                            border-radius: 10px;
                        }
                        /*&.active::after {*/
                            /*content: '';*/
                            /*display: block;*/
                            /*position: relative;*/
                            /*width: 2.19rem;*/
                            /*height: 0;*/
                            /*border-bottom: .13rem solid #f69f00;*/
                            /*margin: auto;*/
                        /*}*/
                    }
                    b {
                        display: inline-block;
                        width: 2.5rem;
                        height: 2.5rem;
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
        }
    }

</style>
