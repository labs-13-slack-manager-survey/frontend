import React, { Component } from 'react'
import './Manager.css'

export default class Manager extends Component {
    state ={
        question:[],
        response:[]
    }

    render() {
        return (
            <div className="managerresponse">
                <h1 className="member-form-title">
                    Manager's Thoughts</h1>
                    <div>
                        <h3  className="manager-subtitle">
                        {this.state.question}</h3>
                        <h3 className="manager-subtitle-bold"
                        >{this.state.response}</h3>
                    </div>
            </div>
        )
    }
}
