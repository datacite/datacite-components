<template>
  <div
    :title="'List for: ' + doi"
  >
    <div
      v-if="(doi)"
    >
      <div v-if="typeof dataInput == 'undefined'">
        <LinksList
          :doi="doi"
          :page="page"
          :client-name="clientName"
          :type="type"
          :count="count"
          @relationsLoaded="passCounter"
          @referencesLoaded="passCounter"
          @citationsLoaded="passCounter"
        />
      </div>
      <div v-if="typeof dataInput !== 'undefined'">
        <LinksListLocal
          :doi="doi"
          :page="page"
          :client-name="clientName"
          :type="type"
          :data-input="dataInput"
          @relationsLoaded="passCounter"
          @referencesLoaded="passCounter"
          @citationsLoaded="passCounter"
        />
      </div>
    </div>
    <a v-else>There is no DOI</a>
  </div>
</template>

<script>
import LinksListLocal from './LinksListLocal.vue';
import LinksList from './LinksList.vue';
import { utilsMixin } from '@/mixins/utilsMixin.js';

export default {
  name: 'LinksListInterface',
  funtional: true,
  components: {
    LinksListLocal,
    LinksList,
  },
  mixins: [utilsMixin],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    dataInput: {
      type: Array,
    },
    doi: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    clientName: {
      type: String,
      default: 'Datacite Search',
    },
    // eslint-disable-next-line vue/require-default-prop
    page: {
      type: String,
      default: '1',
    },
    // eslint-disable-next-line vue/require-default-prop
    count: {
      type: Number,
    },
  },
  methods: {
    formatNumbers(value = 0, label) {
      if (value === 1) {
        return `${value.toLocaleString('en-us')} ${label}`;
      }
      return `${value.toLocaleString('en-us')} ${label}s`;
    },
    passCounter(value = 0) {
      // eslint-disable-next-line
      switch (this.type) {
        case 'citations':
          this.$emit('citationsLoaded', value);
          break;
        case 'references':
          this.$emit('referencesLoaded', value);
          break;
        case 'relations':
          this.$emit('relationsLoaded', value);
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped></style>
