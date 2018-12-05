<template lang="html">
    <div>
        <div class="entry-push" v-if="firstVisit==0"></div>
        <transition name="slide-fade">
            <div class="content" v-if="firstVisit==0">
                <div class="content-header">
                    <h3>不知道给孩子挑选什么课？<br>小伴龙优学帮您定制</h3>
                    <label>宝宝专属课程</label>
                </div>
                <div class="content-body">
                    <h3><span>请选择孩子的年龄段</span></h3>
                    <ul>
                        <li @click.prevent="handleCheck(item)" :class="[age!=null&&item.text==age?'active':'']"
                            v-for="(item,index) in ageList" :key="index">{{item.text}}
                        </li>
                    </ul>
                    <h3><span>孩子对哪方面内容感兴趣</span></h3>
                    <ul ref="interest">
                        <li @click.prevent="handleSelect(item,index)" :class="[recordMultiList.has(item)?'active':'']"
                            v-for="(item,index) in favoriateList" :key="index">{{item}}
                        </li>
                    </ul>
                </div>
                <div class="content-footer">
                    <div class="button" @click.prevent="handleSubmit">开启成长之旅</div>
                    <a @click.prevent="setFirstVisit(1)">跳过</a>
                </div>
                <img class="btn_close_big" src="//udata.youban.com/webimg/wxyx/puintuan/test/btn_close_big@3x.png"
                     @click.stop="setFirstVisit(1)" alt="">
            </div>
        </transition>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import {Request} from "../../../api/request";
    import {addClass, removeClass} from "../../../common/js/dom";
    import {axiosPost} from "../../../api/axios-data";

    export default {
        name: 'entryAd',
        props: ['interest'],
        data() {
            return {
                ageList: [],
                favoriateList: [],
                recordMultiList: new Set(this.interest),
                recordAge: {
                    maxAge: "2",
                    minAge: "0",
                    text: "0-3岁",
                }
            }
        },
        mounted() {
            new Request('/shop/custom/make.json', "GET").returnJson().then(res => {
                this.ageList = res.ageList;
                this.favoriateList = res.favoriteList
            })
        },
        methods: {
            handleSelect(text, index) {
                if (!this.hasInRecord(text)) {
                    addClass(this.$refs.interest.children[index], 'active')
                    this.recordMultiList.add(text)
                } else {
                    this.recordMultiList.delete(text)
                    removeClass(this.$refs.interest.children[index], 'active')
                }

            },
            handleCheck(text) {
                this.recordAge = text;
                this.setAge(text.text)
            },
            hasInRecord(text) {
                if (this.recordMultiList.has(text)) {
                    return true
                } else {
                    return false
                }
            },
            handleSubmit() {
                let set = this.recordMultiList;
                axiosPost('/shop/custom/make.json', {
                    interest: [...set],
                    maxAge: this.recordAge.maxAge,
                    minAge: this.recordAge.minAge,
                }).then(() => {
                    this.setFirstVisit(1)
                    setTimeout(() => {
                        this.$emit('freshData');
                    }, 300)
                })
            },
            ...mapActions(['setFirstVisit', 'setAge'])
        },
        computed: {
            message: {
                get() {
                    return this.$store.state.obj.message
                },
                set(value) {
                    this.$store.commit('updateMessage', value)
                }
            },
            ...mapGetters(['firstVisit', 'age'])
        },
        watch: {
            interest(newVal) {
                this.recordMultiList = new Set(newVal);
            }
        }
    }
</script>

<style>
    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateY(-100%);
        opacity: 0;
    }
</style>
<style lang="scss" scoped>
    .entry-push {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);
        top: 0;
        bottom: 0;
        z-index: 100;
    }
    .content {
        display: block;
        width: 20.235rem;
        height: 32.067rem;
        box-sizing: border-box;
        padding: 2rem .63rem;
        margin: auto;
        position: fixed;
        z-index: 101;
        top: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqMAAARvCAMAAAAbux2vAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABRFBMVEUAAADo5OXo5OXo5OX////o5OXo5OXo5OX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////o5OW5ubm6urrJycn9/f3c2drHxsbm4uPAwMD29vbc3Nz5+fnIyMjGxsbX19f8/PzY2Nje3t6+vr7Rz9D39/e7u7sOvMvSAAAAVXRSTlMA8vNND0yEvvzDFgZVPsl8HBmu7/Pjs0j7SbSocEAH0laV8MI/HqRD+qdzxZbuvRKTFcETQd7KfanGdP3klMzQpb/58ry+zUSmDs4N7fHPG8jE4HsQrqQjSAAACxxJREFUeNrt21dXlFcUgOGjjjL03otUe+8liem9JzAgAiKIMfn/9wECw8wAyo3f2Wvlee68mn32eYfFN4wpZXOm6fTC6aazKYRQw1hNEOcW/nPOMFYT09mFfWcMYzUhNVXP3mQYqwnpVPXspwxjNSEtHDCM1WhUoxp1EVajUY0axkVoVKMuwmo0qlGNugir0ahhrEajGtWoi7AajWpUoy7CNBp1EVajUY1q1EVYjUY1ajXOrlGNugir+aBKg52Xf+3vm/9was4+n12oYf6Pq+nr77jcOVg6eaBdV66WXYRpCh+mfPXK3IkKbR8ouwjTZBqmPDD73kLHZ1yEabIOMzP+zkK7L7gI02Qf5kL38Ym2TbsIjQYYZrrtmEJbb7kIjQYZ5tbEUYn+8GWRMzyvOfvr3PcQahir2XXn5uFEb39S5ATrGzVn31jPew+hhrGaPc9uH/rQ/utC352vKjVnr7x6nvVHRaRhrKbq+4aP9FtvFHr2rUrd2StbOS8i1DBWc+BGa12jU4W++N+LDWdfXMt3D6GGsZpaU3UfOhV79peVhrNXXua7iFDDWE2dyYNEf+kt9qWXDp19Kd9FhBrGaur0dlUb7Sn47KuHzv5XvosINYzV1OvZT/Re0Wf/Z/u0K9Wjr2z/q5LvIkINYzUNLu412pzj/blcPfty/h8WYYaxmgbNe1/Gy/J7zovq2V/k/6UrzDBW06h9t9GBLM+Llbd7R39byf/wGmYYq2k0sJNoy1Dhr7vzudv2O3R5ZWFleefdmf1DwDDDWE2joZbtRscyHH6rUm8zYxWxhrGaRmM5npjmd/8OXCv7H6XjDGM1Rzw1lco5Dr++UXP0/F/uCTSM1TQol9JwnsO/3lzcO/niZvYvSYYaxmoaDKc/cp1+7c3S6uLq0pu1+QBCDWM1dR6m0XmIbDR1WAKhdaR+SyC0j1KfJRDaF8kOCE6jaBQ0ikZBo6BRNAoaRaOgUdAoGgWNgkbRKGgUjYJGQaNoFDQKGkWjoFE0ChoFjaJR0CgaBY2CRtEoaBQ0ikZBo2gUNAoaRaOgUdAoGgWNolHQKGgUjYJGQaNoFDSKRkGjoFE0ChpFo6BR0CgaBY2CRtEoaBSNgkZBo2gUNAoaRaOgUTQKGgWNolHQKBoFjYJG0ShoFDSKRkGjaBQ0ChpFo6BR0CgaBY2iUdAoaBSNgkZBo2gUNIpGQaOgUTQKGkWjoFHQKBoFjYJG0ShoFI2CRkGjaBQ0ChpFo6BRNAoaBY2iUdAoaBSNgkbRKGgUNIpGQaNoFDQKGkWjoFHQKBoFjaJR0ChoFI2CRkGjaBQ0ikZBo6BRNAoaRaOgUdAoGgWNgkbRKGgUjYJGQaNoFDQKGkWjoFE0ChoFjaJR0ChoFI2CRtEoaBQ0ikZBo2gUNAoaRaOgUdAoGgWNolHQKGgUjYJGQaNoFDSKRkGjoFE0ChpFo6BR0CgaBY2CRtEoaBSNgkZBo2gUNAoaRaOgUTQKGgWNolHQKGgUjYJG0ShoFDSKRkGjaBQ0ChpFo6BR0CgaBY2iUdAoaBSNgkZBo2gUNIpGQaOgUTQKGgWNolHQKBoFjYJG0ShoFI2CRkGjaBQ0ChpFo6BRNAoaBY2iUdAoaBSNgkbRKGgUNIpGQaNoFDQKGkWjoFHQKBoFjaJR0ChoFI2CRkGjaBQ0ikZBo6BRNAoaBY2iUdAoGgWNgkbRKGgUjYJGQaNoFDQKGkWjoFE0ChoFjaJR0ChoFI2CRtEoaBQ0ikZBo2gUNAoaRaOgUdAoGgWNolHQKGgUjYJGQaNoFDSKRkGjoFE0ChoFjaJR0CgaBY2CRtEoaBSNgkZBo2gUNAoaRaOgUTQKGgWNolHQKGgUjYJG0ShoFDSKRkGjoFE0ChpFo6BR0CgaBY2iUdAoaBSNgkZBo2gUNIpGQaOgUTQKGgWNolHQKBoFjYJG0ShoFI2CRkGjaBQ0ChpFo6BRNAoaBY2iUdAoaBSNgkbRKGgUNIpGQaOgUTQKGkWjoFHQKBoFjaJR0ChoFI2CRkGjaBQ0ikZBo6BRNAoaBY2iUdAoGgWNgkbRKGgUjYJGQaNoFDQKGkWjoFE0ChoFjaJR0ChoFI2CRtEoaBQ0ikZBo6BRNAoaRaOgUdAoGgWNolHQKGgUjYJGQaNoFDSKRkGjoFE0ChoFjaJR0CgaBY2CRtEoaBQ0ikZBo2gUNAoaRaOgUTQKGgWNolHQKGgUjYJG0ShoFDSKRkGjoFE0ChpFo6BR0CgaBY2iUdAoaBSNgkZBo2gUNIpGQaOgUTQKGgWNolHQKBoFjYJG0ShoFDSKRkGjaBQ0ChpFo6BRNAoaBY2iUdAoaBSNgkbRKGgUNIpGQaOgUTQKGkWjoFHQKBoFjaJR0ChoFI2CRkGjaBQ0ikZBo6BRNAoaBY2iUdAoGgWNgkbRKGgUNIpGQaNoFDQKGkWjoFE0ChoFjaJR0ChoFI2CRtEoaBQ0ikZBo6BRNAoaRaOgUdAoGgWNgkbRKGgUjYJGQaNoFDSKRkGjoFE0ChoFjaJR0CgaBY2CRtEoaBQ0ikZBo2gUNAoaRaOgUTQKGgWNolHQKGgUjYJG0ShoFDSKRkGjoFE0ChpFo6BR0CgaBY2CRtEoaBSNgkZBo2gUNIpGQaOgUTQKGgWNolHQKBoFjYJG0ShoFDSKRkGjaBQ0ChpFo6BRNAoaBY2iUdAoaBSNgkbRKGgUNIpGQaOgUTQKGkWjoFHQKBoFjYJG0ShoFI2CRkGjaBQ0ikZBo6BRNAoaBY2iUdAoGgWNgkbRKGgUNIpGQaNoFDQKGkWjoFHQKBoFjaJR0ChoFI2CRtEoaBQ0ikZBo6BRNAoaRaOgUdAoGgWNgkbRKGgUjYJGQaNoFDSKRkGjoFE0ChoFjaJR0CgaBY2CRtEoaBQ0ikZBo2gUNAoaRaOgUdAoGgWNolHQKGgUjYJG0ShoFDSKRkGjoFE0ChpFo6BR0CgaBY2CRtEoaBSNgkZBo2gUNIpGQaOgUTQKGgWNolHQKBoFjYJG0ShoFDSKRkGjaBQ0ChpFo6BR0CgaBY2iUdAoaBSNgkbRKGgUNIpGQaOgUTQKGkWjoFHQKBoFjYJG0ShoFI2CRkGjaBQ0ChpFo6BRNAoaBY2iUdAoGgWNgkbRKGgUNIpGQaNoFDQKGkWjoFHQKBoFjaJR0ChoFI2CRtEoaBQ0ikZBo6BRNAoaRaOgUdAoGgWNgkbRKGgUjYJGQaNoFDQKGkWjoFE0ChoFjaJR0CgaBY2CRtEoaBQ0ikZBo2gUNAoaRaOgUdAoGgWNolHQKGgUjYJG0ShoFDSKRkGjoFE0ChpFo6BR0CgaBY2CRtEoaBSNgkZBo2gUNAoaRaOgUTQKGgWNolHQKBoFjYJG0ShoFDSKRkGjaBQ0ChpFo6BR0CgaBY2iUdAoaBSNgkZBo2gUNIpGQaOgUTQKGkWjoFHQKBoFjYJG0ShoFI2CRkGjaBQK8nnqswRC+zH1WwKh/Z46LIHQOtKoJRDaaOq0BEJ7mIYtgdCGU6lsCwRW/jOlZmsgsOaU0pg1ENjYdqMtQ/ZAWEMt242mEYsgrJGdRFO7RRBW+26jnpoI/cS046JVENQ3e42mHrsgpJ79RFNXr20QUG9XtdE0aR0ENJlqXLMPwrlWm2hq/cxGCOZOa12j6e55OyGU83dTg5afbYVIibakQ777yl4IY+ZmOsLExzZDEFMT6Wht05ZDAD+1pWN1f2o/ZPdtd3qXcV8wIa/f7qX3mR15ak9k8nRkNp3E3JPH/iMexSs/fjKXTqw02Pnowf3rl+yNAly6fv/Bo87B0tEx/gurhy3BEB57NwAAAABJRU5ErkJggg==");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .content-header {
            h3 {
                line-height: 1.25rem;
            }
            label {
                display: inline-block;
                width: 8.5rem;
                line-height: 2rem;
                font-size: 1rem;
                font-weight: 700;
                color: #ec6941;
                border: 1px solid currentColor;
                border-radius: 1rem;
                margin-top: .31rem;
            }
        }
        .content-body {
            text-align: left;
            h3 {
                line-height: 1.25rem;
                position: relative;
                margin-top: 1rem;
                span {
                    font-size: 1rem;
                    font-weight: 700;
                    position: relative;
                    padding-left: .44rem;
                    &::before {
                        content: '';
                        display: block;
                        width: .31rem;
                        height: 1.25rem;
                        background: #f69f00;
                        position: absolute;
                        top: auto;
                        left: 0;
                    }
                }
            }
            ul {
                li {
                    float: left;
                    width: 4.06rem;
                    line-height: 1.88rem;
                    margin: .94rem .25rem 0;
                    border-radius: .5rem;
                    border: 1px solid rgba(0, 0, 0, .2);
                    text-align: center;
                    &.active {
                        color: #ffffff;
                        background-color: #f69f00;
                        border: 1px solid currentColor;
                    }
                }
                &::after {
                    content: '';
                    display: block;
                    clear: both;
                }
            }
        }
        .content-footer {
            .button {
                width: 10.13rem;
                line-height: 2.25rem;
                border-radius: 1.13rem;
                color: #ffffff;
                background: #ec6941;
                text-align: center;
                margin: 1rem auto .94rem;
            }
            a {
                color: rgba(0, 0, 0, .3);
                text-decoration-line: underline;
            }
        }
        .btn_close_big {
            width: 2.63rem;
            position: absolute;
            right: -1rem;
            top: -1rem;
        }
    }

</style>
