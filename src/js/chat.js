"use strict"

console.log('The server is connected');

const socket = io();

const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('.chatting-input');
const sendBtn = document.querySelector('.send-btn');
const displayContainer = document.querySelector('.display-container');

function send(){
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    console.log(param)
    socket.emit("roomID", param);
    // socket.emit("roomID", "Hello from Client");
}

chatInput.addEventListener("keypress", (event)=>{
    if(event.keyCode === 13){
        send();
    }
})

sendBtn.addEventListener('click', send)

socket.on("roomID", (data) => {
    const {
        name,
        msg,
        time
    } = data;
    const item = new LiModal(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
})

function LiModal(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement('li');
        li.classList.add(nickname.value === this.name ? "sent" : "received");
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class ='image' src="https://placeimg.com/50/50/any" alt="any">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li);
    }

}

console.log(socket)