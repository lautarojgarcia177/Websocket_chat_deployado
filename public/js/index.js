const socket = io();
let username = prompt("Ingrese su nombre");
// Enviar mensaje de que se conecto un nuevo cliente
socket.emit("nuevoCliente", { username });

const chatBox = document.getElementById("chatBox");
chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length) {
      const mensaje = chatBox.value;
      chatBox.value = "";
      socket.emit("mensaje", {
        username,
        mensaje,
      });
    }
  }
});

const messageLogsEl = document.getElementById("messageLogs");
socket.on("mensajes", (data) => {
  let messages = "";
  data.forEach((message) => {
    messages = messages + `${message.username} dice: ${message.mensaje}</br>`;
  });
  messageLogsEl.innerHTML = messages;
});

socket.on("usuarioNuevoConectado", (usuarioNuevo) => {
  alert("Se ha conectado " + usuarioNuevo.username);
});
