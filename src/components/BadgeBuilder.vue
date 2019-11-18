<template>
  <div>
    <b-container>
      <b-row>
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <b-form-group
            id="fieldset-1"
            description="Let us know your name."
            label="Enter your name"
            label-for="input-1"
            :state="state"
        >
            <b-form-input id="input-1" v-model="doi" :state="state" trim></b-form-input>
            <b-form-select v-model="style" :options="options"></b-form-select>
            <div class="mt-3">Selected: <strong>{{ style }}</strong></div>
          </b-form-group>
        </div>
        <div class="col-sm-4">
          <data-metrics-badge doi="10.7272/q6g15xs4"></data-metrics-badge>
        </div>
        <div class="col-sm-4"></div>
      </b-row>
      <b-row></b-row>
    </b-container>
  </div>
</template>

<script>
  //  import DataMetricsBadge from 'data-metrics-badge';

  export default {
    name: 'BadgeBuilder',
    components:{
      // DataMetricsBadge
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
        return `
          <div class="panel-body alert alert-simple-info">
            We found no citations, references or relations for this item. For information on how to provide this information, please see
            <a href="https://support.datacite.org/docs/contributing-data-citations">our documentation</a>.
          </div>`
      },
    },
    methods:{
      insertMarkup(){
        let tag = document.createElement('script');  
        
        tag = document.createElement('script');    
        tag.setAttribute('type',"application/javascript")
        tag.setAttribute('src',"https://unpkg.com/vue")
        tag.async = true
        document.head.appendChild(tag)

        tag = document.createElement('script');    
        tag.setAttribute('type',"application/javascript")
        tag.setAttribute('src',"https://unpkg.com/data-metrics-badge")
        // tag.setAttribute('src',"https://cdn.jsdelivr.net/npm/data-metrics-badge/dist/data-metrics-badge.min.js")
        tag.async = true
        document.head.appendChild(tag)
      }
    },
    updated: function () {
      this.$nextTick(function () {
        this.$children[0].$children[0].isActive = true
      })
    },
    watch: {
      insert: {
        handler: 'insertMarkup',
        immediate: true
      }
    },
    // created() {
    //   this.insertMarkup()
    // }
  }
</script>

<style >
</style>
