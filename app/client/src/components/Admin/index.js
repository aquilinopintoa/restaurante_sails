import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import CashFlow from '../CashFlow'
import Chef from '../Chef'

class Admin extends Component {
  constructor(){
    super()
    this.state = {

    }
  }

  render() {
    const styles = {
      CashFlow: {
        display: 'flex',
        margin: "20px",
        justifyContent: "center"
      },
      ordersContent: {
        margin: "30px 0px"
      }
    }
    return (
      <div>
        <Tabs>
          <Tab label="Cash Flow" >
            <div style={styles.CashFlow}>
              <CashFlow/>
            </div>
          </Tab>
          <Tab label="Orders" >
            <div style={styles.ordersContent}>
              <Chef noActions/>
            </div>
          </Tab>
          <Tab
            label="Manager Jobs"
            data-route="/home"
          >
            <div>
              <h2>JOBS</h2>
              <p>
                .
              </p>
            </div>
          </Tab>
        </Tabs>          
      </div>
    );
  }
}

export default Admin;
