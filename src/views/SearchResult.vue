<template>
  <div>
   <searchBannerVue></searchBannerVue>
   <div
   width="100%"
   >
    <selectBannerVue style="float:left"></selectBannerVue>
    <infoCardVue style="float:left"></infoCardVue>
   </div>
  </div>
</template>

<script>
  import infoCardVue from '@/components/searchResult/infoCard.vue';
  import searchBannerVue from '@/components/searchResult/searchBanner.vue';
  import selectBannerVue from '@/components/searchResult/selectBanner.vue';
  export default {
    name: 'SearchResult',
    components:{
      infoCardVue,
      searchBannerVue,
      selectBannerVue
    },
    data:()=>({
      
    })
  }

</script>
