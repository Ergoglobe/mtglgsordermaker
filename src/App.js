import React, {Component} from 'react';
// import ReactTable from "react-table";
import OrderTable from "./components/OrderTable"

import AllCardsData from './AllCards-x';

import './App.css';
import 'react-table/react-table.css'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AllCards: AllCardsData,
            OrderInput: '',
            OrderData: [

                {
                    quantity: 0,
                    quantity_requested: 1,
                    name: 'Swamp',
                    sets: ['dom', 'rix', 'xln']

                }],
            OrderColumns: [
                {
                    Header: 'Name',
                    accessor: 'name'

                }
                ,
                {
                    Header: 'Cost',
                    accessor: 'cost',
                    Cell: <div> $0.00 </div>

                }
                ,
                {
                    Header: 'Quantity',
                    columns: [
                        {
                            Header: 'Total',
                            accessor: 'quantity'
                        }
                        ,
                        {
                            Header: 'Requested',
                            accessor: 'quantity_requested'
                        }]
                }
                ,
                {
                    Header: 'Sets',
                    columns: [
                        /*{

                            Header: 'dom',
                            accessor: 'sets',
                            Cell: row => (
                                <div>
                                    {
                                        row.value.includes('dom') === true ? <CardCounterComponent/> : 'False'
                                    }
                                </div>
                            )


                        }*/
                    ]
                }

            ],


        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOrderInputChange = this.handleOrderInputChange.bind(this);

        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({OrderInput: event.target.OrderInput});
    }

    // Find card info from AllCards
    createOrderFunction() {
        console.log('createOrderFunction');
        console.log('OrderInput:' + this.state.OrderInput);

        let OrderList = this.state.OrderInput.split("\n");
        console.log('OrderList:' + OrderList);

        let CurrentCard;

        for (CurrentCard of OrderList) {

            //var AllCards = this.state.AllCards;
            let cardQuantity = CurrentCard.substr(0, CurrentCard.indexOf(' '));

            // console.log('xxx:' + CurrentCard.substr(CurrentCard.indexOf(' ') + 1));

            let card = this.state.AllCards[CurrentCard.substr(CurrentCard.indexOf(' ') + 1)];

            let printings = card["printings"];

            // console.log('Card:' + card);
            // console.log('Printings:' + printings);

            console.log(cardQuantity + 'x Card Name:' + card["name"]);
            console.log('Last Printing:' + printings[printings.length - 1]);

            let lastprinting = printings[printings.length - 1];
            let tempColumns = this.state.OrderColumns;

            console.log(tempColumns);
/*
            tempColumns[3].columns.push({
                Header: lastprinting,
                accessor: 'sets',
                Cell: row => (
                    <div>
                        {
                            row.value.includes(lastprinting.toLowerCase()) === true ? <CardCounterComponent/> : 'False'
                        }
                    </div>
                )
            });

            console.log(tempColumns);

            this.setState({OrderColumns: tempColumns});

            console.log(this.state.OrderColumns);
*/
        }

        this.forceUpdate();

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
                            onChange={this.handleOrderInputChange}
                        />
                    </div>

                    <div className="Create-Order-Button">
                        <button onClick={() => {
                            this.createOrderFunction()
                        }}>
                            Create Order List
                        </button>
                    </div>
                </header>
/*
                <OrderTable
                    tabData={this.state.OrderData}
                    tabColumns={this.state.OrderColumns}
                />
*/
            </div>
        );
    }

}

class CardCounterComponent extends React.Component {
    render() {
        return (
            <div>

                <button>+</button>
                <div>0</div>
                <button>-</button>
                <CardCostComponent/>

            </div>
        )

    }
}

class CardCostComponent extends React.Component {
    render() {
        return (
            <div>
                $un,der.dev
            </div>
        )

    }
}

export default App;
