import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const BoatDetails = ({ deleteBoat, handleEdit, owners}) => {
  const [newBoat, setNewBoat] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const { make, model, description, image, price} = newBoat;



  useEffect(() => {
    fetch(`/boats/${id}`)
      .then((resp) => resp.json())
      .then((boats) => setNewBoat(boats));
  }, [id]);

  const handleDelete = (e) => {
    fetch(`/boats/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          deleteBoat(newBoat);
          history.push("/boats");
        } else {
          resp.json().then((error) => setError(error.message));
        }
      })
      .catch(console.error);
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ maxWidth: 345 }}>
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
            Model: {model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleEdit(newBoat)}>
            Edit Listing
          </Button>
          <Button size="small" onClick={handleDelete}>
            Remove Listing
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default BoatDetails;
