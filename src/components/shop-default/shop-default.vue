<template lang="html">
    <div class="shop-page">
        <div class="shop-content">
            <div>
                <carousel :slideDatas="carouselList">
                    <div v-for="(scroll,index) in carouselList" :key="index">
                        <a :href="scroll.url">
                            <img :src="scroll.image" alt=""/>
                        </a>
                    </div>
                </carousel>
                <ul class="shop-category">
                    <li v-for="item in category" :key="item.title">
                        <router-link :to="{name:'classify',params:{cid:item.id}}">
                            <img :src="item.icon" alt="">
                            <span>{{item.title}}</span>
                        </router-link>
                    </li>
                </ul>
                <div class="personalDiy"><span class="title">帮孩子选课&nbsp;</span><span class="age">{{age}}</span><b @click="userDiy">重新选择</b></div>
                <RecommendBox :list="lessonList"></RecommendBox>
            </div>
        </div>
        <div v-if="1==2" class="sc-htoDjs iOMeRW" @click="_topFunction"><span class="iconfont"></span>顶部</div>
        <EntryAd @freshData="_initPageData" :interest="interest"></EntryAd>
        <PushInfo v-if="showAd" :coupon="coupons[0]"></PushInfo>
    </div>
</template>

<script>
    import PushInfo from '../base/push-component/push-component'
    import Carousel from '../base/slider/slider.vue'
    import RecommendBox from '../base/recommend-box/recommend-box'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import EntryAd from '../base/entry-ad/entry-ad'
    import axios from 'axios'
    export default {
        name: 'ShopDeault',
        components: {
            Carousel,
            RecommendBox,
            PushInfo,
            EntryAd
        },
        data() {
            return {
                lessonList: [],
                allList: {},
                isShowAll: true,
                category: [],
                series: [],
                fetchCategory: true,
                carouselList: [],
                showToTop:false,
                interest:[],
                auth:'',
                showAd:true,
                coupons:[]
            }
        },
        created() {
                this._initPageData()
        },
        methods: {
            imgLoad() {
                this.$refs.scroll.refresh();
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
            _initPageData(){
                axios.get('/shop/list.json').then(response => {
                    let res=response.data;
                    this.lessonList = res.list;
                    localStorage.count = res.count;
                    this.category = res.category1;
                    this.carouselList = res.bannerList;
                    this.interest=res.interest;
                    this.coupons=res.couponSent;
                    if(res.popup==0){
                        this.setFirstVisit(1);
                    }else if(res.popup==1){
                        this.setFirstVisit(0);
                    }
                    if(res.age.length>0){
                        this.setAge(res.age);
                    }else{
                        this.setAge('3-6岁')
                    }
                    res.isNew==1?this.setNewUser(true):this.setNewUser(false);
                })
            },
            userDiy(){
                this.setFirstVisit(0)
            },
            ...mapActions(['setFirstVisit', 'setScrollRefresh',"setAge",'setNewUser'])
        },
        computed: {
            ...mapGetters(['isScrollRefresh',"age"])
        }
    }
</script>
<style lang="css" scoped>
    .iOMeRW{position:absolute;color:#bbb;background-color:#fff;border:1px solid #ccc;line-height:3.75rem;border-radius:50%;width:2.75rem;height:2.75rem;font-size:0.8rem;text-align:center;right: 1rem;bottom: 1rem}
    .iOMeRW span{color:#999;position:absolute;left:0;top:0;width:100%;height:100%;font-size:1.25rem;line-height:1.5rem}
    .iconfont{font-family:h5index-iconfont;font-style:normal;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:.2px;-moz-osx-font-smoothing:grayscale;font-size:1rem;color:#333}
</style>
<style scoped lang="scss">
    .shop-page {
        // position: fixed;
        // width: 100%;
        // top: 0;
        // bottom: 3.5rem;
        // background-color: #ffffff;
        // z-index: 100;
        .shop-content {
            // height: 100%;
            // overflow: hidden;
            .shop-category {
                display: flex;
                justify-content: space-around;
                padding-bottom: .5rem;
                li {
                    a {
                        color: #0d0d0d;
                        display: block;
                        width: 2.5rem;
                        img {
                            width: 100%;
                        }
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
                    border-radius: .5rem;
                    margin-top: .25rem;
                    &.title{
                        font-weight: 700;
                        font-size: 1rem;
                        padding-left: 0;
                    }
                    &.age{
                        background-color: #f69f00;
                        color: #ffffff;
                    }
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
