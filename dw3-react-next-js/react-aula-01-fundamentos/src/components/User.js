// Expressões JavaScript
// como exibir variáveis JS dentro do HTML
const User = () => {
    // Devemos ciar as variáveis dentro da função do componente
    const name = "Pedro Lucas"
  return (
    <>
      <div>Bem-Vindo, {name}</div>
    </>
  );
};

export default User;
