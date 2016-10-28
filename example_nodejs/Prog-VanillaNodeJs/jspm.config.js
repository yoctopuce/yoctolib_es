SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "prog-vanillanodejs/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.16"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "prog-vanillanodejs": {
      "main": "prog-vanillanodejs.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {},
  packages: {}
});
