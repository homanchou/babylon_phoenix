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
import AgoraRTC from "agora-rtc-sdk"

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




window.addEventListener('DOMContentLoaded', () => {

  var uid = window.location.hash;
  if (uid == "") {
    uid = "bob";
  }
  //initialize client
  // live - interactive streaming
  // rtc - 1:1 or group chat
  var client = AgoraRTC.createClient({ mode: 'rtc', codec: "h264" });

  client.init("ac925e569c754fc4b7a7b30010c651bc", function () {
    console.log("AgoraRTC client initialized");
    client.join(null, "lobby", uid, function (uid) {
      console.log("User " + uid + " joined channel successfully");

      var localStream = AgoraRTC.createStream({
        streamID: "stream_" + uid,
        audio: true,
        video: false,
        screen: false,
      })

      localStream.init(function () {
        console.log("init local stream success");

        client.publish(localStream, function (err) {
          console.log("publish failed");
          console.error(err);
        })

      }, function (err) {
        console.error("init local stream failed ", err);
      });


    }, function (err) {
      console.log("Join channel failed", err);
    });

    client.on("stream-added", function (evt) {
      var remoteStream = evt.stream;
      var id = remoteStream.getId();
      if (id !== "stream_" + uid) {
        client.subscribe(remoteStream, function (err) {
          console.log("stream subscribe failed", err);
        })
      }
      console.log('stream-added remote-uid: ', id);
    });

    client.on("stream-subscribed", function (evt) {
      var remoteStream = evt.stream;
      var id = remoteStream.getId();
      // Add a view for the remote stream.
      //addView(id);
      // Play the remote stream.
      remoteStream.play("remote_video_" + id);
      console.log('stream-subscribed remote-uid: ', id);
    })

    client.on("stream-removed", function (evt) {
      var remoteStream = evt.stream;
      var id = remoteStream.getId();
      // Stop playing the remote stream.
      remoteStream.stop("remote_stream_" + id);
      // Remove the view of the remote stream.
      //removeView(id);
      console.log("stream-removed remote-uid: ", id);
    });



  }, function (err) {
    console.log("AgoraRTC client init failed", err);
  });

  //   //enable video
  //   localStream.init(function () {
  //     console.log("getUserMedia successfully");
  //     localStream.play('agora_local');
  //   }, function (err) {
  //     console.log("getUserMedia failed", err);
  //   });


  //   //join client

  //   client.join(<TOKEN_OR_KEY>, <CHANNEL_NAME>, <UID>, function(uid) {
  //     console.log("User " + uid + " join channel successfully");
  //         }, function(err) {
  //       console.log("Join channel failed", err);
  //         });

  //         //publish local stream
  //         client.publish(localStream, function (err) {
  //       console.log("Publish local stream error: " + err);
  //         });

  //         client.on('stream-published', function (evt) {
  //       console.log("Publish local stream successfully");
  //         });

  //         //subscribe remote stream
  //         client.on('stream-added', function (evt) {
  //           var stream = evt.stream;
  //           console.log("New stream added: " + stream.getId());
  //           client.subscribe(stream, function (err) {
  //       console.log("Subscribe stream failed", err);
  //           });
  //         });

  //         client.on('stream-subscribed', function (evt) {
  //           var remoteStream = evt.stream;
  //           console.log("Subscribe remote stream successfully: " + remoteStream.getId());
  //           remoteStream.play('agora_remote' + remoteStream.getId());
  //         })

  // //leaving

  // client.leave(function () {
  //       console.log("Leave channel successfully");
  //         }, function (err) {
  //       console.log("Leave channel failed");
  //         });



  // Create the game using the 'renderCanvas'.
  let game = new gm.Game('renderCanvas');

  // Create the scene.
  game.createScene(socket.channel);
  // Start render loop.
  game.doRender();
});
