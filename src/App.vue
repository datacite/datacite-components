<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <!-- eslint-disable max-len -->
    <!-- Symptom: relationship direction was wronf and client names were wrong. Problem: results merge and sort was wrong. -->
    <LinksTabs doi="10.5438/0012" client="DataCite" :counts=1 />
    <!-- Symptom: client names were wrong. Problem: we were printing the client of the event rather than the instigators client. -->
    <LinksTabs doi="10.5438/ct8b-x1ce" client="DataCite  Blog" :counts=4 />
    <!-- Symptom: messagins looks wrong in direction. Problem: messages were swapped -->
    <LinksTabs doi="10.25490/a97f-egyk" client="Force11" :counts=8 />
    <!-- Symptom: chart labels overlapping. remove final year  -->
    <LinksTabs doi="10.5438/4sdj-hf49" client="DataCite  Blog" :counts=12 />
    <!-- Symptom: X-axis label should be horizontal unless there would otherwise be overlap  -->
    <LinksTabs doi="10.15468/3s2nuz" client="Global Biodiversity Information Facility" :counts=133 />
    <!-- Symptom: counts do not match. Problem: wrong type in query  -->
    <LinksTabs doi="10.14454/3bpw-w381" client="DataCite" :counts=1 />
    <!-- Symptom: X-axis label should be horizontal unless there would otherwise be overlap  -->
    <LinksTabs doi="10.5061/dryad.5164v" client="DRYAD" :counts=1 />
    <!-- No citations  -->
    <LinksTabs doi="10.5061/dryad.5164v" client="DRYAD" :counts=0 />
    <!-- ma relations  -->
    <LinksTabs doi="10.5438/0000-00ss" client="DRYAD" :counts=20 />
    <!-- ma relations  -->
    <LinksTabs doi="10.13127/csi.1.1" client="Istituto Nazionale di Geofisica e Vulcanologia (INGV)"
               data-input='{"citations":[{"id":"69738ec2-7abb-47e1-9587-bfe6b07218d2","type":"events","attributes":{"subjId":"https://doi.org/10.14454/xj8v-bj37","objId":"https://doi.org/10.5438/0012","sourceId":"datacite-related","sourceDoi":"10.14454/xj8v-bj37","targetDoi":"10.5438/0012","relationTypeId":"references","sourceRelationTypeId":"references","targetRelationTypeId":"citations","total":1,"messageAction":"create","sourceToken":"29a9a478-518f-4cbd-a133-a0dcef63d547","license":"https://creativecommons.org/publicdomain/zero/1.0/","occurredAt":"2019-11-29T21:31:46.000Z","timestamp":"2020-02-05T08:17:01.094Z"},"relationships":{"doiForSource":{"data":{"id":"10.14454/xj8v-bj37","type":"doi"}},"doiForTarget":{"data":{"id":"10.5438/0012","type":"doi"}}}}],"references":[]}'
    />
  </div>
</template>

<script>
import LinksTabs from './components/LinksTabs.vue';

export default {
  name: 'App',
  components: {
    LinksTabs,
  },
  data() {
    return {
      input: {
        references:
          [
            {
              'subj-id': 'https://doi.org/10.1371/journal.ppat.1008107',
              'obj-id': 'https://doi.org/10.7272/q6g15xs4',
              'source-id': 'crossref-related',
              'source-doi': '10.1371/journal.ppat.1008107',
              'target-doi': '10.7272/q6g15xs4',
              'relation-type-id': 'cites',
              'source-relation-type-id': 'references',
              'target-relation-type-id': 'citations',
              total: 1,
              'message-action': 'create',
              'source-token': '4d47afa8-7e08-4bd9-b04a-29b691427330',
              license: 'https://creativecommons.org/publicdomain/zero/1.0/',
            },
          ],
      },
    };
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
