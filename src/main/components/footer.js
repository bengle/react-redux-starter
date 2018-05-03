import React, { Component } from 'react';

export default class CopyRight extends Component {
    render(){
        return (
            <p className="footer-wrapper"> 
                <small dangerouslySetInnerHTML={{__html:PARAMCONFIG.COPYRIGHT}}></small> 
            </p>
        )
    }
}