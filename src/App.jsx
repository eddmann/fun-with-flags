import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.jsx';

window.initFunWithFlags = (flags, attempts, output) => {
    ReactDOM.render(<Game flags={flags} attempts={attempts} />, output);
};
