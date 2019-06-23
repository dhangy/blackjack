import React, { Fragment } from 'react';

export const Wins = (props) => {
    return (
        <Fragment>
            <p>Player Wins: { props.playerWins }</p>
            <p>Dealer Wins: { props.dealerWins }</p>
        </Fragment>
    );
}