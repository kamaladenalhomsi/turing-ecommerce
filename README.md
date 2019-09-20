# Turing Ecommerce

Hello, this is my submession for turing challenge.

### Table of Contents:

- [Getting Started](#getting-started)
- [Project Tech Stack](#project-techniques)
- [Folder Structure](#folder-structure)
- [App Core](#app-core)
- [Global Components](#global-components)
- [PWA Support & Optimization](#pwa-support-&-optimization)
- [API Improvement](#api-improvement)
- [Guidelines](#guidelines)
- [Time Estimations](#time-estimations)

## Getting Started

prerequisites:

- NodeJS version 10 or higher
- NPM
- @vue/cli-service

### Project setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run serve
```

#### Compiles and minifies for production

```
npm run build
```

#### Run unit tests

```
npm run test:unit
```

#### Run e2e tests

```
npm run test:e2e
```

add `--coverage` after any test command to see tests coverage

## Project Tech Stack

- [Vue.js](http://vuejs.org)
- [Vuex](https://vuex.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Buefy](https://buefy.org/)
- [Axios](https://github.com/axios/axios)
- [date-fns](https://date-fns.org/)
- [Vee Validate](https://logaretm.github.io/vee-validate/)
- [vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)
- [vue-content-loader](https://github.com/egoist/vue-content-loader)
- [vue-facebook-login-component](https://github.com/adi518/vue-facebook-login-component#readme)
- [vue-star-rating](https://github.com/craigh411/vue-star-rating#readme)
- [Jest](https://jestjs.io/)
- [NightmareJS](http://www.nightmarejs.org/)

## Folder Structure

```
.
├── public
|   |────── img/icons
├── src
|   |────── assets
|   |       |────── fonts/webfonts
|   |       |────── images
|   |       |────── scss
|   |────── components
|   |       |────── Authentication
|   |       |────── Footer
|   |       |────── Forms
|   |       |────── Home
|   |       |────── Navbar
|   |       |────── SingleProduct
|   |────── constants
|   |────── layouts
|   |────── mixins
|   |────── plugins
|   |────── store
|   |       |────── modules
|   |────── view
|
├── tests
|   |────── unit
|   |       |────── components
|   |       |────── mixins
|   |       |────── views
|   |────── e2e
|   |       |────── views
|   |       |────── components
├── LICENSE
└── README.md
```

## App Core

> src/mixins/asyncHelpers.js

The whole logic of fetching and sending data in this project
built on the top of two major methods located in

- \$\_async_query

```javascript
$_async_query(payload)
/**
 * it takes only one parameter 'payload'
 */
payload: {
  query: {
    path: /* rest API path || action: # vuex action name */,
    params: /* query params */
  },
  done: res => {} /* Done Callback status: 200 */,
  unauthorized: res => {} /* unauthorized Callback status: 401 */
}

/**
 * @return response comming from API
 */

```

- \$\_async_mutation

```javascript
$_async_mutation(payload)
/* Payload Structure */
payload: {
  mutation: {
    path: /* rest API path || action: # vuex action name */,
    method: /* request method (post, delete, ...etc) */,
    variables: /* mutation variables */
  },
  done: res => {} /* Done Callback status: 200 */,
  unauthorized: res => {} /* unauthorized Callback status: 401 */,
  badRequest: res => {} /* bad request callback status: 400 */
  /**
   * notification callbacks, by default in each action * a default notification
   * will be invoked but you can override it
   * @return response comming from API
   */ ,
  doneNtf: res => ({}),
  badRequestNtf: res => ({}),
  unauthorizedNtf: res => ({})
}

```

#### Why to follow this pattern instead of fetching data directly with Axios?

The idea of creating these two function comes from the fact that sometimes you may want to
follow a different approach for every query in the case of being successful or not.

Example: In the case of a bad request (400 status) I automatically injected the
errors coming from the server into an object called `server_errors` so
you do not have to worry about handling the errors you can access
errors anywhere using `this.server_errors`
<br />
you can consider them as a wrapper with callbacks

#### Mapping REST API into constants

> src/constants/rest_paths.js

I mapped the REST API into the constants objects. This way I have only one
place to update if any updates happened to the REST API since some paths are repeated
in different files.

#### Vuex Module Pattern

I used the vuex module's mode in this project,
for more details about that: https://vuex.vuejs.org/guide/modules.html

## Global Components

The Following Components registered globally, so you can use them everywhere

- Confirm

  - Props

    | Name        | Type   | Parameters                                                                            | Default                |
    | ----------- | ------ | ------------------------------------------------------------------------------------- | ---------------------- |
    | title       | String |                                                                                       | Confirm                |
    | message     | String |                                                                                       | Continue on this task? |
    | cancelText  | String |                                                                                       | Disagree               |
    | confirmText | String |                                                                                       | Agree                  |
    | type        | String | is-primary, is-info, is-success, <br /> is-warning, is-danger, is-dark <br /> is-text | is-primary             |

  - Events

    | Name   | Description                      |
    | ------ | -------------------------------- |
    | accept | emit when user agree the confirm |

- CustomButton

  - Props

    | Name    | Type    | Parameters                                                      | Default        |
    | ------- | ------- | --------------------------------------------------------------- | -------------- |
    | type    | String  | outlined, outlined-fuchsia, <br /> filled-white, filled-fuchsia | filled-fuchsia |
    | size    | String  | medium, large                                                   | medium         |
    | icon    | String  |
    | loading | Boolean |                                                                 | false          |

- LazylodaImage

  - Props

    | Name | Type   | Parameters | Default |
    | ---- | ------ | ---------- | ------- |
    | src  | String |

## PWA Support & Optimization

This Application is a Progressive web app,
PWA is:

- Fast
- Reliable
- Engaging
  <br />

This App follows the App Shell Model, [App Shell architecture ](https://developers.google.com/web/fundamentals/architecture/app-shell)

> Progressive web apps bring the best from the web and the best from apps - Pete LePage

#### Optimization

- All assets pre-cached and all API requests cached with network-and-cache strategy
- Activate Nginx Cache Control
- Activate Nginx gzip compression
- Chunks code spliting
- Prefetching, Preloading assets
- Defer unneeded scripts (for the inital load)
- Lazy loading for components

## API Improvement

- *Cart*
  <br /> what I noticed about the cart that there is no link between the cart and user, so if someone takes the cart_id he can checkout or edit someone else cart
- *Attributes*
  <br />
  This is not about the attributes only, the API contains many routes to fetch critical data, for example, attributes values, according to the design, attributes name will never be fetched without its values, because of the two routes `/attributes/{attribute_id}` and `/attributes/values/{attribute_id}` I had to fetch the attributes first and wait for it its ids, then I had to fetch it one by one, I know may the reason is that the API is REST, but something like attributes must have values resolver

Generally, the API is awesome, but I wished if the API was a [GraphQL one](https://graphql.org/)

## Guidelines
 - [Udacity Commit Style Guide](https://udacity.github.io/git-styleguide/)
 - [Gitflow WorkFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

## Time Estimations

I enrolled in this challenge since **34** days ago, <br /> I spent **50** hours on this challenge in total<br />
I missed **5** standups, but I wish you consider two things that forced me to miss the 5 standups and forced me to take 32 days:

- Currently, I am working on a company as a full-time web developer
- During this period, my father had heart issues and I had to spend some days with him in the hospital to take care of him.

I hope you consider my submission as I put an immense work in it. I hope you also understand my reasons for missing some of the standups and taking an extended time to finish this.

That's it!, this is the end! <br />
Thanks for your time <br />
Kamal Eddin Alhumsi @ _2019/20/9_
