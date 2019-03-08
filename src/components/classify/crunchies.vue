<template>
  <div class="crunchies">
    <div class="recommend-banner">
      <div><img
        src="http://cliveimages.youban.com/20190117/3294170611FhrAp04RRwJ585_--4qvueI-v9rf.png"
        alt=""
      >&nbsp;<span>本周热门榜</span>
      </div>
    </div>
    <div
      class="course-list"
      v-if="!showLoading"
    >
      <a
        class="coursre-box"
        :href="item2.url"
        v-for="(item2,index2) in list"
        :key="index2"
      >
        <img
          class="course-img"
          v-lazy="item2.banner"
          :key="item2.banner"
          alt=""
        >
        <img
          v-if="index2<=2"
          class="topLabel"
          :src="computedTopLabel(index2)"
          alt=""
        >
        <div class="coursre-intro">
          <h4 class="course-title">{{ item2.title }}</h4>
          <div class="course-label">
            <span v-if="item2.age">{{ item2.age }}</span>
            <span v-if="item2.number">{{ item2.number }}</span>
          </div>
          <div class="course-desc">{{ item2.sales }}人在学习</div>
        </div>
        <a
          class="coursre-button"
          href="javascript:void(0);"
        >&yen;{{ item2.price }}</a>
      </a>
    </div>
    <!--<Loading v-else></Loading>-->
  </div>

</template>

<script>
    import {mapActions} from 'vuex';
    import Loading from '../base/loading'
    import {getCrunchies} from '../../api/pageDataApis'

    export default {
        name: "Crunchies",
        data() {
            return {
                list: [],
                showLoading:true
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.initData(to.params.cid);
                vm.setShowTabBar(false)
            })
        },
        beforeRouteLeave(to, from, next) {
            this.setShowTabBar(true)
            next()
        },
        methods: {
            initData(id) {
                getCrunchies({id: id}).then(response => {
                    const res=response.data;
                    this.list = res.list;
                    setTimeout(()=>{
                        this.showLoading=false;
                    },300)
                })
            },
            computedTopLabel(index) {
                switch (index) {
                    case 0:
                        return '//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/1@2x_86.png';
                    case 1:
                        return '//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/2@2x.png';
                    case 2:
                        return '//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/3@2x.png';
                    default:
                        return '';
                }
            },
            ...mapActions(['setShowTabBar'])
        },
        components: {
            Loading
        }

    }
</script>

<style scoped lang="scss">
    @import "../../common/css/common";

    .crunchies {
        box-sizing: border-box;
        padding: .625rem .625rem 0 ;
        .recommend-banner {
            display: flex;
            justify-content: space-between;
            div {
                font-size: 1rem;
                font-weight: 700;
                img {
                    @include img-text-middle;
                    width: 1.25rem;
                }
                span {
                    @include img-text-middle;
                }
            }
        }
        .course-list {
            position: relative;
            .subhead {
                text-align: left;
                text-indent: 1.5rem;
                margin: 0.3rem 0
            }
            .personDiy {
                position: absolute;
                right: -.625rem;
                top: -1.5rem;
                width: 5.93rem;
                height: 1.25rem;
                background-color: $theme-color1;
                border-radius: .625rem 0 0 .625rem;
                span {
                    @include img-text-middle;
                    color: #ffffff;
                    font-size: .75rem;
                    vertical-align: middle;
                    text-indent: 1rem;
                    margin-top: .125rem;
                }
                &::after {
                    left: .25rem;
                    width: .75rem;
                    content: " ";
                    height: .75rem;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background-image: url('../../assets/编辑(1).png');
                    background-repeat: no-repeat;
                    background-size: 100%;
                }
            }
            .coursre-box {
                width: 100%;
                height: 6.88rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                color: #555;
                position: relative;
                .course-img {
                    width: 10.43rem;
                    height: 5.25rem;
                    border-radius: .31rem;
                    margin-right: 0.625rem;
                }
                .topLabel {
                    position: absolute;
                    top: 0.625rem;
                    width: 2.5rem;
                    left: 0.25rem;
                }
                .coursre-intro {
                    box-sizing: border-box;
                    min-height: 5rem;
                    text-align: left;
                    @include flex-column;
                    justify-content: space-around;
                    .course-title {
                        max-width: 11rem;
                        line-height: 1.5;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: 1rem;
                        color: #2c3e50;
                    }
                    .course-desc {
                        max-width: 16.25rem;
                        font-size: .875rem;
                        color: rgba(0, 0, 0, .7);
                        box-sizing: border-box;
                        height: auto;
                        max-height: 3rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        p {
                            color: rgba(0, 0, 0, .7);
                            max-width: 16.25rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                    .course-label {
                        @include img-text-middle;
                        span {
                            @include circle-label;
                            &:first-child {
                                margin-right: 0.375rem;
                            }
                        }
                    }

                }
                .coursre-button {
                    position: absolute;
                    margin-top: auto;
                    bottom: .63rem;
                    right: 0rem;
                    color: $font-activity-color;
                }
            }
            .coursre-box2 {
                img {
                    width: 22.56rem;
                    margin: .5rem auto;
                    border-radius: .63rem;
                    -webkit-box-shadow: 0 0.13rem 0.75rem #888;
                    box-shadow: 0 0.13rem .625rem rgba(0, 0, 0, .2);
                }
            }
            .courses {
                @include flex-row;
                flex-wrap: wrap;
                justify-content: space-between;
                .coursre-box1 {
                    width: 10.375rem;
                    box-sizing: border-box;
                    @include flex-column;
                    justify-content: space-between;
                    color: #555;
                    position: relative;
                    margin-top: .75rem;
                    .img-box {
                        width: 10.375rem;
                        height: 6.625rem;
                        background: $bg-color-white;
                        box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
                        border-radius: .3125rem;
                        .course-img {
                            width: 100%;
                            height: auto;
                            max-height: 5rem;
                            border-radius: .3125rem .3125rem 0 0;
                        }
                    }
                    .course-title2 {
                        max-width: 100%;
                        width: 100%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        color: $font-color-title;
                        margin: .315rem 0;
                        text-align: left;
                    }
                    .label {
                        margin: .315rem 0;
                        span {
                            &:first-child {
                                @include circle-label;
                                float: left;
                            }
                            &:last-child {
                                color: $font-activity-color;
                                float: right;
                            }
                        }
                        &:after {
                            @include clear-float;
                        }
                    }
                    .class-info {
                        text-align: right;
                        box-sizing: border-box;
                        padding-right: 0.625rem;
                        font-size: .75rem;
                        line-height: 1.5625rem;
                        span, img {
                            @include img-text-middle;
                        }
                        img {
                            width: .75rem;
                        }
                    }
                }
            }

            .course {
                border-bottom: 1px solid rgba(0, 0, 0, .2);
                &:last-child {
                    border: none;
                }
            }
        }
    }

</style>
