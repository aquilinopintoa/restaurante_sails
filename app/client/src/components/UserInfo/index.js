import React, { Component } from 'react'
import _ from 'lodash'
import { build, actions } from '../../container_helpers'
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

  constructor() {
    super()
    this.state = {
      selected: [],
      selectedOrder: undefined
    }
  }
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
          this.props.auth.rol ?
            <Card style={styles.showOrder}>
              <CardHeader
                title="User"
                subtitle={this.props.auth.email}
              />
            </Card>
            :
            null
        }
      </div>
    );
  }
}

const mapDispatchToProps = {}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default build({
  component: UserInfo,
  mapDispatchToProps,
  mapStateToProps,
})