import React, { Component } from 'react'
import _ from 'lodash'
import {List, ListItem} from 'material-ui/List'

import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class CreatorOrders extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      loading: false,
      newOrder: { 
        platos: [],
        client_name: '',
        type_payment: '',
        total: 0
    } }

    this.reset = this.reset.bind(this)
  }

  async componentWillMount() {
    await this.props.getAllPlatos()
  }

  async createOrder() {
    this.setState({
      loading: true
    })
    await this.props.createOrder(this.state.newOrder)
    this.setState({
      loading: false
    })
  }

  save(value, field, context) {
    const statePrev = this.state.newOrder
    if(field === "platos"){
      let temp = _.clone(this.state.newOrder.platos)
      if(context){
        temp.push(value)
      }else{
        temp = _.filter(temp, (id) => {return value !== id})
      }
      value = temp
      statePrev.total = _.sumBy(value, (id) => {
        let plato = _.find(this.props.platos, (plato) => {
          return plato.id === id
        })
        return plato.precio
      })
    }
    statePrev[field] = value
    this.setState({ newOrder: statePrev})
  }

  reset() {
    // reset checkbox
    this.props.platos.forEach(function(_,index){
      this.refs['check_'+index].state.switched = false
    },this)
    this.setState({
      platos: [],
      client_name: '',
      type_payment: '',
      total: 0
    })
  }

  render() {
    const styles = {
      content: {
        width: "600px",
      },
      listPlatos:{
        width: "300px",
        display: "inline-block",
        height: "200px",
        overflow: "auto",
        margin: "0 15px"
      },
      form:{
        width: "250px",
        display: "inline-block",
        margin: "0 15px"
      },
      button:{
        margin: "10px"
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
                </div>
                <div style={styles.form}>
                  <SelectField
                    value={this.state.newOrder.type_payment}
                    onChange={(event, key, value) => this.save(value,"type_payment")}
                    floatingLabelText="Payment method"
                  >
                      <MenuItem key={1} value={"TDC"} primaryText="TDC" />
                      <MenuItem key={2} value={"EFECTIVO"} primaryText="EFECTIVO" />
                  </SelectField>
                  <TextField
                    hintText="Client Name"
                    floatingLabelText="Client Name"
                    onChange={(event, value) => this.save(value,"client_name")}
                  />
                  <TextField
                    hintText="Total"
                    disabled
                    inputStyle={{textAlign:"right"}}
                    floatingLabelText="Total"
                    value={this.state.newOrder.total}
                  />
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