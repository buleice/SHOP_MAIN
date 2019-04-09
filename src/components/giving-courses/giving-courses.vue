<!--
 * @Description: 赠送课程页面
 * @Author: dylan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-20 17:50:50
 * @LastEditTime: 2019-04-09 14:17:57
 -->
<template lang="html">
    <div class="course">
        <div class="noempty" v-if="freeToGive.length==0"><img src="https://udata.youban.com/webimg/other/quesheng.png">
        </div>
        <div class="myGroup" v-for="(item,index) in freeToGive" :key="index">

            <router-link v-if="item.canGive==1" :to="{name:'ShareCourse',query:{id:item.id,shareKey:myShareKey}}"
                class="a_box">
                <img v-lazy="item['banner']" ref="lazy" alt="" class="course-img">
                <div class="groupInfo">
                    <div class="groupInfo_buttton">送给朋友</div>
                </div>
            </router-link>

            <router-link v-else :to="{name:'Course'}" class="a_box">
                <img v-lazy="item['banner']" ref="lazy" alt="" class="course-img">
                <div class="groupInfo">
                    <div class="groupInfo__avatarbox">
                        <span>{{item.receive_time}}</span>&nbsp;&nbsp;<span>赠送给：{{item.receiver}}</span>
                    </div>
                    <div class="groupInfo_buttton" style="background-color:#b5b5b5" v-on:click.prevent.self>已赠送
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {
        mixin
    } from '../../mixins/index'
    import {
        GET_MY_GIVING_COURSE_INFO
    } from '../../api/pageDataApis'

    export default {
        name: 'Usercenter',
        mixins: [mixin],
        data() {
            return {
                freeToGive: [],
                myShareKey: ''
            }
        },
        created() {
            GET_MY_GIVING_COURSE_INFO().then(response => {
                const res = response.data;
                this.freeToGive = res.list;
                this.myShareKey = res.myShareKey;
            })
        },
        methods: {
            setProgressValue(learn, total) {
                return parseInt(parseInt(learn) / total * 100)
            },
            computedAvatarStyle(index, ava, Fmode) {
                if (index == 0) {
                    return 'background-image:url(' + ava['headimg'] + ');z-index:' + parseInt(10 - index) +
                        'display:inline-block;position:relative;width:2.5rem;height:2.5rem;margin-left:.31rem;float:left;border:2px solid #fff;border-radius:50%;background-repeat:no-repeat;background-size:100% 100%';
                } else {
                    let marginLeft = 0.31 - (Fmode - 3) * 8 / 16;
                    return 'background-image:url(' + ava['headimg'] + ');margin-left:' + marginLeft + 'rem;z-index:' +
                        parseInt(10 - index) +
                        'display:inline-block;position:relative;width:2.5rem;height:2.5rem;float:left;border:2px solid #fff;border-radius:50%;background-repeat:no-repeat;background-size:100% 100%';
                }
            },
            addvatar(count, mode) {
                let Rhtml = '';
                for (let i = 0; i < (mode - count); i++) {
                    let style =
                        'background-image:url(//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/what@2x.png);margin-left:' +
                        (0.31 - (mode - 3) * 8 / 16) + 'rem;z-index:' + (8 - i) +
                        'display:inline-block;position:relative;width:2.5rem;height:2.5rem;float:left;border:2px solid #fff;border-radius:50%;background-repeat:no-repeat;background-size:100% 100%';
                    Rhtml += '<i style="' + style + '"></i>';
                }
                return Rhtml
            },
            changeTab(index) {
                this.tabIndex = index;
            }
        }
    }
</script>


<style media="screen" lang="scss" scoped>
    .course {
        background-color: #ffffff;
        padding-bottom: 3.125rem;

        nav {
            width: 12.465rem;
            display: flex;
            justify-content: center;
            margin: 1.25rem auto 1.68rem;
            position: relative;

            li {
                margin: 0 1rem;
                position: relative;

                &:nth-child(1) {
                    &.selected {
                        &~.move {
                            left: 1.4rem;
                            width: 4rem;
                        }
                    }
                }

                &:nth-child(2) {
                    &.selected {
                        &~.move {
                            width: 4rem;
                            right: 1.4rem;
                        }
                    }
                }
            }

            .move {
                height: 2px;
                border-top: 2px solid #f69900;
                /*只需要将上边显示出来*/
                position: absolute;
                top: 1.25rem;
                transition: all .5s ease-in-out 0s;
                /*包含四个过度属性：执行变换属性、执行时间、速率、延迟*/
            }
        }

        .id-card {
            background: url("//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/userbg.png");
            background-repeat: no-repeat;
            background-size: 100% auto;
            padding-top: 58%;
            height: 0;
            position: relative;
            margin-top: -3.125rem;

            .userIcon {
                width: 16vw;
                height: 16vw;
                border-radius: 50%;
                border: 3px solid #fff;
                position: absolute;
                left: 20%;
                top: 54%;
            }

            .bonus_entry {
                width: auto;
                height: auto;
                position: absolute;
                right: 0;
                top: 9.375rem;
                z-index: 100;

                img {
                    width: 4.5rem;
                }
            }

            .spans {
                display: inline-block;
                position: absolute;
                top: 60%;
                left: 45%;

                span {
                    font-size: 1rem;
                    max-width: 9rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 500;
                    text-align: left;
                }
            }
        }

        .myGroup {
            display: block;
            width: 96%;
            height: auto;
            // padding: 0 0.625rem;
            margin: 0.88rem auto;
            position: relative;

            .a_box {
                display: block;
                position: relative;
                background: rgba(0, 0, 0, .1);
                height: auto;
                color: #3c3c3c;
                border-radius: 0.625rem;

                .label {
                    width: 4.25rem;
                    position: absolute;
                    left: 0;
                    top: 0;

                }

                .course-img {
                    display: block;
                    width: 100%;
                    height: auto;
                    max-height: 10.63rem;
                    border-radius: 0.625rem;
                }

                .groupInfo {
                    width: 100%;
                    height: 3rem;
                    line-height: 3rem;
                    color: #fff;
                    padding: 0 0.38rem 0 0;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    border-radius: 0 0 0.625rem 0.625rem;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    background-color: rgba(6, 6, 6, .4);

                    .groupInfo__avatarbox {
                        width: auto;
                        padding: 0 0.61rem 0 0;
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        height: 100%;
                        overflow: hidden;
                        float: left;
                        display: inline-block;
                        vertical-align: middle;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        position: relative;
                        margin-left: 0.63rem;

                        .mypro {
                            background: rgba(6, 6, 6, .4);
                            border: 1px solid #fff;
                            width: 3.75rem;
                            height: 1.25rem;
                            border-radius: 0.88rem;
                            -webkit-appearance: none;
                            overflow: hidden;
                            color: #fff;
                            position: relative;
                            top: 0.25rem;

                            &+span {
                                position: absolute;
                                top: 0.75rem;
                                left: 2.25rem;
                                width: 5.38rem;
                                text-align: center;
                                line-height: 1.75rem;
                                background: transparent;
                            }
                        }
                    }

                    .groupInfo__middleBox {
                        display: inline-block;
                        width: auto;
                        height: 100%;
                        float: left;
                        position: relative;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-orient: vertical;
                        -webkit-box-direction: normal;
                        -ms-flex-direction: column;
                        flex-direction: column;

                        .tuan_label {
                            display: inline;
                            width: auto;
                            max-width: 2.81rem;
                            padding: 0.25rem;
                            margin-top: 0.25rem;
                            line-height: 0.94rem;
                            text-align: center;
                            background-image: url("//udata.youban.com/webimg/wxyx/youxue/_rentuanbg.png");
                            background-repeat: no-repeat;
                            background-size: cover;
                            color: #fff;
                            font-size: 0.625rem;
                            -webkit-box-sizing: border-box;
                            box-sizing: border-box;
                            border-radius: 4px 4px 4px 0;
                        }

                        .remainPeople {
                            display: inline-block;
                            line-height: 1.25rem;
                            margin-left: 0.63rem;
                        }
                    }

                    &::after {
                        content: '';
                        display: block;
                        clear: both;
                    }

                    .groupInfo_buttton {
                        display: block;
                        position: absolute;
                        bottom: 0.625rem;
                        right: 5px;
                        width: 5rem;
                        line-height: 1.8rem;
                        text-align: center;
                        background: #f69f00;
                        border-radius: 1rem;
                        color: #fff;
                    }
                }
            }

        }


        .noempty {
            text-align: center;

            img {
                margin-top: 33%;
                width: 5rem;
            }
        }
    }
</style>
<style media="screen" lang="css">
    ::-webkit-progress-bar {
        background: transparent;
    }

    ::-webkit-progress-value {
        background: #eb6100;
    }
</style>