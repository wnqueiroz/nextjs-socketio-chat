// 1. Importamos Server de socket.io
import { Server } from "socket.io";

export default function SocketIOHandler(req, res) {
  // 2. Verificamos se o socket.io já está iniciado
  if (res.socket.server.io) {
    console.log("[Servidor] WebSocket já está iniciado.");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);

  // 3. Salvamos o io para não criarmos novas inicializações desnecessariamente
  res.socket.server.io = io;

  /**
   *  4. Criamos um listerner que, ao se conectar, registre um novo evento de "mensagem criada"
   *  e "emita" para o servidor que uma nova mensagem foi recebida
   */
  io.on("connection", (socket) => {
    socket.on("createdMessage", (message) => {
      console.log("[Servidor] Recebi a mensagem: ", message);

      // Usando broadcast, o evento é emitidos para todos os clientes no contexto atual, exceto para o remetente
      socket.broadcast.emit("newIncomingMessage", message);
    });
  });

  // 5. Finalizamos a configuração do servidor Websocket
  console.log("[Servidor] WebSocket configurado");
  res.end();
}
