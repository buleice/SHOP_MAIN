<template>
    <a class="coursre-box" :href="data.url">
        <img class="course-img" @imgLoad="imgLoad" :src="data.icon" alt="">
        <div class="coursre-intro">
            <h4 class="course-title">{{data.title}}</h4>
            <div class="course-desc" v-html="data.subtitle"></div>
        </div>
        <a class="coursre-button">去学习</a>
    </a>
</template>

<script>
    export default {
        name: "coursre-box",
        props:{
            data:{
                type:Object,
                default:null
            }
        },
        methods:{
            imgLoad(){
                this.$emit('imgLoad')
            }
        }
    }
</script>

<style lang="css">
    .course-desc p{
        display: -webkit-box;
        height: auto;
        max-height: 3rem;
        overflow-y: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.875rem;
    }
</style>
<style scoped lang="scss">
    .coursre-box{
        width: 100%;
        height: 6.88rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color:#555;
        .course-img{
            width: 5.25rem;
            height: 5.25rem;
            border-radius: .31rem;
        }
        .coursre-intro{
            width: 10.63rem;
            height: 4.25rem;
            box-sizing: border-box;
            /*padding: .63rem 0;*/
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            text-align: left;
            .course-title{
                max-width: 16.3rem;
                width: 16.3rem;
                line-height: 2;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 1rem;
                color:#2c3e50
            }
            .course-desc{
                max-width: 100%;
                font-size: .875rem;
                color: rgba(0,0,0,.7);
                box-sizing: border-box;
                display: -webkit-box;
                height: auto;
                max-height: 3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                /*padding-left: .5rem;*/
                p{
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp:2;
                    -webkit-box-orient: vertical;
                }
            }

        }
        .coursre-button{
            width: 5rem;
            line-height: 2.25rem;
            border-radius: .63rem;
            text-align: center;
            background-color: #f69f00;
            color: #ffffff;
            margin-top: auto;
            margin-bottom: .63rem;
        }
    }

</style>

