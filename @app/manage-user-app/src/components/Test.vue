<template>
    <div :class="[pos, bol, 'title-container']">
        <h1 :class="dim">
            <slot/>
            <span>
                <slot name="styled"/>
            </span>
        </h1>
        <h1 v-if="sub?.visible" :class="[sub.dim]">
            <slot name="sub"/>
        </h1>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

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
    return ({left:'l-pos', center:'c-pos', right:'r-pos'})[props.position] ?? 'c-pos';
});

const dim = computed(()=>{
    return ({small:'s-dim', medium:'m-dim', large:'l-dim'})[props.dimension] ?? 'm-dim';
});

const bol = computed(()=>{
    return props.isBold ? 'f-sbol' : '';
});

const sub = computed(()=>{
    if(props.isSubTitle){
        if(props.dimension === 'small'){
            return {visible:true, dim:'s-dim'}
        }else if(props.dimension === 'medium'){
            return {visible:true, dim:'s-dim'}
        }else{
            return {visible:true, dim:'m-dim'}
        }
    }else{
        return {visible:false, dim:''}
    }
});

</script>

<style scoped>
@tailwind components;

@layer components{
    .title-container{
        @apply w-full flex flex-col justify-center gap-1;
    }

    .f-sbol{
        @apply font-semibold;
    }

    .l-pos{
        @apply items-start;
    }

    .c-pos{
        @apply items-center;
    }

    .r-pos{
        @apply items-end;
    }

    .s-dim{
        @apply text-sm;
    }

    .m-dim{
        @apply text-base;
    }

    .l-dim{
        @apply text-lg;
    }
}
</style>
