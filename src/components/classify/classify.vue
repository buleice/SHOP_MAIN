<template>
    <div class="classify-page">
        <scroll class="classify-content" ref="scroll" >
            <div>
                <ul class="classify-banner">
                    <li v-for="item in categorys" :key="item.title">
                        <div v-if="item.id==101" @click="hrefTo('c-recommend',item.id)"
                             :class="[locationId==item.id?'active':'']">
                            <img :src="item.icon" alt="">
                            <span>{{item.title}}</span>
                        </div>
                        <div v-else v-on:click="hrefTo('c-normal',item.id)"
                             :class="[locationId==item.id?'active':'']">
                            <img :src="item.icon" alt="">
                            <span>{{item.title}}</span>
                        </div>
                    </li>
                    <li v-if="!allCategory" @click="allCategory=true;categorys=category">
                        <b class="pack-down"></b>
                        <span>展开</span>
                    </li>
                    <li v-else v-on:click="allCategory=false;categorys=category.slice(0,9)">
                        <b class="pack-up"></b>
                        <span>收起</span>
                    </li>
                </ul>
                <ClassifyRecommend :list="recommendList" @imgLoad="imgLoad" v-if="showRecommend"></ClassifyRecommend>
                <ClassifyNormal :lessonList="normalList" v-else @imgLoad="imgLoad"></ClassifyNormal>
            </div>
        </scroll>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
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
        },
        computed: {
            ...mapGetters(['category'])
        },
        components: {
            Scroll,
            ClassifyRecommend,
            ClassifyNormal
        }
    }
</script>

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
        }
    }

</style>
