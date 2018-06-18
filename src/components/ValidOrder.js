import React, {Component} from 'react';

class ValidOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            OrderValid: this.props.OrderValid,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({OrderValid: nextProps.OrderValid});
    }

    render() {

        console.log('ValidOrder.js ' + this.state.OrderValid);

        return (
            <div>
                {this.state.OrderValid ? 'Order Valid' : 'Order Not Valid'}
            </div>
        );
    }
}

export default ValidOrder;