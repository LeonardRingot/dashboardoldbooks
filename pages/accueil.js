import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as APIServcie from '../services/APIService'
import Box  from '@mui/material/Box'
import Button from '@mui/material/Button'
import { TableCell,TableContainer,TableBody, Table , TableHead, TableRow,} from '@mui/material'
import Navbar from '@/components/Navbar';
import HeaderDashboard from '@/components/Headerdashboard';
export default function BookDashboard(){
   

    return (
<div>
<HeaderDashboard title="Welcome to dashboard" />
<Box sx={{ display: 'flex' }}>

<Navbar />

    <h1>Bienvenue</h1>

</Box>
</div>
      );
          }