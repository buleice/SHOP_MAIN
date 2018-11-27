<template>
    <div class="coursre-box">
        <img class="course-img" src="//udata.youban.com/webimg/wxyx/meima/m4/list_img/09.png" alt="">
        <div class="coursre-intro">
            <h4 class="course-title">小伴龙卫生习惯课</h4>
            <p class="course-desc">小伴龙小伴龙小伴龙小伴伴龙小伴龙小伴龙</p>
        </div>
        <a class="coursre-button">去学习</a>
    </div>
</template>

<script>
    export default {
        name: "coursre-box"
    }
</script>

<style scoped lang="scss">
    .coursre-box{
        width: 100%;
        height: 110px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid rgba(0,0,0,.2);
        .course-img{
            width: 84px;
            height: 84px;
            border-radius: 5px;
        }
        .coursre-intro{
            width: 170px;
            height: 84px;
            box-sizing: border-box;
            padding: 10px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            text-align: left;
            .course-title{
                max-width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 13px;
            }
            .course-desc{
                max-width: 100%;
                overflow: hidden;
                font-size: 10px;
                color: rgba(0,0,0,.7);
            }

        }
        .coursre-button{
            width: 80px;
            line-height: 36px;
            border-radius: 10px;
            text-align: center;
            background-color: #f69f00;
            color: #ffffff;
            margin-top: auto;
            margin-bottom: 10px;
        }
    }

</style>
