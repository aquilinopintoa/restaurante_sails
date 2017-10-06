import React, { Component } from 'react'
import _ from 'lodash'
import { build, actions } from '../../container_helpers'
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
import {List, ListItem} from 'material-ui/List'

class Chef extends Component {

  constructor() {
    super()
    this.state = {
      selected: [],
      selectedOrder: undefined
    }
    this.handleRowSelection = this.handleRowSelection.bind(this)
    this.updateOrder = this.updateOrder.bind(this)
  }

  async componentWillMount() {
    await Promise.all([
      this.props.getAllOrders(),
      this.props.getAllPlatos()
    ])
  }

  async updateOrder(value) {
    const orderData = _.clone(this.state.selectedOrder)
    orderData.state = value
    console.log(orderData)
    await this.props.updateOrder(orderData)
    this.setState({
      selected: [],
      selectedOrder: undefined
    })
  }

  isSelected (index){
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection (selectedRows){
    const ordersSorted = _.orderBy(this.props.orders, ['createdAt'], ['desc'])
    this.setState({
      selected: selectedRows,
      selectedOrder: selectedRows.length > 0 ? ordersSorted[selectedRows[0]] : undefined
    });
  };

  getFormat(dateRaw){
    const date = new Date(dateRaw)
    const formatDate = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()
    const formatHour = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    return formatDate + ' ' + formatHour
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
    const ordersSorted = _.orderBy(this.props.orders, ['createdAt'], ['desc'])
    return (
      <div style={styles.content}>
        <Card style={styles.selectOrder}>
          <div>
            <h1 className="App-title">Orders</h1>
            <Table 
              onRowSelection={this.handleRowSelection} 
              height={"300px"}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Client Name</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                  <TableHeaderColumn>Date</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                deselectOnClickaway={false}
              >
                { 
                  ordersSorted.map( (order, index) => {
                    return (
                      <TableRow 
                        key={order.id}
                        selectable = {order.state !== "TERMINADO"}
                        selected={this.isSelected(index)}
                      >
                        <TableRowColumn>{order.id}</TableRowColumn>
                        <TableRowColumn>{order.client_name}</TableRowColumn>
                        <TableRowColumn>{this.getFormat(order.createdAt)}</TableRowColumn>
                        <TableRowColumn>{order.state}</TableRowColumn>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>
        </Card>
        {
          this.state.selectedOrder ?
            <Card style={styles.showOrder}>
              <CardHeader
                title="Order"
                subtitle={this.state.selectedOrder.id}
              />
              <CardTitle 
                title={this.state.selectedOrder.client_name} 
                subtitle={this.getFormat(this.state.selectedOrder.createdAt)} />
              <CardText>
                <List>
                  {
                    this.state.selectedOrder.platos.map((platoId) => {
                      const plato = _.find(this.props.platos, (iter) => {
                        return iter.id === platoId
                      })
                      return (
                        <ListItem
                          key={plato.id}
                          primaryText={plato.name}
                        />
                      )
                    })
                  }
                </List>
              </CardText>
            
              <CardActions>
                <FlatButton label="TERMINADO" onClick={()=> this.updateOrder("TERMINADO")}/>
                <FlatButton label="EN PROCESO" onClick={()=> this.updateOrder("EN PROCESO")}/>
              </CardActions>
            </Card>
            :
            null
        }
      </div>
    );
  }
}

const mapDispatchToProps = {
  getAllOrders: actions.orders.getAll,
  updateOrder: actions.orders.update,
  getAllPlatos: actions.platos.getAll
}

const mapStateToProps = state => {
  return {
    platos: state.platos,
    orders: state.orders
  }
}

export default build({
  component: Chef,
  mapDispatchToProps,
  mapStateToProps,
})