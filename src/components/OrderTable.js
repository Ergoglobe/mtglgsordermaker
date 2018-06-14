import React, {Component} from 'react';
import ReactTable from "react-table";

class OrderTable extends Component {
    render() {
        return (
            <div>
                <ReactTable

                    data={this.props.tabData}
                    columns={this.props.tabColumns}

                />
            </div>
        );
    }
}

export default OrderTable;