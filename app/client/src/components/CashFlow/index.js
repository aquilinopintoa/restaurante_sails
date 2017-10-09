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

class CashFlow extends Component {

  constructor() {
    super()
    this.state = {
      loading: false,
      updateDate: new Date()
    }
    this.handlerRefresh = this.handlerRefresh.bind(this)
  }

  async componentWillMount() {
    await Promise.all([
      this.props.getAllOrders()])
  }

  async handlerRefresh() {
    await this.props.getAllOrders()
    this.setState({
      updateDate: new Date()
    })
  }

  getFormat(dateRaw){
    const date = new Date(dateRaw)
    const formatDate = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()
    const formatHour = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    return formatDate + ' ' + formatHour
  }

  render() {
    const styles = {
      CashFlowContent: {
        width:"300px"
      },
      textContent:{
        textAlign: "right",
        padding: "0px 30px"
      }
    }
    
    let sumTotal = 0
    let sumCash = 0
    let sumTDC = 0
    this.props.orders.forEach(function(order){
      order.type_payment === "EFECTIVO" ?
        sumCash += order.total
        :
        sumTDC += order.total
      sumTotal += order.total
    })
    return (
      <Card style={styles.CashFlowContent}>
          <CardHeader
              title="Cash Flow"
              subtitle={"last update: "+this.getFormat(this.state.updateDate)}
          />
          <CardTitle 
              style={styles.textContent}
              title={'Total '+sumTotal+' $'} />
          <div style={styles.textContent}>
            Cash &nbsp; {sumCash}
          </div>
          <div style={styles.textContent}>
            Tdc &nbsp; {sumTDC}
          </div>   
          <CardActions>
            <FlatButton 
              primary 
              label="Refresh"
              onClick={this.handlerRefresh}/>
          </CardActions>
      </Card>
    );
  }
}

const mapDispatchToProps = {
  getAllOrders: actions.orders.getAll
}

const mapStateToProps = state => {
  return {
    orders: state.orders
  }
}

export default build({
  component: CashFlow,
  mapDispatchToProps,
  mapStateToProps,
})