<!--
 * @Description: 赠送课程页面
 * @Author: dylan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-20 17:50:50
 * @LastEditTime: 2019-04-09 14:20:25
 -->
<template>
    <div>
        <div class="receive-course">
            <div class="course-info">
                <h3>课程名:《{{lesson.title}}》</h3>
                <div class="subtitle" v-html="lesson.subtitle"> </div>
                <div class="container">
                    <div class="hour"><img src="//udata.youban.com/webimg/wxyx/puintuan/hour-icon-2.png"
                            alt=""><span>课时：{{lesson.num}}</span></div>
                    <div class="price"><img src="//udata.youban.com/webimg/wxyx/puintuan/price-icon-2.png"
                            alt=""><span>价格：{{lesson.price}}元</span></div>
                    <div class="price"><img src="//udata.youban.com/webimg/wxyx/puintuan/age-icon-2.png"
                            alt=""><span>年龄：{{lesson.minAge+'-'+lesson.FmaxAge}}岁</span></div>
                </div>
            </div>
            <div class="receive-button" @click="receiveCourse"></div>
        </div>
    </div>
</template>
<script>
    import {
        GET_SHARE_COURSE_INFO
    } from '../../api/pageDataApis'
    import {
        wxShare
    } from '../../api/wx-share';
    export default {
        name: 'receive-course',
        data() {
            return {
                lesson: {},
                nick: ''
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.initData();
            })
        },
        methods: {
            initData() {
                const data = this.$route.query;
                GET_SHARE_COURSE_INFO(data).then(
                    res => {
                        this.lesson = res.data.data;
                        this.nick = res.data.nick;
                        wxShare({
                            title: `你的好友${this.nick}送给你一堂优学好课：${this.lesson.title}`,
                            desc: '知识共享，收获成长！快去看看吧~',
                            link: `${location.origin}/receiveCourse?id=${this.$route.query.id}&shareKey=${this.$route.query.shareKey}`,
                            imgUrl: 'https://udata.youban.com/webimg/wxyx/puintuan/shop-icon.png',
                        })
                    }
                )
            },
            receiveCourse() {
                this.$message.info('请点击微信右上角按钮分享给朋友')
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import url(../../common/css/common.scss);

    .receive-course {
        width: 100%;
        height: 0;
        padding-top: 183%;
        background: url('//udata.youban.com/webimg/wxyx/puintuan/share-course-bg.png') no-repeat;
        background-size: 100% auto;
        position: relative;
        margin-top: -3.9rem;

        .avatar {
            width: 3.3rem;
            border-radius: 50%;
            border: 2px solid #ffffff;
            position: absolute;
            top: 4.9rem;
            left: 1.625rem;
        }

        .ad-word {
            position: absolute;
            top: 6.8rem;
            left: 6.5rem;
            color: #fa7b3d;
            font-weight: bold;
        }

        .course-info {
            position: absolute;
            width: 100%;
            top: 14.3rem;
            left: 50%;
            transform: translateX(-50%);

            h3 {
                font-size: 1.13rem;
                font-weight: 550;
                padding-bottom: .4rem;
                color: #f75600;
            }

            .subtitle {
                margin-bottom: 1.425rem;
                /deep/ p {
                    font-size: .725rem;
                    width: 70%;
                    overflow: hidden;
                    white-space: pre-wrap;
                    margin: auto;
                }
            }

            .container {
                font-size: 1.06rem;
                .hour,
                .price {
                    overflow: hidden;
                    box-sizing: border-box;
                    margin: 1rem auto;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;

                    img {
                        width: 1.15rem;
                        margin-right: .7rem;
                        margin-left: 8rem;
                    }

                    img,
                    span {
                        display: inline-block;
                        vertical-align: middle;
                        float: left;
                    }
                }
            }

        }

        .receive-button {
            width: 11.53rem;
            height: 3.18rem;
            background: url('//udata.youban.com/webimg/wxyx/puintuan/give-friend.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 36.5625rem;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .intro {
        /deep/ img {
            max-width: 100%;
            user-select: none;
        }

    }
</style>