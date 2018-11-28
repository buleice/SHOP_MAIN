<template>
    <div class="coursre-box">
        <img class="course-img" :src="data.icon" alt="">
        <div class="coursre-intro">
            <h4 class="course-title">{{data.title}}</h4>
            <div class="course-desc" :v-htm="data.subtitle"></div>
        </div>
        <a class="coursre-button" :data-id="data.id">去学习</a>
    </div>
</template>

<script>
    export default {
        name: "coursre-box",
        props:{
            data:{
                type:Object,
                default:null
            }
        }
    }
</script>

<style scoped lang="scss">
    .coursre-box{
        width: 100%;
        height: 6.88rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .course-img{
            width: 5.25rem;
            height: 5.25rem;
            border-radius: .31rem;
        }
        .coursre-intro{
            width: 10.63rem;
            height: 5.25rem;
            box-sizing: border-box;
            padding: .63rem 0;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            text-align: left;
            .course-title{
                max-width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: .81rem;
            }
            .course-desc{
                max-width: 100%;
                overflow: hidden;
                font-size: .63rem;
                color: rgba(0,0,0,.7);
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
