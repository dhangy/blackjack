import React, { Fragment } from 'react';

export const Score = (props) => {
    //let playerHand = props.player;
    const { playerCards, dealerCards, playerScore, dealerScore } = props;
    let playerDisplay = playerCards.map((card, index) => <li key={ index }>{ card }</li>);
    let dealerDisplay = dealerCards.map((card,index) => <li key={ index }>{ card }</li>)

    return (
        <Fragment>
           <ul>
               <li>Player Hand:</li>
                { playerDisplay }
                <li>Player Score: { playerScore }</li>
           </ul>
           <ul>
               <li>Dealer Hand:</li>
                { dealerDisplay }
                <li>Dealer Score: { dealerScore }</li>
           </ul>
        </Fragment>
    )
}