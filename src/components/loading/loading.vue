<template>
  <div v-show="show">
    <svg
      version="1.1"
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enable-background="new 0 0 0 0"
      xml:space="preserve"
    >
      <path
        fill="#f69f00"
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        transform="rotate(335.726 50 50)"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
</template>

<script>
    export default {
        name: "LoadingVue",
        props: {
            show: Boolean,
            text: {
                type: String,
                default: '正在加载中...'
            },
        }
    }
</script>

<style scoped>
    svg {
        position: fixed;
        width: 100px;
        height: 100px;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
        display: inline-block;

    }
</style>
