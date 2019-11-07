<template>

<div class='row footer'>
    <div class='col-md-3'>
      <h4>About DataCite</h4>
      <ul>
        <li v-for="link in aboutLinks" :key="link.id">
          <a v-bind:href="link.url">{{ link.name  }}</a>
        </li>
      </ul>
    </div>
    <div class='col-md-3'>
      <h4>Services</h4>
      <ul>
        <li v-for="link in servicesLinks" :key="link.id">
          <a v-bind:href="link.url">{{ link.name  }}</a>
        </li>
      </ul>
    </div>
    <div class='col-md-3'>
      <h4>Resources</h4>
      <ul>
        <li v-for="link in resourcesLinks" :key="link.id">
          <a v-bind:href="link.url">{{ link.name  }}</a>
        </li>
      </ul>
      <h4>Community</h4>
      <ul>
        <li v-for="link in communityLinks" :key="link.id">
          <a v-bind:href="link.url">{{ link.name  }}</a>
        </li>
      </ul>
    </div>
    <div class='col-md-3'>
      <h4 class="share">Contact us</h4>
      <a href='mailto:support@datacite.org' class="share">
        <i class='fa fa-at'></i>
      </a>
      <a href='https://blog.datacite.org/feed.xml' class="share">
        <i class='fa fa-rss'></i>
      </a>
      <a href='https://twitter.com/datacite' class="share">
        <i class='fa fa-twitter'></i>
      </a>
      <a href='https://github.com/datacite/datacite' class="share">
        <i class='fa fa-github'></i>
      </a>
      <a href='https://www.linkedin.com/company/datacite' class="share">
        <i class='fa fa-linkedin'></i>
      </a>
      <ul>
        <li v-for="link in contactLinks" :key="link.id">
          <a v-bind:href="link.url">{{ link.name  }}</a>
        </li>
      </ul>
      <a href="http://status.datacite.org" target="_blank">
        <statuspage-widget src="https://status.datacite.org/"></statuspage-widget>
      </a>
    </div>
</div>
</template>

<script>


export default {
  name: 'DataciteFooter',
  props: {
    title: String
  },
  data: function() { 
    return {
      aboutLinks: [
         {
            "name": "What we do",
            "url": "https://www.datacite.org/mission.html"
          },
          {
            "name": "Governance",
            "url": "https://www.datacite.org/governance.html"
          },
          {
            "name": "Steering groups",
            "url": "https://www.datacite.org/steering.html"
          },
          {
            "name": "Staff",
            "url": "https://www.datacite.org/staff.html"
          },
          {
            "name": "Job opportunities",
            "url": "https://www.datacite.org/jobopportunities.html"
          }
        ],
        servicesLinks: [{
            "name": "Assign DOIs",
            "url": "https://www.datacite.org/dois.html"
          },
          {
            "name": "Metadata search",
            "url": "https://www.datacite.org/search.html"
          },
          {
            "name": "Event data",
            "url": "https://www.datacite.org/eventdata.html"
          },
          {
            "name": "Profiles",
            "url": "https://www.datacite.org/profiles.html"
          },
          {
            "name": "re3data",
            "url": "https://www.datacite.org/re3data.html"
          },
          {
            "name": "Citation formatter",
            "url": "https://www.datacite.org/citation.html"
          },
          {
            "name": "Statistics",
            "url": "https://www.datacite.org/stats.html"
          },
          {
            "name": "Content negotiation",
            "url": "https://www.datacite.org/content.html"
          },
          {
            "name": "OAI-PMH",
            "url": "https://www.datacite.org/oaipmh.html"
          }
        ],
        resourcesLinks: [{
            "name": "Metadata schema",
            "url": "https://schema.datacite.org"
          },
          {
            "name": "Support",
            "url": "https://support.datacite.org"
          }
        ],
        communityLinks: [{
            "name": "Members",
            "url": "https://www.datacite.org/members.html"
          },
          {
            "name": "Partners",
            "url": "https://www.datacite.org/partners.html"
          },
          {
            "name": "Steering groups",
            "url": "https://www.datacite.org/steering.html"
          },
          {
            "name": "Events",
            "url": "https://www.datacite.org/events.html"
          },
          {
            "name": "Roadmap",
            "url": "https://www.datacite.org/roadmap.html"
          },
          {
            "name": "User Stories",
            "url": "https://www.datacite.org/user-stories.html"
          }
        ],
        contactLinks: [{
            "name": "Terms and conditions",
            "url": "https://www.datacite.org/terms.html"
          },
          {
            "name": "Privacy policy",
            "url": "https://www.datacite.org/privacy.html"
          },
          {
            "name": "Acknowledgements",
            "url": "https://www.datacite.org/acknowledgments.html"
          }
        ],
        indicator: "none",
        statusDescription: "All Systems Operational"
      }
    },
  computed:{
      statusClass(){
        return "color-dot " + this.indicator
      }
    },
  methods:{
    insertMarkup(){
      let tag = document.createElement('script');    

      tag = document.createElement('script');    
      tag.setAttribute('type',"application/javascript")
      tag.setAttribute('src',"https://unpkg.com/@webcomponents/webcomponentsjs@2.1.3/webcomponents-bundle.js")
      tag.async = true
      document.head.appendChild(tag)

      tag = document.createElement('script');    
      tag.setAttribute('type',"application/javascript")
      tag.setAttribute('src',"https://unpkg.com/@statuspage/status-widget/dist/index.js")
      tag.async = true
      document.head.appendChild(tag)

    }
  },
  created() {
    this.insertMarkup()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway:400,600,400italic,600italic');
/* @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'); */
/* @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css'); */
@import url('https://assets.datacite.org/stylesheets/datacite.css');
</style>

