import {Button, Card, CardContent, Grid, TextField, Typography} from '@mui/material'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


export default function PlanForm () {
    const [planes, setPlan] = useState({
        plan_nombre: '',
        plan_descripcion: '',
        plan_precio: '',
    })

    const navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();
        fetch('http://localhost:4000/plan', {
            method: 'POST',
            body: JSON.stringify(planes),
            headers: {'Content-Type': 'application/json'}
        })
        navigate('/planes')
    }
    const handleChange = e => {
        setPlan({ ...planes, [e.target.name]: e.target.value});
    }
    return ( 
        <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        >
            <Grid item xs={3}>
                <Card
                sx={{mt:5}}
                style={{padding:"1rem"}}
                >
                    <Typography
                    variant='5'
                    textAlign='center'
                    >
                        crear Plan
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit} >
                            <TextField
                            variant= 'filled'
                            name='plan_nombre'
                            onChange={handleChange}
                            label='Nombre del plan'
                            sx={{
                                display: 'block',
                                margin: '.5rem'
                            }}
                            />

                            <TextField
                            variant= 'filled'
                            name='plan_descripcion'
                            onChange={handleChange}
                            label='Descripcion del plan'
                            multiline
                            rows={4}
                            sx={{
                                display: 'block',
                                margin: '.5rem'
                            }}
                            />

                            <TextField
                            variant= 'filled'
                            name='plan_precio'
                            onChange={handleChange}
                            label='Precio del plan'
                            type="number"
                            sx={{
                                display: 'block',
                                margin: '.5rem'
                            }}
                            
                            />

                            <Button
                            variant='contained'
                            color= 'primary'
                            type='submit'
                            >
                                Guardar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}