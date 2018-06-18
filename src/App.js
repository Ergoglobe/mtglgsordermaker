import React, {Component} from 'react';

// Libraries
import _ from 'lodash';

// Card Data
import AllCardData from './JSON/AllCards-x';

// My Components
import Order from './components/Order/Order';
import ValidOrder from "./components/ValidOrder";
import YourDecklist from './components/YourDecklist';

import './App.css';
import 'react-table/react-table.css'

const tempOrderInput =
    '1 Act of Treason\n' +
    '1 Akoum Refuge\n' +
    '1 Anticipate\n' +
    '1 Ashiok, Nightmare Weaver\n' +
    '1 Blade of the Bloodchief\n' +
    '1 Blighted Fen';

class App extends Component {

    constructor(props) {
        super(props);


        this.state = {
            AllCards: AllCardData,
            OrderInput: tempOrderInput,
            OrderData: [],
            OrderSets: [],
            OrderValid: false,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOrderInputChange = this.handleOrderInputChange.bind(this);

        this.isOrderValid = this.isOrderValid.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({OrderInput: event.target.OrderInput});
    }

    isOrderValid() {
        // console.log(this.state.OrderData);

        // console.log(!_.isEmpty(this.state.OrderData));
        // console.log(_.find(this.state.OrderData, {'cardFound': false}));

        // If order is not empty AND all cards are found then order is valid
        if ((!_.isEmpty(this.state.OrderData)) &&
            (_.find(this.state.OrderData, {'cardFound': false}) === undefined)) {

            // console.log('OrderValid: true');

            this.setState({OrderValid: true}, () => {
                // console.log(this.state.OrderValid)
            });

        }

        // console.log(this.state);

    }

    // Find card info from AllCards
    addToOrder() {
        // console.log('addToOrder');
        // console.log('OrderInput:' + this.state.OrderInput);

        let OrderList = this.state.OrderInput.split("\n");
        // console.log('OrderList:' + OrderList);

        let CurrentCard;

        for (CurrentCard of OrderList) {

            //var AllCards = this.state.AllCards;
            let cardQuantity = CurrentCard.substr(0, CurrentCard.indexOf(' '));

            // test if cardQuantity is \d+ or \d+x else make user change quantity

            // console.log('Card Entered:' + CurrentCard.substr(CurrentCard.indexOf(' ') + 1));
            let cardname = CurrentCard.substr(CurrentCard.indexOf(' ') + 1);

            // let card = this.state.AllCards[];
            let card = this.state.AllCards[cardname];

            // If Card is not found in AllCards
            if (card === undefined) {
                // console.log('Card not found');

                let cardFoundIndex = _.findIndex(this.state.OrderData, function (o) {
                    return o.name === cardname
                });

                let tempOrderData = this.state.OrderData;

                // If card is already in order, increase quantity
                if (cardFoundIndex !== -1) {
                    // console.log('Card Already In Order');

                    let tempOrderData = this.state.OrderData;
                    tempOrderData[cardFoundIndex].requested += parseInt(cardQuantity, 10);

                }
                else {

                    tempOrderData.push(
                        {
                            quantity: 0,
                            requested: parseInt(cardQuantity, 10),
                            cardFound: false,
                            card: card,
                            name: cardname,
                        }
                    );
                }

                // Update State of order
                this.setState({OrderData: tempOrderData});
                // Card match found
            } else {

                // console.log('Card found');
                // console.log(card);

                // console.log(cardQuantity + 'x ' + card["name"]);

                // Check if card already exists in order and increase quantity

                let cardFoundIndex = _.findIndex(this.state.OrderData, function (o) {
                    return o.name === card["name"]
                });

                // If card is already in order, increase quantity
                if (cardFoundIndex !== -1) {
                    // console.log('Card Already In Order');

                    // Add quantity and card to order data
                    let tempOrderData = this.state.OrderData;

                    tempOrderData[cardFoundIndex].requested += parseInt(cardQuantity, 10);

                    // Update State of order
                    this.setState({OrderData: tempOrderData});

                }
                // Else add card
                else {

                    let printings = card["printings"];

                    // console.log('Card:' + card);
                    // console.log('Printings:' + printings);

                    // console.log('Last Printing:' + printings[printings.length - 1]);

                    // let lastprinting = printings[printings.length - 1].toLowerCase();

                    let tempOrderSets = this.state.OrderSets;

                    // console.log(tempOrderSets);
                    // console.log(lastprinting);

                    // console.log( array.findIndex( tempOrderSets, lastprinting ) );

                    // If lastprinting isnt in tempOrderSets

                    printings.forEach((printing) => {
                        if (_.indexOf(tempOrderSets, printing) === -1) {
                            // console.log('is not in OrderSets.');
                            // Push it to the array
                            tempOrderSets.push(printing);

                            // Set state
                            this.setState({OrderSets: tempOrderSets});
                        }
                    });

                    /*
                    if (_.indexOf(tempOrderSets, lastprinting) === -1) {
                        // console.log('is not in OrderSets.');
                        // Push it to the array
                        tempOrderSets.push(lastprinting);

                        // Set state
                        this.setState({OrderSets: tempOrderSets});
                    }
                    */

                    console.log(card);

                    // Add quantity and card to order data
                    let tempOrderData = this.state.OrderData;
                    tempOrderData.push(
                        {
                            quantity: 0,
                            requested: parseInt(cardQuantity, 10),
                            cardFound: true,
                            card: card,
                            name: card["name"],
                        }
                    );

                    // Update State of order
                    this.setState({OrderData: tempOrderData});
                }

                // console.log('this.state.OrderSets');
                // console.log(this.state.OrderSets);
            }

        }

        // update order validity
        this.isOrderValid();

    }

    handleOrderInputChange(event) {
        this.setState({OrderInput: event.target.value});
    }

    componentDidUpdate() {
        // console.log('Index componentDidUpdate()');
    }

    render() {

        return (
            <div className="App">

                <header className="App-header">
                    <h1 className="App-title">MTG LGS Order Maker</h1>

                    <div className="App-intro">
                        Paste your order below.
                    </div>

                    <div className="Import-Deck-List">
                        <textarea
                            placeholder={'Paste your decklist here!'}
                            value={this.state.OrderInput}
                            onChange={this.handleOrderInputChange}>

                        </textarea>
                    </div>

                    <div className="Create-Order-Button">
                        <button onClick={() => {
                            this.addToOrder()
                        }}>
                            Add To Order
                        </button>
                    </div>
                </header>

                <YourDecklist OrderData={this.state.OrderData}/>

                <ValidOrder OrderValid={this.state.OrderValid}/>

                <Order OrderSets={this.state.OrderSets}
                       OrderData={this.state.OrderData}
                       OrderValid={this.state.OrderValid}/>

            </div>
        );
    }

}

export default App;
