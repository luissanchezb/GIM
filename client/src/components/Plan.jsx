import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const PlanForm = () => {
    //use state
    const [ plan, setPlan ] = useState({
       plan_nombre: "",
       plan_descripcion: "",
       plan_precio: "",
    });
    
    // const [errores, setErrores] = useState({});
    //set para editar
    const [ loading, setLoading ] = useState (false);
    //set para cargar datos
    const [ editig, setEditing ] = useState (false);

    const params = useParams();
    const navigate = useNavigate();


    //capturas de datos
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (editig) {
            await fetch(`http://localhost:4000/plan/${params.plan_id}`, {
                method: "PUT",
                body: JSON.stringify(plan),
                headers: {
                    "Content-Type": "application/json",
                },
            })      
             
        } else {
        await fetch( "http://localhost:4000/plan", {
            method: "POST",
            body: JSON.stringify(plan),
            headers: { "Content-Type": "application/json"  },
        } );    
        }
            
        setLoading(false);
        if (editig){
            alert('Sea ha editado el plan exitosamente')
        } else{
            alert('Plan Guardado exitosamente')
        }
        navigate("/planes")
    }


    // datos de claves foraneas
    
    const handleChange = (e) => setPlan({ ...plan, [e.target.name]: e.target.value});
    
    
    const loadPlan = async ( plan_id ) => {
        const res = await fetch(`http://localhost:4000/plan/${plan_id}` )
        const data = await res.json();
        setPlan({
            plan_nombre: data.plan_nombre,
            plan_descripcion: data.plan_descripcion,
            plan_precio: data.plan_precio,
        });
        setEditing(true);
    };
    useEffect( () => {
        if (params.plan_id){
            loadPlan(params.plan_id);
        }
    }, [params.plan_id]);

   

    return (
        <>
        <div>
      
            <h1>
                {" "}
                {editig ? "Editar Plan" : "Nuevo Plan"}
            </h1>
            <form onSubmit={handleSubmit}>
               

                <div className="date">
                    <input 
                    type="text" 
                    required  
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    name= "plan_nombre" 
                    value={plan.plan_nombre}
                    />
                    <span></span>
                    <label>Nombre</label>
                </div>
                {/* {errores.plan_nombre && <p className='error'>{errores.plan_nombre}</p>} */}
                <div className="date">
                    <input 
                    type="text"  
                    required  
                    name= "plan_descripcion" 
                    value={plan.plan_descripcion}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    />
                    <span></span>
                    <label >Descripcion</label>
                    {/* {errores.plan_descripcion && <p className='error'>{errores.plan_descripcion}</p>} */}

                </div>
                <div className="date">
                    <input 
                    type="number" 
                    required 
                    min={10}
                    name="plan_precio" 
                    value={plan.plan_precio}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    />
                    <span></span>
                    <label >Precio</label>
                    {/* {errores.plan_precio && <p className='error'>{errores.plan_precio}</p>} */}

                </div>
            

                <input 
                type="submit" 
                value={editig ? "actualizar" : "guardar"} 
                />
                
            </form>
        </div>
        </>
    );

};

export default PlanForm;