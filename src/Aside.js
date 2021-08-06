import React, { Component } from 'react';
import './Aside.css';


export class Aside extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(evt){
        evt.preventDefault();
        this.props.addJoke();
    }
    render() {
        return (
            <div className="Aside">
                <h1 className="Aside-title"><span>Dad</span> JOKES</h1>
                <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
                <button className="Aside-getMore" onClick={this.handleClick}>New Jokes</button>
            </div>
        )
    }
}

export default Aside
