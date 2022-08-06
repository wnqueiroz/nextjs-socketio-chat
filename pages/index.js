import { useEffect, useState } from "react";
// 1. Importamos io de socket.io-client
import io from "socket.io-client";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 500,
    height: 500,
    display: "flex",
    flexDirection: "column",
  },
  chat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "100%",
    height: 400,
    border: "1px solid gray",
    marginBottom: 20,
    padding: "10px 20px",
  },
};

let socket = null;

export default function Home() {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  function onSubmit(e) {
    e.preventDefault();

    sendMessage(message);
  }

  /**
   * 6. Criamos a função que é responsável por emitir o evento `createdMessage` que o servidor está "ouvindo"
   * Enviando a mensagem digitada pelo nosso usuário.
   *
   * */
  const sendMessage = async (message) => {
    // 7. Emitindo a mensagem para o servidor através do evento `createdMessage`
    socket.emit("createdMessage", { message });

    setReceivedMessages((currentMsg) => [...currentMsg, { message }]);

    // 8. Além disso, vamos apagar o conteúdo do nosso input
    setMessage("");
  };

  /**
   * 5. Nossa função socketInit precisa ser executada, toda vez que alguém acessar a tela da nossa aplicação.
   * É possível fazer isso com um hook do React chamado useEffect.
   * Dessa maneira, nossa função será chamada apenas 1 vez
   * */
  useEffect(() => {
    socketInit();
  }, []);

  // 2. Criamos a função socketInit para o Client iniciar a conexão com o servidor Websocket
  async function socketInit() {
    // 3. Fazemos uma requisição para o endpoint que acabamos de criar para conectarmos ao nosso servidor
    await fetch("/api/socket");

    socket = io();

    /**
     * 4. Criamos um "listener" que faz um "match" com o evento que é disparado pelo servidor.
     * Toda vez que o servidor receber a mensagem pelo evento `createdMessage`,
     * Ele irá emitir outro evento (`newIncomingMessage`) informando que uma nova mensagem chegou.
     * Então armazenamos essa nova mensagem em uma lista de mensagens recebidas
     * */
    socket.on("newIncomingMessage", (msg) => {
      console.log("[Cliente] Mensagem recebida do Servidor:", msg.message);

      setReceivedMessages((currentMsg) => [
        ...currentMsg,
        { message: msg.message },
      ]);
    });
  }

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <h1>Chat</h1>

        <div style={styles.chat}>
          {receivedMessages.map(({ message }, i) => (
            <p key={i}>{message}</p>
          ))}
        </div>

        <form onSubmit={onSubmit}>
          {/* 
            9. Convertemos o nosso input para exibir sempre o valor do nosso estado message
            Transformando-o em um componente de estado controlado.
           */}
          <input
            type="text"
            name="mensagem"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <input type="submit" value="Enviar mensagem" />
        </form>
      </div>

      <style global jsx>{`
        html,
        body,
        div#__next,
        div#__next > div {
          height: 100%;
        }

        p {
          margin: 8px 0;
        }
      `}</style>
    </div>
  );
}
