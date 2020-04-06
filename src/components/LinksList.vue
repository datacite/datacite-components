
<template>
  <div style="{position: relative;}">
    <div class="content">
      <ol
        v-for="(item, index) in items"
        :key="item.doi + Math.random()"
        :start="index + 1 + (pageNum - 1) * PAGESIZE"
      >
        <LinkItem :doi-info="item" />
      </ol>
      <div
        v-if="totalPages > 1"
        class="text-center"
      >
        <paginate
          :page-count="totalPages"
          :click-handler="get"
          :prev-text="'Previous'"
          :next-text="'Next'"
          :prev-class="'prev'"
          :next-class="'next'"
          :hide-prev-next="true"
          :disabled-class="'disabled'"
          :container-class="'pagination pagination'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Kitsu from 'kitsu';
import Paginate from 'vuejs-paginate';
import axios from 'axios';
import LinkItem from '@/components/LinkItem.vue';
import { APIURL } from '@/models/constants.js';
import { utilsMixin } from '@/mixins/utilsMixin.js';

const PAGESIZE = 25;
const CITATIONSTYPES = [
  'is-referenced-by',
  'is-cited-by',
  'is-supplement-to',
];
const REFERENCETYPES = ['references', 'cites', 'is-supplemented-by'];
const RELATIONTYPES = [
  'compiles',
  'is-compiled-by',
  'documents',
  'is-documented-by',
  'has-metadata',
  'is-metadata-for',
  'is-derived-from',
  'is-source-of',
  'reviews',
  'is-reviewed-by',
  'requires',
  'is-required-by',
  'continues',
  'is-coutinued-by',
  'has-version',
  'is-version-of',
  'has-part',
  'is-part-of',
  'is-variant-from-of',
  'is-original-form-of',
  'is-identical-to',
  'obsoletes',
  'is-obsolete-by',
  'is-new-version-of',
  'is-previous-version-of',
  'describes',
  'is-described-by',
];

const api = new Kitsu({
  baseURL: `${APIURL}/events`,
  headers: { accept: 'application/vnd.api+json; version=2' },
});

export default {
  name: 'LinksList',
  components: {
    Paginate,
    LinkItem,
  },
  mixins: [utilsMixin],
  props: {
    type: {
      type: String,
      default: 'relations',
      required: true,
      validator(value) {
        return ['references', 'citations', 'relations'].indexOf(value) > -1;
      },
    },
    page: {
      type: String,
      required: false,
      default: '1',
    },
    clientName: {
      type: String,
      required: true,
      default: 'Datacite Search',
    },
    // eslint-disable-next-line vue/require-default-prop
    count: {
      type: Number,
      required: false,
    },
    doi: {
      type: String,
      required: true,
      validator(value) {
        return value.match(/^10\.\d{4,5}\/[-._;()/:a-zA-Z0-9*~$=]+/);
      },
    },
  },
  data() {
    return {
      totalPages: 0,
      items: [],
      PAGESIZE,
    };
  },
  computed: {
    doiUrl() {
      return `https://doi.org/${this.doi}`;
    },
    query() {
      switch (this.type) {
        case 'citations':
          return `(subj_id:"${
            this.doiUrl
          }" AND (relation_type_id:${this.linksQuery(
            CITATIONSTYPES,
          )})) OR (obj_id:"${
            this.doiUrl
          }" AND (relation_type_id:${this.linksQuery(REFERENCETYPES)}))`;
        case 'references':
          return `(subj_id:"${
            this.doiUrl
          }" AND (relation_type_id:${this.linksQuery(
            REFERENCETYPES,
          )})) OR (obj_id:"${
            this.doiUrl
          }" AND (relation_type_id:${this.linksQuery(CITATIONSTYPES)}))`;
        case 'relations':
          return `(subj_id:"${
            this.doiUrl
          }" AND (relation_type_id:${this.linksQuery(
            RELATIONTYPES,
          )})) OR (obj_id:"${
            this.doiUrl
          }" AND (relation_type_id:${this.linksQuery(RELATIONTYPES)}))`;
        default:
          break;
      }
      return '';
    },
  },
  watch: {
    getEvents: {
      handler: 'get_all',
      immediate: true,
    },
  },
  methods: {
    linksQuery(types) {
      return types.join(' OR relation_type_id:');
    },
    pageNum(string) {
      return string;
    },
    grabDois(data) {
      const dois = data.map((element) => {
        if (this.isSelf(element.subjId)) {
          return {
            doi: this.doiFromUrl(element.objId),
            instigator: true,
            source: this.clientName,
            relation: element.relationTypeId,
          };
        }
        return {
          doi: this.doiFromUrl(element.subjId),
          instigator: false,
          source: element.sourceId,
          relation: element.relationTypeId,
        };
      });
      return dois;
    },
    isSelf(item) {
      if (item === `https://doi.org/${this.doi}`) {
        return true;
      }
      return false;
    },
    getMetadata(list, data) {
      axios({
        url: `${APIURL}/graphql`,
        method: 'post',
        data: {
          query: `
              {
                works(ids: "${list}") {
                  work: nodes {
                    doi: id
                    client {
                      name
                    }
                    resourceTypeGeneral
                    publicationYear
                    formattedCitation
                  }
                }
              }
              `,
        },
      })
        .then((response) => {
          let metadatas = response.data.data == null
            ? null
            : response.data.data.works.work;

          if (metadatas != null) {
            metadatas = metadatas.map((item) => ({ ...item, doi: this.doiFromUrl(item.doi) }));
            // eslint-disable-next-line no-nested-ternary
            metadatas.sort((a, b) => ((a.doi > b.doi) ? 1 : ((b.doi > a.doi) ? -1 : 0)));
            // eslint-disable-next-line no-nested-ternary
            data.sort((a, b) => ((a.doi > b.doi) ? 1 : ((b.doi > a.doi) ? -1 : 0)));
            if (data.length !== metadatas.length) {
              // eslint-disable-next-line
              console.log(this.mergeArrayObjects(data, metadatas));
              this.items = this.mergeArrayObjects(data, metadatas);
            } else {
              this.items = metadatas.map((item, i) => ({ ...item, ...data[i] }));
            }
          } else {
            this.items = data;
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
            console.log(error);
          this.errored = true;
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.loading = false));
    },
    get(pageNum) {
      try {
        api
          .get('', {
            page: { limit: PAGESIZE, number: pageNum },
            query: this.query,
            doi: this.doi,
          })
          .then(({ data, meta }) => {
            this.pageNum = pageNum;
            this.totalPages = meta.totalPages;

            let pp;
            let list;
            switch (this.type) {
              case 'citations':
                if (data.length > 0) {
                  pp = this.unique(this.grabDois(data));
                  list = this.listDois(pp);
                  this.getMetadata(list, pp);
                } else {
                  this.items = this.grabDois(data);
                }
                this.$emit('citationsLoaded', meta.total);
                break;
              case 'references':
                if (data.length > 0) {
                  pp = (this.grabDois(data));
                  list = this.listDois(pp);
                  this.getMetadata(list, pp);
                } else {
                  this.items = this.grabDois(data);
                }
                this.$emit('referencesLoaded', meta.total);
                break;
              case 'relations':
                if (data.length > 0) {
                  pp = (this.grabDois(data));
                  list = this.listDois(pp);
                  this.getMetadata(list, pp);
                } else {
                  this.items = this.grabDois(data);
                }
                this.$emit('relationsLoaded', meta.total);
                break;
              default:
                break;
            }
          })
          .catch((e) => {
            // eslint-disable-next-line
              console.log(e);
          });
      } catch (e) {
        // eslint-disable-next-line
          console.log(e);
      }
    },
    get_all() {
      try {
        this.pageNum = this.page;
        this.get(1);
      } catch (e) {
        // eslint-disable-next-line
          console.log(e);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  div.text-center {
    text-align: center;
  }

  ul {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
  }

  .pagination > li {
    display: inline;
  }

  .pagination > li > a,
  .pagination > li > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    line-height: 1.42857;
    text-decoration: none;
    color: #337ab7;
    background-color: #fff;
    border: 1px solid #ddd;
    margin-left: -1px;
  }

  .pagination > li:first-child > span {
    margin-left: 0;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }

  .pagination > li:last-child > a {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }

  .pagination > li > a:hover,
  .pagination > li > a:focus,
  .pagination > li > span:hover,
  .pagination > li > span:focus {
    z-index: 2;
    color: #23527c;
    background-color: #eeeeee;
    border-color: #ddd;
  }

  .pagination > .active > span,
  .pagination > .active > span:hover,
  .pagination > .active > span:focus {
    z-index: 3;
    color: #fff;
    background-color: #337ab7;
    border-color: #337ab7;
    cursor: default;
  }

  .pagination > .disabled > span,
  .pagination > .disabled > span:hover,
  .pagination > .disabled > span:focus {
    color: #777777;
    background-color: #fff;
    border-color: #ddd;
    cursor: not-allowed;
  }

  li,
  a {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: "Raleway", "Helvetica", Arial, sans-serif;
  }

  a {
    -webkit-transition: all 150ms linear;
    -moz-transition: all 150ms linear;
    -o-transition: all 150ms linear;
    -ms-transition: all 150ms linear;
    transition: all 150ms linear;
  }

  ul li {
    font-weight: normal;
    font-size: 18px;
    line-height: 1.4444;
    text-align: start;
  }

  .pagination > li > a,
  .pagination > li > span,
  .pagination > li:first-child > span,
  .pagination > li:last-child > a {
    background-color: transparent;
    border: 2px solid #66615b;
    border-radius: 20px;
    color: #66615b;
    height: 36px;
    margin: 0 2px;
    min-width: 36px;
    padding: 3px 12px;
  }

  .pagination > li > a:hover,
  .pagination > li > a:focus,
  .pagination > li > a:active,
  .pagination > li.active > span,
  .pagination > li.active > span:hover,
  .pagination > li.active > span:focus {
    background-color: #66615b;
    border-color: #66615b;
    color: #ffffff;
  }

  /* @import url('https://assets.datacite.org/stylesheets/datacite.css'); */
</style>
