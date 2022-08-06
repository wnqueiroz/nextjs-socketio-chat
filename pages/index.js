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
  // 3. Criamos a função que irá lidar com o envio do nosso formulário
  function onSubmit(e) {
    e.preventDefault();

    console.log("Enviou os dados da mensagem");
  }

  return (
    <div style={styles.root}>
      {/* 2. Criamos a estrutura do noss HTML + os estilos */}
      <div style={styles.container}>
        <h1>Chat</h1>

        <div></div>

        <form onSubmit={onSubmit}>
          <input type="text" name="mensagem" />
          <input type="submit" value="Enviar mensagem" />
        </form>
      </div>

      {/* 1. Criamos os estilos globais para centralizar o conteúdo na página */}
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
