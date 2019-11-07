
<template>
<div>
  <div v-if="citationsNum+referencesNum+relationsNum > 0">
    <b-tabs>
      <b-tab v-if="citationsNum > 0" id="citations-tab" v-bind:title=citationsTotal>
        <LinksList @citationsLoaded="loadcitationsTotal" v-bind:doi=doi type="citations" />
      </b-tab>
      <b-tab v-if="referencesNum > 0" id="references-tab" v-bind:title=referencesTotal>
        <LinksList @referencesLoaded="loadreferencesTotal" v-bind:doi=doi type="references" />
      </b-tab>
      <b-tab v-if="relationsNum > 0" id="relations-tab" v-bind:title=relationsTotal>
        <LinksList @relationsLoaded="loadrelationsTotal" v-bind:doi=doi type="relations" />
      </b-tab>
    </b-tabs>
  </div>
  <div v-else>
    <p v-html="emptyMessage">
    </p>
  </div>
</div>
</template>



<script>

import LinksList from '@/components/LinksList.vue'
 
export default {
  name: 'LinksTabs',
  components:{
    LinksList,
  },
  props: {
    doi: {
      type: String,
      required: true,
      validator: function (value) {
        return value.match(/^10\.\d{4,5}\/[-._;()/:a-zA-Z0-9*~$=]+/)
      }
    },
  },
  data: function(){
    return{
      citationsNum: 1,
      referencesNum: 1,
      relationsNum: 1,
      citationsTotal: "",
      referencesTotal: "",
      relationsTotal: ""
    }
  },
  computed: {
    emptyMessage(){
      return `<div class="panel-body alert alert-secondary">
              We found no linking data for this dataset. For information on how to provide linking data information, please see
              <a href="https://support.datacite.org/docs/contributing-data-citations">
              our documentation.
              </a>
              </div>`
    },
  },
  methods:{
    loadreferencesTotal(value){
      this.referencesNum = value
      this.referencesTotal = "References " + value          
    },
    loadrelationsTotal(value){
      this.relationsNum = value
      this.relationsTotal = "Relations " + value
    },
    loadcitationsTotal(value){
      this.citationsNum = value
      this.citationsTotal = "Citations " + value
    }
  },
  updated: function () {
    this.$nextTick(function () {
      this.$children[0].$children[0].isActive = true
    })
  },
  watch: {
  }
}
</script>

<style scoped>
/* @import url('https://assets.datacite.org/stylesheets/datacite.css'); */

</style>


   