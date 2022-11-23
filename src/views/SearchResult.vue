<template>
  <div>
    <PageHeaderVue></PageHeaderVue>
   <!-- <searchBannerVue></searchBannerVue> -->
   <div
   style="margin-top: 50px;"
   >
    <selectBannerVue style="float:left;margin-left: 100px;"></selectBannerVue>
    <infoCardVue style="float:left;margin-left: 20px;"></infoCardVue>
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
      
    }),
    created(){
      var q=this.$route.query
      console.log(q)
    }
  }

</script>
