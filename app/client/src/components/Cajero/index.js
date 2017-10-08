import React, { Component } from 'react'
import {
  Card, 
  CardActions, 
  CardHeader, 
  CardMedia, 
  CardTitle, 
  CardText
} from 'material-ui/Card'

import CreatorOrders from '../CreatorOrders'

class Cajero extends Component {
  render() {
    const styles = {
      content: {
        display: 'flex'
      },
      form:{
        width: "50%",
        margin: "auto"
      }
    }
    return (
      <div style={styles.content}>
          <Card style={styles.form}>
            <CardHeader
              title="Order Register"
              subtitle="Subtitle"
            />
            <CardText>
              <CreatorOrders/>
            </CardText>
          </Card>
      </div>
    );
  }
}

export default Cajero;