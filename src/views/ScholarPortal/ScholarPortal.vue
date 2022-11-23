<template>
  <div class="scholar-page">
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
  export default {
    name: 'ScholarPortal',
    components: {CoWorker, RelationMap, ScholarInfoBox, PaperInfo},
  }

</script>

<style>
.scholar-page{
  width: 100%;
  height: 100%;
  background-color: #fcfcfc;
  padding-left: 10vh;
  padding-top: 10vh;
}
.top-info-and-map{
  display: flex;
  flex-direction: row;
}
.bottom-paper-and-coworker{
  display: flex;
  flex-direction: row;
}
</style>