<template>
    <div class="page-container">
        <MyTitle position="center" dimension="large" is-bold is-sub-title>
            <template #default>Users Dshboard</template>
            <template #sub> (Table of all users)</template>
        </MyTitle>

        <div class="grid-container">
            <DxDataGrid
                id="user-grid"
                :data-source="users"
            >

            </DxDataGrid>
        </div>

        <MyCounter :count="count">
            Total of User
        </MyCounter>

    </div>
</template>

<script setup lang="ts">
import DxDataGrid from '@vue-monorepo/dev-extreme-config/node_modules/devextreme-vue/data-grid';
import {computed,ref} from 'vue';
import {MyCounter} from '@vue-monorepo/ui-lib';
import {MyTitle} from '@vue-monorepo/ui-lib';


const users = ref([
    {id: 1, name: "John Doe", email: "hfhkjfh"},
    {id: 2, name: "John Doe", email: "hfhkjfh"},
    {id: 3, name: "John Doe", email: "hfhkjfh"},
    {id: 1, name: "John Doe", email: "hfhkjfh"},
    {id: 2, name: "John Doe", email: "hfhkjfh"},
    {id: 3, name: "John Doe", email: "hfhkjfh"},
    {id: 1, name: "John Doe", email: "hfhkjfh"},
    {id: 2, name: "John Doe", email: "hfhkjfh"},
    {id: 3, name: "John Doe", email: "hfhkjfh"},
]);


const count = computed(()=>{
    return users.value.length;
});

</script>

<style scoped>
@tailwind components;

@layer components{
    .page-container{
        @apply p-10 flex flex-col gap-y-6 items-start justify-start h-screen bg-transparent;
    }

    .grid-container{
        @apply w-full h-1/2 p-[0.1rem] border-solid border-white border-2 rounded-lg;
    }
    
    #user-grid{
        @apply w-full h-full;
    }
}
</style>