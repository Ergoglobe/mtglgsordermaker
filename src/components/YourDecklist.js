import React, {Component} from 'react';
import ReactTable from 'react-table';

import EditableCardName from './EditableCardName';

class YourDecklist extends Component {

    render() {

        return (
            <div>

                <h1>Your Decklist</h1>
                <h3>Keep fixing your decklist until there are no {String.fromCharCode("10006")}s.</h3>


                <ReactTable
                    defaultPageSize={10}
                    data={this.props.OrderData}
                    columns={
                        [
                            {
                                Header: 'Card Found', accessor: 'cardFound',
                                Cell: row => (
                                    <div>
                                        {
                                            row.value === true ? String.fromCharCode("10004") : String.fromCharCode("10006")
                                        }
                                    </div>
                                )
                            },
                            {
                                Header: 'Card', accessor: 'name',
                                Cell: ({row, original}) => (
                                    <div>
                                        {
                                            original.cardFound === true ? (<div>{original.name}</div>) :
                                                (<div>
                                                    <EditableCardName
                                                        name={original.name}/>
                                                </div>)
                                        }
                                    </div>
                                )
                            },
                            {
                                Header: 'Quantity', accessor: 'requested'
                            },

                        ]
                    }/>


            </div>
        );
    }
}

export default YourDecklist;