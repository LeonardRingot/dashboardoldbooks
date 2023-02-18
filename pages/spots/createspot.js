import React ,{ useEffect, useState } from 'react'
import * as APIService from "../../services/APIService"
import Box  from '@mui/material/Box'
import Button from '@mui/material/Button'
import  TextField  from '@mui/material/TextField'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material'
const styles = {
    form: {
      p: 2,
      border: '1px solid black',
      width: '50%',
      textAlign: 'center',
      display: 'inline-block',
    },
    input: {
      margin: 'normal',
      fullWidth: true,
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    success: {
      color: 'green',
      marginTop: '10px',
    },
  }
export default function createspot()
{
    const [erreur, setErreur] = useState('');
    const[IsOk, setIsOk] = useState('');
    const [registerForm, setregisterForm]= useState({
        addresseSpot:'',
    })
    const [spots, setSpots] = useState([]);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (event) =>
    {
        const value = event.target.value;
        setregisterForm({
        ...registerForm, [event.target.name]: value
      });
    }
    function ScriptForm (event) 
    {
      const data = {
        addresseSpot:event.target.addresseSpot.value,
      }
      event.preventDefault()
      APIService.requetePostSpots(data.addresseSpot
        ).then(response => {
           if (response.status === 200) {
          setSuccess('spot created')
          setError('')
        } else {
          setError('Could not create spot')
          setSuccess('')
        }
      })
      .catch((error) => {
        setError('Could not create spot')
        setSuccess('')
        console.log(error)
      })
    }
    return (
        <>
        <div>
        <h1>Formulaire création Spot</h1>
     <Box component="form" noValidate  onSubmit={ScriptForm} method="post" sx={styles.form} >
          <TextField 
          onChange={handleChange}
          margin='normal'
          fullWidth
          required
         id="addresseSpot"
         name="addresseSpot"
         label="addresseSpot"
          />
{error && (
          <Typography variant="body2" color="error">
            Une erreur est survenue: {erreur}
          </Typography>
        )}
        {success && (
          <Typography variant="body2" color="success">
            Spot créé avec succès: {IsOk}
          </Typography>
        )}
           <Button type="submit" value="submit" >Envoyer</Button>
          </Box>
          </div>
          </>
    )
}