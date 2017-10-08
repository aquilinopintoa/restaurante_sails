import React, { Component } from 'react'
import _ from 'lodash'
import {List, ListItem} from 'material-ui/List'

import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import {
    Card, 
    CardActions, 
    CardHeader, 
    CardMedia, 
    CardTitle, 
    CardText
  } from 'material-ui/Card'
import ValidateInput from '../../common/ValidateInput'

const validations = {
  email: ['NOTNULL', 'EMAIL', 'TEKTONLAB'],
  password: ['NOTNULL'],
  rol: ['NOTNULL']
}

export default class CreatorJob extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      loading: false,
      errors: {},
      newUser: { 
        rol: '',
        email: '',
        password: ''
    } }

    this.reset = this.reset.bind(this)
    this.createJob = this.createJob.bind(this)
    this.save = this.save.bind(this)
  }

  async createJob() {
    const statePrev = _.clone(this.state)    

    Object.keys(validations).forEach(function(key){
      statePrev.errors[key] = ValidateInput(validations[key],statePrev.newUser[key])
      !statePrev.errors[key] ? 
        delete statePrev.errors[key]
        :
        null
    })

    if (!_.isEmpty(statePrev.errors)) {
      this.setState(statePrev)
      return
    }

    this.setState({
      loading: true
    })

    this.props.createUser(this.state.newUser, (err) => {
      if(err){
        statePrev.errors.async = err
        this.setState(statePrev)
      }else{
        this.props.handlerNewUser()
      }
    })
  }

  save(value, field, context) {
    const statePrev = _.clone(this.state)

    statePrev.newUser[field] = value
    statePrev.errors[field] = ValidateInput(validations[field], value)
    
    if (statePrev.errors.async) delete statePrev.errors.async 

    !statePrev.errors[field] ? 
      delete statePrev.errors[field]
      :
      null
    this.setState(statePrev)
  }

  reset() {
    this.setState({
      loading: false,
      newUser: {
        email: '',
        password: '',
        rol: '',
    }})
  }

  render() {
    const styles = {
      content: {
        width: "300px",
      },
      form:{
        width: "250px",
        display: "inline-block",
        margin: "0 15px"
      },
      button:{
        margin: "10px"
      },
      textError:{
        width: "100%",
        color: "red",
        textAlign: "center"
      }
    }

    return (
      <div>
        <div style={styles.content}>
            <Card>
                {
                    !this.state.loading ? 
                    <div style={{display:'flex'}}>
                        <div style={styles.form}>
                        <SelectField
                            value={this.state.newUser.rol}
                            errorText={this.state.errors.rol}
                            onChange={(event, key, value) => this.save(value,"rol")}
                            floatingLabelText="Rol"
                        >
                            <MenuItem key={1} value={"ADMIN"} primaryText="ADMIN" />
                            <MenuItem key={2} value={"CAJERO"} primaryText="CAJERO" />
                            <MenuItem key={3} value={"CHEF"} primaryText="CHEF" />
                        </SelectField>
                        <TextField
                            hintText="Email"
                            floatingLabelText="Email"
                            errorText={this.state.errors.email}
                            onChange={(event, value) => this.save(value,"email")}
                        />
                        <TextField
                            type={"password"}
                            hintText="Password"
                            floatingLabelText="Password"
                            errorText={this.state.errors.password}
                            onChange={(event, value) => this.save(value,"password")}
                        />
                        <RaisedButton 
                            label="Create" 
                            primary={true} 
                            style={styles.button} 
                            onClick={() => this.createJob()}
                        />
                        <RaisedButton 
                            label="Reset" 
                            primary={true} 
                            style={styles.button} 
                            onClick={() => this.reset()}
                        />
                        </div>
                    </div>
                    :
                    <h1>Loading</h1>
                }
            </Card>
        </div>
      </div>
    )
  }
}