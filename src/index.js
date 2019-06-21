import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Blackjack } from './blackjack.js';
import { Banner } from './banner.js';

class App extends React.Component{
    constructor(props){
        super(props);
    }
    render = () => {

        return (
            <div>
                <Banner />
                <div className="section">
                    <Blackjack />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
