
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
export default function updatespot()
{
    const [erreur, setErreur] = useState('');
    const[IsOk, setIsOk] = useState('');
    const [registerForm, setregisterForm]= useState({
        addresseSpot:'',
    })
    const router = useRouter()
    const [spots, setSpots] = useState([]);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const {_id} = router.query

    useEffect(() => {
        async function fetchBookAndSpots() {
          try {
            if (!_id) {
              return;
            }
            const spotResID = await APIService.requeteGetSpotById(_id)
            console.log(spotResID)
            const spot = spotResID.data
            setregisterForm({
              addresseSpot: spot.addresseSpot,
            })
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
          addresseSpot:event.target.addresseSpot.value,
        }
        event.preventDefault()
        APIService.requeteUpdateSpots(_id, data.addresseSpot)
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
            <Typography variant="h4">Update Spot</Typography>
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
                id="addresseSpot"
                name="addresseSpot"
                label="Name"
                placeholder={registerForm.addresseSpot.toString()} // Change here
  value={registerForm.addresseSpot.toString()} // Change here
              />
          <Button variant="contained" color="primary" type="submit"/>
              </Box>
              </div>
              </>
              )
}