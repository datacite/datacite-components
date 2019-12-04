<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <!-- eslint-disable max-len -->
    <!-- Symptom: relationship direction was wronf and client names were wrong. Problem: results merge and sort was wrong. -->
    <LinksTabs doi="10.5438/0012" />
    <!-- Symptom: client names were wrong. Problem: we were printing the client of the event rather than the instigators client. -->
    <LinksTabs doi="10.5438/ct8b-x1ce" />
    <!-- Symptom: messagins looks wrong in direction. Problem: messages were swapped -->
    <LinksTabs doi="10.25490/a97f-egyk" />
    <!-- Symptom: chart labels overlapping. remove final year  -->
    <LinksTabs doi="10.5438/4sdj-hf49" />
    <!-- Symptom: X-axis label should be horizontal unless there would otherwise be overlap  -->
    <LinksTabs doi="10.15468/3s2nuz" />
    <!-- Symptom: counts do not match. Problem: wrong type in query  -->
    <LinksTabs doi="10.14454/3bpw-w381" />
    <!-- Symptom: X-axis label should be horizontal unless there would otherwise be overlap  -->
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
