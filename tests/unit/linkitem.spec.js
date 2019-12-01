
/* eslint-disable import/no-unresolved */
import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import LinkItem from '@/components/LinkItem.vue';


describe('LinkItem.vue', () => {
  const localVue = createLocalVue();


  describe('with Crossref Data', () => {
    const wrapper = shallowMount(LinkItem, {
      localVue,
      propsData: {
        doiInfo: {
          doi: '10.5438/0010',
          source: 'crossref',
          instigator: false,
          relation: 'references',
          id: '10.5438/0010',
          client: {
            name: 'CERN',
          },
          resourceTypeGeneral: 'Dataset',
          publicationYear: 1899,
          formattedCitation: 'DataCite Metadata Working Group. (2014). DataCite Metadata Schema for the Publication and Citation of Research Data v3.1. https://doi.org/10.5438/0010',
        },
      },
    });


    it('renders Crossref citation', (done) => {
      wrapper.vm.$nextTick(() => {
        expect(wrapper.html()).to.contain('10.5438/0010');
        expect(wrapper.html()).to.contain('According to <strong>Crossref</strong> the following Dataset <strong>references</strong> the item on this page: <br>DataCite Metadata Working Group. (2014). DataCite Metadata Schema for the Publication and Citation of Research Data v3.1.');
        done();
      });
    });
  });


  describe('with Datacite Data', () => {
    const wrapper = shallowMount(LinkItem, {
      localVue,
      propsData: {
        doiInfo: {
          doi: '10.5438/0010',
          source: 'datacite',
          instigator: true,
          relation: 'is-referenced-by',
          id: '10.5438/0010',
          client: {
            name: 'CERN',
          },
          resourceTypeGeneral: 'Dataset',
          publicationYear: 1899,
          formattedCitation: 'DataCite Metadata Working Group. (2014). DataCite Metadata Schema for the Publication and Citation of Research Data v3.1. https://doi.org/10.5438/0010',

        },
      },
    });


    it('renders Datacite reference', (done) => {
      wrapper.vm.$nextTick(() => {
        expect(wrapper.html()).to.contain('10.5438/0010');
        expect(wrapper.html()).to.contain('According to <strong>CERN</strong> via <strong>Datacite</strong> the item on this page <strong>is referenced by</strong> the Dataset: <br>DataCite Metadata Working Group. (2014). DataCite Metadata Schema for the Publication and Citation of Research Data v3.1.');
        done();
      });
    });
  });

  describe('with Datacite Data relations', () => {
    const wrapper = shallowMount(LinkItem, {
      localVue,
      propsData: {
        doiInfo: {
          doi: '10.5438/0010',
          source: 'datacite',
          instigator: true,
          relation: 'has-part',
          id: '10.5438/0010',
          client: {
            name: 'CERN',
          },
          resourceTypeGeneral: 'Dataset',
          publicationYear: 1899,
          formattedCitation: 'DataCite Metadata Working Group. (2014). DataCite Metadata Schema for the Publication and Citation of Research Data v3.1. https://doi.org/10.5438/0010',

        },
      },
    });


    it('renders Datacite relation', (done) => {
      wrapper.vm.$nextTick(() => {
        expect(wrapper.html()).to.contain('10.5438/0010');
        expect(wrapper.html()).to.contain('According to <strong>CERN</strong> via <strong>Datacite</strong> the item on this page <strong>has part</strong> the Dataset: <br>DataCite Metadata Working Group. (2014). DataCite Metadata Schema for the Publication and Citation of Research Data v3.1.');
        done();
      });
    });
  });


  describe('without metadata', () => {
    const wrapper = shallowMount(LinkItem, {
      localVue,
      propsData: {
        doiInfo: {
          doi: '10.5438/0010',
          source: 'datacite',
          instigator: false,
          relation: 'has-part',
        },
      },
    });


    it('renders Datacite relation', (done) => {
      wrapper.vm.$nextTick(() => {
        expect(wrapper.html()).to.contain('10.5438/0010');
        expect(wrapper.html()).to.contain('According to <strong>Datacite</strong> the item on this page <strong>has part</strong> the following item: <br>[Metadata not found]</p><a data-v-9a7b5846="" href="http://doi.org/10.5438/0010" target="_blank" title="Go to landing page" class="item"> http://doi.org/10.5438/0010 </a></li>');
        done();
      });
    });
  });
});
