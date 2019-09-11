<template>
  <div class="shopCard flex items-center">
    <div class="shopCard__container text-center">
      <div class="shopCard__img">
        <lazyload-image :src="$_compose_img_url(item.thumbnail)" />
      </div>
      <div class="shopCard__meta mt-5">
        <h4 class="f-montserrat font-bold">{{ item.name }}</h4>
        <h4 class="f-montserrat font-bold c-fushia mt-4">£{{ item.price }}</h4>
      </div>
    </div>
    <div class="shopCard__hover flex-wrap flex justify-center">
      <i class="far fa-heart w-full text-center text-3xl c-fushia"></i>
      <custom-button class="shopCard__hover_btn" type="filled-fuchsia" size="large">
        <router-link :to="{name: 'singleProduct', params: {id: item.product_id}}">Quick View</router-link>
      </custom-button>
    </div>
  </div>
</template>

<style lang="scss">
.shopCard {
  &__img {
    max-width: 180px;
    height: 180px;
    margin: 0 auto;
    img {
      margin: 0 auto;
    }
  }
}
</style>

<style lang="scss" scoped>
.shopCard {
  min-height: 300px;
  position: relative;
  background-color: $docColorWhite;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.20);
  padding: 40px 0px;
  transition: 0.3s;
  overflow: hidden;
  &__container {
    width: 80%;
    margin: 0 auto;
  }
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    .shopCard__hover {
      transform: translate(0px, 0px);
      opacity: 1;
      visibility: visible;
    }
  }
  &__hover {
    position: absolute;
    transition: 0.5s;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.95);
    padding-top: 150px;
    transform: translate(0px, 100%);
    opacity: 0;
    visibility: hidden;
  }
}
</style>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader
  },
  name: 'shop-card',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
