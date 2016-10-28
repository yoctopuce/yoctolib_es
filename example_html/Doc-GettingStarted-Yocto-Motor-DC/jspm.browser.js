SystemJS.config({
  baseURL: "/EcmaScript/example_html/Doc-GettingStarted-Yocto-Motor-DC/",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  map: {
    "app": "src"
  }
});