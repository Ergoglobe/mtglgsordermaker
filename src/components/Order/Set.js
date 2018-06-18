import React, {Component} from 'react';

import _ from 'lodash';


class Set extends Component {

    constructor(props) {
        super(props);

        this.state = {

            OrderData: this.props.OrderData,
            SetName: this.props.SetName,
            CardsInSet: [],

        };

        this.populateCardsInSet = this.populateCardsInSet.bind(this);

        this.populateCardsInSet();
    }

    populateCardsInSet() {

        this.state.OrderData.forEach((order) => {

            // console.log(this.state.SetName.toUpperCase());

            // console.log(order);
            // console.log(order.card);

            // console.log(_.indexOf(order.card.printings, this.state.SetName.toUpperCase()) > -1);

            if (_.indexOf(order.card.printings, this.state.SetName) !== -1) {

                this.setState({
                    CardsInSet: this.state.CardsInSet.push(order),
                });

            }
        })

    }

    render() {

        return (
            <div>

                <h1>{this.state.SetName} -- {this.state.CardsInSet.length + ' Cards'}</h1>

                <div>

                    {!_.isEmpty(this.state.CardsInSet) ?
                        (this.state.CardsInSet.map((order) => {
                            return (
                                <div key={order.name}>
                                    {order.requested + ' ' + order.card.name + ' - ' + order.card.colorIdentity}
                                </div>
                            )
                        }))
                        : ''}

                </div>


            </div>
        );
    }
}

export default Set;