// aplicando o conceito de estados com hook usestate
import {useState} from "react" // importar useState


const Contador = () => {
    // trabalhando com variáveis -> não re-renderiza componentes
    // let numero = 0

    // trabalhando com estados -> re-renderiza componentes
    const [count, setCount] = useState(0) // estado inicial do count

    return (
        <>
            <div>
                <br />
                <p>Contador: {count}</p>
                <button onClick={() => setCount(count + 1)}>Aumentar</button> {/** chama função que altera valor de count */}
            </div>

        </>
    )
}

export default Contador