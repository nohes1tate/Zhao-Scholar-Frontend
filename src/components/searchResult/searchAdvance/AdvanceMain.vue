<template>
    <div>
        <TypeSelectVue style="float: left;margin-left: 200px;margin-top: 50px;"></TypeSelectVue>
        <TipAdvanceVue style="float: left;margin-left: 50px;margin-top: 100px;"> </TipAdvanceVue>
        
    </div>
</template>
<script>
import TypeSelectVue from './TypeSelect.vue';
import TipAdvanceVue from './TipAdvance.vue';
 export default{
    components:{
        TypeSelectVue,
        TipAdvanceVue
    }
 }
</script>