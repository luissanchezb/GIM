import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'

const Home = () => {

    // toda la logica de iteraccion con el back
    const navigate = useNavigate();

    const [ clientes, setClientes ] = useState([]);

    const loadClientes = async () => {
        const response = await fetch("http://localhost:4000/clientes");
        const data = await response.json();
        setClientes(data);
    }

    //Eliminar un cliente
    const handleDelete = async (cliente_id) => {
        try {
            await fetch( `http://localhost:4000/cliente/${cliente_id}`, {
                method: "DELETE",
            } );
            alert("Cliente eliminado con éxito");
            setClientes(
                clientes.filter(
                    (cliente) => cliente.cliente_id !== cliente_id
                )
            );

        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () =>{
        loadClientes();
    }, [] );

    return (
        <div className='clientes-list' >
            <h1>Clientes</h1>
            {clientes.map((cliente) => (
                    <div
                    className="card-cliente-list"
                    key={cliente.cliente_id}
                    >
                        <div className='cliente-content'>
                            <div>
                                {" "}
                                <strong>Nombre: </strong> {cliente.cliente_nombre}{" "}
                            </div>
                            <div>
                                {" "}
                                <strong>Apellido: </strong> {cliente.cliente_apellido}{" "}
                            </div>
                            <div>
                                {" "}
                                <strong>Cédula: </strong> {cliente.cliente_cedula}{" "}
                            </div>
                            <div className='container-buttons'>
                                <button
                                onClick={() => 
                                    navigate( `/cliente/${cliente.cliente_id}/edit` )
                                }
                                >
                                    Editar
                                </button>

                                <button
                                onClick={() => handleDelete(cliente.cliente_id)}
                                >
                                    Eliminar
                                </button>
                                <button
                                 onClick={() => 
                                    navigate( `/cliente/${cliente.cliente_id}/membresia` )
                                }
                                >
                                    Adquirir membresia
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
        </div>
    )
    
}




export default Home ;