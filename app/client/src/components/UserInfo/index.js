import React, { Component } from 'react'
import _ from 'lodash'
import FlatButton from 'material-ui/FlatButton'
import {
  Card, 
  CardActions, 
  CardHeader, 
  CardMedia, 
  CardTitle, 
  CardText
} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'

class UserInfo extends Component {

  render() {
    const styles = {
      content: {
        display: 'flex'
      },
      showOrder:{
        width: "300px",
        margin: "0 20px",
        display: "inline-block"
      },
      selectOrder:{
        width: "60%",
        margin: "0 20px",
        display: "inline-block"
      }
    }
    return (
      <div style={styles.content}>

        {
          this.props.user.rol ?
            <Card style={styles.showOrder}>
              <CardHeader
                title="User"
                subtitle={this.props.user.email}
              />
            </Card>
            :
            null
        }
      </div>
    );
  }
}

export default UserInfo;