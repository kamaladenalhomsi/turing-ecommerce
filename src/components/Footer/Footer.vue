<template>
  <div class="main-footer">
    <div class="container container-90">
      <div class="flex flex-wrap py-12">
        <div class="w-full flex flex-wrap justify-center md:justify-start mb-10 md:mb-0 md:w-2/6">
          <div class="flex justify-start">
            <footer-social-link icon="fab fa-instagram"></footer-social-link>
            <footer-social-link icon="fab fa-pinterest"></footer-social-link>
            <footer-social-link icon="fab fa-twitter"></footer-social-link>
            <footer-social-link icon="fab fa-facebook-f"></footer-social-link>
          </div>
          <h5 class="w-full text-center md:text-left mt-8 c-white f-opensans">©2019 shopmate Ltd</h5>
        </div>
        <div class="flex flex-wrap justify-end w-full md:w-4/6">
          <div
            v-for="(section, index) in footer"
            :key="index"
            class="w-full mb-8 md:mb-0 justify-center md:justify-left md:w-1/3 flex justify-start flex-wrap"
          >
            <h4 class="w-full c-white font-bold text-center f-montserrat">{{ section.title }}</h4>
            <ul class="mt-4 c-white f-opensans text-sm main-footer__list">
              <li v-for="(item, index) in section.items" :key="index">
                <a href>{{ item }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FooterSocialLink from '@/components/Footer/FooterSocialLink.vue'
export default {
  name: 'Footer',
  components: {
    FooterSocialLink
  },
  data () {
    return {
      footer: [
        {
          title: 'QUESTIONS?',
          items: [
            'Help',
            'Track Order',
            'Returns'
          ]
        },
        {
          title: `WHAT'S IN STORE`,
          items: [
            'Help',
            'Track Order',
            'Returns'
          ]
        },
        {
          title: `FOLLOW US`,
          items: [
            'Who we are',
            'Work with us',
            'Affilate program'
          ]
        }
      ]
    }
  }
}
</script>
