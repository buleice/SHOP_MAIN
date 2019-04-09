<template>
    <div id="app">
        <div class="v-touch" ref="back">
            <transition :name="transitionName">
                <keep-alive>
                    <router-view />
                </keep-alive>
            </transition>
        </div>
        <ShopNavBar />
        <ScrollToTop ref="scrollToTop" />
    </div>
</template>

<script>
    import ShopNavBar from './components/base/shopnavbar.vue'
    import WxShare from './components/base/wxshare.vue';
    import ScrollToTop from './components/base/totop.vue';
    // import {
    //     wxShare
    // } from './api/wx-share';

    export default {
        name: 'App',
        components: {
            ShopNavBar,
            ScrollToTop,
        },
        data() {
            return {
                transitionName: 'fade-enter', // 默认动态路由变化为slide-right
                touch: {},
                percent: 0,
                rPath: ['/shop/default', '/course', '/bonus/center', '/mine'],
                orientation: 'left',
                isSwiper: false,
                startTime: 0,
                endTime: 0,
                deltaX: 0,
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
                if (this.isSwiper) {
                    if (this.orientation == "left") {
                        this.transitionName = 'slide-left'
                    } else {
                        this.transitionName = 'slide-right'
                    }
                    this.isSwiper = false
                    return
                } else {
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
        mounted() {
            // wxShare({
            //     title: `${window.localStorage.count||1359}位朋友正在小伴龙优学参与拼课，快为宝宝报名有趣的课程吧!`,
            //     desc: '这里的课程生动有趣，快来小伴龙优学陪伴孩子快乐成长吧！',
            //     link: 'https://wxyx.youban.com/shop/index?from=default',
            //     imgUrl: 'https://udata.youban.com/webimg/wxyx/puintuan/shop-icon.png',
            // })
        },
        methods: {
            touchStart(e) {
                this.startTime = e.timeStamp
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
                this.deltaX = deltaX
                if (deltaX < -50) {
                    this.isSwiper = true;
                    this.orientation = "left"
                    if (this.routerArr == '/mine') {
                        return
                    }
                    // this.$refs.back.style.left=X+'px';
                    // const left = this.rPath.indexOf(this.routerArr) > 0 ? -window.innerWidth : 0
                    const left = -50;
                    var offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
                    this.percent = Math.abs(offsetWidth / window.innerWidth)
                    this.$refs.back.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
                    this.$refs.back.style["transitionDuration"] = 10
                }
                if (deltaX > 50) {
                    this.isSwiper = true;
                    this.orientation = "right"
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
                this.endTime = e.timeStamp;
                if (this.endTime - this.startTime <= 300 && Math.abs(this.deltaX) > 30) {
                    this.toggleTab()
                }
                if (this.percent > 0.3) {
                    this.toggleTab()
                } else {
                    offsetWidth = 0;
                    this.$refs.back.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
                    this.$refs.back.style["transitionDuration"] = 10;
                    return;
                }
            },
            toggleTab() {
                let offsetWidth = 0;
                let rpath = this.rPath;
                let pageIndex = rpath.indexOf(this.routerArr)
                this.$refs.back.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
                this.$refs.back.style["transitionDuration"] = 10
                if (this.orientation == "left") {
                    if (pageIndex >= 3) {
                        return
                    }
                    this.$router.push(`${this.rPath[pageIndex + 1]}`)
                } else if (this.orientation == "right") {
                    if (pageIndex <= 0) {
                        return
                    }
                    this.$router.push(`${this.rPath[pageIndex - 1]}`)
                } else {
                    return
                }
            }
        },
    }
</script>

<style>
    @font-face {
        font-family: h5index-iconfont;
        src: url(data:;base64,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ILAFJiAuRyNHI2EjPDgtsDEssAAWILAJI0IgICBGI0ewACsjYTgtsDIssAAWsAMlsAIlRyNHI2GwAFRYLiA8IyEbsAIlsAIlRyNHI2EgsAUlsAQlRyNHI2GwBiWwBSVJsAIlYbABRWMjIFhiGyFZY7ABRWJgIy4jICA8ijgjIVktsDMssAAWILAJQyAuRyNHI2EgYLAgYGawgGIjICA8ijgtsDQsIyAuRrACJUZSWCA8WS6xJAEUKy2wNSwjIC5GsAIlRlBYIDxZLrEkARQrLbA2LCMgLkawAiVGUlggPFkjIC5GsAIlRlBYIDxZLrEkARQrLbA3LLAuKyMgLkawAiVGUlggPFkusSQBFCstsDgssC8riiAgPLAEI0KKOCMgLkawAiVGUlggPFkusSQBFCuwBEMusCQrLbA5LLAAFrAEJbAEJiAuRyNHI2GwBkUrIyA8IC4jOLEkARQrLbA6LLEJBCVCsAAWsAQlsAQlIC5HI0cjYSCwBCNCsAZFKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgR7AEQ7CAYmAgsAArIIqKYSCwAkNgZCOwA0NhZFBYsAJDYRuwA0NgWbADJbCAYmGwAiVGYTgjIDwjOBshICBGI0ewACsjYTghWbEkARQrLbA7LLAuKy6xJAEUKy2wPCywLyshIyAgPLAEI0IjOLEkARQrsARDLrAkKy2wPSywABUgR7AAI0KyAAEBFRQTLrAqKi2wPiywABUgR7AAI0KyAAEBFRQTLrAqKi2wPyyxAAEUE7ArKi2wQCywLSotsEEssAAWRSMgLiBGiiNhOLEkARQrLbBCLLAJI0KwQSstsEMssgAAOistsEQssgABOistsEUssgEAOistsEYssgEBOistsEcssgAAOystsEgssgABOystsEkssgEAOystsEossgEBOystsEsssgAANystsEwssgABNystsE0ssgEANystsE4ssgEBNystsE8ssgAAOSstsFAssgABOSstsFEssgEAOSstsFIssgEBOSstsFMssgAAPCstsFQssgABPCstsFUssgEAPCstsFYssgEBPCstsFcssgAAOCstsFgssgABOCstsFkssgEAOCstsFossgEBOCstsFsssDArLrEkARQrLbBcLLAwK7A0Ky2wXSywMCuwNSstsF4ssAAWsDArsDYrLbBfLLAxKy6xJAEUKy2wYCywMSuwNCstsGEssDErsDUrLbBiLLAxK7A2Ky2wYyywMisusSQBFCstsGQssDIrsDQrLbBlLLAyK7A1Ky2wZiywMiuwNistsGcssDMrLrEkARQrLbBoLLAzK7A0Ky2waSywMyuwNSstsGossDMrsDYrLbBrLCuwCGWwAyRQeLABFTAtAABLuADIUlixAQGOWbkIAAgAYyCwASNEILADI3CwDkUgIEu4AA5RS7AGU1pYsDQbsChZYGYgilVYsAIlYbABRWMjYrACI0SzCgkFBCuzCgsFBCuzDg8FBCtZsgQoCUVSRLMKDQYEK7EGAUSxJAGIUViwQIhYsQYDRLEmAYhRWLgEAIhYsQYBRFlZWVm4Af+FsASNsQUARAAAAA==) format('truetype')
    }
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
    body,
    button,
    dd,
    dl,
    fieldset,
    form,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    input,
    legend,
    ol,
    p,
    select,
    td,
    textarea,
    th,
    ul {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
        -ms-text-size-adjust: none;
        text-size-adjust: none
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: 100%;
        font-weight: 400;
        line-height: 100%
    }

    table {
        font-size: inherit;
        font: 100%
    }

    input,
    select {
        font: 100% arial, helvetica, clean, sans-serif;
        color: #555
    }

    button {
        overflow: visible
    }

    address,
    b,
    cite,
    em,
    th {
        font-style: normal;
        font-weight: 400
    }

    li {
        list-style: none
    }

    fieldset,
    img {
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

    .v-touch {
        width: 100%;
        min-height: 41rem;
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