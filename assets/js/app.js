// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss"
// const _css = require("../css/app.css");

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"
import * as BABYLON from 'babylonjs'
import * as hello from './hello'

window.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById("renderCanvas");

  var engine = null;
  var scene = null;
  var sceneToRender = null;
  var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
  engine = createDefaultEngine();
  scene = hello.Playground.CreateScene(engine, canvas);
  sceneToRender = scene;
  engine.runRenderLoop(function () {
    if (sceneToRender) {
      sceneToRender.render();
    }
  });

  // Resize
  window.addEventListener("resize", function () {
    engine.resize();
  });

});
