<template>
    <div class="coursre-box">
        <img class="course-img" @imgLoad="imgLoad" :src="data.icon" alt="">
        <div class="coursre-intro">
            <h4 class="course-title">{{data.title}}</h4>
            <div class="course-desc" v-html="data.subtitle"></div>
        </div>
        <a class="coursre-button" href="/purchse/index/id=5be267f7efcba42c2c485c13" :data-id="data.id">去学习</a>
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
        display: block;
        height: auto;
        max-height: 2.88rem;
        overflow-y: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
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
        .course-img{
            width: 5.25rem;
            height: 5.25rem;
            border-radius: .31rem;
        }
        .coursre-intro{
            width: 10.63rem;
            height: 5.25rem;
            box-sizing: border-box;
            /*padding: .63rem 0;*/
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            text-align: left;
            .course-title{
                max-width: 100%;
                line-height: 2;
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

