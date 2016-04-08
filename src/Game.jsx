import React from 'react';
import AnswerBox from './AnswerBox.jsx';

const shuffle = (arr) => arr.sort(() => .5 - Math.random());

export default class Game extends React.Component {
    state = {
        flags: [],
        flag: undefined,
        score: 0,
        attempts: 0
    };

    _start = () => {
        this.setState({
            flags: shuffle(this.props.flags),
            score: 0
        }, this._nextFlag);
    }

    _nextFlag = () => {
        const {attempts} = this.props;
        const [flag, ...flags] = this.state.flags;

        console.log('Flag', flag);

        this.setState({
            flags,
            flag,
            attempts
        });
    };

    _onSuccess = () => this._updateScore(1);

    _onError = () => {
        const attempts = this.state.attempts - 1;

        if (attempts === 0) {
            this._updateScore(-1);
            return;
        }

        this.setState({ attempts });
    };

    _updateScore = (by) => {
        this.setState({
            score: Math.max(this.state.score + by, 0)
        }, this._nextFlag);
    };

    render() {
        const {flag, score, attempts} = this.state;

        if (flag === undefined) {
            return <button onClick={this._start}>Start</button>
        }

        return (
            <div className="fun-with-flags">
                <div className="flag">{flag.emoji}</div>
                <AnswerBox className="answer" answer={flag.name} onSuccess={this._onSuccess} onError={this._onError} />
                <div className="results">Score: {score}, Attempts Left: {attempts}</div>
            </div>
        );
    }
}

Game.propTypes = {
    flags: React.PropTypes.array.isRequired,
    attempts: React.PropTypes.number.isRequired
};
