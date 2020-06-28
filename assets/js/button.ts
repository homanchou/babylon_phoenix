import { Channel } from "phoenix"

export class MyButton {
  constructor(channel: Channel) {
    const button = document.createElement('button');
    button.innerText = "click me";
    const body = document.getElementById('body');
    body.appendChild(button)

    button.addEventListener('click', () => {
      console.log('got clicked');
      channel.push('got_clicked', { "time": new Date() })
    })

    channel.on("received_got_clicked", (resp) => {
      console.log("channel got", resp)
    })
  }
}