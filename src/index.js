import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { buildDeck } from './deck.js';
import { Hit, Stay, Start, Redeal} from './buttons.js';
import { Score } from './score.js';

class App extends React.Component{
    constructor(props){
        super(props);
        this.initialState = {
            winner: "",
            deck: [],
            playerHand: [],
            ignorePlayerAce: false,
            ignoreDealerAce: false,
            dealerHand: [],
            dealerScore: 0,
            playerScore: 0,
            gameStarted: false,
            gameOver: false,
            playerWins: 0,
            dealerWins: 0,
            playerStay: false,
        };
        this.state = this.initialState;
    }
    onStay = () => {
        this.setState({playerStay: true}, () => this.dealerLogic());
    }

    onHit = () => {
        let nextCard = this.dealCard();
        this.setState({playerHand: [...this.state.playerHand, nextCard]}, () => {
        this.evalScore();
        });   
    }

    onReDeal = () => {
        let tempPlayer = this.state.playerWins;
        let tempDealer = this.state.dealerWins;
        this.setState(this.initialState);
        this.setState({gameStarted: true, playerWins: tempPlayer, dealerWins: tempDealer}, () => this.updateDeck());
    }

    updateDeck = () => {
        let deckList = buildDeck();
        let player = [deckList.shift()];
        let dealer = [deckList.shift()];
        player.push(deckList.shift());
        dealer.push(deckList.shift());
        this.setState({
            deck: deckList,
            playerHand: player,
            dealerHand: dealer,
        }, () => {this.evalScore()});  
    }

    startGame = () => {
        this.setState({gameStarted: true},() => this.updateDeck());
    }

    dealerLogic = () => {
        let { dealerScore } = this.state;
        console.log(dealerScore);
        debugger;
        if(dealerScore < 17){
            this.dealerHit();
        }
    }

    dealerHit = () => {
        let newCard = this.dealCard();
        this.setState({dealerHand: [...this.state.dealerHand, newCard]},() => this.evalScore());
    }

    dealCard = () => {
        let { deck } = this.state;
        let nextCard = deck.shift();
        this.setState({deck: deck});
        return nextCard;
    }

    evalScore = () => {
        let { playerHand,dealerHand } = this.state
        let playerVal = playerHand.map(card => card = card.split(" ").shift());
        let dealerVal = dealerHand.map(card => card = card.split(" ").shift());
        let dealerTotal = 0;
        let playerTotal = 0;
        playerVal.forEach((val)=> playerTotal += this.evalCard(val));
        dealerVal.forEach((val)=> dealerTotal += this.evalCard(val));
        if(this.checkForAce(playerVal) && !this.state.ignorePlayerAce){
            playerTotal = this.checkForBust(playerTotal);
        }
        else if(this.checkForAce(dealerVal) && !this.state.ignoreDealerAce){
            dealerTotal = this.checkForBust(dealerTotal);
        }
        this.setState({playerScore: playerTotal, dealerScore: dealerTotal}, () => {
            this.isGameOver();
        });
        
    }
    
    isGameOver = () => {
        let { playerStay, playerScore, dealerScore} = this.state;
        if(playerStay === true || playerScore > 21 || dealerScore > 21 ){
            this.setState({gameOver: true});
            this.whoWon();
        }
    }

    whoWon = () => {
        let { playerScore, dealerScore } = this.state;
        let winner = "";
        if(playerScore < 22 && dealerScore < 22) {
            
            winner = (playerScore > dealerScore) ? "Player Wins!" : "Dealer Wins!";
        }
        else {
            if(playerScore > 21) {
                winner = "Dealer Wins!";
            }

            else {
                winner = "Player Wins!";
            }
        }
        this.setState({winner: winner});
    }

    checkForAce = (arr) => {
        if(arr.includes("Ace")){
            return true;
        }
    }

    checkForBust = (total) => {
        if(total > 21){
            total -= 9;
        }
        else {
            total += 1;
        }
        return total;
    }

    evalCard = (card) => {
        let value = 0;
        switch(card){
            case "Two":
                value = 2;
                break;
            case "Three":
                value = 3;
                break;
            case "Four":
                value = 4;
                break;
            case "Five":
                value = 5;
                break;
            case "Six":
                value = 6;
                break;
            case "Seven":
                value = 7;
                break;
            case "Eight":
                value = 8;
                break;
            case "Nine": 
                value = 9;
                break;
            default:
                value = 10;
                break;
        }
        return value;
    }

    render() {
        if(this.state.gameStarted === false){
            return (
                <div>
                    <h1>Welcome to the Blackjack Table!</h1>
                    <Start click={this.startGame} label="Start Game!" />
                </div>
                )
        }
        else if(this.state.gameOver === true){
            return (
                <div>
                    <p>Game Over!</p>
                    <p>{ this.state.winner }</p>
                    <Redeal click={ this.onReDeal } />
                    <Score
                    playerCards={ this.state.playerHand }
                    dealerCards={ this.state.dealerHand }
                    dealerScore={ this.state.dealerScore }
                    playerScore={ this.state.playerScore } 
                    />
                </div>
            )
        }
        else {
            return (
                <div>
                    <Hit click={ this.onHit }/>
                    <Stay click={ this.onStay } />
                    <Score
                    playerCards={ this.state.playerHand }
                    dealerCards={ this.state.dealerHand }
                    dealerScore={ this.state.dealerScore }
                    playerScore={ this.state.playerScore } 
                    />
                </div>
            )
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


