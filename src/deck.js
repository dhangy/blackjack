
export const buildDeck = () => {
    let suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
    let values = ["Ace", "King", "Queen", "Jack",
     "Ten", "Nine", "Eight", "Seven", "Six",
      "Five", "Four", "Three", "Two"
    ]
    let deck = [];
    for (let i=0; i < suits.length; i++ ){
        for(let j=0; j<values.length; j++){
        let card = `${values[j]} of ${suits[i]}`;
        deck.push(card);
        }
    }  
    let j = 0;
    let temp;
    for(let i = deck.length-1; i > 0; i --){
        j = Math.trunc(Math.random() *(i+1));
        temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}