import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { red } from '@mui/material/colors';

const color = red[500];


const ClienteIndividual = ({id, clienteData}) => {
    const {cliente_nombre, cliente_apellido} = clienteData;
    return (
        <Card 
        style={{
            marginBottom: ".7rem"
        }}
        >
            <CardContent
            style={{
                display: "flex",
                justifyContent: "space-between"
            }}
            >
                <div>
                    <Typography>{cliente_nombre}</Typography>
                    <Typography>{cliente_apellido}</Typography>

                </div>

                <div>

                    <IconButton
                        variant='contained'
                        color='success'
                        onClick={() => console.log('editado')}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        variant='contained'
                        color='error'
                        onClick={() => console.log('eliminando')}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
}

export default ClienteIndividual;