import React, {Component} from 'react';
import Set from "./Set";
import SetList from '../../JSON/SetList';

import _ from 'lodash';

class Order extends Component {

    constructor(props) {
        super(props);

        this.state = {

            OrderSets: this.props.OrderSets,
            OrderData: this.props.OrderData,
            OrderValid: this.props.OrderValid,
            SetList: SetList,

        }

        // todo Sort SetList by Date ( Newest first )
    }

    render() {
        return (
            <div>

                {
                    this.props.OrderSets.map((OrderSet) => {
                            return <div key={OrderSet}><Set SetName={OrderSet} OrderData={this.state.OrderData}/></div>
                        }
                    )
                }

            </div>
        );
    }
}

export default Order;