import React from 'react';
import Link from 'next/link';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import PlaceIcon from '@mui/icons-material/Place';
import ListItemButton from '@mui/material/ListItemButton';

import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  

  return (
    <Drawer
    sx={{
      width: 240,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
      },
    }}
    variant="permanent"
    anchor="left"
  >
    <Toolbar />
    <Divider />
    <List>
        {[
           ['Home', <HomeIcon />, '/'], 
           ['Gérer les lieux', < PlaceIcon/>, '/spots'], 
           ['Gérer les livres', <BookIcon />, '/books'], 
           ['Se déconnecter', <LogoutIcon />, '/logout']
        ].map((element, index) => (
          <ListItem key={element[0]} disablePadding>
          <ListItemButton>
            <ListItemIcon>
            {element[1]}
            </ListItemIcon>
            <ListItemText primary={element[0]} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Drawer>
  );
}

export default Navbar;