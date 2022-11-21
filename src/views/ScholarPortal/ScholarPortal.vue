<template>
  <div class="scholar-page">
    <div class="top-info-and-map">
      <ScholarInfoBox />
      <RelationMap />
    </div>
    <div class="bottom-paper-info">
      <PaperInfo />
    </div>
  </div>
</template>

<script>
  import ScholarInfoBox from "@/components/ScholarPortal/ScholarInfoBox";
  import RelationMap from "@/components/ScholarPortal/RelationMap";
  import PaperInfo from "@/components/searchResult/infoCard.vue"
  export default {
    name: 'ScholarPortal',
    components: {RelationMap, ScholarInfoBox, PaperInfo},
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
.bottom-paper-info{
  margin-top: 10vh;
}
</style>