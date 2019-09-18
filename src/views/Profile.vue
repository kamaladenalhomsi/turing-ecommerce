<template>
  <div>
    <div class="container w-90 pb-20 pt-10">
      <h1 class="font-bold f-montserrat">Edit Profile</h1>
      <div v-for="(group, index) in forms" :key="index" class="mt-8">
        <h3 class="profile-modal__section__title font-bold" v-if="group.head">{{ group.head }}</h3>
        <div class="w-full flex flex-wrap mt-4" nm="profile-warapper">
          <b-field
            :nm="'field-' + input.key"
            v-for="(input, inputIndex) in group.inputs"
            :key="inputIndex"
            class="custom-input w-full md:w-1/2 pr-4"
            :message="server_errors[input.key] || errors.first(`${group.key}.${input.key}`)"
            :type="server_errors[input.key] || errors.has(`${group.key}.${input.key}`) ? 'is-danger' : ''"
          >
            <template v-if="profile.customer[group.key].hasOwnProperty([input.key])">
              <b-input
                v-if="input.type !== 'select'"
                v-model="profile.customer[group.key][input.key]"
                :data-vv-name="input.key"
                :type="input.type"
                :placeholder="input.placeHolder"
                v-validate="input.vRules"
                :data-vv-scope="group.key"
                :nm="'update-' + group.key"
              ></b-input>
              <b-select
                v-model="profile.customer[group.key][input.key]"
                class="custom-select"
                v-else
                placeholder="Select a name"
              >
                <option
                  v-for="option in sources[input.source]"
                  :value="option.shipping_region_id"
                  :key="option.shipping_region_id"
                >{{ option.shipping_region }}</option>
              </b-select>
            </template>
            <content-loader
              v-else
              class="my-2"
              :height="40"
              :width="400"
              :speed="2"
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            ></content-loader>
          </b-field>
        </div>
        <div class="flex justify-end">
          <custom-button
            class="mt-4"
            size="large"
            type="filled-fuchsia"
            @click.native="update(group.key, group.updatePath, index)"
            :nm="'update-' + group.key"
            icon="fas fa-pencil-alt"
            :loading="group.loading"
          >Update</custom-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  name: 'profile',
  components: {
    ContentLoader
  },
  $_veeValidate: {
    validator: 'new'
  },
  data(vm) {
    return {
      profile: {
        customer: {
          basicData: {},
          address: {},
          credit: {
            credit_card: ''
          }
        }
      },
      forms: [
        {
          head: 'Customer Basic Data',
          key: 'basicData',
          updatePath: vm.$rest.CUSTOMERS.UPDATE(),
          loading: false,
          inputs: [
            {
              key: 'name',
              type: 'text',
              placeHolder: 'Name',
              vRules: 'required'
            },
            {
              key: 'email',
              type: 'email',
              placeHolder: 'Email',
              vRules: 'required|email'
            },
            {
              key: 'day_phone',
              type: 'text',
              placeHolder: 'Day Phone'
            },
            {
              key: 'eve_phone',
              type: 'text',
              placeHolder: 'Eve Phone'
            },
            {
              key: 'mob_phone',
              type: 'text',
              placeHolder: 'Mob Phone'
            }
          ]
        },
        {
          head: 'Address',
          key: 'address',
          updatePath: vm.$rest.CUSTOMERS.UPDATE_ADDRESS(),
          loading: false,
          inputs: [
            {
              key: 'address_1',
              type: 'text',
              placeHolder: 'Address 1',
              vRules: 'required'
            },
            {
              key: 'address_2',
              type: 'text',
              placeHolder: 'Address 2'
            },
            {
              key: 'city',
              type: 'text',
              placeHolder: 'Day Phone',
              vRules: 'required'
            },
            {
              key: 'region',
              type: 'text',
              placeHolder: 'Region',
              vRules: 'required'
            },
            {
              key: 'postal_code',
              type: 'text',
              placeHolder: 'Mob Phone',
              vRules: 'required'
            },
            {
              key: 'country',
              type: 'text',
              placeHolder: 'Country',
              vRules: 'required'
            },
            {
              key: 'shipping_region_id',
              type: 'select',
              source: 'regions',
              placeHolder: 'Shipping Region',
              vRules: 'required'
            }
          ]
        },
        {
          head: 'Credit Card',
          key: 'credit',
          updatePath: vm.$rest.CUSTOMERS.UPDATE_CREDIT(),
          loading: false,
          inputs: [
            {
              key: 'credit_card',
              type: 'tel',
              placeHolder: 'Credit Card',
              vRules: 'required'
            }
          ]
        }
      ]
    }
  },
  async created() {
    this.$store.dispatch('customer/getAllRegions')
    await this.$_async_query({
      query: {
        path: this.$rest.CUSTOMERS.SINGLE()
      },
      done: res => {
        const { name,
          email,
          day_phone,
          eve_phone,
          mob_phone,
          address_1,
          address_2,
          city,
          country,
          credit_card,
          postal_code,
          region,
          shipping_region_id } = res
        this.profile.customer.basicData = {
          name,
          email,
          day_phone,
          eve_phone,
          mob_phone
        }
        this.profile.customer.address = {
          address_1,
          address_2,
          city,
          region,
          postal_code,
          country,
          shipping_region_id
        }
        this.profile.customer.credit.credit_card = credit_card
      }
    })
  },
  computed: {
    sources() {
      return {
        regions: this.$store.getters['customer/GET_ALL_REGIONS']
      }
    }
  },
  methods: {
    async update(key, updatePath, groupIndex) {
      /**
       * @params key, updatePath
       * key is used as validation scope and as a warpper
       * updatePath is the the update route
       */
      let isValid = this.$validator.validateAll(key)
      if (!isValid) return
      this.forms[groupIndex].loading = true
      await this.$_async_mutation({
        mutation: {
          method: 'PUT',
          path: updatePath,
          variables: this.profile.customer[key]
        },
        done: res => {
          this.$store.commit('customer/SET_CUSTOMER', res)
        },
        doneNtf: res => ({
          message: `Your ${key} has updated successfully`
        })
      })
      this.forms[groupIndex].loading = false
    }
  }
}
</script>
