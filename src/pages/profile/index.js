import React, { Component } from "react";
import { Container, Card, CardContent, Typography, Avatar, AppBar, Toolbar, Button } from "@mui/material";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        address: "123 Main St, Cityville",
        avatar: "https://via.placeholder.com/150"
      }
    };
  }

  render() {
    const { user } = this.state;
    return (
      <Container maxWidth="md">
        <Card sx={{ p: 3, textAlign: "center"}}>
          <CardContent>
            <Avatar src={user.avatar} sx={{ width: 80, height: 80, margin: "auto", mt: 2 }} />
            <Typography variant="h5" sx={{ mt: 2 }}>{user.name}</Typography>
            <Typography variant="body2" color="textSecondary">{user.email}</Typography>
            <Typography variant="body2" color="textSecondary">{user.address}</Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default Profile;
