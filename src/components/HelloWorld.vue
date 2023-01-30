<template>
  <div class="main">
    <ul class="nav nav-tabs pre-scrollable" role="tablist">
      <li :class="{active: year===currentYear}"
          role="presentation"
          v-for="(year,index) in years" :key="index">
        <a :href="'#'+year" role="tab" data-toggle="tab" @click="changeYear(year)">{{year}}</a>
      </li>
    </ul>
    <div></div>

    <div class="year-content">
      <div class="month">
        <div class="currentYear">{{currentYear}}</div>

        <div v-for="(item, index) in contents" :key="index" class="nav2">
          <div class="mark">
            <div class="line"></div><div class="node"></div><div class="line"></div>
          </div>
          <div style="display: flex; align-items: center;">
            <a :href="'#'+item.month">{{getMonth(item.month)}}</a>
          </div>
        </div>

        <div class="settings">
<!--          <b-form-group label="Inline switch style checkboxes">-->
<!--            <b-form-checkbox-group-->
<!--              v-model="selected"-->
<!--              :options="options"-->
<!--              switches-->
<!--            ></b-form-checkbox-group>-->
<!--          </b-form-group>-->
        </div>
      </div>

      <div class="day">
        <div v-for="(item, index) in contents" :id="item.month" :key="index">
          <span>{{getMonth(item.month)}}</span>
          <Daily v-for="(item2, index) in item.content" :key="index" :content="item2"></Daily>
        </div>
        <div style="height: 50px;
        border-bottom: 1px solid darkgray;
        margin-bottom: 20px"></div>
        <SummerNote @addDiary="updateDiary"></SummerNote>
      </div>
    </div>
  </div>
</template>

<script>
import SummerNote from "./SummerNote";
import Daily from "./Daily";
import {fakeContent, enums} from "./common"
export default {
  name: 'app',
  components: {SummerNote, Daily},
  data(){
    return{
      years:[],
      contents: [],
      currentYear: new Date().getFullYear(),
      filterKeys:[]
    }
  },
  mounted() {
    this.currentYear=new Date().getFullYear();
    for(let i=2021;i<=this.currentYear;i++){
      this.years.push(i);
    }
    this.getContent(this.currentYear)
  },
  methods: {
    changeYear(year){
      this.currentYear=year;
      this.getContent(this.currentYear)
    },
    addFilterKey(key){
      let that=this;
      if(that.filterKeys.indexOf(key)!==-1){
        that.filterKeys.delete(key);
      }
      else{
        this.filterKeys.push(key);
      }
    },
    getMonth(month){
      return enums.toCH[month];
    },
    getContent(year){
      let formData = new FormData()
      formData.append("year", this.currentYear.toString())
      this.axios.post("/GetDiary", formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        this.contents=res.data
      })
    },
    updateDiary(month,data){
      for(let i=0;i<this.contents.length;i++){
        if(month===this.contents[i].month){
          this.contents[i].content.push(data)
          break
        }
      }
    }
  }
}
</script>

<style>
@import "HelloWorld.css";
</style>
