import Head from 'next/head'
import {  useState, createContext } from 'react'
import styles from '@/styles/Home.module.css'
import {useCookies} from 'react-cookie'
import * as APIServcie from '../services/APIService'
import * as React from 'react'
import  TextField  from '@mui/material/TextField'
import Box  from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useRouter } from 'next/router'


export default function Home() {
  const Router = useRouter()
  
  const [ConnexionForm, setConnexionform]= useState({
    name:'',
    code:'',
  })
  const handleChange = (e) =>
  {
    const value = e.target.value;
    setConnexionform({
      ...ConnexionForm, [e.target.name]: value
    });
  }
  const ScriptFormConnexion = (event) =>
  {
    const data = {
      name:event.target.name.value,
      code:event.target.code.value,
    }
    event.preventDefault()
    
    APIServcie.requetePostConnexion(data.code, data.name).then(response => {
      
        if(response.status == 200){          
          Router.push({pathname:`/accueil`});
          setCookie("user", [response.data.accessToken, response.data.refreshToken, ConnexionForm.code], "/");
          console.log("COOKIE CREATED");
        } else {
          return res.status(400).send('Super-Administrateur ou administrateur introuvable')
          
        }
      }).catch(function(error){
        console.log(error);
      });
  }
  return (
    <>
       <h1 className={styles.heading}>Formulaire de connexion</h1>
      <Box
        component="form"
        noValidate
        onSubmit={ScriptFormConnexion}
        method="post"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '50%',
          margin: '0 auto 16px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        <TextField
          id="name"
          label="Name"
          onChange={handleChange}
          variant="outlined"
          sx={{ margin: '8px' }}
        />
        <TextField
          id="code"
          label="Code"
          onChange={handleChange}
          type="password"
          variant="outlined"
          sx={{ margin: '8px' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ margin: '16px' }}
        >
          Login
        </Button>
      </Box>
    </>
  );
}
