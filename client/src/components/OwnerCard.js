
import { Link } from 'react-router-dom'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const OwnerCard = ({owner}) => {
const {first_name, last_name, bio, boats} = owner


  return (
    <Container maxWidth="sm">
    <Card sx={{ maxWidth: 345, margin: '20px' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {first_name} {last_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        About me: {bio}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
      </Button>
      </CardActions>
    </Card>
    </Container>
  )
}

export default OwnerCard