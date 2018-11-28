<template>
    <div class="classify-page">
        <scroll class="classify-content" :data="[category]" ref="scroll">
            <div>
                <ul class="classify-banner">
                    <li v-for="item in acronym" :key="item.title">
                        <div v-if="item.id==8" @click="hrefTo('c-recommend',item.id)"
                             :class="[classifyId.cid==item.id?'active':'']">
                            <img :src="item.icon" alt="">
                            <span>{{item.title}}</span>
                        </div>
                        <div v-else @click="hrefTo('c-normal',item.id)" :class="[classifyId.cid==item.id?'active':'']">
                            <img :src="item.icon" alt="">
                            <span>{{item.title}}</span>
                        </div>
                    </li>
                    <li v-if="!allCategory" @click="allCategory=true;acronym=category">
                        <b class="pack-down"></b>
                        <span>展开</span>
                    </li>
                    <li v-else @click="allCategory=false;acronym=category.slice(0,9)">
                        <b class="pack-up"></b>
                        <span>收起</span>
                    </li>
                </ul>
                <router-view @imgLoad="imgLoad"></router-view>
            </div>
        </scroll>
    </div>
</template>

<script>
    import {
        Request
    } from '../../api/request'
    import {mapGetters, mapActions} from 'vuex'
    import Scroll from '../base/scroll/scroll'

    export default {
        name: "calssify",
        data() {
            return {
                category: [],
                acronym: [],
                allCategory: false,
                name: 'c-recommend',
                timeLimit: 1000
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.setClassifyId({
                    name: to.name,
                    cid: to.params.cid
                })
            })
        },
        created() {
            this._fetchCategory(this.$route.params.cid)
        },
        methods: {
            _fetchCategory(cid) {
                new Request('/shop/category.json', 'GET', {
                    category: cid
                }).returnJson().then(res => {
                    this.setData('category', res.category);
                    this.setData('acronym', res.category.slice(0, 9))
                })
            },
            setData(key, value) {
                this[key] = value
            },
            hrefTo(cname, cid) {
                if (cname == 'c-recommend') {
                    this.setClassifyId({name: cname, cid: cid})
                    this.$router.push({name: 'c-recommend', params: {cid: cid}})
                    this.imgLoad()
                } else if (cname == 'c-normal' && this.classifyId.cid != cid) {
                    this.setClassifyId({name: cname, cid: cid})
                    this.$router.push({name: 'c-normal', params: {cid: cid}})
                    this.imgLoad()
                }

            },
            imgLoad(){
                this.$refs.scroll.refresh();
            },
            ...mapActions(['setClassifyId'])
        },
        computed: {
            ...mapGetters(['classifyId'])
        },
        components: {
            Scroll
        }
    }
</script>

<style scoped lang="scss">
    .classify-page {
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 3.5rem;
        background-color: #ffffff;
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
