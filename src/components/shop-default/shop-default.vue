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
                        <router-link v-if="item.id==8" :to="{name:'c-recommend',params:{cid:item.id}}">
                            <img @load="imgLoad" :src="item.icon" alt="">
                            <span>{{item.title}}</span>
                        </router-link>
                        <router-link v-else :to="{name:'c-normal',params:{cid:item.id}}">
                            <img @load="imgLoad" :src="item.icon" alt="">
                            <span>{{item.title}}</span>
                        </router-link>
                    </li>
                </ul>
                <RecommendBox :list="lessonList"></RecommendBox>
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
        name: 'ShopDeault',
        components: {
            Carousel,
            RecommendBox,
            Scroll
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
                timeLimit: 1000
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
            setTimeout(() => {
                this.timeLimit = 0;
            }, 1000)

            setInterval(() => {
                if (this.timeLimit > 0) {
                    this.$refs.scroll.refresh()
                }
            }, 20)

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
            imgLoad() {
                this.$refs.scroll.refresh();
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
        width: 100%;
        top: 0;
        bottom: 3.5rem;
        background-color: #ffffff;
        .shop-content {
            height: 100%;
            overflow: hidden;
            .shop-category {
                display: flex;
                justify-content: space-around;
                padding-bottom: .5rem;
                li {
                    a {
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
