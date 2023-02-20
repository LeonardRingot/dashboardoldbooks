import React ,{ useEffect, useState } from 'react'
import * as APIService from "../../services/APIService"
import { useParams } from 'react-router-dom'
import Box  from '@mui/material/Box'
import Button from '@mui/material/Button'
import  TextField  from '@mui/material/TextField'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material'
import { useRouter } from 'next/router';
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
export default function updatebook()
{
    const [erreur, setErreur] = useState('');
    const[IsOk, setIsOk] = useState('');
    const [registerForm, setregisterForm]= useState({
        nameBook:'',
        authorBook:'',
        spotID:'',
    })
    const router = useRouter()
    const [spots, setSpots] = useState([]);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const {_id} = router.query

    useEffect(() => {
        async function fetchBookAndSpots() {
          try {
            const bookRes = await APIService.requeteGetBookById(_id)
            const book = bookRes.data
            setregisterForm({
              nameBook: book.nameBook,
              authorBook: book.authorBook,
              spotID: book.spotID,
            })
    
            const spotsRes = await APIService.requeteGetAllSpots()
            setSpots(spotsRes.data)
          } catch (err) {
            console.log(err)
            setError('Error fetching book and spots data.')
          }
        }
        fetchBookAndSpots()
      }, [_id])
      const handleChange = (event) => {
        const value = event.target.value
        setregisterForm({
          ...registerForm,
          [event.target.name]: value,
        })
      }
    
      function handleSubmit(event) {
        const data = {
          nameBook:event.target.nameBook.value,
          authorBook:event.target.authorBook.value,
          spotID:event.target.spotID.value,
        }
        event.preventDefault()
        APIService.requeteUpdateBooks(_id, data.nameBook, data.authorBook
          , data.spotID,)
          .then((response) => {
            if(response.status == 200){
              //router.push('../profile/profile');
              setIsOk('User mis a jour');
            } else {
              setErreur('NoN');
            }
          }).catch(function(error){
          console.log(error);
        });
      }
      return (
        <>
          <div>
            <Typography variant="h4">Update Book</Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              method="post"
              sx={styles.form}
            >
              <TextField
                onChange={handleChange}
                margin="normal"
                fullWidth
                required
                id="nameBook"
                name="nameBook"
                label="Name"
                placeholder={registerForm.nameBook.toString()} // Change here
  value={registerForm.nameBook.toString()} // Change here
              />
              <TextField
                margin="normal"
                onChange={handleChange}
                required
                fullWidth
                id="authorBook"
                name="authorBook"
                type="text"
                label="Author"
                placeholder={registerForm.authorBook.toString()}
                value={registerForm.authorBook.toString()}
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
          <Button variant="contained" color="primary" type="submit">Mettre à jour</Button>
              </Box>
              </div>
              </>
              )
}