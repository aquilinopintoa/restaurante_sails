import React, { Component } from 'react';
import {
  Card, 
  CardActions, 
  CardHeader, 
  CardMedia, 
  CardTitle, 
  CardText
} from 'material-ui/Card'

import CashFlow from '../CashFlow'
import Chef from '../Chef'

class Admin extends Component {
  constructor(){
    super()
    this.state = {

    }
  }

  render() {
    const styles = {
      header: {
        display: 'flex',
        margin: "20px"
      },
      ordersContent: {
        margin: "30px 0px"
      }
    }
    return (
      <div>
          <div style={styles.header}>
            <CashFlow/>
          </div>

          <div style={styles.ordersContent}>
            <Chef noActions/>
          </div>
          
      </div>
    );
  }
}

export default Admin;