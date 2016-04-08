import React from 'react';
import ReactDOM from 'react-dom';

const isBackspace = c => c === 8;
const isEnter = c => c === 13;
const isUppercase = c => !! c.match(/^[A-Z]$/);

const toPlaceholder = (value, placeholder) =>
    value === '' ? placeholder : toPlaceholder(value.substr(1), placeholder.replace('_', value.charAt(0)));

const fromPlaceholder = (value) =>
    (value.match(/[A-Z]/g) || []).join('');

const updateValue = (value, code) => {
    if (isBackspace(code)) {
        return value.substr(0, value.length - 1);
    }

    const char = String.fromCharCode(code).toUpperCase();

    return isUppercase(char) ? `${value}${char}` : value;
};

export default class AnswerBox extends React.Component {
    state = {
        answer: '',
        placeholder: '',
        length: 0,
        value: ''
    };

    componentDidMount() {
        this._reset(this.props.answer);
    }

    componentWillReceiveProps(nextProps) {
        this._reset(nextProps.answer);
    }

    _reset = (input) => {
        const answer = input.toUpperCase();
        const placeholder = answer.replace(/[^\s]/g, '_');
        const length = answer.match(/[^\s]/g).length;

        this.setState({
            answer,
            placeholder,
            length,
            value: placeholder
        });

        ReactDOM.findDOMNode(this).focus();
    };

    _onKeyUp = (e) => {
        const code = e.keyCode;

        if (isEnter(code)) {
            return this._onSubmit();
        }

        const value = updateValue(fromPlaceholder(this.state.value), code);

        if (value.length > this.state.length) {
            return;
        }

        this.setState({
            value: toPlaceholder(value, this.state.placeholder)
        });
    };

    _onSubmit = () => {
        if (this.state.value === this.state.answer) {
            this.props.onSuccess();
        } else {
            this.props.onError();
        }
    };

    render() {
        return <input className={this.props.className} type="text" onKeyUp={this._onKeyUp} value={this.state.value} />;
    }
}

AnswerBox.propTypes = {
    className: React.PropTypes.string,
    answer: React.PropTypes.string.isRequired,
    onSuccess: React.PropTypes.func.isRequired,
    onError: React.PropTypes.func.isRequired
};
