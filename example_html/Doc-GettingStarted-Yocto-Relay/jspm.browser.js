SystemJS.config({
  baseURL: "/EcmaScript/example_html/Doc-GettingStarted-Yocto-Relay/",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "app": "src"
  }
});
