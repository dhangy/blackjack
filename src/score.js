import React, { Fragment } from 'react';

export const Score = (props) => {
    //let playerHand = props.player;
    const { playerCards, dealerCards, playerScore, dealerScore } = props;
    let playerDisplay = playerCards.map((card, index) => <li key={ index } className="is-size-3">{ card }</li>);
    let dealerDisplay = dealerCards.map((card,index) => <li key={ index } className="is-size-3">{ card }</li>)

    return (
        <div className="tile is-parent">
            <article className="tile is-child notification is-4">
                <ul className="is-child box">
                <li className="is-size-2">Player Hand:</li>
                <li className="is-size-3">Player Score: { playerScore }</li>
                { playerDisplay }
                </ul>
            </article>
            <article className="tile is-child notification is-4">
                <ul className="is-child box">
                    <li className="is-size-2">Dealer Hand:</li>
                    <li className="is-size-3">Dealer Score: { dealerScore }</li>
                    { dealerDisplay }
                </ul>
           </article>
        </div>
    )
}