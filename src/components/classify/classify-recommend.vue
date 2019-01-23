<template>
   <div class="classify-recommend">
       <div v-for="(item,index) in list" :key="index">
           <div class="recommend-box">
               <div class="recommend-banner"><span v-html="item.title"></span></div>
               <p class="recommend-desc" v-html="item.subtitle"></p>
               <CourseBox class="course" v-for="(item2,index2) in item.FgoodsList" @imgLoad="imgLoad"  :data="item2"
                          :key="index2"></CourseBox>
           </div>
       </div>
   </div>
</template>
<script>
    import CourseBox from '../base/course-box/course-box'
    export default {
        name: "classify-recommend",
        props:{
            list:{
                type:Array,
                default:null
            }
        },
        methods:{
            imgLoad(){
                this.$emit('imgLoad')
            }
        },
        components:{
            CourseBox
        },
    }
</script>

<style scoped lang="scss">
    @import "../../common/css/common";
    .divide {
        width: 100%;
        height: .63rem;
        background: #f5f5f5;
    }
    .recommend-box {
        width: 100%;
        box-sizing: border-box;
        padding: .63rem;
        background: #f5f5f5;
        .recommend-banner {
            display: flex;
            justify-content: flex-start;
            span {
                font-size: 1.125rem;
                font-weight: 700;
                position: relative;
                padding-left: .44rem;
                /*&::before{*/
                    /*content: '';*/
                    /*display: block;*/
                    /*width: .31rem;*/
                    /*height: 100%;*/
                    /*background: #f69f00;*/
                    /*position: absolute;*/
                    /*top: 0;*/
                    /*left: 0;*/
                /*}*/
            }
            a {
                color: rgba(0, 0, 0, .7);
                position: relative;
                padding-right: 1.25rem;
                &::after {
                    content: "";
                    position: absolute;
                    width: 0.5rem;
                    height: 0.5rem;
                    top: 50%;
                    right: 0.63rem;
                    border-top: 1px solid #656565;
                    border-right: 1px solid #656565;
                    transform: translate(-50%, -50%) rotate(45deg);
                    -webkit-transform: translateY(-50%) rotate(45deg);
                }
            }
        }
        .recommend-desc{
            text-align: left;
            padding: .5rem 0 0 .44rem;
            color: rgba(0,0,0,.5);
        }
        .course {
            @include card-shadow;
            margin-top: .875rem;
            box-sizing: border-box;
            padding-left: .625rem;
            &:last-child {
                border: none;
            }
        }
    }
</style>
