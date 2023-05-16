<template>
    <div class="w-max p-5 bg-board rounded-lg border-solid border-2 border-white text-lg">
        <h1><slot/> : <span>{{ computedCount}}</span></h1>
    </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
    count: {
        type: Number,
        default: 0
    }
});

const computedCount = computed(()=>{
    return (props.count === 0) ? 'Empty' : props.count;
});

</script>