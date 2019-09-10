<template>
  <div class="review mt-10">
    <div class="flex">
      <div class="w-1/3">
        <star-rating
          :star-size="30"
          inactive-color="#EEE"
          active-color="#FFC94F"
          :rating="5"
          read-only
          :show-rating="false"
        ></star-rating>
        <div class="mt-8">
          <h4 class="c-black f-playFair">Pablo Permins</h4>
          <h5 class="f-opensans review__time">one hour ago</h5>
        </div>
      </div>
      <div
        class="w-2/3 f-opensans flex items-center"
      >Got this through the post the other day and right from opening the packet I knew this was quality, put it on and I was right!! Well done</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.review{
  padding-bottom: 40px;
  border: 0px;
  border-bottom: 1px solid #DDDDDD;
  &__time {
    color: $typeColorLightGray
  }
}
</style>

<script>
import StarRating from 'vue-star-rating'
export default {
  name: 'Review',
  components: {
    StarRating
  }
}
</script>
