<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <LinksTabs doi="10.5438/0012" />
    <LinksTabs doi="10.5438/ct8b-x1ce" />
    <LinksTabs doi="10.25490/a97f-egyk" />
    <LinksTabs doi="10.5438/4sdj-hf49" />
    <LinksTabs doi="10.15468/3s2nuz" />
    <LinksTabs doi="10.14454/3bpw-w381" />
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
