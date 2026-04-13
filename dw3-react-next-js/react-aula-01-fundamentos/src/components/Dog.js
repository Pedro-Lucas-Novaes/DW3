// aplicando técnica de desestruturação na props

const Dog = ({ nome, raca, idade }) => {
    return (
        <>
            <div>
                <br />
                <p>Nome do pet: {nome} </p>
                <p>Raça do pet: {raca}</p>
                <p>Idade do pet: {idade}</p>
            </div>
        </>
    )
}

export default Dog