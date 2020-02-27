/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-unresolved */
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import LinksListLocal from '@/components/LinksListLocal.vue';

describe('LinksListLocal.vue', () => {
  it('renders Citations List with 1 item', () => {
    const wrapper = shallowMount(LinksListLocal, {
      propsData: {
        type: 'citations',
        doi: '10.7272/q6g15xs4',
        dataInput: [{
          subjId: 'https://doi.org/10.1371/journal.ppat.1008107',
          objId: 'https://doi.org/10.7272/q6g15xs4',
          sourceId: 'crossref-related',
          sourceDoi: '10.1371/journal.ppat.1008107',
          targetDoi: '10.7272/q6g15xs4',
          relationTypeId: 'cites',
          sourceRelationTypeId: 'references',
          targetRelationTypeId: 'citations',
          total: 1,
          messageAction: 'create',
          sourceToken: '4d47afa8-7e08-4bd9-b04a-29b691427330',
          license: 'https://creativecommons.org/publicdomain/zero/1.0/',
          occurredAt: '2020-02-13T18:26:45.000Z',
          timestamp: '2020-02-16T09:15:05.145Z',
        }],
      },
    });

    wrapper.setData({
      totalPages: 1,
      PAGESIZE: 25,
      items: [{}],
    });


    // eslint-disable-next-line
      //  console.log(wrapper.html());
    expect(wrapper.find('linkitem-stub')).to.exist;
    expect(wrapper.html()).to.not.contain('pagecount="1"');
    expect(wrapper.find('.pagination.pagination')).to.exist;
  });

  it('renders No List', () => {
    const wrapper = shallowMount(LinksListLocal, {
      propsData: {
        type: 'citations',
        doi: '10.7272/q6g15xs4',
        dataInput: '10.7272/q6g15xs4',
      },
    });

    wrapper.setData({
      totalPages: 0,
      PAGESIZE: 25,
      items: [],
    });

    // eslint-disable-next-line
    // console.log(wrapper.html());
    expect(wrapper.html()).to.not.contain('linkitem-stub');
    expect(wrapper.html()).to.not.contain('.pagination.pagination');
  });

  it('renders Relation List with 3 items', () => {
    const wrapper = shallowMount(LinksListLocal, {
      propsData: {
        type: 'relations',
        page: '3',
        doi: '10.7272/q6g15xs4',
        dataInput: [{
          subjId: 'https://doi.org/10.1371/journal.ppat.1008107',
          objId: 'https://doi.org/10.7272/q6g15xs4',
          sourceId: 'crossref-related',
          sourceDoi: '10.1371/journal.ppat.1008107',
          targetDoi: '10.7272/q6g15xs4',
          relationTypeId: 'cites',
          sourceRelationTypeId: 'references',
          targetRelationTypeId: 'citations',
          total: 1,
          messageAction: 'create',
          sourceToken: '4d47afa8-7e08-4bd9-b04a-29b691427330',
          license: 'https://creativecommons.org/publicdomain/zero/1.0/',
          occurredAt: '2020-02-13T18:26:45.000Z',
          timestamp: '2020-02-16T09:15:05.145Z',
        }],
      },
    });

    wrapper.setData({
      totalPages: 3,
      PAGESIZE: 25,
      items: [{}, {}, {}],
    });


    // eslint-disable-next-line
    // console.log(wrapper.html());
    expect(wrapper.find('linkitem-stub')).to.exist;
    expect(wrapper.html()).to.contain('pagecount="3"');
    expect(wrapper.find('.pagination.pagination')).to.exist;
  });
});
