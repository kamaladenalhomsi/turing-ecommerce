/**
 * mapped all RESTFUL API Routes into constants
 */

export default {
  DEPARTMENTS: {
    ALL: () => '/departments',
    SINGLE: id => `/departments/${id}`
  },
  CATEGORIES: {
    ALL: () => '/categories',
    SIGNLE: id => `/categories/${id}`,
    IN_PRODUCT: p_id => `/categories/inProduct/${p_id}`,
    IN_DEPARTMENT: d_id => `/categories/inDepartment/${d_id}`
  },
  ATTRIBUTES: {
    ALL: () => '/attributes',
    SINGLE: id => `/attributes/${id}`,
    VALUES: id => `/attributes/values/${id}`,
    IN_PRODUCT: p_id => `/attributes/inProduct/${p_id}`
  },
  PRODUCTS: {
    ALL: () => '/products',
    SEARCH: () => '/products/search',
    SINGLE: id => `/products/${id}`,
    IN_CATEGORY: c_id => `/products/inCategory/${c_id}`,
    IN_DEPARTMENT: d_id => `/products/inDepartment/${d_id}`,
    DETAILS: id => `/products/${id}/details`,
    LOCATIONS: id => `/products/${id}/locations`,
    REVIEWS: {
      ALL: id => `/products/${id}/reviews`,
      ADD: id => `/products/${id}/reviews`
    }
  },
  CUSTOMERS: {
    UPDATE: () => '/customer',
    SINGLE: () => '/customer',
    ADD: () => '/customers',
    LOGIN: () => '/customers/login',
    F_LOGIN: () => '/customers/facebook',
    UPDATE_ADDRESS: () => '/customers/address',
    UPDATE_CREDIT: () => '/customers/creditCard'
  },
  ORDERS: {
    ADD: () => '/orders',
    SINGLE: id => `/orders/${id}`,
    IN_CUSTOMER: () => '/orders/inCustomer',
    SHORT_DETAIL: id => `/orders/shortDetail/${id}`
  },
  SHOPPING_CART: {
    GENERATE_UNIQUE_ID: () => '/shoppingCart/generateUniqueId',
    ADD: () => '/shoppingcart/add',
    GET: id => `/shoppingcart/${id}`,
    UPDATE_ITEM: item_id => `/shoppingcart/update/${item_id}`,
    EMPTY_CART: id => `/shoppingcart/empty/${id}`,
    MOVE_TO_CART: item_id => `/shoppingcart/moveToCart/${item_id}`,
    TOTAL_AMOUNT: id => `/shoppingcart/totalAmount/${id}`,
    SAVE_FOR_LATER: item_id => `/shoppingcart/saveForLater/${item_id}`,
    GET_SAVED: id => `/shoppingcart/getSaved/${id}`,
    DELETE_PRODUCT: item_id => `/shoppingcart/removeProduct/${item_id}`
  },
  TAX: {
    ALL: () => '/tax',
    SINGLE: id => `/tax/${id}`
  },
  SHIPPING: {
    REGIONS: () => '/shipping/regions',
    SINGLE_REGION: r_id => `shipping/regions/${r_id}`
  },
  STRIPE: {
    CHARGE: () => `/stripe/charge`,
    WEBHOOKS: () => `/stripe/webhooks`
  }
}
