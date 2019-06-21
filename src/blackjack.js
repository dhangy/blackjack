import React from 'react';
import { buildDeck } from './deck.js';
import { Hit, Stay, Start, Redeal} from './buttons.js';
import { Score } from './score.js';

export class Blackjack extends React.Component{
    constructor(props){
        super(props);
        this.initialState = {
            winnerBanner: "",
            whoWon: "",
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
            displayWins: false,
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
        let { playerWins, dealerWins, whoWon } = this.state;
        whoWon === "player" ? playerWins++ : dealerWins++;
        this.setState(this.initialState, () => {
            this.setState({gameStarted: true, playerWins: playerWins, dealerWins: dealerWins}, () => this.updateDeck());
        });    
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
        if(dealerScore < 17){
            this.dealerHit();
        }
        else {
            this.evalScore();
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
        let who = ""
        if(playerScore < 22 && dealerScore < 22) {
            winner = (playerScore > dealerScore) ? "Player Wins!" : "Dealer Wins!";
            if(winner === "Player Wins!"){
                who = "player";
            }
            else who = "dealer";
        }
        else {
            if(playerScore > 21) {
                winner = "Dealer Wins!";
                who = "dealer"
            }

            else {
                winner = "Player Wins!";
                who = "player";
                
            }
        }
        this.setState({winnerBanner: winner, whoWon: who});
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
                <div className="container">
                    <div className="tile is-6 is-warning">
                        <h1 className="is-size-3">Welcome to the Blackjack Table!</h1>
                        <Start click={this.startGame} label="Start Game!" />
                    </div>
                </div>
                )
        }
        else if(this.state.gameOver === true){
            return (
                <div className="container">
                    <div className="notification is-warning">
                    <p>Game Over!</p>
                    <p>{ this.state.winnerBanner }</p>
                    <Redeal click={ this.onReDeal } />
                    </div>
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
                <div className="container">
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
