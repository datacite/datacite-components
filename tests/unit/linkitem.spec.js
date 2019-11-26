import axios from "axios";
import MockAdapter from 'axios-mock-adapter'
var mock = new MockAdapter(axios);

import {expect } from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import LinkItem from '@/components/LinkItem.vue'


let metadata = {
  id: "10.5438/0010",
  client: {
    name: "CERN"
  },
  resourceTypeGeneral: "Dataset",
  publicationYear: 1899,
  formattedCitation: "DataCite Metadata Working Group. (2014). DataCite Metadata Schema for the Publication and Citation of Research Data v3.1. https://doi.org/10.5438/0010"
}


describe('LinkItem.vue', () => {
  const localVue = createLocalVue()

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });
  
  afterEach(() => {
    mock.restore();
  });
 

  describe('with Crossref Data', () => {
    const wrapper = shallowMount(LinkItem, {
      localVue,
      propsData: {
        doiInfo: {
          doi: "10.5438/0010",
          source: "crossref",
          instigator: false,
          relation: "references"
        }
      }
    });

    mock
      .onAny("https://api.datacite.org/graphql")
      .reply(200, {
        data: {
          creativeWork: metadata
        }
      });

    it('renders Crossref citation', done => {

      wrapper.vm.$nextTick(() => {
      
        expect(wrapper.html()).to.contain('10.5438/0010')
        expect(wrapper.html()).to.contain('According to <strong>Crossref</strong> the following Dataset <strong>references</strong> the item on this page: <br>DataCite Metadata Working Group. (2014). DataCite Metadata Schema for the Publication and Citation of Research Data v3.1.')
        done()
      })
    })
  })


  describe('with Datacite Data', () => {
    const wrapper = shallowMount(LinkItem, {
      localVue,
      propsData: {
        doiInfo: {
          doi: "10.5438/0010",
          source: "datacite",
          instigator: true,
          relation: "is-referenced-by"
        }
      }
    });


    mock
      .onAny("https://api.datacite.org/graphql")
      .reply(200, {
        data: {
          creativeWork: metadata
        }
      });

    it('renders Datacite reference', done => {

      wrapper.vm.$nextTick(() => {
    
        expect(wrapper.html()).to.contain('10.5438/0010')
        expect(wrapper.html()).to.contain('According to <strong>CERN</strong> via <strong>Datacite</strong> the item on this page <strong>is referenced by</strong> the Dataset: <br>DataCite Metadata Working Group. (2014). DataCite Metadata Schema for the Publication and Citation of Research Data v3.1.')
        done()
      })
    })
  })

  describe('with Datacite Data relations', () => {
    const wrapper = shallowMount(LinkItem, {
      localVue,
      propsData: {
        doiInfo: {
          doi: "10.5438/0010",
          source: "datacite",
          instigator: true,
          relation: "has-part"
        }
      }
    });


    mock
      .onAny("https://api.datacite.org/graphql")
      .reply(200, {
        data: {
          creativeWork: metadata
        }
      });

    it('renders Datacite relation', done => {

      wrapper.vm.$nextTick(() => {

        expect(wrapper.html()).to.contain('10.5438/0010')
        expect(wrapper.html()).to.contain('According to <strong>CERN</strong> via <strong>Datacite</strong> the item on this page <strong>has part</strong> the Dataset: <br>DataCite Metadata Working Group. (2014). DataCite Metadata Schema for the Publication and Citation of Research Data v3.1.')
        done()
      })
    })
  })

  
  describe('without metadata', () => {
    const wrapper = shallowMount(LinkItem, {
      localVue,
      propsData: {
        doiInfo: {
          doi: "10.5438/0010",
          source: "datacite",
          instigator: false,
          relation: "has-part"
        }
      }
    });


    mock
      .onAny("https://api.datacite.org/graphql")
      .reply(200, {
        data: null
      });

    it('renders Datacite relation', done => {

      wrapper.vm.$nextTick(() => {
      
        expect(wrapper.html()).to.contain('10.5438/0010')
        expect(wrapper.html()).to.contain('According to <strong>CERN</strong> via <strong>Datacite</strong> the following Dataset <strong>has part</strong> the item on this page: <br>DataCite Metadata Working Group. (2014). DataCite Metadata Schema for the Publication and Citation of Research Data v3.1.')
        done()
      })
    })
  })

})