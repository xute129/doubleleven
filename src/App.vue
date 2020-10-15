<template>
  <div id="app">
    <router-view />
    <audio autoplay ref="audio">
      <source src="../src/assets/audio/H5音乐.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      show: false
    }
  },
  mounted () {
    this.autoplay()
  },
  methods: {
    autoplay () {
      let self = this
      let audio = this.$refs.audio
      console.log(audio);
      //--创建页面监听，页面加载完毕--触发音频播放
      document.addEventListener('DOMContentLoaded', function () {
        function audioAutoPlay () {
          audio.play();
        }
        audioAutoPlay();
      });
      //--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
      document.addEventListener('touchstart', function () {
        function audioAutoPlay () {
          audio.play();
        }
        audioAutoPlay();
      });
    }
  }
}
</script>
<style scoped>
</style>