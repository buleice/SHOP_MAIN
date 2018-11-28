<template>
    <LessonList :lessonList="list"></LessonList>
</template>

<script>
    import LessonList from '../base/lesson-list';
    import {Request} from "../../api/request";
    import {mapGetters,mapActions} from 'vuex'
    export default {
        name: "classify-normal",
        components:{
            LessonList
        },
        data(){
            return{
                list:[]
            }
        },
        created(){

        },
        beforeRouteUpdate(){
            this._fetchCategory(this.$route.params.cid)
        },
        activated(){

        },
        methods:{
            _fetchCategory(cid){
                new Request('/shop/category.json', 'GET', {
                    category: cid
                }).returnJson().then(res => {
                    this.setData('list', res.list);
                })
            },
            setData(key,value){
                this[key]=value
            },
            ...mapActions(['setClassifyId'])
        },
        computed:{
            ...mapGetters(['classifyId'])
        },
        watch:{
            classifyId(){
                new Request('/shop/category.json', 'GET', {
                    category: this.classifyId.cid
                }).returnJson().then(res => {
                    this.setData('list', res.list);
                })
            }
        }
    }
</script>

<style scoped>

</style>
