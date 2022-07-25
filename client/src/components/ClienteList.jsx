import {Container, Button } from '@mui/material';
import axios from 'axios';
import  React,{ useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import ClienteIndividual from './ClienteIndividual';

export default function ClienteList () {

    const navigate = useNavigate();

    const [ clientes, setCliente ] = useState ([]);
    

    useEffect ( () => {
        loadClientes()
    }, [clientes.length] )
    
    
    const loadClientes =  () => {
        axios.get('http://localhost:4000/clientes')
        .then(res => {
            setCliente(res.data.clientes)
        })
    }

    return (
        <Container sx={{ mt: 5 }}>
            <Button
                variant='contained'
                color='secondary'
                sx={{ mb: 5 }}
                onClick={() => navigate("/cliente/new")}

            >
                Nuevo Cliente
            </Button>
        
                {
                    clientes.length > 0 ? (
                    clientes.map( (cliente, i) => {
                        return (
                            <ClienteIndividual 
                            key={i}
                            id={i}
                            sellerData={cliente}
                            // delSeller={deleteSeller}
                            />
                        );
                    } )
                    ):(
                        <h3>No hay Vendedores</h3>
                    )
                }
                
                
                {/* <Card>
                    <CardContent >
                        <Typography></Typography>
                        <Typography></Typography>
                    </CardContent>
                </Card> */}
                
                
               
               
        </Container>
        
    );

}