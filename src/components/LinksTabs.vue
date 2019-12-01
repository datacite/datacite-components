<template>
  <div>
    <div v-if="citationsNum + referencesNum + relationsNum > 0">
      <b-tabs>
        <b-tab
          v-if="citationsNum > 0"
          id="citations-tab"
          :title="citationsTotal"
        >
          <LinksList
            :doi="doi"
            type="citations"
            @citationsLoaded="loadcitationsTotal"
          />
        </b-tab>
        <b-tab
          v-if="referencesNum > 0"
          id="references-tab"
          :title="referencesTotal"
        >
          <LinksList
            :doi="doi"
            type="references"
            @referencesLoaded="loadreferencesTotal"
          />
        </b-tab>
        <b-tab
          v-if="relationsNum > 0"
          id="relations-tab"
          :title="relationsTotal"
        >
          <LinksList
            :doi="doi"
            type="relations"
            @relationsLoaded="loadrelationsTotal"
          />
        </b-tab>
      </b-tabs>
    </div>
    <div v-else>
      <p v-html="emptyMessage" />
    </div>
  </div>
</template>

<script>
import { BTab, BTabs } from 'bootstrap-vue';
// eslint-disable-next-line import/no-unresolved
import LinksList from '@/components/LinksList.vue';

export default {
  name: 'LinksTabs',
  components: {
    LinksList,
    'b-tab': BTab,
    'b-tabs': BTabs,
  },
  props: {
    doi: {
      type: String,
      required: true,
      validator(value) {
        return value.match(/^10\.\d{4,5}\/[-._;()/:a-zA-Z0-9*~$=]+/);
      },
    },
    client: {
      type: String,
      default: 'DataCite Search',
      required: false,
    },
  },
  data() {
    return {
      citationsNum: 1,
      referencesNum: 1,
      relationsNum: 1,
      citationsTotal: '',
      referencesTotal: '',
      relationsTotal: '',
    };
  },
  computed: {
    emptyMessage() {
      return `
          <div class="panel-body alert alert-simple-info">
            We found no citations, references or relations for this item. For information on how to provide this information, please see
            <a href="https://support.datacite.org/docs/contributing-data-citations">our documentation</a>.
          </div>`;
    },
  },
  watch: {},
  methods: {
    // correctly pluralize depending on value, and use thousands separator
    formatNumbers(value = 0, label) {
      if (value === 1) {
        return `${value.toLocaleString('en-us')} ${label}`;
      }
      return `${value.toLocaleString('en-us')} ${label}s`;
    },
    loadreferencesTotal(value = 0) {
      this.referencesNum = value;
      this.referencesTotal = this.formatNumbers(value, 'Reference');
    },
    loadrelationsTotal(value = 0) {
      this.relationsNum = value;
      this.relationsTotal = this.formatNumbers(value, 'Relation');
    },
    loadcitationsTotal(value = 0) {
      this.citationsNum = value;
      this.citationsTotal = this.formatNumbers(value, 'Citation');
    },
  },
};
</script>

<style>
  @import url("https://assets.datacite.org/stylesheets/datacite.css");
  @import url("//unpkg.com/bootstrap/dist/css/bootstrap.min.css");
  @import url("//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css");

  a {
    color: #68b3c8;
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
    background-color: #ffff;
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
  }
</style>
