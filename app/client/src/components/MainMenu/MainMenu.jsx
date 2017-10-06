import React, { Component } from 'react'

import LinkMenu from './../LinkMenu/LinkMenu'

class MainMenu extends Component {
  render() {
    return (
      <div id="navbar" className="height-menu">
        <div className="row">
          <div>
            <ul>
              <LinkMenu to={''} itemName={'Home'} />
              <LinkMenu to={'mesero'} itemName={'Mesero'} />
              <LinkMenu to={'chef'} itemName={'Chef'} />
              <LinkMenu
                to={'cajero'}
                itemName={'Cajero'}
              />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MainMenu
