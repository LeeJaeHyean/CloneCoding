"use strict";
const socket = io();

const nickname = document.querySelector('#nickname');
const chatlist = document.querySelector(".chatting-list");
const chatInput = document.querySelector('.chatting-input');
const sendButton = document.querySelector('.send-button');
const displayContainer = document.querySelector('.display-container');

chatInput.addEventListener("keypress", (event)=> {
    if(event.ketCode === 13) {
        send();
    }
});

function send() {
    const param = {
        name: nickname.value,
        msg: chatInput.value
    };
    socket.emit("chatting", param);
}

sendButton.addEventListener('click', send)

socket.on("chatting", (data) => {
    const {name, msg, time} = data;
    const item = new Limodel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
});

function Limodel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received");

        const dom = `<span class="profile"> 
            <span class="user">${this.name}</span>
            <img class="image" src="navbar_img/Color_Gray.jpg" alt="any">
            </span>
            <span class="message">${this.msg}</span>
            <spane class="time">${this.time}</spane>`;
        li.innerHTML = dom;
        chatlist.appendChild(li);
    }
}