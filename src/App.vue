<template>
  <router-view />
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["getCurrentUser"]),
  },
  created() {
    this.getCurrentUser();
  },
};
</script>

<style lang="scss">
@import "@/scss/global.scss";
body {
  font-family: $font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $pri-color;
  background: $main-bg;
  font-size: 13px;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
}

a {
  font-weight: bold;
  color: $sec-color;
  &.router-link-exact-active {
    color: #42b983;
  }
}

svg {
  width: 20px;
  cursor: pointer;
}

button {
  cursor: pointer;
}

img {
  width: 100%;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.hide-on-sm {
  display: none;
}

.hide-on-lg {
  display: block;
}

.container {
  width: 90%;
  margin: auto;
  overflow: hidden;
}

@media screen and (min-width: 700px) {
  .container {
    width: 80%;
  }
  .hide-on-sm {
    display: block;
  }
  .hide-on-lg {
    display: none;
  }
}

@media screen and (min-width: 1100px) {
  .container {
    width: 1000px;
  }
}
</style>
