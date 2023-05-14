var socket = io();
window.onclick = function (e) {
  socket.emit("message", "I am server");
};
