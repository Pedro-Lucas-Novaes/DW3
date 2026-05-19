import styles from "@/components/HomeContent/HomeContent.module.css";
import Loading from "../Loading";
// Importando o AXIOS
import axios from "axios"; // BIBLIOTECA que permite consumir a API
// Importando o hook userState e userEffect
import { useState, useEffect } from "react";
import EditContent from "../EditContent";
// Importando o axiosConfig
import { getAxiosConfig } from "@/services/authService.js";

const HomeContent = () => {
  //Criando um estado para a lista de jogos
  const [games, setGames] = useState([]); // Estado inicial array vazio
  // Criando um estado para o jogo que sera alterado
  const [selectedGame, setSelectedGame] = useState(null);

  // Ciando um estado para controlar o CARREGAMENTO
  const [loading, setLoading] = useState(true);

  // hook userEffect -> efeito colateral do componente
  useEffect(() => {
    // Aqui vai a logica do userEffect
    // Função para buscar os jogos na API
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:4000/games", getAxiosConfig());
        // console.log(response)
        // Passando a lista de jogos para o estado
        setGames(response.data.games);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => setLoading(false), 3000);
      }
    };
    fetchGames();
  }, []); // dependencia do useEffect

  // FUNÇÃO DE EXCLUSÃO
  const deleteGame = async (gameId) => {
    try {
      const response = await axios.delete(`
        http://localhost:4000/games/${gameId}
        `);
      if (response.status === 204) {
        alert("O jogo foi excluido com sucesso!");
        // Atualizando o estado removendo o jogo excluido
        setGames(games.filter((game) => game._id !== gameId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // FUNÇÃO PARA ABRIR O MODAL DE EDIÇÃO
  const openEditModal = (game) => {
    // Atualizando o estado do jogo que sera alterado
    setSelectedGame(game);
  };

  // FUNÇÃO PARA QUANDO O MODAL FOR FECHADO
  const closeEditModal = () => {
    // Limpando o estado do jogo que foi selecionado
    setSelectedGame(null);
  };
  // FUNÇÃO QUE ATUALIZA A LISTA DE JOGOs COM O JOGO ALTERADO
  const handleUpdate = (updatedGame) => {
    setGames(
      games.map((game) => (game._id === updatedGame._id ? updatedGame : game)),
    );
    closeEditModal();
  };

  return (
    <>
      <div className={styles.homeContent}>
        {/* CARD LISTA DE JOGOS */}
        <div className={styles.listGamesCard}>
          {/* TITLE */}
          <div className={styles.title}>
            <h2>Lista de jogos</h2>
          </div>

          {loading ? (
            <Loading loading={loading} />
          ) : (
            <div className={styles.games} id={styles.games}>
              {/* Lista de jogos irá aqui */}
              {/* Percorrendo a lista de jogos */}
              {games.map((game) => (
                <ul className={styles.listGames} key={game.id}>
                  <div className={styles.gameImg}>
                    <img src="images/game_cd_cover.png" alt="Jogo em estoque" />
                  </div>
                  <div className={styles.gameInfo}>
                    <h3>{game.title}</h3>
                    <li>Plataforma: {game.descriptions.platform}</li>
                    <li>Gênero: {game.descriptions.genre}</li>
                    <li>Classificação: {game.descriptions.rating}</li>
                    <li>Ano: {game.year}</li>
                    <li>
                      Preço:{" "}
                      {game.price.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </li>
                    {/* Botão de deletar */}
                    <button
                      className={styles.btnDel}
                      onClick={() => {
                        const confirmacao = window.confirm(
                          "Deseja mesmo excluir o jogo?",
                        );
                        // Se o valor for verdadeiro
                        if (confirmacao) {
                          // Invocando a função de deletar
                          deleteGame(game._id);
                        }
                      }}
                    >
                      Deletar
                    </button>
                    {/* Botão de Editar */}
                    <button
                      className={styles.btnEdit}
                      onClick={() => openEditModal(game)}
                    >
                      Editar
                    </button>
                  </div>
                </ul>
              ))}
            </div>
          )}
        </div>
        {/* Renderização condicional para exibir o modal de edição */}
        {selectedGame && (
          <EditContent game={selectedGame} onClose={closeEditModal} handleUpdate={handleUpdate} />
        )}
      </div>
    </>
  );
};

export default HomeContent;
