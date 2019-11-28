
<template>
  <div>
    <div v-if="citationsNum + referencesNum + relationsNum > 0">
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
  import { BTab, BTabs } from 'bootstrap-vue'

  export default {
    name: 'LinksTabs',
    components: {
      LinksList,
      'b-tab': BTab,
      'b-tabs': BTabs
    },
    props: {
      doi: {
        type: String,
        required: true,
        validator: function (value) {
          return value.match(/^10\.\d{4,5}\/[-._;()/:a-zA-Z0-9*~$=]+/)
        }
      },
      client: {
        type: String,
        default: "DataCite Search",
        required: true
      }
    },
    data: function() {
      return {
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
        return `
          <div class="panel-body alert alert-simple-info">
            We found no citations, references or relations for this item. For information on how to provide this information, please see
            <a href="https://support.datacite.org/docs/contributing-data-citations">our documentation</a>.
          </div>`
      },
    },
    methods:{
      // correctly pluralize depending on value, and use thousands separator
      formatNumbers: function(value = 0, label) {
        if (value === 1) {
          return value.toLocaleString('en-us') + ' ' + label
        } else {
          return value.toLocaleString('en-us') + ' ' + label + 's'
        }
        
      },
      loadreferencesTotal(value = 0){
        this.referencesNum = value
        this.referencesTotal = this.formatNumbers(value, 'Reference')         
      },
      loadrelationsTotal(value = 0){
        this.relationsNum = value
        this.relationsTotal = this.formatNumbers(value, 'Relation')
      },
      loadcitationsTotal(value = 0){
        this.citationsNum = value
        this.citationsTotal = this.formatNumbers(value, 'Citation')
      }
    },
    watch: {
    }
  }
</script>

<style >
  @import url('https://assets.datacite.org/stylesheets/datacite.css');
  @import url('//unpkg.com/bootstrap/dist/css/bootstrap.min.css');
  @import url('//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css');

  a {
    color: #68B3C8;
    background-color: transparent;
  }

  .row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: 0;
    margin-left: 0;
  }

  .tab-content {
    background-color:#ffff;
      border-left: 1px solid #dddddd;
      border-right: 1px solid #dddddd;
      border-bottom: 1px solid #dddddd;
  }
</style>
