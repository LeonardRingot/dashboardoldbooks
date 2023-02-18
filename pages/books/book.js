import React, { useState, useEffect } from 'react';
import * as APIServcie from '../../services/APIService'
import Box  from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from 'next/link';
import { TableCell,TableContainer,TableBody, Table , TableHead, TableRow,} from '@mui/material'
import Navbar from '@/components/Navbar';
import { useHistory } from 'react-router-dom';
import HeaderDashboard from '@/components/Headerdashboard';
export default function Book()
{
    let [data, setData] = useState(null)
    
    
      const handleDeleteBook = (_id) => {
        APIServcie.requeteDeleteBook(_id.trim())
          .then(response => {
            if (response.status === 200) {
              setData(prevData => prevData.filter(book => book._id !== _id.trim()))
            }
          })
          .catch(error => {
            console.error(error);
          })
      }
    
      
    useEffect(() => {
       
        APIServcie.requeteGetAllBooks()
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
    return (
        <div>
        <HeaderDashboard title="Welcome to dashboard" />
        <Box sx={{ display: 'flex' }}>
        
        <Navbar />
        
            
        
        {data && data.length > 0 ? (
            <TableContainer>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ border: '1px solid gray', maxWidth: '150px' }}>Book Name</TableCell>
                    <TableCell sx={{ border: '1px solid gray', maxWidth: '150px' }}>Book Author</TableCell>
                    <TableCell sx={{ border: '1px solid gray', maxWidth: '100px' }}>Code</TableCell>
                    <TableCell sx={{ border: '1px solid gray', maxWidth: '150px' }}>Spot ID</TableCell>
                    <TableCell sx={{ border: '1px solid gray', maxWidth: '150px' }}>Supprimer livre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ bgcolor: 'lightgray' }}>
                  {data.map((book, index) => (
                    <TableRow key={index} sx={{ '&:hover': { bgcolor: 'lightblue' } }}>
                      <TableCell sx={{ p: 2, maxWidth: '150px' }}>{book.nameBook}</TableCell>
                      <TableCell sx={{ p: 2, maxWidth: '150px' }}>{book.authorBook}</TableCell>
                      <TableCell sx={{ p: 2, maxWidth: '100px' }}>{book.code}</TableCell>
                      <TableCell sx={{ p: 2, maxWidth: '150px' }}>{book.spotID}</TableCell>
                      <TableCell sx={{ p: 2, maxWidth: '150px' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleDeleteBook(book._id.trim())}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Link legacyBehavior  href='/books/createbook'><a >Enregister un livre</a></Link>
            </TableContainer>
          ) : (
            <div>No books to display.</div>
          )} </Box>
        </div>
              );
}