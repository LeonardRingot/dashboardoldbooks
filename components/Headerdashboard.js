import { AppBar, Toolbar,Typography, Box  } from "@mui/material";
export default function HeaderDashboard({ title })
{
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: 'primary.main', boxShadow: 2 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            {title}
          </Typography>
        </Box>
      );
}