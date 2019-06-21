import React from 'react';

export const Hit = (props) => {
    return <button className="button" onClick={props.click}>Hit!</button>
}

export const Stay = (props) => {
    return <button className="button"onClick={props.click}>Stay!</button>
}

export const Start = (props) => {
    return (
        <div>
        <button className="button" onClick={props.click}>{props.label}</button>
        </div>
    )
}

export const Redeal = (props) => {
    return <button className="button" onClick={props.click}>Re-Deal!</button>
}