import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'

const MembresiaList = () => {

    // toda la logica de iteraccion con el back
    const navigate = useNavigate();

    const [ membresias, setMembresia ] = useState([]);

    const loadMembresias = async () => {
        const response = await fetch("http://localhost:4000/membresias");
        const data = await response.json();
        setMembresia(data);
    }

    //Eliminar un cliente
    const handleDelete = async (membresia_id) => {
        try {
            await fetch( `http://localhost:4000/membresia/${membresia_id}`, {
                method: "DELETE",
            } );
            alert("Membresia eliminada con éxito");
            setMembresia(
                membresias.filter(
                    (membresia) => membresia.membresia_id !== membresia_id
                )
            );

        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () =>{
        loadMembresias();
    }, [] );

    return (
        <div className='membresias-list' >
            <h1>Membresias</h1>
            {membresias.map((membresia) => (
                    <div
                    className="card-membresia-list"
                    key={membresia.membresia_id}
                    >
                        <div className='membresia-content'>
                            <div>
                                {" "}
                                <strong>TIPO_MEMBRESIA: </strong> {membresia.membresia_tipo}{" "}
                            </div>
                            <div>
                                {" "}
                                <strong>FECHA_INICIO: </strong> {membresia.fecha_inicio}{" "}
                            </div>
                            <div>
                                {" "}
                                <strong>FECHA_FINAL: </strong> {membresia.fecha_final}{" "}
                            </div>
                            <div className='container-buttons'>
                                <button
                                onClick={() => 
                                    navigate( `/membresia/${membresia.membresia_id}/edit` )
                                }
                                >
                                    Editar
                                </button>

                                <button
                                onClick={() => handleDelete(membresia.membresia_id)}
                                >
                                    Eliminar
                                </button>
                                
                            </div>
                        </div>

                    </div>
                ))}
        </div>
    )
}
export default MembresiaList;