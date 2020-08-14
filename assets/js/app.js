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
import { MySocket } from "./socket";

const socket = new MySocket();

socket.channel.on("new_annotation", (resp) => {
  console.log("got", resp);
});
socket.channel.push("annotation", { "my": "payload" });
// //
import "phoenix_html"

// import { MyButton } from "./button";

// const button = new MyButton(socket.channel);

import * as gm from "./game"

//import * as webcall from "./agora"

window.addEventListener('DOMContentLoaded', () => {

  //new webcall.MyWebCall();

  // Create the game using the 'renderCanvas'.
  let game = new gm.Game('renderCanvas');

  // Create the scene.
  game.createScene(socket.channel);
  // Start render loop.
  game.doRender();
});
