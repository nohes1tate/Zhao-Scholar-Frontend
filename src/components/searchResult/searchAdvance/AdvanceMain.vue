<template>
    <div height="100vh">
        <AdvanceHeaderVue></AdvanceHeaderVue>
        <div >
            <TypeSelectVue style="float: left;margin-left: 200px;margin-top: 100px;"></TypeSelectVue>
        <TipAdvanceVue style="float: left;margin-left: 50px;margin-top: 50px;"> </TipAdvanceVue>
        </div>
        
        
    </div>
</template>
<script>
import AdvanceHeaderVue from './AdvanceHeader.vue';
import TypeSelectVue from './TypeSelect.vue';
import TipAdvanceVue from './TipAdvance.vue';
 export default{
    components:{
        TypeSelectVue,
        TipAdvanceVue,
        AdvanceHeaderVue
    }
 }
</script>