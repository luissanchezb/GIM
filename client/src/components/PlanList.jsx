import {Container, Button, Card, CardContent, Typography } from '@mui/material';
// import axios from 'axios';
import  React,{ useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import PlanIndividual from './Planindividual';

export default function PlanList () {

    const navigate = useNavigate();

    const [ planes, SetPlan ] = useState ([]);
    

    
    const loadPlanes = async () => {
        const response = await fetch('http://localhost:4000/planes')
        const data = await response.json()
        SetPlan(data)
    }
    
    useEffect ( () => {
        loadPlanes()
    }, [] )
    

    return (
        <>

        <h1>Planes</h1>

        <Button
        variant='contained'
        color='primary'
        sx={{mb: 5}}
        onClick={() => navigate("/plan/new")}
        >
            nuevo Plan
        </Button>
        {
            planes.map((plan) => (
                <Card>
                    <CardContent>
                        <Typography>{plan.plan_nombre}</Typography>
                        <Typography>{plan.precio}</Typography>
                    </CardContent>
                </Card>
            ))
        }



        {/* <Container sx={{ mt: 5 }}>
            <Button
                variant='contained'
                color='secondary'
                sx={{ mb: 5 }}
                onClick={() => navigate("/plan/new")}

            >
                Nuevo Plan
            </Button>
        
                {
                    planes.length > 0 ? (
                    planes.map( (plan, i) => {
                        return (
                            <PlanIndividual 
                            key={i}
                            id={i}
                            sellerData={plan}
                            // delSeller={deleteSeller}
                            />
                        );
                    } )
                    ):(
                        <h3>No hay Planes</h3>
                    )
                }
                 */}
                
                {/* <Card>
                    <CardContent >
                        <Typography></Typography>
                        <Typography></Typography>
                    </CardContent>
                </Card> */}
                
                
               
               
        {/* </Container> */}
        
        </>
    );

}