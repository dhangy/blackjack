import React from 'react';
import logo from './logo.png';
import signature from './signature.gif';

export const Banner = () => {
    return (
        <div className="navbar has-background-black">
            <img src={logo} />
            <img src={signature}/> 
        </div>
    )
}