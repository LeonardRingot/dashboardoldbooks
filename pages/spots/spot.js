
import React, { useState, useEffect } from 'react';
import * as APIServcie from '../../services/APIService'
import Box  from '@mui/material/Box'
import Link from 'next/link';
import Button from '@mui/material/Button'
import { TableCell,TableContainer,TableBody, Table , TableHead, TableRow,} from '@mui/material'
import Navbar from '@/components/Navbar';
import HeaderDashboard from '@/components/Headerdashboard';

export default function spot()
{
    let [data, setData] = useState(null)
    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.id]: event.target.value,
        });
      };
    
      const handleDeleteSpot = (_id) => {
        APIServcie.requeteDeleteSpot(_id.trim())
          .then(response => {
            if (response.status === 200) {
              setData(prevData => prevData.filter(spot => spot._id !== _id.trim()))
            }
          })
          .catch(error => {
            console.error(error);
          })
      }
      useEffect(() => {
       
        APIServcie.requeteGetAllSpots()
        .then(response => {
          if(response.status == 200){
            if(response.data.length > 0)
            {
                setData(response.data)
                console.log(response.data)
            }
          }
        }
        )
    }, [])
    return(
        <div>
        <HeaderDashboard title="Welcome to dashboard" />
        <Box sx={{ display: 'flex' }}>
        
        <Navbar />
        
            
        
        {data && data.length > 0 ? (
            <TableContainer>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ border: '1px solid gray', maxWidth: '150px' }}>Adresse Spot</TableCell>
                    <TableCell sx={{ border: '1px solid gray', maxWidth: '150px' }}>ID</TableCell>
                    <TableCell sx={{ border: '1px solid gray', maxWidth: '150px' }}>Supprimer Spot</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ bgcolor: 'lightgray' }}>
                  {data.map((spot, index) => (
                    <TableRow key={index} sx={{ '&:hover': { bgcolor: 'lightblue' } }}>
                      <TableCell sx={{ p: 2, maxWidth: '150px' }}>{spot.addresseSpot}</TableCell>
                      <TableCell sx={{ p: 2, maxWidth: '150px' }}>{spot._id}</TableCell>
                      <TableCell sx={{ p: 2, maxWidth: '150px' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleDeleteSpot(spot._id.trim())}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Link legacyBehavior  href='/spots/createspot'><a >Enregister un spot</a></Link>
            </TableContainer>
          ) : (
            <div>No spot to display.</div>
          )} </Box>
        </div>
    )
}