<template>
    <div>
        <div v-for="item in list">
            <div class="divide"></div>
            <div class="recommend-box">
                <div class="recommend-banner"><span>{{item.title}}</span><span :data-id="item.id">更多</span></div>
                <CourseBox class="course" v-for="item2 in item.goodsList" :data="item2"></CourseBox>
            </div>
        </div>
    </div>
</template>

<script>
    import CourseBox from '../course-box/course-box'

    export default {
        name: "recomend-box",
        props: {
            list: {
                type: Object,
                default: null
            }
        },
        created() {
            console.log(this.list)
        },
        components: {
            CourseBox,
        }
    }
</script>

<style scoped lang="scss">
    .divide {
        width: 100%;
        height: 10px;
        background: #f5f5f5;
    }

    .recommend-box {
        width: 100%;
        box-sizing: border-box;
        padding: 0 8px;
        margin: 10px 0;
        .recommend-banner {
            display: flex;
            justify-content: space-between;
            span {
                &:first-child {
                    font-size: 16px;
                    font-weight: 700;
                }
                &:last-child {
                    color: rgba(0, 0, 0, .7);
                    position: relative;
                    padding-right: 20px;
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
        }
        .course {
            border-bottom: 1px solid rgba(0, 0, 0, .2);
            &:last-child {
                border: none;
            }
        }
    }
</style>
