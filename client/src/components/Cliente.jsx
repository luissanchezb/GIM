import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';


const ClienteForm = () => {
    const params = useParams();
    const navigate = useNavigate();

    //use state
    const [ cliente, setCliente ] = useState({
        ciudad_id: "",
        nacionalidad_id: "",
        cliente_nombre: "",
        cliente_apellido: "",
        cliente_fnac: "",
        cliente_cedula: ""
    });
    const [ editig, setEditing ] = useState (false);
    const [ loading, setLoading ] = useState (false);


    //capturas de datos
    const handleSubmit = async ( e ) => {
        e.preventDefault();

        // setErrores(validateForm(cliente))

        setLoading(true);


        if (editig) {
            await fetch( `http://localhost:4000/cliente/${params.cliente_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cliente),
            })        
             
        }else {
            await fetch ( "http://localhost:4000/cliente", {
                method: "POST",
                body: JSON.stringify(cliente),
                headers: { "Content-Type": "application/json"  },
            } );
        }
            
        
        setLoading(false);
        if (editig){
            alert('Sea ha editado el cliente exitosamente')
        } else{
            alert('Cliente Guardado exitosamente')
        }
        navigate("/cliente")
    }


    // datos de claves foraneas
    const [ciudades, setCiudades ] = useState([]);
    const loadCiudades = async () => {
        const response = await fetch( "htpp://localhost:4000/ciudades");
        const data = await response.json();
        setCiudades(data);
    }


    useEffect(() => {
        loadCiudades();
    }, []);



    const [nacionalidades, setNacionalidades] = useState ([]);
    const loadNacionalidades = async () => {
        const response = await fetch ("htpp://localhost:4000/nacionalidades");
        const data = await response.json();
        setNacionalidades(data);
    }
    useEffect(() => {
        loadNacionalidades();
    }, []);


    
    
    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value});
    };
    
    const loadCliente = async ( cliente_id ) => {
        const res = await fetch( `http://localhost:4000/cliente/${cliente_id}` );
        const data = await res.json();
        setCliente({
            ciudad_id: data.ciudad_id,
            nacionalidad_id: data.nacionalidad_id,
            cliente_nombre: data.cliente_nombre,
            cliente_apellido: data.cliente_apellido,
            cliente_fnac: data.cliente_fnac,
            cliente_cedula: data.cliente_cedula
        });
        setEditing(true);
    };
    useEffect( () => {
        if (params.cliente_id){
            loadCliente(params.cliente_id);
        }
    }, [params.cliente_id])


    return (
        <div>
           
            <h1>{editig? "Editar Cliente" : "Nuevo Cliente"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="date">
                    <select 
                    className="select-ciudad"
                    name="ciudad_id" 
                    id="Eciudad"
                    onChange={handleChange}
                    defaultValue={'DEFAULT'}
                    // onBlur={handleBlur}
                    >
                        <option disabled value="DEFAULT">Selecciona una Ciudad</option>
                        {ciudades.map((ciudad) => (
                            <option 
                            key={ciudad.ciudad_id}
                            value={ciudad.ciudad_id}
                            >
                                {ciudad.ciudad_id}
                            </option>
                        ))}
                    </select>
                    <span></span>
                    <label className="name-label">Ciudad</label>
                </div>

                <div className="date">
                    <select 
                    className="select-nacionalidad"
                    name="nacionalidad_id" 
                    id="Enacionalidad"
                    onChange={handleChange}
                    defaultValue={'DEFAULT'}
                    // onBlur={handleBlur}
                    >
                        <option disabled value="DEFAULT">Selecciona la nacionalidad</option>
                        {ciudades.map((nacionalidad) => (
                            <option 
                            key={nacionalidad.nacionalidad_id}
                            value={nacionalida.dnacionalidad_id}
                            >
                                {nacionalidad.nacionalidad_id}
                            </option>
                        ))}
                    </select>
                    <span></span>
                    <label className="name-label">Nacionalidad</label>
                </div>

                <div className="date">
                    <input type="text" name="" onChange={handleChange}/>
                    <span></span>
                    <label htmlFor="nombre">Nombre</label>

                </div>
                <div className="date">
                    <input type="text" name="" onChange={handleChange}/>
                    <span></span>
                    <label htmlFor="apellido">Apellido</label>

                </div>
                <div className="date">
                    <input type="date" name="" onChange={handleChange}/>
                    <span></span>
                    <label htmlFor="fecha">Fecha</label>

                </div>
                <div className="date">
                    <input type="text" name="" onChange={handleChange}/>
                    <span></span>
                    <label htmlFor="cedula">Cedula</label>

                </div>

                <input type="submit" value={editig ? "actualizar" : "guardar"} />
                
            </form>
        </div>
    )
}


export default ClienteForm;