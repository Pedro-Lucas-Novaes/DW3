import {useState} from "react"
const Form = () => {
    // criando estados
    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [email, setEmail] = useState("")
    // criando funçao que lida com sumbissão do formulário (substituiu action="")
    const handleSubmit = (event) => {
        event.preventDefault() // evita o comportamento padrão de recarregar a página após submeter form
        // os dados serão enviados para essa função
        console.log(nome)
        console.log(sobrenome)
        console.log(email)
    }
    return(
        <>
            <br/>
            <h1>Formulário de cadastro: </h1>
            <br />
            <form onSubmit={handleSubmit} /* */> 
                <input type="text" 
                placeholder="Insira seu nome" 
                value={nome}
                onChange={(event) => setNome(event.target.value)} // captura e atualiza conteúdo digitado na input
                />
                <input type="text" 
                placeholder="Insira seu sobrenome" 
                value={sobrenome}
                onChange={(event) => setSobrenome(event.target.value)}
                />
                <input type="text" 
                placeholder="Insira seu e-mail" 
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
            <br/>
            {nome} <br/> {sobrenome} <br/> {email}
        </>
    )
}

export default Form