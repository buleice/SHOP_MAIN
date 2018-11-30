<template lang="html">
    <div class="shop-page">
        <scroll class="shop-content" @showToTop="fshowToTop" @hideToTop="hideToTop" :data="[category,lessonList]" :tap="true" :probeType="1" :click="true" ref="scroll">
            <div>
                <carousel :slideDatas="carouselList">
                    <div v-for="(scroll,index) in carouselList" :key="index">
                        <a :href="scroll.url">
                            <img @load="imgLoad" :src="scroll.image" alt=""/>
                        </a>
                    </div>
                </carousel>
                <ul class="shop-category">
                    <li v-for="item in category" :key="item.title">
                        <router-link :to="{name:'classify',params:{cid:item.id}}">
                            <img @load="imgLoad" :src="item.icon" alt="">
                            <span>{{item.title}}</span>
                        </router-link>
                    </li>
                </ul>
                <RecommendBox :list="lessonList" @imgLoad="imgLoad"></RecommendBox>
            </div>
        </scroll>
        <div v-if="1==2" class="sc-htoDjs iOMeRW" @click="_topFunction"><span class="iconfont"></span>顶部</div>
        <EntryAd @freshData="_initPageData"></EntryAd>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import {
        Request
    } from '../../api/request'
    import Carousel from '../base/slider/slider.vue'
    import RecommendBox from '../base/recommend-box/recommend-box'
    import Scroll from '../base/scroll/scroll'
    import EntryAd from '../base/entry-ad/entry-ad'

    export default {
        name: 'ShopDeault',
        components: {
            Carousel,
            RecommendBox,
            Scroll,
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
            }
        },
        activated(){
            this.$nextTick(()=>{
                this.imgLoad()
            })
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
                new Request('/shop/list.json', 'POST').returnJson().then(res => {
                    this.lessonList = [res.list1,res.list2,res.list3];
                    localStorage.count = res.count;
                    this.category = res.category1;
                    this.carouselList = res.bannerList;
                    if(res.popup==0){
                        this.setFirstVisit(1);
                    }else{
                        this.setFirstVisit(0);
                    }
                    this.setDiyList([res.age])
                    this.setCategory(res.category2)
                })
            },
            ...mapActions(['setFirstVisit', 'setScrollRefresh','setCategory',"setDiyList"])
        },
        computed: {
            ...mapGetters(['isScrollRefresh'])
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
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 3.5rem;
        background-color: #ffffff;
        z-index: 100;
        .shop-content {
            height: 100%;
            overflow: hidden;
            .shop-category {
                display: flex;
                justify-content: space-around;
                padding-bottom: .5rem;
                li {
                    a {
                        color: #0d0d0d;
                        display: block;
                        width: 3rem;
                        img {
                            width: 100%;
                        }
                    }
                }
            }
        }

    }

</style>
