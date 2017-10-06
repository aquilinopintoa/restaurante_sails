import React, { Component } from 'react'

import LinkMenu from './../LinkMenu/LinkMenu'

class MainMenu extends Component {
  render() {
    return (
      <div id="navbar" className="height-menu">
        <div className="row">
          <div>
            <ul>
              <LinkMenu to={'app'} itemName={'Home'} />
              <LinkMenu to={'app/chef'} itemName={'Chef'} />
              <LinkMenu
                to={'app/cajero'}
                itemName={'Cajero'}
              />
              <LinkMenu to={'app/admin'} itemName={'Admin'} />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MainMenu
