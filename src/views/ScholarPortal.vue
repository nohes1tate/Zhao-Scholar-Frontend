<template>
  <div class="scholar-page">
    <ScholarInfoBox />
  </div>
</template>

<script>
  import ScholarInfoBox from "@/components/ScholarPortal/ScholarInfoBox";
  export default {
    name: 'ScholarPortal',
    components: {ScholarInfoBox},
  }
</script>

<style>
.scholar-page{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  padding-left: 10vh;
}

</style>