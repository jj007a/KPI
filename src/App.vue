<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import url(../static/iconfont/iconfont.css);
@import url(./App.less);
</style>
