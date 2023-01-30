<template>
  <div class="back">
    <div class="info" v-if="content.date!==null">
      <span>{{content.date}}</span>
      <span>{{content.location}}</span>
    </div>
    <p v-html="content.diary"></p>
  </div>
</template>

<script>
export default {
  name: "Daily",
  props: {
    content: {
      type:Object
    }
  }
}
</script>

<style scoped>
  .back {
    background: rgba(255,255,255,0.7);
    padding: 10px;
    margin: 10px 0 10px 0;
  }
  .info{
    display: grid;
    grid-template-columns: 40% 60%;
    margin-bottom: 10px;
  }
</style>
