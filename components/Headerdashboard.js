import { AppBar, Toolbar,Typography, Box  } from "@mui/material";
import styles from "../styles/Home.module.css"
export default function HeaderDashboard({ title })
{
    return (
        // <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: 'primary.main', boxShadow: 2 }}>
        //   <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
        //     {title}
        //   </Typography>
        // </Box>
        <div className={styles.headerdash}>
            <h3>Dashboard OldBooks</h3>
        </div>
      );
}