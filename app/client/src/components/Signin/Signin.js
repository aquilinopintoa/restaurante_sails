import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import {List, ListItem} from 'material-ui/List'
import {
  Card, 
  CardActions, 
  CardHeader, 
  CardMedia, 
  CardTitle, 
  CardText
} from 'material-ui/Card'

import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import ValidateInput from '../../common/util/ValidateInput'

console.log(ValidateInput)

export default class Signin extends Component {
  constructor(props, context) {
    super(props)
    this.state = { 
      errors: {},
      loginData: { 
        email: '',
        password: '',
    } }
    this.context = context
    this.login = this.login.bind(this)
    this.save = this.save.bind(this)
  }

  async login() {
    this.props.login(this.state.loginData, (err) => {
      if(err){
        console.log("error", err)
      }
    })
  }

  save(value, field, context) {
    const statePrev = this.state.loginData
    statePrev[field] = value
    this.setState({ loginData: statePrev})
  }


  render() {
    const styles = {
      content: {
        width: "250px",
      },
      form:{
        width: "300px",
        margin: "50px auto"
      },
      button:{
        margin: "10px"
      }
    }

    return (
      <Card style={styles.form}>
        <CardHeader
          title="Login"
        />
        <CardText>
          <div style={styles.content}>
            {
              !this.state.loading ? 
                <div style={{display:'flex'}}>
                  <div >
                    <TextField
                      hintText="Email"
                      error={this.state.errors.email}
                      floatingLabelText="Email"
                      onChange={(event, value) => this.save(value,"email")}
                    />
                    <TextField
                      hintText="Password"
                      floatingLabelText="Password"
                      type="password"
                      error={this.state.errors.password}
                      onChange={(event, value) => this.save(value,"password")}
                    />
                    <div style={{width:"100%"}}>
                      <RaisedButton 
                        label="Login" 
                        primary={true} 
                        style={styles.button} 
                        onClick={() => this.login()}
                      />
                    </div>
                  </div>
                </div>
                :
                <h1>Loading</h1>
            }
          </div>
        </CardText>
      </Card>
    )
  }
}

Signin.contextTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}