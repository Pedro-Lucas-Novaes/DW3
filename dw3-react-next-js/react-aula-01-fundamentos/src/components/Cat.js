const Cat = (props) => {
    return (
        <>
            <p>O Nome do gato é: {props.nome}</p>
            <p>A Raça do gato é: {props.raca}</p>
            <p>A Idade do gato é: {props.idade} anos</p>
            <p>O Nome do Dono é: {props.dono}</p>
        </>
    )
}

export default Cat