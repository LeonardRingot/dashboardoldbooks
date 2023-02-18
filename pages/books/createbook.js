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

export default function createbook()
{
    const [erreur, setErreur] = useState('');
    const[IsOk, setIsOk] = useState('');
    const [registerForm, setregisterForm]= useState({
        nameBook:'',
        authorBook:'',
        spotID:'',
    })
    const [spots, setSpots] = useState([]);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

  useEffect(() => {
    async function fetchSpots() {
      const result = await APIService.requeteGetAllSpots();
      setSpots(result.data);
      console.log(result.data)
    }
    fetchSpots();
  }, []);
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
        nameBook:event.target.nameBook.value,
        authorBook:event.target.authorBook.value,
        spotID:event.target.spotID.value,
      }
      event.preventDefault()
      APIService.requetePostBooks(data.nameBook,
        data.authorBook, 
        data.spotID,
        ).then(response => {
           if (response.status === 200) {
          setSuccess('Book created')
          setError('')
        } else {
          setError('Could not create book')
          setSuccess('')
        }
      })
      .catch((error) => {
        setError('Could not create book')
        setSuccess('')
        console.log(error)
      })
    }
    return (
        <>
        <div>
        <h1>Formulaire création livre</h1>
     <Box component="form" noValidate  onSubmit={ScriptForm} method="post" sx={styles.form} >
          <TextField 
          onChange={handleChange}
          margin='normal'
          fullWidth
          required
         id="nameBook"
         name="nameBook"
         label="nameBook"
          />
          <TextField 
          margin='normal'
          onChange={handleChange}
          required
          fullWidth
         id="authorBook"
         name="authorBook"
         type="text"
         label="authorBook"
          />
           <Select
  fullWidth
  required
  id="spotID"
  name="spotID"
  value={registerForm.spotID}
  onChange={handleChange}
  InputLabelProps={{ shrink: true }}
>
  {spots.map((spot) => (
    <MenuItem key={spot._id} value={spot._id}>
      {spot.addresseSpot}
    </MenuItem>
  ))}
</Select>
{error && (
          <Typography variant="body2" color="error">
            Une erreur est survenue: {erreur}
          </Typography>
        )}
        {success && (
          <Typography variant="body2" color="success">
            Livre créé avec succès: {IsOk}
          </Typography>
        )}
           <Button type="submit" value="submit" >Envoyer</Button>
          </Box>
          </div>
          </>
    )
}