import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import LinksTabs from '@/components/LinksTabs.vue'


const doi = '10.7272/q6g15xs4'
const wrapper = shallowMount(LinksTabs, {
  propsData: { doi }
})

describe('LinksTabs.vue', () => {
  it('renders multiple tabs', () => {


    wrapper.setData({
      citationsNum: 5,
      referencesNum: 0,
      relationsNum: 20
   })


    expect(wrapper.html()).to.contain('citations-tab')
    expect(wrapper.html()).to.not.contain('references-tab')
    expect(wrapper.html()).to.contain('relations-tab')
    expect(wrapper.find('linkslist-stub')).to.exist

  })

  it('renders no tabs', () => {


    wrapper.setData({
      citationsNum: 0,
      referencesNum: 0,
      relationsNum: 0
   })

    expect(wrapper.html()).to.not.contain('citations-tab')
    expect(wrapper.html()).to.not.contain('references-tab')
    expect(wrapper.html()).to.not.contain('relations-tab')

  })

  it('renders citation tab', () => {


    wrapper.setData({
      citationsNum: 1,
      referencesNum: 0,
      relationsNum: 0
   })

   expect(wrapper.html()).to.contain('citations-tab')
    expect(wrapper.html()).to.not.contain('references-tab')
  expect(wrapper.html()).to.not.contain('relations-tab')
    expect(wrapper.find('linkslist-stub')).to.exist


  })
})
