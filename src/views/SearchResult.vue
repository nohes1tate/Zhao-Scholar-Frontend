<template>
  <div>
    <PageHeaderVue :show-search="true"></PageHeaderVue>
   <!-- <searchBannerVue></searchBannerVue> -->
   <div
   style="margin-top: 50px;"
   >
    <selectBannerVue style="float:left;margin-left: 100px;" :keyword="keyword"></selectBannerVue>
    <infoCardVue style="float:left;margin-left: 20px;" :keyword="keyword"></infoCardVue>
   </div>
  </div>
</template>

<script>
  import PageHeaderVue from '@/components/UserCenter/PageHeader.vue';
  import infoCardVue from '@/components/searchResult/infoCard.vue';
  import selectBannerVue from '@/components/searchResult/selectBanner.vue';
  export default {
    name: 'SearchResult',
    components:{
      infoCardVue,
      selectBannerVue,
      PageHeaderVue
    },
    data:()=>({
      keyword:"GAN",
    }),
    created(){
      var q=this.$route.query
      console.log(q)
    },
    methods:{

    }
  }

</script>
