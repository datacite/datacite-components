/* eslint-disable import/prefer-default-export */

export const utilsMixin = {
  created() {
  },
  methods: {
    doisQuery(dois) {
      return dois.join(',');
    },
    mergeArrayObjects(source, target) {
      source.forEach((sourceElement) => {
        // eslint-disable-next-line no-shadow,max-len
        const targetElement = target.find((targetElement) => sourceElement.doi === targetElement.doi);
        // eslint-disable-next-line no-unused-expressions
        targetElement ? Object.assign(targetElement, sourceElement) : target.push(sourceElement);
      });
      return target;
    },
    unique(array) {
      const result = [];
      const map = new Map();
      // eslint-disable-next-line no-restricted-syntax
      for (const item of array) {
        if (!map.has(item.doi)) {
          map.set(item.doi, true); // set any value to Map
          result.push({
            doi: item.doi,
            instigator: item.instigator,
            source: item.source,
            relation: item.relation,
          });
        }
      }
      return result;
    },
    doiFromUrl(doi) {
      return doi.replace(/https:\/\/doi\.org\//gi, '');
    },
    listDois(array) {
      const items = array.map((p) => p.doi);
      return (Array.from(new Set(items)).join(','));
    },
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
