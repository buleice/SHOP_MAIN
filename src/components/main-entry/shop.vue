<template lang="html">
            <keep-alive>
                <router-view :key="$route.fullPath"></router-view>
            </keep-alive>
</template>

<script>

    export default {
        name: 'ShopDeault',
    }
</script>
<style scoped lang="scss">
</style>
