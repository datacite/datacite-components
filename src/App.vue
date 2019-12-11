<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <!-- eslint-disable max-len -->
    <!-- Symptom: relationship direction was wronf and client names were wrong. Problem: results merge and sort was wrong. -->
    <LinksTabs doi="10.5438/0012" client="DataCite" :citationCount=1 />
    <!-- Symptom: client names were wrong. Problem: we were printing the client of the event rather than the instigators client. -->
    <LinksTabs doi="10.5438/ct8b-x1ce" client="DataCite  Blog" :citationCount=4 />
    <!-- Symptom: messagins looks wrong in direction. Problem: messages were swapped -->
    <LinksTabs doi="10.25490/a97f-egyk" client="Force11" :citationCount=8 />
    <!-- Symptom: chart labels overlapping. remove final year  -->
    <LinksTabs doi="10.5438/4sdj-hf49" client="DataCite  Blog" :citationCount=12 />
    <!-- Symptom: X-axis label should be horizontal unless there would otherwise be overlap  -->
    <LinksTabs doi="10.15468/3s2nuz" client="Global Biodiversity Information Facility" :citationCount=133 />
    <!-- Symptom: counts do not match. Problem: wrong type in query  -->
    <LinksTabs doi="10.14454/3bpw-w381" client="DataCite" :citationCount=1 />
    <!-- Symptom: X-axis label should be horizontal unless there would otherwise be overlap  -->
    <LinksTabs doi="10.5061/dryad.5164v" client="DRYAD" :citationCount=1 />
    <!-- No citations  -->
    <LinksTabs doi="10.5061/dryad.5164v" client="DRYAD" :citationCount="0" />
    <!-- ma relations  -->
    <LinksTabs doi="10.5438/0000-00ss" client="DRYAD" :citationCount=20 />
    <!-- ma relations  -->
    <LinksTabs doi="10.13127/csi.1.1" client="Istituto Nazionale di Geofisica e Vulcanologia (INGV)" :citationCount=0 />
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
