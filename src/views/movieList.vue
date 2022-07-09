<template>
<!--  种类选择-->
  <Header></Header>

  <div style="width: 100%;background-color: #ffffff">
    <div class="category-content">
        <el-form class="category-form" :model="form" label-width="20px" >
          <div v-for="(value, key, index) in formLists" :key="index">
            <el-form-item style="margin: 0;padding-left: 0px;width: 90vw ">
          <span :class="{ active: form[key] === item }" v-for="(item, index1) in value" :key="index1"
                @click="categoryChange(key, item)">
            {{ item }}
          </span>
            </el-form-item>
          </div>
        </el-form>
      <el-divider></el-divider>
      </div>

    <div style="height: 16vw;"></div>

    <div class="play-body">
      <div class="card-frame" v-for="(item, index) in movies.director.length" :key="index">
        <div class="card">
          <el-image class="card-img" fit="cover" :src="movies.poster[item]" />
          <div class="card-caver">{{ movies.evaluation[item] }}</div>
          <div class="mask">
            <div class="movie-detail">
              <h2 class="mask-title">{{ movies.name[item] }} ({{ movies.year[item] }})</h2>
              <el-rate style="float: left"
                  v-model="value"
                  size="large"
                  disabled/>
              <span style="float:left; margin-top: 5px; padding: 0px;font-size: 18px;">&nbsp;{{ movies.evaluation[item] }}</span>
              <div style="width: 100%"><span>{{ movies.style[item] }}</span><span>&emsp;&emsp;{{ movies.name[item] }}</span></div>
              <div>导演: <span>{{ movies.director[item]}}</span></div>
              <div>主演: <span :title="movies.role[item]">{{ movies.role[item] }}</span></div>
              <div>
                <p :title="剧情简介" ></p>
              </div>
            </div>
          </div>
        </div>
        <p class="movie-title">{{ movies.name[item] }}</p>
        <p class="movie-desc " :title="movies.role[item]">主演: {{ movies.role[item] }}</p>
      </div>
    </div>
  </div>

</template>



<script>
import {reactive, ref,onMounted} from "vue";
import Header from '../components/header'
import { useRouter ,useRoute} from "vue-router";
import {get_all_movie, getType} from "../utils/getData";
import axios from "axios";

export default {
  name: "movie",
  components: {Header},
  setup() {
    const routers = useRouter()
    const value = ref(4);
    let keywords = ref(routers.currentRoute.value.params.keywords)
    let formLists = {
      type: ['全部类型', '剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑', '惊悚',
        '恐怖', '犯罪', '音乐', '歌舞', '传记', '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠'],
      region: ['全部地区', '中国大陆', '欧美', '美国', '中国香港', '中国台湾', '日本', '韩国', '英国',
        '法国', '德国', '意大利', '西班牙', '印度', '泰国', '俄罗斯', '伊朗', '加拿大', '澳大利亚',
        '爱尔兰', '其他'],
      year: ['全部年份', '2022', '2021', '2020', '2019', '2010年代', '2000年代', '90年代', '80年代', '70年代', '60年代', '更早']
    }
    let form = reactive({
      type: '全部类型',
      region: '全部地区',
      year: '全部年份',
    })
    let links = reactive([
      {type: '', text: '一阿斯达'},
      {type: 'primary', text: 'primary'},
      {type: 'success', text: 'success'},
      {type: 'info', text: 'info'},
      {type: 'warning', text: 'warning'},
      {type: 'danger', text: 'danger'},
    ])

    const movies = get_all_movie("all_movie")
    console.log(movies.role[1], typeof movies.role[1])

    if (routers.currentRoute.value.params.type){
      form.type=routers.currentRoute.value.params.type
    }


    function categoryChange(key, item) {
      // console.log(key, item)
      form[key] = item
      let data = new FormData;
      data.append("type", form.type)
      data.append("year", form.year)
      data.append("region", form.region)
      console.log(form.type, typeof form.year)
      axios.post('/api/all_movie', data).then(res => {
        sessionStorage.removeItem('all_movie')
        sessionStorage.setItem("all_movie", JSON.stringify(res.data.movies))
        router.push('/movie_list')
      })
    }
    function movieDetail(item){
      1
    }
    // 无限滚动
    onMounted(()=>{
      window.addEventListener('scroll', load);
    })
    let load = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const scrollHeight = document.documentElement.scrollHeight

      if (scrollTop + clientHeight >= scrollHeight-1) {
        // 滚动到底部，逻辑代码
        movieList.push({
          title:'人生大事',
          year:2022,
          score: 7.5/2,
          time:112,
          director:['刘江江'],
          type:['剧情','家庭'],
          img:'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2874262709.webp',
          actor: ['朱一龙','杨恩又','王戈','刘陆','罗京民','吴倩','郑卫莉','陈创','李春嫒','钟宇升','刘亚津','小爱','韩延'],
          review: '殡葬师莫三妹（朱一龙 饰）在刑满释放不久后的一次出殡中，遇到了孤儿武小文（杨恩又 饰），小文的出现，意外地改变了莫三妹对职业和生活的态度。',
          comments: '想起前不久看过的《良辰吉时》，生老病死俱是人生大事，可在这个向死而生的故事里，亲情羁绊的结被浓腔的方言、最细微的柔情解开，' +
              '释放一地鸡毛，亦解构东方人骨子里被牢牢绑缚起来的精神束带。另：朱一龙真的亮了，那种电影感爆棚的表演，愤怒而劲道。',
        })
        movieList.push({
          title:'人生大事',
          year:2022,
          score: 7.5/2,
          time:112,
          director:['刘江江'],
          type:['剧情','家庭'],
          img:'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2874262709.webp',
          actor: ['朱一龙','杨恩又','王戈','刘陆','罗京民','吴倩','郑卫莉','陈创','李春嫒','钟宇升','刘亚津','小爱','韩延'],
          review: '殡葬师莫三妹（朱一龙 饰）在刑满释放不久后的一次出殡中，遇到了孤儿武小文（杨恩又 饰），小文的出现，意外地改变了莫三妹对职业和生活的态度。',
          comments: '想起前不久看过的《良辰吉时》，生老病死俱是人生大事，可在这个向死而生的故事里，亲情羁绊的结被浓腔的方言、最细微的柔情解开，' +
              '释放一地鸡毛，亦解构东方人骨子里被牢牢绑缚起来的精神束带。另：朱一龙真的亮了，那种电影感爆棚的表演，愤怒而劲道。',
        })
        movieList.push({
          title:'人生大事',
          year:2022,
          score: 7.5/2,
          time:112,
          director:['刘江江'],
          type:['剧情','家庭'],
          img:'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2874262709.webp',
          actor: ['朱一龙','杨恩又','王戈','刘陆','罗京民','吴倩','郑卫莉','陈创','李春嫒','钟宇升','刘亚津','小爱','韩延'],
          review: '殡葬师莫三妹（朱一龙 饰）在刑满释放不久后的一次出殡中，遇到了孤儿武小文（杨恩又 饰），小文的出现，意外地改变了莫三妹对职业和生活的态度。',
          comments: '想起前不久看过的《良辰吉时》，生老病死俱是人生大事，可在这个向死而生的故事里，亲情羁绊的结被浓腔的方言、最细微的柔情解开，' +
              '释放一地鸡毛，亦解构东方人骨子里被牢牢绑缚起来的精神束带。另：朱一龙真的亮了，那种电影感爆棚的表演，愤怒而劲道。',
        })
        movieList.push({
          title:'人生大事',
          year:2022,
          score: 7.5/2,
          time:112,
          director:['刘江江'],
          type:['剧情','家庭'],
          img:'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2874262709.webp',
          actor: ['朱一龙','杨恩又','王戈','刘陆','罗京民','吴倩','郑卫莉','陈创','李春嫒','钟宇升','刘亚津','小爱','韩延'],
          review: '殡葬师莫三妹（朱一龙 饰）在刑满释放不久后的一次出殡中，遇到了孤儿武小文（杨恩又 饰），小文的出现，意外地改变了莫三妹对职业和生活的态度。',
          comments: '想起前不久看过的《良辰吉时》，生老病死俱是人生大事，可在这个向死而生的故事里，亲情羁绊的结被浓腔的方言、最细微的柔情解开，' +
              '释放一地鸡毛，亦解构东方人骨子里被牢牢绑缚起来的精神束带。另：朱一龙真的亮了，那种电影感爆棚的表演，愤怒而劲道。',
        })
        movieList.push({
          title:'人生大事',
          year:2022,
          score: 7.5/2,
          time:112,
          director:['刘江江'],
          type:['剧情','家庭'],
          img:'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2874262709.webp',
          actor: ['朱一龙','杨恩又','王戈','刘陆','罗京民','吴倩','郑卫莉','陈创','李春嫒','钟宇升','刘亚津','小爱','韩延'],
          review: '殡葬师莫三妹（朱一龙 饰）在刑满释放不久后的一次出殡中，遇到了孤儿武小文（杨恩又 饰），小文的出现，意外地改变了莫三妹对职业和生活的态度。',
          comments: '想起前不久看过的《良辰吉时》，生老病死俱是人生大事，可在这个向死而生的故事里，亲情羁绊的结被浓腔的方言、最细微的柔情解开，' +
              '释放一地鸡毛，亦解构东方人骨子里被牢牢绑缚起来的精神束带。另：朱一龙真的亮了，那种电影感爆棚的表演，愤怒而劲道。',
        })
      }

    }
    return {
      form,
      formLists,
      movies,
      links,
      value,
      load,
      categoryChange,
      movieDetail,
    }
  }
}
</script>

<style lang="scss" scoped>
.category-content {
  position: absolute;
  width: 100%;
  height: 16vw;
  left: 0px ;
  overflow: hidden;
  background-color: #F8F8F8;
  .category-form{
    margin: 1vw 3vw;
    padding-bottom: 20px;
  }
}

span {
  color: black;
  font-size: 20px;
  margin-top: 20px;
  padding-left: 5px;
  padding-right: 5px;
}

span.active {
  font-weight: bold;
  color: black;
  border-radius: 14px;
  background-color: #e1e1e1;
}

.infinite-list {
  height: 300px;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.play-body{
  width: 95%;
  margin: 0 5%;
  text-align: center;
  .card-frame{
    width: 18%;
    margin: 5px 5px;
    float: left;
  }
  .card{
    position: relative;
    height: 50vh;
    width: 100%;
    .card-img{
      margin-top: 3px;
      height: 97%;
      width: 95%;
    }
    .card-caver{
      position: absolute;
      background-color: rgba(155, 152, 152, 0.3);
      bottom: 8px;
      right: 10px;
      font-size: 18px;
      color: #fa3a3a;
    }
    .mask{
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      text-align:left;
      background-color: #ffffff;
      opacity: 0;
      z-index: 100;
      transition: all 0.2s ease-in-out;
      .movie-detail {
        padding: 20px;

        .mask-title{
          margin-top: 0;
          margin-bottom: 0;
        }
        div{
          font-size: 14px;
          margin-top: 5px;
          span {
            color: #696969;
          }
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        p {
          font-size: 14px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
      .movie-comments{
        width: 100%;
        background-color: #d9d9d9;
        p{
          padding: 20px;
        }
      }
      &:hover {
        opacity: 1;
        z-index: 101;
        -ms-transform: scale(1.2);
        -webkit-transform: scale(1.5);
        transform: scale(1.2);
        box-shadow: 0 0 20px -5px ;
      }
    }
  }

  .movie-title{
    text-align:left;
    font-weight: bold;
    font-size: 16px;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
  .movie-desc{
    text-align:left;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
}


</style>
