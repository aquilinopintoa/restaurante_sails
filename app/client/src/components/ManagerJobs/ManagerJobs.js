import React, { Component } from 'react'
import _ from 'lodash'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton'
import {
  Card, 
  CardActions, 
  CardHeader, 
  CardMedia, 
  CardTitle, 
  CardText
} from 'material-ui/Card'

import CreatorJob from '../CreatorJob'

class ManagerJobs extends Component {

  constructor() {
    super()
    this.state = {
      creating: false,
    }
    this.handlerNewUser = this.handlerNewUser.bind(this)
  }

  async componentWillMount() {
    await this.props.getAllUsers()
  }

  isSelected (index){
    return this.state.selected.indexOf(index) !== -1;
  };

  getFormat(dateRaw){
    const date = new Date(dateRaw)
    const formatDate = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()
    const formatHour = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    return formatDate + ' ' + formatHour
  }

  handlerNewUser(){
    this.setState({
      creating: !this.state.creating
    })
  }

  render() {
    const styles = {
      content: {
        display: 'flex',
        margin: "15px 0"
      },
      creatorUser:{
        width: "300px",
        margin: "0 20px",
        display: "inline-block"
      },
      contentUsers:{
        width: "50%",
        margin: "0 20px",
        display: "inline-block"
      },
      contentButton:{
        display:"flex",
        justifyContent: "flex-end",
      }
    }
    const usersSorted = _.orderBy(this.props.users, ['createdAt'], ['desc'])
    return (
      <div style={styles.content}>
        <Card style={styles.contentUsers}>
          <div>
            <h1>Users</h1>
            <Table 
              onRowSelection={this.handleRowSelection} 
              height={"250px"}>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Email</TableHeaderColumn>
                  <TableHeaderColumn>Rol</TableHeaderColumn>
                  <TableHeaderColumn>Date</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
              >
                { 
                  usersSorted.map( (user, index) => {
                    return (
                      <TableRow 
                        key={user.id}
                      >
                        <TableRowColumn>{user.email}</TableRowColumn>
                        <TableRowColumn>{user.rol}</TableRowColumn>
                        <TableRowColumn>{this.getFormat(user.createdAt)}</TableRowColumn>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>
          <CardActions style={styles.contentButton}>
            {
              !this.state.creating ? 
                <FlatButton 
                  primary 
                  onClick={this.handlerNewUser}
                  label="New User"/>
                  :
                  null
            }
          </CardActions>
        </Card>
        {
          this.state.creating ? 
            <div style={styles.CreatorUser}>
              <CreatorJob handlerNewUser={this.handlerNewUser}/> 
            </div>
            : null
        }
      </div>
    );
  }
}

export default ManagerJobs;