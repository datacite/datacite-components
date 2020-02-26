<template>
  <div>
    <div v-if="citationsNum + referencesNum + relationsNum > 0">
      <b-tabs>
        <b-tab
          v-if="counts > 0"
          id="citations-tab"
          :title="citationsTotalLabel"
        >
          <LinksListInterface
            :doi="doi"
            :client-name="client"
            type="citations"
            :count="counts"
            :data-input="dataInput"
            @citationsLoaded="loadcitationsTotalLabel"
          />
        </b-tab>
        <b-tab
          v-if="referencesNum > 0"
          id="references-tab"
          :title="referencesTotalLabel"
        >
          <LinksListInterface
            :doi="doi"
            :client-name="client"
            type="references"
            :data-input="dataInput"
            @referencesLoaded="loadreferencesTotal"
          />
        </b-tab>
        <b-tab
          v-if="relationsNum > 0"
          id="relations-tab"
          :title="relationsTotalLabel"
        >
          <LinksListInterface
            :doi="doi"
            :client-name="client"
            type="relations"
            :data-input="dataInput"
            @relationsLoaded="loadrelationsTotalLabel"
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
import axios from 'axios';
import { APIURL } from '@/models/constants.js';
import LinksListInterface from '@/components/LinksListInterface.vue';

export default {
  name: 'LinksTabs',
  components: {
    LinksListInterface,
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
    counts: {
      type: Number,
      default: 1,
      required: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    dataInput: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      citationsNum: 1,
      referencesNum: 1,
      relationsNum: 1,
      citationsTotalLabel: '',
      referencesTotalLabel: '',
      relationsTotalLabel: '',
      clientName: null,
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
    setClientName() {
      return this.clientName;
    },
    setCitationsCounts() {
      // eslint-disable-next-line radix
      return parseInt(this.counts);
    },
    dataObject() {
      if (typeof this.dataInput !== 'undefined') {
        this.loadreferencesTotal(this.dataInput.references.length);
        return this.dataInput;
        // JSON.parse(this.dataInput);
      }
      return null;
    },
  },
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
      this.referencesTotalLabel = this.formatNumbers(value, 'Reference');
    },
    loadrelationsTotalLabel(value = 0) {
      this.relationsNum = value;
      this.relationsTotalLabel = this.formatNumbers(value, 'Relation');
    },
    loadcitationsTotalLabel(value = 0) {
      this.citationsNum = value;
      this.citationsTotalLabel = this.formatNumbers(value, 'Citation');
    },
    startComponent() {
      axios({
        url: `${APIURL}/graphql`,
        method: 'post',
        data: {
          query: `
              {
                creativeWork(id: "${this.doi}") {
                  client {
                    name
                  }
                }
              }
              `,
        },
      })
        .then((response) => {
          // eslint-disable-next-line
            // console.log(response.data.data)
          this.clientName = response.data.data == null
            ? 'DataCite Search'
            : response.data.data.creativeWork.client.name;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.errored = true;
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.loading = false));
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
