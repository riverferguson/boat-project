
import { Link } from 'react-router-dom'
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import Link from '@mui/material/Link';


const BoatCard = ({boat}) => {
const {id, make, model, description, image, price, location: {city, state}} = boat
  return (
    <Container maxWidth="sm">
    <Card sx={{ maxWidth: 345, margin: '80px'}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        src={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Make: {make}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
      <Link to={`/boats/${id}`}>All Details</Link>
      </Button>
      </CardActions>
    </Card>
    </Container>
  );
}

export default BoatCard