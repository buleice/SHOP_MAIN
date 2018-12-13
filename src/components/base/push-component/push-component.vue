<template>
    <div class="couponSent">恭喜你获得新的优惠券</div>
</template>

<script>
    export default {
        name: "push-component"
    }
</script>

<style scoped>
    .couponSent{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 50%;
        height: 12.5rem;
        background: #ec8b89;
        line-height: 12.5rem;
        z-index: 5000;
    }

</style>
