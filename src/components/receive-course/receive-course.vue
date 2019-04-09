<!--
 * @Description: 领取课程页面
 * @Author: dylan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-20 17:50:50
 * @LastEditTime: 2019-04-09 14:19:55
 -->
<template>
    <div>
        <div class="receive-course">
            <img class="avatar" :src="headimg" alt="">
            <div class="ad-word" v-if="nick.length<=5">你的好友{{nick}}送给你一堂优学好课</div>
            <marquee class="ad-word" v-else behavior="scroll">你的好友{{nick}}送给你一堂优学好课</marquee>
            <div class="course-info">
                <h3>课程名字《{{lesson.title}}》</h3>
                <div class="container">
                    <div class="hour"><img src="//udata.youban.com/webimg/wxyx/puintuan/hour -icon.png"
                            alt=""><span>课时：{{lesson.num}}</span></div>
                    <div class="price"><img src="//udata.youban.com/webimg/wxyx/puintuan/price-icon.png"
                            alt=""><span>价格：{{lesson.price/100}}元</span></div>
                </div>
            </div>
            <div class="receive-button" v-if="available==1" @click="receiveCourse"></div>
            <div class="receive-button-info" v-else></div>
        </div>
        <div class="intro" v-html="lesson.intro"></div>
    </div>

</template>
<script>
    import {
        GET_RECEIVE_COURSE_INFO,
        RECEIVE_COURSE
    } from '../../api/pageDataApis'
    // import {
    //     wxShare
    // } from '../../api/wx-share';
    export default {
        name: 'receive-course',
        data() {
            return {
                headimg: '',
                lesson: {},
                available: 1,
                nick: '',
                giveId: ''
            }
        },
        mounted() {
            const data = this.$route.query;
            GET_RECEIVE_COURSE_INFO(data).then(
                res => {
                    this.headimg = res.data.headimg;
                    this.lesson = res.data.lesson;
                    this.available = res.data.available;
                    this.giveId = res.data.giveId;
                    this.nick = res.data.nick;
                }
            )
            // wxShare({
            //     title:`你的好友${this.nick}送给你一堂优学好课：${this.lesson.title}`,
            //     desc: '知识共享，收获成长！快去看看吧~',
            //     link: `${location.origin}/shop/index?from=default#/receiveCourse?id=${this.$route.query.id}&shareKey=${this.$route.query.shareKey}`,
            //     imgUrl: 'https://udata.youban.com/webimg/wxyx/puintuan/shop-icon.png',
            // })
        },
        methods: {
            receiveCourse() {
                if (this.available == 1) {
                    RECEIVE_COURSE({
                        id: this.giveId
                    }).then(res => {
                        if (res.data.rc === 0) {
                            this.$message.info('课程领取成功')
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'receiveSuccess',
                                    query: {
                                        id: this.$route.query.id
                                    }
                                })
                            }, 1500)
                        } else {
                            console.log(res)
                            this.$message.info(res.data.msg)
                        }

                    }).catch((error) => {
                        this.$message.info(error)
                    })
                } else {
                    this.$message.info('课程领取失败')
                }
            }

        }
    }
</script>
<style lang="scss" scoped>
    @import url(../../common/css/common.scss);

    .receive-course {
        width: 100%;
        height: 0;
        padding-top: 125%;
        background: url('//udata.youban.com/webimg/wxyx/puintuan/receive-course-bg.png') no-repeat;
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
            top: 11.3rem;
            left: 50%;
            transform: translateX(-50%);

            h3 {
                font-size: 1.13rem;
                font-weight: 550;
                padding-bottom: .4rem;
            }

            .container {

                .hour,
                .price {
                    overflow: hidden;
                    box-sizing: border-box;
                    margin-top: .4rem;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;

                    img {
                        width: 1.1rem;
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
            background: url('//udata.youban.com/webimg/wxyx/puintuan/receive-button.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 19.46rem;
            left: 50%;
            transform: translateX(-50%);
        }

        .receive-button-info {
            width: 11.53rem;
            height: 3.18rem;
            background: url('//udata.youban.com/webimg/wxyx/puintuan/receive-button2.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 19.46rem;
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