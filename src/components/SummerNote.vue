<template>
  <div>
    <div class="location">
      <input ref="time" placeholder="时间 e.g. 2023/1/28">
      <input ref="loca" placeholder="地点">
    </div>
    <vue-summernote ref="editer" :focus="false" :height="250" :max-height="500"></vue-summernote>
    <div class="submit">
      <div class="get" @click="getVal"></div>
      <span>Submit</span>
    </div>
  </div>
</template>

<script>
import {enums} from "./common";

export default {
  name: 'SummerNote',
  mounted () {
    const self = this
    const editer = self.$refs.editer
    editer.$on('onImageUpload', function (files) {
      // 这里做上传图片的操作，上传成功之后便可以用到下面这句将图片插入到编辑框中
      let formData = new FormData()
      for(let i=0;i<files.length;i++){
        formData.append("file"+i, files[i])
      }
      this.axios.post('/Picture',formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        const list=res.data.split(',')
        for(let i=0;i<list.length;i++){
          let url="http://localhost:8080/somewords/temp/"+list[i]
          editer.run('insertImage', url)
        }
      })
    })
  },
  methods: {
    getVal () {
      // 获取初始值
      const self=this
      const content=self.$refs.editer.run('code')
      const time=self.$refs.time.value
      const month=enums.toEN[time.split('/')[1]]
      const location=self.$refs.loca.value
      let formData = new FormData()
      formData.append("content",content)
      formData.append("time",time)
      formData.append("location",location)
      formData.append("month",month)
      this.axios.post("/Diary", formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        self.$refs.editer.run('code','')
        self.$emit('addDiary', month, {
          date:time,
          location:location,
          type:"richText",
          source:"myself",
          diary:content})
        alert(res.data)
      })
    }
  }
}
</script>

<style>
.submit{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Lucida Calligraphy;
  font-size: large;
}
.get {
  border-radius: 50%;
  background-image: url("../assets/submit.png");
  height: 75px;
  width: 75px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.get:hover{
  cursor: pointer;
  background-image: url("../assets/submit2.png");
}
.location{
  margin: 10px 0;
  display: grid;
  grid-template-columns: 40% 55%;
  grid-column-gap: 10px;
}
.location>input{
  border: none;
  padding: 5px;
}
</style>
