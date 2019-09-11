<template>
  <div class="review mt-10">
    <div class="flex" v-if="Object.keys(review).length > 0">
      <div class="w-1/3">
        <star-rating
          :star-size="30"
          inactive-color="#EEE"
          active-color="#FFC94F"
          :rating="review.rating"
          :max-rating="5"
          read-only
          :show-rating="false"
        ></star-rating>
        <div class="mt-8">
          <h4 class="c-black f-playFair">{{ review.name }}</h4>
          <h5 class="f-opensans review__time">{{ formatDistanceToNow(new Date(review.created_on)) }}</h5>
        </div>
      </div>
      <div class="w-2/3 f-opensans flex items-center">{{ review.review }}</div>
    </div>
    <content-loader
      v-else
      :height="148"
      :width="1200"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="248" y="43" rx="0" ry="0" width="0" height="0" />
      <rect x="283" y="41" rx="0" ry="0" width="0" height="0" />
      <rect x="272" y="41" rx="0" ry="0" width="0" height="0" />
      <rect x="239" y="40" rx="0" ry="0" width="0" height="0" />
      <rect x="26.02" y="29.67" rx="0" ry="0" width="196.8" height="22" />
      <rect x="30.55" y="73.67" rx="0" ry="0" width="95.86" height="16" />
      <rect x="31.55" y="111.67" rx="0" ry="0" width="82" height="10" />
      <rect x="402.55" y="35.67" rx="0" ry="0" width="651" height="21" />
      <rect x="402.55" y="71.67" rx="0" ry="0" width="651" height="21" />
      <rect x="403.55" y="107.67" rx="0" ry="0" width="651" height="21" />
    </content-loader>
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
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ContentLoader } from 'vue-content-loader'
export default {
  name: 'Review',
  props: {
    review: {
      type: Object
    }
  },
  components: {
    StarRating,
    ContentLoader
  },
  methods: {
    formatDistanceToNow: formatDistanceToNow
  }
}
</script>
