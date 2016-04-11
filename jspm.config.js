SystemJS.config({
  transpiler: "plugin-babel",
  babelOptions: {
    "stage": 3,
    "compact": false,
    "comments": false,
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "babel-runtime": "npm:babel-runtime@5.8.34",
    "core-js": "npm:core-js@1.2.6",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.9"
  }
});
