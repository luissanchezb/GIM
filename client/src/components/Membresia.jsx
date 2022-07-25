import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';


const MembresiaForm = () => {
    const params = useParams();
    const navigate = useNavigate();

    //use state
    const [ membresia, setMembresia ] = useState({
        cliente_id: "",
        plan_id: "",
        membresia_tipo: "",
        fecha_inicio: "",
        fecha_final: ""
    });
    const [ editig, setEditing ] = useState (false);
    const [ loading, setLoading ] = useState (false);


    //capturas de datos
    const handleSubmit = async ( e ) => {
        e.preventDefault();

    // setErrores(validateForm(membresia))

    setLoading(true);


    if (editig) {
        await fetch( `http://localhost:4000/membresia/${params.membresia_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(membresia),
        })        
         
    }else {
        await fetch ( "http://localhost:4000/membresia", {
            method: "POST",
            body: JSON.stringify(membresia),
            headers: { "Content-Type": "application/json"  },
        } );
    }
        
    
    setLoading(false);
    if (editig){
        alert('Se ha editado la membresia exitosamente')
    } else{
        alert('Membresia Guardada exitosamente')
    }
    navigate("/membresia")
}   

// datos de claves foraneas
const [clientes, setClientes ] = useState([]);
const loadClientes = async () => {
    const response = await fetch( "htpp://localhost:4000/clientes");
    const data = await response.json();
    setClientes(data);
}

useEffect(() => {
    loadClientes();
}, []);


const [planes, setPlanes] = useState ([]);
    const loadPlanes = async () => {
        const response = await fetch ("htpp://localhost:4000/planes");
        const data = await response.json();
        setPlanes(data);
    }
    useEffect(() => {
        loadPlanes();
    }, []);


    const handleChange = (e) => {
        setMembresia({ ...membresia, [e.target.name]: e.target.value});
    };


    const loadMembresia = async ( membresia_id ) => {
        const res = await fetch( `http://localhost:4000/membresia/${membresia_id}` );
        const data = await res.json();
        setMembresia({
            cliente_id: data.cliente_id,
            plan_id: data.plan_id,
            membresia_tipo: data.membresia_tipo,
            fecha_inicio: data.fecha_inicio,
            fecha_final: data.fecha_final
        });
        setEditing(true);
    };
    useEffect( () => {
        if (params.membresia_id){
            loadMembresia(params.membresia_id);
        }
    }, [params.membresia_id])


    return (
        <div>
          
            <h1>{editig? "Editar Membresia" : "Nueva Membresia"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="date">
                    <select 
                    className="select-cliente"
                    name="cliente_id" 
                    id="Ecliente"
                    onChange={handleChange}
                    defaultValue={'DEFAULT'}
                    // onBlur={handleBlur}
                    >
                        <option disabled value="DEFAULT">Seleccione un Cliente</option>
                        {clientes.map((cliente) => (
                            <option 
                            key={cliente.cliente_id}
                            value={cliente.cliente}
                            >
                                {cliente.cliente_id}
                            </option>
                        ))}
                    </select>
                    <span></span>
                    <label className="name-label">Cliente</label>
                </div>

                <div className="date">
                    <select 
                    className="select-plan"
                    name="plan_id" 
                    id="Eplan"
                    onChange={handleChange}
                    defaultValue={'DEFAULT'}
                    // onBlur={handleBlur}
                    >
                        <option disabled value="DEFAULT">Seleccione un plan</option>
                        {planes.map((nacionalidad) => (
                            <option 
                            key={plan.plan_id}
                            value={plan.plan_id}
                            >
                                {plan.plan_id}
                            </option>
                        ))}
                    </select>
                    <span></span>
                    <label className="name-label">Plan</label>
                </div>

                <div className="date">
                    <input type="text" name="" onChange={handleChange}/>
                    <span></span>
                    <label htmlFor="membresia_tipo">Membresia_tipo</label>

                </div>
                <div className="date">
                    <input type="text" name="" onChange={handleChange}/>
                    <span></span>
                    <label htmlFor="fecha_inicio">Fecha_Inicio</label>

                </div>
                <div className="date">
                    <input type="date" name="" onChange={handleChange}/>
                    <span></span>
                    <label htmlFor="fecha_final">Fecha_Final</label>

                </div>
               

                <input type="submit" value={editig ? "actualizar" : "guardar"} />
                
            </form>
        </div>
    )


}
export default MembresiaForm;