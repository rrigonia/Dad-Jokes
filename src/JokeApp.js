import React, { Component } from 'react';
import Aside from './Aside';
import Joke from './Joke';
import './JokeApp.css';
import axios from 'axios';

const API_URL = "https://icanhazdadjoke.com/"

export class JokeApp extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            isLoading: false

        };
        this.handleVote = this.handleVote.bind(this);
        this.addJoke = this.addJoke.bind(this);
        this.seenJokes = new Set(this.state.jokes.map(j => j.id));


    }
    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();
    }

    async getJokes() {
        try {
            let jokes = [];
            while (jokes.length < this.props.numJokesToGet) {
                let res = await axios.get(API_URL, { headers: { Accept: 'application/json' } });
                let data = res.data
                if (!this.seenJokes.has(data.id)) {
                    jokes.push({ text: data.joke, id: data.id, score: 0 });
                    this.seenJokes.add(data.id)
                }
            };
            this.setState(
                st => ({
                    isLoading: false,
                    jokes: [...st.jokes, ...jokes]
                }),
                () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
            );
        } catch (e) {
            alert(e);
            this.setState({isLoading: false});
        }
    }

    handleVote(id, delta) {
        let newJokes = this.state.jokes.map(j =>
            j.id === id ? { ...j, score: j.score + delta } : j
        );

        this.setState(st => ({ jokes: newJokes }),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
    }

    async addJoke() {
        this.setState({ isLoading: true }, this.getJokes)
    }

    render() {
        let sortedJokes = this.state.jokes.sort((a,b) => b.score - a.score);
        let allJokes = sortedJokes.map(j =>
            <Joke
                text={j.text}
                handleVote={this.handleVote}
                score={j.score}
                id={j.id}
                key={j.id}
            />
        );

        if (this.state.isLoading) {
            return (
                <div className="spinner">
                    <i className="far fa-8x fa-laugh fa-spin" />
                    <h1 className="JokeApp-title">Loading...</h1>
                </div>
            )
        }

        return (
            <div className="JokeApp">
                <Aside addJoke={this.addJoke} />
                <ul className="JokeApp-jokes">
                    {allJokes}
                </ul>
            </div>
        )
    }
}

export default JokeApp
