<template>
  <div>
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-body" >
          <p v-html="citationText"></p>
          <a class="item" v-bind:href="doiUrl" target="_blank" title="Go to landing page">
            {{doiUrl}}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { APIURL } from '@/models/constants.js'

  export default {
    name: 'LinkItem',
    components: {},
    props: {
      doiInfo: {
        type: Object
      },
      rowNum:{
        type: Number
      }
    },
    data: function() {
      return {
        citationText: "",
        metadata: null,
        doiUrl: "",
      }
    },
    computed: {
      formatPseudoCitation() {
        let msg =  ` `
        let source = ""
        let container = ""

        if (this.metadata == null ) {
          return `${this.rowNum}. According to <strong>Datacite</strong> the item on this page <strong>${this.humanize(this.doiInfo.relation)}</strong> the following item: <br/>[Metadata not found]`
        }

        if (/^datacite/.test(this.doiInfo.source) == true) {
          source = this.metadata.client.name
        } else{
          source = this.doiInfo.source
        }
         
      switch(source) {
        case("crossref"):
          container = ""
          msg = `${this.rowNum}. According to <strong>${this.titleCase(source)}</strong> the item on this page <strong>${this.humanize(this.doiInfo.relation)}</strong> `
          break;
        case("crossref.citations"):
          container = ""
          if (this.doiInfo.instigator == true) {
            msg = `${this.rowNum}. According to <strong>Crossref</strong> the item on this page <strong>${this.humanize(this.doiInfo.relation)}</strong> the ${this.humanize(this.metadata.resourceTypeGeneral)}: <br/>`
          } else {
            msg = `${this.rowNum}. According to <strong>Crossref</strong> the following ${this.humanize(this.metadata.resourceTypeGeneral)} <strong>${this.humanize(this.doiInfo.relation)}</strong> the item on this page: <br/>`
          }
          break;
        default:
          container = this.metadata.publisher
          if (this.doiInfo.instigator == true) {
            msg = `${this.rowNum}. According to <strong>${source}</strong> via <strong>Datacite</strong> the item on this page <strong>${this.humanize(this.doiInfo.relation)}</strong> the ${this.humanize(this.metadata.resourceTypeGeneral)}: <br/>`
          } else {
            msg = `${this.rowNum}. According to <strong>${source}</strong> via <strong>Datacite</strong> the following ${this.humanize(this.metadata.resourceTypeGeneral)} <strong>${this.humanize(this.doiInfo.relation)}</strong> the item on this page: <br/>`
          }
          break;
      }
      return msg + `<i>${this.authorFormat(this.metadata.creators)} ${this.metadata.titles[0]["title"]} ${this.metadata.publicationYear}. ${container}</i>`
      }
    },
    methods: {
      titleCase: function(string) {
        string = (string == "text") ? "publication" : string
        return(string.replace(/\b\S/g, t => t.toUpperCase().replace(/-/g, " ")))
      },
      humanize: function(string) {
        string = (string == "text") ? "publication" : string
        return(string.replace(/\b\S/g, t => t.replace(/-/g, " ")))
      },
      authorFormat: function(creators){
        let authors = creators.map( author => 
          `${author["name"]}`
        );
        const numAuthors = authors.length;
        
        switch(true) {
          case numAuthors <3:
            return authors.join(" & ")
          case numAuthors >3 && numAuthors <25:
            return authors.slice(0, -1).join(", ") + " & " + authors.slice(-1)
          default:
            return authors.slice(0, 24).join(", ") + " … & " + authors.slice(-1)
        }
      },
    getMetadata: function() {
      axios({
        url: APIURL + "/graphql",
        method: 'post',
        data: {
          query: `
            {
              dataset(id: "${this.doiInfo.doi}") {
                id
                publisher
                client {
                  name
                }
                titles(first:1) {
                  title
                }
                creators(first:25){
                  givenName
                  familyName
                  name
                }
                resourceTypeGeneral
                publicationYear
              }
            }
            `
        }
      })
      .then((response) => {
          this.doiUrl = "https://doi.org/" + this.doiInfo.doi
          this.metadata = response.data.data == null ? null : response.data.data["dataset"]
          this.citationText  = this.formatPseudoCitation
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
      },
    },
    watch: {
      getMetadata: {
        handler: 'getMetadata',
        immediate: true
      }
    }
  }
</script>

<style scoped> 
  a {
    color: #68B3C8;
    background-color: transparent;
  }

  a.item:active,
  a.item:hover {
    outline: 0;
  }

  strong {
    font-weight: bold;
  }

  p {
      display: block;
      margin-block-start: 0.2em;
      margin-block-end: 0.2em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
  }

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

  a.item {
    color: #68B3C8;
    text-decoration: none;
  }

  a.item:hover,
  a.item:focus {
    color: #23527c;
    text-decoration: underline;
  }

  a:focus {
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }

  .panel {
    margin-bottom: 0px;
    background-color: #fff;
    border: 0px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  }

  .panel-body {
    padding: 15px;
  }

  .panel-body:before,
  .panel-body:after {
    content: " ";
    display: table;
  }

  .panel-body:after {
    clear: both;
  }

  .panel-default {
    border-color: #ddd;
  }

  a.item {
    color: #68B3C8;
    -webkit-transition: all 150ms linear;
    -moz-transition: all 150ms linear;
    -o-transition: all 150ms linear;
    -ms-transition: all 150ms linear;
    transition: all 150ms linear;
  }

  a.item:hover,
  a.item:focus {
    color: #3091B2;
    text-decoration: none;
  }

  a.item:focus,
  a.item:active {
    outline: 0;
  }

  .panel-body h3 {
    margin-bottom: 0px;
    font-weight: bold;
  }

  .panel-body h3:first-child {
    margin-top: 0;
  }

  .panel-body h3.work {
    margin-bottom: 0;
  }

  .panel {
    border: 0;
    border-bottom: 0px solid #DDDDDD;
    box-shadow: none;
  }

  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    src: local('Raleway'), local('Raleway-Regular'), url(https://fonts.gstatic.com/s/raleway/v14/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    src: local('Raleway'), local('Raleway-Regular'), url(https://fonts.gstatic.com/s/raleway/v14/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    src: local('Raleway SemiBold'), local('Raleway-SemiBold'), url(https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwPIsWqhPANqczVsq4A.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    src: local('Raleway SemiBold'), local('Raleway-SemiBold'), url(https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwPIsWqZPANqczVs.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* @import url('https://assets.datacite.org/stylesheets/datacite.css'); */
</style>