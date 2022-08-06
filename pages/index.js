import { useState } from "react";

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
};

export default function Home() {
  // 1. Criamos a configuração de estado
  const [message, setMessage] = useState();

  function onSubmit(e) {
    e.preventDefault();

    // 4. Ao submeter o formulário é possível obter o texto digitado
    console.log("Enviou os dados da mensagem", message);
  }

  function onChange(e) {
    // 3. Armazenamos o valor no nosso estado
    setMessage(e.target.value);
  }

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <h1>Chat</h1>

        <div></div>

        <form onSubmit={onSubmit}>
          {/* 2. Criamos a função do evento onChange */}
          <input type="text" name="mensagem" onChange={onChange} />
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
      `}</style>
    </div>
  );
}
