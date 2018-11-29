<template lang="html">
    <div class="shop-page">
        <scroll class="shop-content" :data="[category,lessonList]" ref="scroll">
            <div>
                <carousel :slideDatas="carouselList">
                    <div v-for="scroll in carouselList">
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
        <EntryAd></EntryAd>
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
                carouselList: []
            }
        },
        activated(){
            this.$nextTick(()=>{
                this.imgLoad()
            })
        },
        created() {
            new Request('/shop/list.json', 'POST').returnJson().then(res => {
                this.lessonList = [res.list1,res.list2,res.list3];
                localStorage.count = res.count;
                this.category = res.category1;
                this.carouselList = res.bannerList
                this.setFirstVisit(res.visited);
                this.setCategory(res.category2)
            })
        },
        methods: {
            imgLoad() {
                this.$refs.scroll.refresh();
            },
            ...mapActions(['setFirstVisit', 'setScrollRefresh','setCategory'])
        },
        computed: {
            ...mapGetters(['isScrollRefresh'])
        }
    }
</script>
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
