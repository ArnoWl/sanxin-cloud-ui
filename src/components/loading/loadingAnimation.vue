<template>
  <div>
    <div v-if="animationType == 1 && isShow" class="animation-box">
      <div v-for="(item,index) in 5" :key="index" />
      <!--<div></div>-->
      <!--<div></div>-->
      <!--<div></div>-->
      <!--<div></div>-->
      1123
    </div>
    <div v-else-if="animationType == 2 && isShow" class="animation2-box" />
    <div v-else-if="animationType == 3 && isShow" class="animation3-box" />
    <div v-else-if="animationType == 4 && isShow" class="animation4-box">
      <div class="bounce1" />
      <div class="bounce2" />
    </div>
  </div>

</template>

<script>
export default {
  name: 'LoadingAnimation',
  props: {
    animationType: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    console.log(this.isShow)
  },
  methods: {
    show() {
      this.isShow = true
    },
    close() {
      this.isShow = false
    }

  }
}
</script>

<style scoped>
    .animation-box{
        width: 50px;
        height: 50px;
        margin: 0 auto;
    }
    .animation-box > div{
        background-color: #91BEF0;
        height: 100%;
        width: 4px;
        display: inline-block;
        animation: stretchdelay 1.2s infinite ease-in-out;
        margin-left: 2px;
    }
    .animation-box > div:nth-child(2){
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }
    .animation-box > div:nth-child(3){
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
    }
    .animation-box > div:nth-child(4){
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }
    .animation-box > div:nth-child(5){
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }
    @keyframes stretchdelay {
        0%, 40%, 100% {
            transform: scaleY(0.4);
            -webkit-transform: scaleY(0.4);
        }  20% {
           transform: scaleY(1.0);
           -webkit-transform: scaleY(1.0);
        }
    }

    /*动画2*/
    .animation2-box{
        width: 50px;
        height: 50px;
        margin: 0px auto;
        border: 4px solid rgba(0,0,0,0.2);
        border-left-color: #91BEF0;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        animation:animation2 1.2s infinite;
    }
    @keyframes animation2 {
        0%{
            transform: rotate(0);
        } 100% {
            transform: rotate(360deg);
        }
    }

    /*动画3*/
    .animation3-box{
        width: 50px;
        height: 50px;
        background-color: #91BEF0;
        margin: 0 auto;
        -webkit-animation: animation3 1.2s infinite ease-in-out;
        -o-animation: animation3 1.2s infinite ease-in-out;
        animation: animation3 1.2s infinite ease-in-out;
    }
    @keyframes animation3 {
        0%{
            transform: perspective(120px) rotateX(0) rotateY(0);
        }50%{
             -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(0);
             -moz-transform: perspective(120px) rotateX(-180deg) rotateY(0);
             -ms-transform: perspective(120px) rotateX(-180deg) rotateY(0);
             -o-transform: perspective(120px) rotateX(-180deg) rotateY(0);
             transform: perspective(120px) rotateX(-180deg) rotateY(0);
        }100%{
              -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
              -moz-transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
              -ms-transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
              -o-transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
              transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
        }
    }
    /*动画4*/
    .animation4-box{
        width: 50px;
        height: 50px;
        margin: 0 auto;
        position: relative;
    }
    .animation4-box > div{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 50%;
        background-color: #91BEF0;
        opacity: 0.6;
        animation: animation4 2.0s infinite ease-in-out;
    }
    .animation4-box .bounce2{
        animation-delay: -1s;
    }
    @keyframes animation4 {
        0%, 100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        } 50% {
              transform: scale(1.0);
              -webkit-transform: scale(1.0);
          }
    }
</style>
