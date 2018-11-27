<template lang="html">
    <div class="shop-page">
        <scroll class="shop-content" :data="lessonList" ref="scroll" :probeType="2">
            <div>
                <carousel :slideDatas="carouselList">
                    <div v-for="scroll in carouselList">
                        <a :href="scroll.url">
                            <img :src="scroll.image" alt="">
                        </a>
                    </div>
                </carousel>
                <RecommendBox></RecommendBox>
            </div>
        </scroll>
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

    export default {
        name: 'Shop',
        components: {
            Carousel,
            Scroll,
            RecommendBox
        },
        data() {
            return {
                lessonList: {},
                allList: {},
                isShowAll: true,
                category: [],
                series: [],
                fetchCategory: true,
                isNew: 0,
                carouselList: [],
            }
        },
        created() {
            new Request('/shop/list.json', 'POST').returnJson().then(res => {
                this.lessonList = res.list;
                localStorage.count = res.count;
                this.allList = res.list;
                this.category = res.category;
                this.series = res.seriesList;
                this.isNew = res.isNew;
                this.carouselList = res.bannerList
                this.setFirstVisit(res.visited);
            })
        },
        methods: {
            getListData(category) {
                category == 99 ? (this.lessonList = this.allList) : this._fetchData(category);
            },
            _fetchData(category) {
                this.fetchCategory = false;
                new Request('/shop/category.json', 'GET', {
                    "category": category
                }).returnJson().then(res => {
                    this.lessonList = res.list;
                    this.fetchCategory = true;
                })
            },
            ...mapActions(['setFirstVisit', 'setScrollRefresh'])
        },
        computed: {
            ...mapGetters(['isScrollRefresh'])
        },
        watch: {
            isScrollRefresh(newValue, oldValue) {
                if (newValue) {
                    // console.log("刷新一次")
                    this.$refs.scroll.refresh();
                    this.setScrollRefresh(false)
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .shop-page {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 3.56rem;
        width: 100%;
        .shop-content {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }
</style>
