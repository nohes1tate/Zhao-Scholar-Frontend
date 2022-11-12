<template>
  <div class="scholar-page">
    <div class="top-info-and-map">
      <ScholarInfoBox />
      <RelationMap />
    </div>
  </div>
</template>

<script>
  import ScholarInfoBox from "@/components/ScholarPortal/ScholarInfoBox";
  import RelationMap from "@/components/ScholarPortal/RelationMap";
  export default {
    name: 'ScholarPortal',
    components: {RelationMap, ScholarInfoBox},
  }

</script>

<style>
.scholar-page{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  padding-left: 10vh;
  padding-top: 10vh;
}
.top-info-and-map{
  display: flex;
  flex-direction: row;
}
</style>