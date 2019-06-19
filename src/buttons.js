import React from 'react';

export const Hit = (props) => {
    return <button onClick={props.click}>Hit!</button>
}

export const Stay = (props) => {
    return <button onClick={props.click}>Stay!</button>
}

export const Start = (props) => {
    return <button onClick={props.click}>{props.label}</button>
}

export const Redeal = (props) => {
    return <button onClick={props.click}>Re-Deal!</button>
}