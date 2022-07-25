import React, {useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';


const Planlist = () => {

    const navigate = useNavigate();
    const [ planes, setPlan ] = useState( [] );

    const loadPlanes = async () => {
        const response = await fetch("http://localhost:4000/planes");
        const data = await response.json();
        setPlan( data );
    }


    const handleDelete = async ( plan_id ) => {
        try {
            await fetch( `htpp://localhost:4000/plan/${plan_id}` , {
                method: "DELETE"
            } );
            alert("Plan eliminado con exito");
            setPlan(
                planes.filter(
                    (plan) => plan.plan_id !== plan_id
                )
            );
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        loadPlanes();
    }, [ ]  );

    return (
        <div className='planes-list' >
            <div className='crear-plan'>
                <button
                className='btn-new-plan'
                onClick={() => navigate("/plan/new")}
                >
                    Nuevo Plan
                </button>
            </div>
            <h1>Planes</h1>
            {planes.map((plan) => (
                    <div
                    className="card-plan-list"
                    key={plan.plan_id}
                    >
                        <div className='plan-content'>
                            <div>
                                {" "}
                                <strong>Nombre: </strong> {plan.plan_nombre}{" "}
                            </div>
                            <div>
                                {" "}
                                <strong>Descripcion: </strong> {plan.plan_desc}{" "}
                            </div>
                            <div>
                                {" "}
                                <strong>Precio: </strong> {plan.plan_precio}{" "}
                            </div>
                            <div className='container-buttons'>
                                <button
                                onClick={() => 
                                    navigate( `/plan/${plan.plan_id}/edit` )
                                }
                                >
                                    Editar
                                </button>

                                <button
                                onClick={() => handleDelete(plan.plan_id)}
                                >
                                    Eliminar
                                </button>
                                {/* <button
                                 onClick={() => 
                                    navigate( `/plan/${plan.plan_id}/plan` )
                                }
                                >
                                    ////////
                                </button> */}
                            </div>
                        </div>

                    </div>
                ))}
        </div>

    )



}

export default Planlist;