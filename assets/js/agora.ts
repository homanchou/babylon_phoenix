import AgoraRTC from "agora-rtc-sdk"
import $ from "jquery";

function addView(id: string, show: boolean) {
  if (!$("#" + id)[0]) {
    $("<div/>", {
      id: "remote_video_panel_" + id,
      class: "video-view",
    }).appendTo("#video");

    $("<div/>", {
      id: "remote_video_" + id,
      class: "video-placeholder",
    }).appendTo("#remote_video_panel_" + id);

    $("<div/>", {
      id: "remote_video_info_" + id,
      class: "video-profile " + (show ? "" : "hide"),
    }).appendTo("#remote_video_panel_" + id);

    $("<div/>", {
      id: "video_autoplay_" + id,
      class: "autoplay-fallback hide",
    }).appendTo("#remote_video_panel_" + id);
  }
}
function removeView(id: string) {
  if ($("#remote_video_panel_" + id)[0]) {
    $("#remote_video_panel_" + id).remove();
  }
}


export class MyWebCall {
  constructor() {


    var uid = window.location.hash;
    if (uid == "") {
      uid = "bob";
    } else {
      uid = uid.substr(1);
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
          client.subscribe(remoteStream, { audio: true, video: false }, (err) => {
            console.log("error subscribing remote stream: ", err);
          });
        }
        console.log('stream-added remote-uid: ', id);
      });

      client.on("stream-subscribed", function (evt) {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        // Add a view for the remote stream.
        addView(id, false);
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
        removeView(id);
        console.log("stream-removed remote-uid: ", id);
      });



    }, function (err) {
      console.log("AgoraRTC client init failed", err);
    });


  }
}