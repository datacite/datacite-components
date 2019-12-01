<template>
  <li>
    <p v-html="formatPseudoCitation" />
    <a
      v-if="doiInfo.resourceTypeGeneral == null"
      class="item"
      :href="urlize(doiInfo.doi)"
      target="_blank"
      title="Go to landing page"
    >
      {{ urlize(doiInfo.doi) }}
    </a>
  </li>
</template>

<script>
export default {
  name: 'LinkItem',
  components: {},
  props: {
    // eslint-disable-next-line vue/require-default-prop
    doiInfo: {
      type: Object,
    },
  },
  data() {
    return {
      citationText: '',
      metadata: null,
      doiUrl: '',
    };
  },
  computed: {
    formatPseudoCitation() {
      let msg = ' ';
      let source = '';

      if (this.doiInfo.resourceTypeGeneral == null) {
        return `According to <strong>Datacite</strong> the item on this page <strong>${this.humanize(
          this.doiInfo.relation,
        )}</strong> the following item: <br/>[Metadata not found]`;
      }

      if (/^datacite/.test(this.doiInfo.source) === true) {
        source = this.doiInfo.client.name;
      } else {
        source = this.doiInfo.source;
      }

      switch (source) {
        case 'crossref':
          if (this.doiInfo.instigator === false) {
            msg = `According to <strong>Crossref</strong> the following ${this.humanize(
              this.doiInfo.resourceTypeGeneral,
            )} <strong>${this.humanize(
              this.doiInfo.relation,
            )}</strong> the item on this page: <br/>`;
          } else {
            msg = `According to <strong>Crossref</strong> the item on this page <strong>${this.humanize(
              this.doiInfo.relation,
            )}</strong> the ${this.humanize(
              this.doiInfo.resourceTypeGeneral,
            )}: <br/>`;
          }
          break;
        case 'crossref.citations':
          if (this.doiInfo.instigator === true) {
            msg = `According to <strong>Crossref</strong> the item on this page <strong>${this.humanize(
              this.doiInfo.relation,
            )}</strong> the ${this.humanize(
              this.doiInfo.resourceTypeGeneral,
            )}: <br/>`;
          } else {
            msg = `According to <strong>Crossref</strong> the following ${this.humanize(
              this.doiInfo.resourceTypeGeneral,
            )} <strong>${this.humanize(
              this.doiInfo.relation,
            )}</strong> the item on this page: <br/>`;
          }
          break;
        default:
          if (this.doiInfo.instigator === true) {
            msg = `According to <strong>${this.titleCase(
              source,
            )}</strong> via <strong>Datacite</strong> the item on this page <strong>${this.humanize(
              this.doiInfo.relation,
            )}</strong> the ${this.humanize(
              this.doiInfo.resourceTypeGeneral,
            )}: <br/>`;
          } else {
            msg = `According to <strong>${this.titleCase(
              source,
            )}</strong> via <strong>Datacite</strong> the following ${this.humanize(
              this.doiInfo.resourceTypeGeneral,
            )} <strong>${this.humanize(
              this.doiInfo.relation,
            )}</strong> the item on this page: <br/>`;
          }
          break;
      }
      return `${msg}${this.doiInfo.formattedCitation}`;
    },
  },
  methods: {
    titleCase(string = '') {
      // eslint-disable-next-line no-param-reassign
      string = string === 'text' || string == null ? 'publication' : string;
      return string.replace(/\b\S/g, (t) => t.toUpperCase().replace(/-/g, ' '));
    },
    humanize(string = '') {
      // eslint-disable-next-line no-param-reassign
      string = string === 'text' || string == null ? 'publication' : string;
      return string.replace(/\b\S/g, (t) => t.replace(/-/g, ' '));
    },
    urlize(string = '') {
      if (!/^https?:\/\//i.test(string)) {
        return `http://doi.org/${string}`;
      }
      return string;
    },
  },
};
</script>

<style scoped>
  a {
    color: #68b3c8;
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
    color: #68b3c8;
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
    color: #68b3c8;
    -webkit-transition: all 150ms linear;
    -moz-transition: all 150ms linear;
    -o-transition: all 150ms linear;
    -ms-transition: all 150ms linear;
    transition: all 150ms linear;
  }

  a.item:hover,
  a.item:focus {
    color: #3091b2;
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
    border-bottom: 0px solid #dddddd;
    box-shadow: none;
  }

  @font-face {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    src: local("Raleway"), local("Raleway-Regular"),
      url(https://fonts.gstatic.com/s/raleway/v14/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  @font-face {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    src: local("Raleway"), local("Raleway-Regular"),
      url(https://fonts.gstatic.com/s/raleway/v14/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 600;
    src: local("Raleway SemiBold"), local("Raleway-SemiBold"),
      url(https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwPIsWqhPANqczVsq4A.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  @font-face {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 600;
    src: local("Raleway SemiBold"), local("Raleway-SemiBold"),
      url(https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwPIsWqZPANqczVs.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  /* @import url('https://assets.datacite.org/stylesheets/datacite.css'); */
</style>
