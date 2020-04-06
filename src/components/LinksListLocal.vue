
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
          :click-handler="startList"
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
import Paginate from 'vuejs-paginate';
import axios from 'axios';
import LinkItem from '@/components/LinkItem.vue';
import { APIURL } from '@/models/constants.js';
import { utilsMixin } from '@/mixins/utilsMixin.js';

const PAGESIZE = 25;


export default {
  name: 'LinksListLocal',
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
    doi: {
      type: String,
      required: true,
      validator(value) {
        return value.match(/^10\.\d{4,5}\/[-._;()/:a-zA-Z0-9*~$=]+/);
      },
    },
    // eslint-disable-next-line vue/require-default-prop
    dataInput: {
      type: Object,
      required: true,
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
        switch (this.type) {
          case 'citations':
            return {
              doi: element.attributes.sourceDoi,
              instigator: this.isSelf(element.attributes.subjId),
              source: this.clientName,
              relation: element.attributes.relationTypeId,
            };
          case 'references':
            return {
              doi: element.attributes.targetDoi,
              instigator: this.isSelf(element.attributes.subjId),
              source: element.attributes.sourceId,
              relation: element.attributes.relationTypeId,
            };
          default:
            break;
        }
        return dois;
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
    setPagination(pageNum, totalPages) {
      this.pageNum = pageNum;
      this.totalPages = Math.floor(totalPages);
    },
    startList(pageNum) {
      let pp;
      let list;
      const startItem = (pageNum - 1) * PAGESIZE;
      switch (this.type) {
        case 'citations':
          if (typeof this.dataInput.citations === 'undefined') { break; }
          // eslint-disable-next-line no-case-declarations
          const citations = this.dataInput.citations.slice(startItem, startItem + PAGESIZE);
          if (citations.length > 0) {
            pp = (this.grabDois(citations));
            list = this.listDois(pp);
            this.getMetadata(list, pp);
          } else {
            this.items = this.grabDois(citations);
          }
          this.setPagination(pageNum, this.dataInput.citations.length / PAGESIZE);
          this.$emit('citationsLoaded', this.dataInput.citations.length);
          break;
        case 'references':
          if (typeof this.dataInput.references === 'undefined') { break; }
          // eslint-disable-next-line no-case-declarations
          const references = this.dataInput.references.slice(startItem, startItem + PAGESIZE);
          if (references.length > 0) {
            pp = (this.grabDois(references));
            list = this.listDois(pp);
            this.getMetadata(list, pp);
          } else {
            this.items = this.grabDois(references);
          }
          this.setPagination(pageNum, this.dataInput.references.length / PAGESIZE);
          // eslint-disable-next-line
          this.$emit('referencesLoaded', this.dataInput.references.length);
          break;
        case 'relations':
          if (typeof this.dataInput.relations === 'undefined') { break; }
          // eslint-disable-next-line no-case-declarations
          const relations = this.dataInput.relations.slice(startItem, startItem + PAGESIZE);
          if (relations.length > 0) {
            pp = (this.grabDois(relations));
            list = this.listDois(pp);
            this.getMetadata(list, pp);
          } else {
            this.items = this.grabDois(relations);
          }
          // eslint-disable-next-line
          this.$emit('referencesLoaded', this.dataInput.relations.length);
          break;
        default:
          break;
      }
    },
    get_all() {
      try {
        this.pageNum = this.page;
        this.startList(1);
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
