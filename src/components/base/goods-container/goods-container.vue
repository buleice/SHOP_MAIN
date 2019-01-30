<template>
    <div>
        <div v-for="(item,index) in indexPageData.list" :key="index" style="overflow: hidden">
            <div class="recommend-box">
                <div class="recommend-banner">
                    <div><img :src="item.icon" alt="" :key="item.icon">&nbsp;<span>{{item.title}}</span></div>
                    <router-link v-if="index>0&&index!=1" :to="'/shop/classify/'+item.id">更多</router-link>
                    <router-link v-if="index==1" :to="'/shop/crunchies/'+item.id">更多</router-link>
                </div>
                <!--给孩子独一无二的推荐-->
                <div v-if="index==0" class="course-list">
                    <div class="subhead">孩子喜欢的才是最好的课程</div>
                    <div class="personDiy" @click="showDiyCard"><span>&nbsp;填写孩子信息</span></div>
                    <EntryAd @freshData="_initPageData" :interest="indexPageData.interest"></EntryAd>
                     <div class="courses">
                         <a class="coursre-box1" :href="item2.url" v-for="(item2,index2) in item.list" :key="index2">
                             <div class="img-box">
                                 <img class="course-img" v-lazy="item2.banner" :key="item2.banner" alt="">
                                 <div class="class-info"><img v-if="item2.lesson_type==2" class="icon" src="../../../assets/音频.png" alt=""><img class="icon" v-else src="../../../assets/视频.png" alt="">&nbsp;<span>{{item2.number}}</span></div>
                             </div>
                             <h4 class="course-title2">{{item2.title}}</h4>
                             <div class="label"><span>{{item2.age}}</span><span class="price">&yen;{{item2.price}}</span></div>
                         </a>
                     </div>
                </div>
                <!--本周热门榜-->
                <div v-if="index==1" class="course-list">
                    <a class="coursre-box" :href="item2.url" v-for="(item2,index2) in item.list" :key="index2">
                        <img class="course-img" v-lazy="item2.banner" :key="item2.banner" alt="">
                        <img class="topLabel" v-if="index2<=2" :src="computedTopLabel(index2)" alt="">
                        <div class="coursre-intro">
                            <h4 class="course-title">{{item2.title}}</h4>
                            <div class="course-label">
                                <span v-if="item2.age">{{item2.age}}</span>
                                <span v-if="item2.number">{{item2.number}}</span>
                            </div>
                            <div class="course-desc">{{item2.sales}}人在学习</div>
                        </div>
                        <a class="coursre-button" href="javascript:void(0);">&yen;{{item2.price}}</a>
                    </a>
                </div>
                <!--精选系列-->
                <div v-if="index==2" class="course-list">
                    <a :href="item.url" class="coursre-box2"  v-for="(item,index) in item.list" :key="index">
                        <img class="big-image" v-lazy="item.banner" :key="item.banner" alt="" >
                    </a>
                </div>
                <!--最新课程-->
                <div v-if="index==3" class="course-list">
                    <div class="courses">
                        <a class="coursre-box1" :href="item2.url" v-for="(item2,index2) in item.list" :key="index2">
                            <div class="img-box">
                                <img class="course-img" v-lazy="item2.banner" :key="item2.banner" alt="">
                                <div class="class-info"><img v-if="item2.lesson_type==2" class="icon" src="../../../assets/音频.png" alt=""><img class="icon" v-else src="../../../assets/视频.png" alt="">&nbsp;<span>{{item2.number}}</span></div>
                            </div>
                            <h4 class="course-title2">{{item2.title}}</h4>
                            <div class="label"><span>{{item2.age}}</span><span class="price">&yen;{{item2.price}}</span></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div></div>
    </div>

</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import EntryAd from '../../base/entry-ad/entry-ad'
    import axios from 'axios'
    export default {
        name: "goods-container",
        methods: {
            splitlabel(str) {
                if (str) {
                    return str.split('/');
                }
            },
            _initPageData(){
                axios.get('/shop/list.json').then(res=>{
                    this['moduleIndex/setIndexPageData'](res.data)
                })
            },
            showDiyCard(){
                this.setFirstVisit(0)
            },
            computedTopLabel(index){
                switch (index) {
                    case 0:return'//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/1@2x_86.png';
                    case 1:return'//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/2@2x.png';
                    case 2:return'//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/3@2x.png';
                    default:return '';
                }
            },
            ...mapActions(['setFirstVisit','moduleIndex/setIndexPageData'])
        },
        created() {

        },
        computed:{
            ...mapGetters('moduleIndex',['indexPageData']),
        },

        components: {
            EntryAd
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../common/css/common";

    .divide {
        width: 100%;
        height: .63rem;
        background: #f5f5f5;
    }
    .recommend-box {
        width: 100%;
        box-sizing: border-box;
        padding: 0 .5rem;
        margin: .63rem 0;
        .recommend-banner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            div {
                font-size: 1.125rem;
                font-weight: 700;
                img {
                    @include img-text-middle;
                    width: 1.25rem;
                }
                span {
                    @include img-text-middle;
                }
            }

            a {
                color: $font-color-info;
                position: relative;
                height: 1.5rem;
                padding-right: .625rem;
                display: inline-block;
                vertical-align: middle;
                transform: translateY(.25rem);
                &::after {
                    content: "";
                    position: absolute;
                    width: 0.5rem;
                    height: 0.5rem;
                    top: 50%;
                    right: 0rem;
                    border-top: 1px solid #656565;
                    border-right: 1px solid #656565;
                    transform: translate(-50%, -70%) rotate(45deg);
                }
            }
        }
        .course-list{
         position: relative;
            .subhead {
                text-align: left;
                text-indent: 1.625rem;
                margin: 0.3rem 0;
                color: $font-color-info;
            }
            .personDiy{
                position: absolute;
                right: -.625rem;
                top: -1.5rem;
                width: auto;
                line-height: 1.25rem;
                background-color: $theme-color1;
                border-radius: 1rem 0 0 1rem;
                padding-right: .25rem;
                span{
                    @include img-text-middle;
                    color: #ffffff;
                    font-size: .75rem;
                    vertical-align: middle;
                    text-indent: 1rem;
                    /*margin-top: .125rem;*/
                }
                &::after{
                    left: .25rem;
                    width: .75rem;
                    content: " ";
                    height: .75rem;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background-image: url('../../../assets/编辑(1).png');
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
                    @include card-shadow;
                }
                .topLabel{
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
                        font-weight: 600;
                    }
                    .course-desc {
                        max-width: 16.25rem;
                        color: rgba(0, 0, 0, .7);
                        box-sizing: border-box;
                        height: auto;
                        max-height: 3rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: $font-color-info;
                        font-size: .75rem;
                        transform:scale(0.9) translateX(-.375rem) ;
                        p {
                            font-size: .75rem;
                            transform: scale(0.9);
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
                            color: $font-color-info;
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
            .coursre-box2{
                img{
                    width: 100%;
                    margin: .5rem 0;
                    border-radius: .63rem;
                    -webkit-box-shadow: 0 0.13rem 0.75rem #888;
                    box-shadow: 0 0.13rem .625rem rgba(0,0,0,.2);
                }
            }
            .courses{
                @include flex-row;
                flex-wrap: wrap;
                justify-content: space-between;
                .coursre-box1 {
                    width: 48%;
                    box-sizing: border-box;
                    @include flex-column;
                    justify-content: space-between;
                    color: #555;
                    position: relative;
                    margin-top: .75rem;
                    .img-box {
                        width: 100%;
                        height: auto;
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
                        margin:0.75rem  0 .315rem 0;
                        text-align: left;
                        font-weight: 600;
                    }
                    .label{
                        margin: .315rem 0;
                        span{
                            &:first-child{
                                float: left;
                                color: $font-color-info;
                                @include circle-label;
                            }
                            &:last-child{
                                color: $font-activity-color;
                                float: right;
                            }
                        }
                        &:after{
                            @include clear-float;
                        }
                    }
                    .class-info{
                        text-align: right;
                        box-sizing: border-box;
                        padding-right: 0.625rem;
                        font-size: .75rem;
                        @include flex-row;
                        align-items: center;
                        height: 1.5625rem;
                        justify-content: flex-end;
                        span,img{
                            @include img-text-middle;
                        }
                        img{
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
