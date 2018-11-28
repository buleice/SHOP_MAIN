<template>
    <div ref="wrapper">
        <slot></slot>
        <div v-if="showToTop" class="sc-htoDjs iOMeRW" @click="_topFunction"><span class="iconfont"></span>顶部</div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            /**
             * 点击列表是否派发click事件
             */
            click: {
                type: Boolean,
                default: true
            },
            /**
             * 是否开启横向滚动
             */
            scrollX: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发滚动事件
             */
            listenScroll: {
                type: Boolean,
                default: true
            },
            /**
             * 列表数据
             */
            data: {
                type: [Object, Array, String],
                default: null
            },
            /**
             * 是否派发滚动到底部的事件，用于上拉加载
             */
            pullup: {
                type: Boolean,
                default: true
            },
            /**
             * 是否派发顶部下拉的事件，用于下拉刷新
             */
            pulldown: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发列表滚动开始的事件
             */
            beforeScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 当数据更新后,刷新scroll延时
             */
            refreshDelay: {
                type: Number,
                default: 20
            },
            object: {
                type: Object,
                default: null
            },
            data: {
                default: null
            },
            string: {
                type: String,
                default: ''
            },
            mouseWheel: {
                speed: 20,
                invert: false,
                easeTime: 300
            },
        },
        data() {
            return {
                dragTip: {
                    text: "下拉刷新",
                    translate: -50,
                    showLoding: false
                },
                isLoading: false,
                isDone: false,
                showToTop:false,
            }
        },
        mounted() {
            // setTimeout(() => {
            //     this._initScroll()
            // }, 20)
            this.$nextTick(()=>{
                this._initScroll()
            })
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click,
                    scrollX: this.scrollX,
                    pullUpLoad: this.pullup,
                    pullDownRefresh:false,
                    swipeTime:800,
                    flickLimitDistance:30
                })
                if (this.listenScroll) {
                    let me = this
                    // pos为位置参数
                    this.scroll.on('scroll', (pos) => {
                        if (Math.abs(pos.y) > 500) {
                            me.showToTop = true
                        }else{
                          me.showToTop = false
                        }
                        me.$emit('scroll', pos)
                    })
                }
                // 是否派发滚动到底部事件，用于上拉加载
                if (this.pullup) {
                    this.scroll.on('scrollEnd', () => {
                        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            //所有数据加载完毕后
                            this.$on('infinitescroll.loadedDone', () => {
                                this.isLoading = false;
                                this.isDone = true;
                            });
                            //单次请求数据加载完毕后
                            this.$on('infinitescroll.finishLoad', (ret) => {
                                this.isLoading = false;
                            });
                            //重新初始化
                            this.$on('infinitescroll.reInit', () => {
                                this.isLoading = false;
                                this.isDone = false;
                            });
                            this.$emit('scrollToEnd')
                        }
                    })
                }
                // 是否派发顶部下拉事件，用于下拉刷新
                if (this.pulldown) {
                    this.scroll.on('scroll', (pos) => {
                        //显示下拉刷新loding
                        this.dragTip.showLoding = true
                        //隐藏底部加载loding
                        this.isLoading = false
                        if (pos.y > 50) {
                            this.dragTip.text = "释放刷新"
                        }
                    })
                    this.scroll.on('touchEnd', (pos) => {
                        if (pos.y > 50) {
                            this.dragTip.translate = 0
                            this.dragTip.text = "刷新中..."
                            //重新初始化
                            this.$on('pullrefresh.finishLoad', this.resetParams);
                            this.$emit('pulldown', pos)
                        }
                    })
                }
                // 是否派发列表滚动开始的事件
                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScroll')
                    })
                }
            },
            resetParams() {
                setTimeout(() => {
                    this.isLoading = false;
                    this.isDone = false;
                    this.dragTip = {
                        text: "下拉刷新",
                        translate: -50,
                        showLoding: false
                    }
                }, 600)
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            enable() {
                this.scroll && this.scroll.enable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll.stop()
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            },
            _topFunction(){
                this.scrollTo(0,0,1000)
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this.refresh()
                    new BScroll(this.$refs.wrapper, {
                        probeType: this.probeType,
                        click: this.click,
                        scrollX: this.scrollX
                    })
                }, this.refreshDelay)
            },
            string() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            },
            object() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            },
        }
    }
</script>
<style lang="css" scoped>
    .iOMeRW{position:absolute;color:#bbb;background-color:#fff;border:1px solid #ccc;line-height:3.75rem;border-radius:50%;width:2.75rem;height:2.75rem;font-size:0.8rem;text-align:center;right: 1rem;bottom: 1rem}
    .iOMeRW span{color:#999;position:absolute;left:0;top:0;width:100%;height:100%;font-size:1.25rem;line-height:1.5rem}
    .iconfont{font-family:h5index-iconfont;font-style:normal;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:.2px;-moz-osx-font-smoothing:grayscale;font-size:1rem;color:#333}
</style>
