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

import ValidateInput from '../../common/ValidateInput'

const validations = {
  email: ['NOTNULL', 'EMAIL', 'TEKTONLAB'],
  password: ['NOTNULL']
}

export default class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      errors: {},
      loginData: { 
        email: '',
        password: '',
    } }
    this.login = this.login.bind(this)
    this.save = this.save.bind(this)
  }

  async login() {
    const statePrev = _.clone(this.state)

    Object.keys(validations).forEach(function(key){
      statePrev.errors[key] = ValidateInput(validations[key],statePrev.loginData[key])
      !statePrev.errors[key] ? 
        delete statePrev.errors[key]
        :
        null
    })

    if (!_.isEmpty(statePrev.errors)) {
      this.setState(statePrev)
      return
    }

    this.props.login(this.state.loginData, (err) => {
      if(err){
        statePrev.errors.async = err
        this.setState(statePrev)
      }
    })
  }

  save(value, field, context) {
    const statePrev = _.clone(this.state)
    statePrev.errors[field] = ValidateInput(validations[field], value)

    if (statePrev.errors.async) delete statePrev.errors.async 

    !statePrev.errors[field] ? 
      delete statePrev.errors[field]
      :
      null

    statePrev.loginData[field] = value
    this.setState(statePrev)
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
        margin: "10px", 
        display: "flex",
        justifyContent: "center"
      },
      header:{
        textAlign: "center"
      },
      textError:{
        color: "red",
        textAlign: "center"
      }
    }

    return (
      <Card style={styles.form}>
        <CardTitle
          style={styles.header}
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
                      errorText={this.state.errors.email}
                      floatingLabelText="Email"
                      onChange={(event, value) => this.save(value,"email")}
                    />
                    <TextField
                      hintText="Password"
                      floatingLabelText="Password"
                      type="password"
                      errorText={this.state.errors.password}
                      onChange={(event, value) => this.save(value,"password")}
                    />
                    {
                      this.state.errors.async ?
                        <CardText
                          style={styles.textError}>
                          {this.state.errors.async}
                        </CardText>
                        :
                        null
                    }
                    <CardActions style={styles.button}>
                      <RaisedButton 
                        label="Login" 
                        primary={true}
                        onClick={() => this.login()}
                      />
                    </CardActions>
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