SystemJS.config({
  baseURL: "/EcmaScript/example_html/Doc-GettingStarted-Yocto-milliVolt-Rx/",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  map: {
    "app": "src"
  }
});