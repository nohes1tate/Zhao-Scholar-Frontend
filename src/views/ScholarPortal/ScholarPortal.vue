<template>
  <div class="scholar-page">
    <page-header :show-search="false" :is-login="isLogin"></page-header>
    <div class="top-info-and-map">
      <ScholarInfoBox />
      <RelationMap />
    </div>
    <div class="bottom-paper-and-coworker">
      <PaperInfo style="width: 60vw; margin-left: -15px"/>
      <CoWorker style="margin-top: 12vh; width: 20vw"/>
    </div>

  </div>
</template>

<script>
  import ScholarInfoBox from "@/components/ScholarPortal/ScholarInfoBox";
  import RelationMap from "@/components/ScholarPortal/RelationMap";
  import PaperInfo from "@/components/ScholarPortal/scholarArticle"
  import CoWorker from "@/components/ScholarPortal/CoWorker";
  import PageHeader from "@/components/UserCenter/PageHeader";
  export default {
    name: 'ScholarPortal',
    components: {CoWorker, RelationMap, ScholarInfoBox, PaperInfo,PageHeader},
    data:()=>({
      isLogin:false
    }),
  }

</script>

<style>
.scholar-page{
  width: 100%;
  height: 100%;
  background-color: #fcfcfc;
}
.top-info-and-map{
  display: flex;
  flex-direction: row;
  padding-top:5vh;
  padding-left: 10vh;
}
.bottom-paper-and-coworker{
  display: flex;
  flex-direction: row;
  padding-left: 10vh;
}
</style>
