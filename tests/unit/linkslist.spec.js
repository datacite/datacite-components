import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import LinksList from '@/components/LinksList.vue'

describe('LinksList.vue', () => {

  it('renders Citations List with 1 item', () => {
    const wrapper = shallowMount(LinksList, {
      propsData: { 
        type: "citations",
        page: "1",
        doi: "10.7272/q6g15xs4"
       }
    })

    wrapper.setData({
      totalPages: 1,
      PAGESIZE: 25,
      items: [{}]
   })


       // eslint-disable-next-line
      //  console.log(wrapper.html());
       expect(wrapper.find('linkitem-stub')).to.exist
       expect(wrapper.html()).to.not.contain('pagecount="1"')
       expect(wrapper.find('.pagination.pagination')).to.exist
  })

  it('renders No List', () => {
    const wrapper = shallowMount(LinksList, {
      propsData: { 
        type: "citations",
        page: "0",
        doi: "10.7272/q6g15xs4"
       }
    })

    wrapper.setData({
      totalPages: 0,
      PAGESIZE: 25,
      items: []
   })

    // eslint-disable-next-line
    // console.log(wrapper.html());
    expect(wrapper.html()).to.not.contain("linkitem-stub")
    expect(wrapper.html()).to.not.contain(".pagination.pagination")
  })

  it('renders Relation List with 3 items', () => {
    const wrapper = shallowMount(LinksList, {
      propsData: { 
        type: "relations",
        page: "3",
        doi: "10.7272/q6g15xs4"
       }
    })

    wrapper.setData({
      totalPages: 3,
      PAGESIZE: 25,
      items: [{},{},{}]
   })

   
    // eslint-disable-next-line
    // console.log(wrapper.html());
    expect(wrapper.find('linkitem-stub')).to.exist
    expect(wrapper.html()).to.contain('pagecount="3"')
    expect(wrapper.find('.pagination.pagination')).to.exist
  })
})
