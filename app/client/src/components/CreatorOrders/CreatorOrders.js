import React, { Component } from 'react'
import _ from 'lodash'
import {List, ListItem} from 'material-ui/List'

import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader';
import ValidateInput from '../../common/ValidateInput'

const validations = {
  platos: ['NOTEMPTY'],
  client_name: ['NOTNULL'],
  type_payment: ['NOTNULL'],
  total: [],
}

export default class CreatorOrders extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      loading: false,
      errors: {},
      newOrder: { 
        platos: [],
        client_name: '',
        type_payment: '',
        total: 0
    } }

    this.reset = this.reset.bind(this)
    this.createOrder = this.createOrder.bind(this)
    this.save = this.save.bind(this)
  }

  async componentWillMount() {
    await this.props.getAllPlatos()
  }

  async createOrder() {
    const statePrev = _.clone(this.state)    

    Object.keys(validations).forEach(function(key){
      statePrev.errors[key] = ValidateInput(validations[key],statePrev.newOrder[key])
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

    this.props.createOrder(this.state.newOrder, (err) => {
      if(err){
        statePrev.errors.async = err
      }
      this.reset()
    })
  }

  save(value, field, context) {
    const statePrev = _.clone(this.state)

    if(field === "platos"){
      let temp = statePrev.newOrder.platos
      if(context){
        temp.push(value)
      }else{
        temp = _.filter(temp, (id) => {return value !== id})
      }
      value = temp
      statePrev.newOrder.total = _.sumBy(value, (id) => {
        let plato = _.find(this.props.platos, (plato) => {
          return plato.id === id
        })
        return plato.precio
      })
    }

    statePrev.newOrder[field] = value
    statePrev.errors[field] = ValidateInput(validations[field], value)
    
    if (statePrev.errors.async) delete statePrev.errors.async 

    !statePrev.errors[field] ? 
      delete statePrev.errors[field]
      :
      null
    this.setState(statePrev)
  }

  reset() {
    // reset checkbox
    this.props.platos.forEach(function(_,index){
      const checkbox = this.refs['check_'+index]
      if(checkbox) checkbox.state.switched = false
    },this)
    this.setState({
      loading: false,
      newOrder: {
      platos: [],
      client_name: '',
      type_payment: '',
      total: 0
    }})
  }

  render() {
    const styles = {
      content: {
        width: "600px",
      },
      listPlatos:{
        width: "350px",
        display: "inline-block",
        margin: "0 15px"
      },
      list:{
        width: "300px",
        height: "200px",
        overflow: "auto",
        margin: "15px 0px"
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
      },
      total:{
        width: "100%",
        textAlign: "right"
      }
    }

    return (
      <div>
        <div style={styles.content}>
          {
            !this.state.loading ? 
              <div style={{display:'flex'}}>
                <div style={styles.listPlatos}>
                  <List style={styles.list}>
                    {
                      this.props.platos.map((plato, index) => {
                        return (
                          <ListItem
                            key={plato.id}
                            leftCheckbox={
                              <Checkbox 
                                ref={"check_"+index}
                                onCheck={
                                  (e, i) => this.save(plato.id,"platos", i)
                                }
                              />}
                            primaryText={plato.name}
                            secondaryText={plato.precio+" $"}
                          />
                        )
                      })
                    }
                  </List>
                  {
                    this.state.errors.platos ? 
                      <div style={styles.textError}>
                        {this.state.errors.platos}
                      </div>
                      :
                      null
                  }
                </div>
                <div style={styles.form}>
                  <SelectField
                    value={this.state.newOrder.type_payment}
                    errorText={this.state.errors.type_payment}
                    onChange={(event, key, value) => this.save(value,"type_payment")}
                    floatingLabelText="Payment method"
                  >
                      <MenuItem key={1} value={"TDC"} primaryText="TDC" />
                      <MenuItem key={2} value={"CASH"} primaryText="CASH" />
                  </SelectField>
                  <TextField
                    hintText="Client Name"
                    floatingLabelText="Client Name"
                    errorText={this.state.errors.client_name}
                    onChange={(event, value) => this.save(value,"client_name")}
                  />
                  <Subheader style={styles.total}>
                    {"Total "+this.state.newOrder.total+" $"}
                  </Subheader>
                  <RaisedButton 
                    label="Create" 
                    primary={true} 
                    style={styles.button} 
                    onClick={() => this.createOrder()}
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
        </div>
      </div>
    )
  }
}