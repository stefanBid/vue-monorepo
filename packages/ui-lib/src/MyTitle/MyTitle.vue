<template>
    <div 
    :class="[pos, bol]"
    class="flex flex-col w-full gap-1 justify-center">
        <h1 :class="[dim]">
            <slot/>
        </h1>
        <h1 v-if="sub?.visible" :class="[sub.dim]">
            <slot name="sub"/>
        </h1>
    </div>
</template>

<script setup lang="ts">
import { computed} from 'vue';

const props = defineProps({
    position:{
        type:String,
        required:true,
        default:'left',
        validator: (value:string)=>{
           return ['left', 'center', 'right'].includes(value);
        }
    },
    dimension:{
        type:String,
        required:true,
        default: 'mudium',
        validator: (value:string)=>{
            return ['small', 'medium', 'large'].includes(value);
        }
    },
    isBold:{
        type:Boolean,
        required:false,
        default:false
    },
    isSubTitle:{
        type:Boolean,
        required:false,
        default:false
    }
});

const pos = computed(()=>{
    return ({
        left:'items-start', 
        center:'items-center',
        right:'items-end'
    })[props.position] ?? 'items-center';
});

const dim = computed(()=>{
    return ({
        small:'text-xl', 
        medium:'text-2xl', 
        large:'text-4xl'
    })[props.dimension] ?? 'text-xl';
});

const bol = computed(()=>{
    return props.isBold ? 'font-semibold' : '';
});

const sub = computed(()=>{
    if(props.isSubTitle){
        if(props.dimension === 'small'){
            return {visible:true, dim:'text-lg'}
        }else if(props.dimension === 'medium'){
            return {visible:true, dim:'text-xl'}
        }else{
            return {visible:true, dim:'text-2xl'}
        }
    }else{
        return {visible:false, dim:''}
    }
});

</script>

