import React, { Component } from 'react';
import './Joke.css';

export class Joke extends Component {
    
        "em em-rolling_on_the_floor_laughing";
        "em em-laughing";
        "em em-smiley";
        "em em-slightly_smiling_face";
        "em em-neutral_face";
        "em em-confused";
        "em em-angry"
    constructor(props) {
        super(props);
        this.voteUp = this.voteUp.bind(this);
        this.voteDown = this.voteDown.bind(this);
    }
    getColor(){
        if(this.props.score >= 15){
            return "#4CAF50";
        } else if (this.props.score >= 12){
            return "#8BC34A"
        } else if (this.props.score >= 9){
            return "#CDDC39"
        } else if (this.props.score >= 6){
            return "#FFEB8B"
        } else if (this.props.score >= 3){
            return "#FFC107"
        } else if (this.props.score >= 0){
            return "#FF9800"
        } else {
            return "#F44336"
        }
    };
    getEmoji(){
        if(this.props.score >= 15){
            return "em em-rolling_on_the_floor_laughing";
        } else if (this.props.score >= 12){
            return "em em-laughing"
        } else if (this.props.score >= 9){
            return "em em-smiley"
        } else if (this.props.score >= 6){
            return "em em-slightly_smiling_face"
        } else if (this.props.score >= 3){
            return "em em-neutral_face"
        } else if (this.props.score >= 0){
            return "em em-confused"
        } else {
            return "em em-angry"
        }
    };

    voteUp(evt) {
        evt.preventDefault();
        this.props.handleVote(this.props.id, 1)
    }
   voteDown(evt) {
        evt.preventDefault();
        this.props.handleVote(this.props.id, -1)
    }
    render() {
        
        return (
            <li className="Joke">
                <div className="Joke-score">
                    <i className="fas fa-arrow-up" onClick={this.voteUp} />
                    <span style={{borderColor: this.getColor()}}>{this.props.score}</span>
                    <i className="fas fa-arrow-down" onClick={this.voteDown} />
                </div>
                <p>{this.props.text}</p>
                <div className="Joke-smile">
                    <i className={this.getEmoji()} />
                </div>
            </li>
        )
    }
}

export default Joke
