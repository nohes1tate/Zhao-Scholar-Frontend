<template>
  <div>
   <searchBannerVue></searchBannerVue>
   <infoCardVue></infoCardVue>
  </div>
</template>

<script>
  import infoCardVue from '@/components/searchResult/infoCard.vue';
  import searchBannerVue from '@/components/searchResult/searchBanner.vue';
  export default {
    name: 'SearchResult',
    components:{
      infoCardVue,
      searchBannerVue
    },
    data:()=>({
      
    })
  }

</script>
