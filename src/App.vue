<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <LinksTabs doi="10.5061/dryad.5164v" />
  </div>
</template>

<script>
import LinksTabs from './components/LinksTabs.vue';

export default {
  name: 'App',
  components: {
    LinksTabs,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
