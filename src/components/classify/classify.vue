<template>
  <div class="classify-page">
    <div class="classify-content">
      <div>
        <ul class="classify-banner">
          <li
            v-for="item in categorys"
            :key="item.title"
          >
            <div
              v-if="item.id==101"
              @click="autoPlayTheme(item.id)"
              :class="[locationId==item.id?'active':'']"
            >
              <img
                :src="item.icon"
                alt=""
              >
              <span>{{ item.title }}</span>
            </div>
            <div
              v-else
              @click="autoPlayTheme(item.id)"
              :class="[locationId==item.id?'active':'']"
            >
              <img
                :src="item.icon"
                alt=""
              >
              <span>{{ item.title }}</span>
            </div>
          </li>
          <li
            v-if="!allCategory&&category2.length>10"
            @click="allCategory=true;categorys=category2"
          >
            <b class="pack-down" />
            <span>展开</span>
          </li>
          <li
            v-if="allCategory&&category2.length>10"
            @click="allCategory=false;categorys=category2.slice(0,9)"
          >
            <b class="pack-up" />
            <span>收起</span>
          </li>
        </ul>
        <ClassifyRecommend
          :list="recommendList"
          v-if="showRecommend&&!showLoading"
        />
        <ClassifyNormal
          :lesson-list="normalList"
          v-if="!showRecommend&&!showLoading"
        />
        <!--<Loading v-if="showLoading"></Loading>-->

      </div>
    </div>
    <div
      v-if="showToTop"
      class="sc-htoDjs iOMeRW"
      @click="_topFunction"
    ><span class="iconfont"></span>顶部</div>
  </div>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex'
    const ClassifyRecommend = () => import('./classify-recommend');
    const ClassifyNormal = () => import('../base/lesson-list');
    import Loading from '../base/loading'
    import {getCateGoryInfo} from '../../api/pageDataApis'

    export default {
        name: "Calssify",
        data() {
            return {
                categorys: [],
                category2:[],
                allCategory: false,
                name: 'c-recommend',
                showRecommend: false,
                normalList: [],
                recommendList: [],
                locationId: 100,
                timeLimit: false,
                showToTop:false,
                showLoading:false,
                sourceFrom:'default',
                fromCache:false
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.setData('sourceFrom',from.name)
                vm.autoPlayTheme(parseInt(to.params.cid));
                vm.setShowTabBar(false)
            })
        },
        beforeRouteLeave (to, from, next) {
            this.setShowTabBar(true)
            next()
        },
        created(){
            window.addEventListener('pageshow', function(event) {
                if (event.persisted) {
                    this.fromCache=true;
                }else{
                    this.fromCache=false;
                }
            })
        },
        methods: {
            autoPlayTheme(cid){
                if(cid==4){
                    this.hrefTo(cid)
                }else{
                    if(this.fromCache){
                        this.sourceFrom!='default'&&this.themeIndex!=1000?this.hrefTo(this.themeIndex): this.hrefTo(cid)
                    }else{
                        this.sourceFrom!='default'&&localStorage.getItem('themeIndex')!=1000?this.hrefTo(localStorage.getItem('themeIndex')): this.hrefTo(cid)
                    }
                }
            },
            hrefTo(cid) {
                this.showToTop=false;
                this.allCategory=false;
                this.showLoading=true;
                this.locationId=cid;
                localStorage.setItem("themeIndex", cid);
                this['moduleClassify/setThemeIndex'](cid);
                if (cid == 101) {
                    this.setData('showRecommend', true);
                    getCateGoryInfo({
                        category: cid
                    }).then(response => {
                        const res=response.data;
                        this.category2=res.category2;
                        this.allCategory=false;
                        this.categorys=res.category2.slice(0,9)
                        this.setData('recommendList', res.list);
                        setTimeout(()=>{
                            this.showLoading=false;
                        },300)
                    })
                } else if (cid != 101) {
                    this.setData('showRecommend', false);
                    getCateGoryInfo({
                        category: cid
                    }).then(response => {
                        const res=response.data;
                        this.category2=res.category2;
                        this.allCategory=false;
                        this.categorys=res.category2.slice(0,9)
                        this.setData('normalList', res.list);
                        setTimeout(()=>{
                            this.showLoading=false;
                        },300)
                    })
                }
                this.sourceFrom='default'
            },
            setData(key, value) {
                this[key] = value
            },
            hideToTop(){
                this.showToTop=false
            },
            fshowToTop(){
                this.showToTop=true
            },
            _topFunction(){
                this.$refs.scroll.scrollTo(0,0,300);
                this.showToTop=false
            },
            ...mapActions(['setFirstVisit','setCategory','setShowTabBar','moduleClassify/setThemeIndex'])
        },
        computed:{
            ...mapGetters('moduleClassify',['themeIndex'])
        },
        components: {
            ClassifyRecommend,
            ClassifyNormal,
            Loading
        }
    }
</script>
<style lang="css" scoped>
    .iOMeRW{position:absolute;color:#bbb;background-color:#fff;border:1px solid #ccc;line-height:3.75rem;border-radius:50%;width:2.75rem;height:2.75rem;font-size:0.8rem;text-align:center;right: 1rem;bottom: 1rem}
    .iOMeRW span{color:#999;position:absolute;left:0;top:0;width:100%;height:100%;font-size:1.25rem;line-height:1.5rem}
    .iconfont{font-family:h5index-iconfont;font-style:normal;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:.2px;-moz-osx-font-smoothing:grayscale;font-size:1rem;color:#333}
</style>
<style scoped lang="scss">
    .classify-page {
        .classify-content {
            .classify-banner {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                padding:.5rem 0;
                li {
                    /*width: 20%;*/
                    width: 25%;
                    /*height: 5.38rem;*/
                    box-sizing: border-box;
                    /*box-sizing: border-box;*/
                    /*margin-top: .94rem;*/
                    div {
                        display: inline-block;
                        margin: auto;
                        height: auto;
                        position: relative;
                        box-sizing: border-box;
                        padding: .5rem;
                        img {
                            display: inline-block;
                            width: 2.5rem;
                            margin: auto;
                            position: relative;
                        }
                        span {
                            display: block;
                        }
                        &.active{
                            background: #e5e5e5;
                            border-radius: 10px;
                        }
                        /*&.active::after {*/
                            /*content: '';*/
                            /*display: block;*/
                            /*position: relative;*/
                            /*width: 2.19rem;*/
                            /*height: 0;*/
                            /*border-bottom: .13rem solid #f69f00;*/
                            /*margin: auto;*/
                        /*}*/
                    }
                    b {
                        display: inline-block;
                        width: 2.5rem;
                        height: 2.5rem;
                        margin: auto;
                        position: relative;
                        &.pack-up::after {
                            content: "";
                            position: absolute;
                            width: 0.5rem;
                            height: 0.5rem;
                            border-top: 1px solid #656565;
                            border-right: 1px solid #656565;
                            top: 50%;
                            transform: translate(-50%, -50%) rotate(-45deg);
                        }
                        &.pack-down::after {
                            content: "";
                            position: absolute;
                            width: 0.5rem;
                            height: 0.5rem;
                            border-top: 1px solid #656565;
                            border-right: 1px solid #656565;
                            top: 50%;
                            transform: translate(-50%, -50%) rotate(-225deg);
                        }
                    }
                    span {
                        display: block;
                    }
                }
            }
        }
    }

</style>
