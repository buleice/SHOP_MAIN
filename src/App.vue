<template>
    <div id="app">
        <div class="v-touch" ref="back">
            <transition :name="transitionName">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
        <ShopNavBar/>
        <ScrollToTop ref="scrollToTop"/>
        <WxShare/>
    </div>
</template>

<script>
    import ShopNavBar from './components/base/shopnavbar.vue'
    import WxShare from './components/base/wxshare.vue';
    import ScrollToTop from './components/base/totop.vue'

    export default {
        name: 'App',
        components: {
            ShopNavBar,
            WxShare,
            ScrollToTop,
        },
        data() {
            return {
                transitionName: 'fade-enter',  // 默认动态路由变化为slide-right
                touch: {},
                percent: 0,
                rPath: ['/shop/default', '/course', '/bonus/center', '/mine'],
                orientation:'left',
                isSwiper:false,
                startTime:0,
                endTime:0,
                deltaX:0,
            }
        },
        watch: {
            '$route'(to, from) {
                const arr = ['default', 'Course', 'BonusIndex', 'mine', 'classify']
                if (arr.indexOf(to.name) < 0) {
                    this.transitionName = 'fade-enter'
                } else {
                    const compare = arr.indexOf(to.name) > arr.indexOf(from.name)
                    this.transitionName = compare ? 'fade-enter' : 'view-in'
                }
                if(this.isSwiper){
                    if(this.orientation=="left"){
                        this.transitionName = 'slide-left'
                    }else{
                        this.transitionName = 'slide-right'
                    }
                    this.isSwiper=false
                    return
                }else{
                    if (arr.indexOf(to.name) < 0) {
                        this.transitionName = 'fade-enter'
                    } else {
                        const compare = arr.indexOf(to.name) > arr.indexOf(from.name)
                        this.transitionName = compare ? 'fade-enter' : 'slide-left'
                    }
                }
                this.$refs.scrollToTop._topFunction2();
            }
        },
        methods: {
            touchStart(e) {
                this.startTime=e.timeStamp
                const touch = e.touches[0]
                this.touch = {
                    startX: touch.pageX,
                    startY: touch.pageY,
                    toggleFlag: true,
                    moved: true
                }
            },
            touchMove(e) {
                if (!this.touch.toggleFlag) {
                    return;
                }
                const touch = e.touches[0]
                const deltaX = touch.pageX - this.touch.startX
                const deltaY = touch.pageY - this.touch.startY
                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    return
                }
                e.preventDefault;
                this.deltaX=deltaX
                if (deltaX < -50) {
                    this.isSwiper=true;
                    this.orientation="left"
                    if (this.routerArr == '/mine') {
                        return
                    }
                    // this.$refs.back.style.left=X+'px';
                    // const left = this.rPath.indexOf(this.routerArr) > 0 ? -window.innerWidth : 0
                    const left=-50;
                    var offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
                    this.percent = Math.abs(offsetWidth / window.innerWidth)
                    this.$refs.back.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
                    this.$refs.back.style["transitionDuration"] = 10
                }
                if (deltaX > 50) {
                    this.isSwiper=true;
                    this.orientation="right"
                    if (this.routerArr == '/shop/default') {
                        return
                    }
                    // this.$refs.back.style.left=X-50+'px';
                    // const left = 50;
                    // var offsetWidth = Math.min(0, Math.max(window.innerWidth, left + deltaX))
                    // var offsetWidth=deltaX
                    this.percent = Math.abs(offsetWidth / window.innerWidth)
                    this.$refs.back.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
                    this.$refs.back.style["transitionDuration"] = 10
                }
            },
            touchEnd(e) {
                let offsetWidth = 0;
                this.endTime=e.timeStamp;
                if(this.endTime-this.startTime<=300&&Math.abs(this.deltaX)>30){
                    this.toggleTab()
                }
                if (this.percent>0.3) {
                        this.toggleTab()
                } else {
                    offsetWidth = 0;
                    this.$refs.back.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
                    this.$refs.back.style["transitionDuration"] = 10;
                    return;
                }
            },
            toggleTab(){
                let offsetWidth = 0;
                let rpath=this.rPath;
                let pageIndex=rpath.indexOf(this.routerArr)
                this.$refs.back.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
                this.$refs.back.style["transitionDuration"] = 10
                if(this.orientation=="left"){
                    if(pageIndex>=3){
                        return
                    }
                    this.$router.push(`${this.rPath[pageIndex+1]}`)
                }else if(this.orientation=="right"){
                    if(pageIndex<=0){
                        return
                    }
                    this.$router.push(`${this.rPath[pageIndex-1]}`)
                } else{
                    return
                }
            }
        },
    }
</script>

<style>
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background: #ffffff
    }

    * {
        margin: 0;
        padding: 0;
        /*font-family: PingFangSC-Medium, sans-serif;*/
        font-family: PingFangSC-Regular, sans-serif;
        /*font-family:Sans-serif,"Times New Roman",Georgia;*/
    }

    body {
        font: .88rem PingFang regular, arial, helvetica, sans-serif;
        color: #555
    }

    body, button, dd, dl, fieldset, form, h1, h2, h3, h4, h5, h6, input, legend, ol, p, select, td, textarea, th, ul {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
        -ms-text-size-adjust: none;
        text-size-adjust: none
    }

    h1, h2, h3, h4, h5, h6 {
        font-size: 100%;
        font-weight: 400;
        line-height: 100%
    }

    table {
        font-size: inherit;
        font: 100%
    }

    input, select {
        font: 100% arial, helvetica, clean, sans-serif;
        color: #555
    }

    button {
        overflow: visible
    }

    address, b, cite, em, th {
        font-style: normal;
        font-weight: 400
    }

    li {
        list-style: none
    }

    fieldset, img {
        border: 0
    }

    ins {
        text-decoration: none
    }

    a:-webkit-any-link {
        -webkit-tap-highlight-color: transparent;
        text-decoration: none;
        -webkit-touch-callout: none
    }

    .slide-left-enter {
        transform: translateX(100%);
    }

    .slide-left-enter-active {
        /*transition: all 10s ease;*/
        transition: transform .3s;
    }

    .slide-left-enter-to {
        transform: translateX(0);
    }

    /* .scroll-left-leave {
      transform: translateX(0);
    }
    .scroll-left-leave-active {
      transition: transform .3s;
    }
    .scroll-left-leave-to {
        transform: translateX(-100%);
    } */
    .slide-right-enter {
        transform: translateX(0);
    }

    .slide-right-enter-active {
        transition: transform .3s;
    }

    .slide-right-enter-to {
        transform: translateX(100%);
    }

    .slide-right-leave {
        transform: translateX(0);
    }

    .slide-right-leave-active {
        /*transition: transform .3s;*/
    }

    .slide-right-leave-to {
        transform: translateX(100%);
    }
    .v-touch{
        width: 100%;
        min-height:41rem;
    }
</style>

<style lang="scss">
   @import "./common/css/common";
    $AnimateHook: "animated";
    $AnimateDuration: 0.8s;
    // Mixins

    // Base Style
    .#{$AnimateHook} {
        -webkit-animation-duration: $AnimateDuration;
        animation-duration: $AnimateDuration;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;

        // Modifier for infinite repetition
        &.infinite {
            -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
        }

    }

    // Slide
    @-webkit-keyframes slideInLeft {
        from {
            -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
            visibility: visible;
        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

    }

    @keyframes slideInLeft {
        from {
            -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
            visibility: visible;
        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

    }

    .slideInLeft {
        -webkit-animation-name: slideInLeft;
        animation-name: slideInLeft;
    }

    @-webkit-keyframes slideInRight {
        from {
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
            visibility: visible;
        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

    }

    @keyframes slideInRight {
        from {
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
            visibility: visible;
        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

    }

    .slideInRight {
        -webkit-animation-name: slideInRight;
        animation-name: slideInRight;
    }

    @-webkit-keyframes slideOutLeft {
        from {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

        to {
            visibility: hidden;
            -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
        }

    }

    @keyframes slideOutLeft {
        from {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

        to {
            visibility: hidden;
            -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
        }

    }

    .slideOutLeft {
        -webkit-animation-name: slideOutLeft;
        animation-name: slideOutLeft;
    }

    @-webkit-keyframes slideOutRight {
        from {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

        to {
            visibility: hidden;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }

    }

    @keyframes slideOutRight {
        from {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

        to {
            visibility: hidden;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }

    }

    .slideOutRight {
        -webkit-animation-name: slideOutRight;
        animation-name: slideOutRight;
    }

    @-webkit-keyframes inRight {
        0% {
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0)
        }

        to {
            -webkit-transform: translateZ(0);
            transform: translateZ(0)
        }

    }

    @keyframes inRight {
        0% {
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0)
        }

        to {
            -webkit-transform: translateZ(0);
            transform: translateZ(0)
        }

    }

    @-webkit-keyframes outLeft {
        0% {
            -webkit-transform: translateZ(0);
            transform: translateZ(0)
        }

        to {
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0)
        }

    }

    @keyframes outLeft {
        0% {
            -webkit-transform: translateZ(0);
            transform: translateZ(0)
        }

        to {
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0)
        }

    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }

    .view-in-enter-active,
    .view-out-leave-active {
        position: absolute;
        top: 0;
        width: 100%;
        -webkit-animation-duration: .3s;
        animation-duration: .3s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .view-in-enter-active {
        -webkit-animation-name: inRight;
        animation-name: inRight;
    }

    .view-out-leave-active {
        -webkit-animation-name: outLeft;
        animation-name: outLeft;
    }
</style>
