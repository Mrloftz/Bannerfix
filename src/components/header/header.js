import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import Item from './item'
import Lead from './lead'
import './index.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
        menu_class: '',
    }
}

setToggleTopMenuClass = () => {
    if (this.state.menu_class === '') {
        this.setState({
            menu_class: 'toggled',
        })
    } else {
        this.setState({
            menu_class: '',
        })
    }
}

render = () => {
    let top_menu_class = `top-menu ${this.state.menu_class}`
    return (
        <div>
            <div className={top_menu_class} >
                <Lead text="Travizgo" />
                <div className='left'>
                    <Item text='Banner'/>
                    <Item text='Package'/>
                </div>
                <div className='right'>
                    <Item text='Logged in as ...' />
                    <Item text='Log out' />
                </div>
                <FontAwesomeIcon icon={faBars} className='top-menu-icon' onClick={this.setToggleTopMenuClass}/>
                <div className='clear-fix' />
            </div>
        </div>
    )
  }
}

export default Header;