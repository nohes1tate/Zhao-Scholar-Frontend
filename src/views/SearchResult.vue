<template>
  <div v-title data-title='搜索结果 - ZScholar'>
    <PageHeaderVue :show-search="true" style="width: 100%;"></PageHeaderVue>
    <div>

    <!-- <selectBannerVue style="float:left;margin-left: 100px;width: 250px;" :keyword="keyword"></selectBannerVue> -->
    <infoCardVue style="float: left;" ></infoCardVue>
    </div>
   <!-- <searchBannerVue></searchBannerVue> -->


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
      PageHeaderVue,


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
