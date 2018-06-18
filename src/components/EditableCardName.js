import React, {Component} from 'react';

import Autocomplete from 'react-autocomplete';

class EditableCardName extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.name,
            cardslist: [],
        };

        this.getScryfallSuggestions = this.getScryfallSuggestions.bind(this);

    }

    getScryfallSuggestions(value) {

        if (value.length > 3) {

            fetch("https://api.scryfall.com/cards/autocomplete?q=" + value)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result.data);

                        this.setState({cardslist: result.data});
                        // return result.data;
                    });

        }

    }

    componentDidMount() {
        this.getScryfallSuggestions(this.state.value);
    }

    render() {

        return (

            <div>
                <Autocomplete
                    inputProps={{id: 'cards-autocomplete'}}
                    wrapperStyle={{position: 'relative', display: 'inline-block'}}
                    value={this.state.value}
                    items={this.state.cardslist}
                    // getItemValue={(item) => item.name}
                    getItemValue={(item) => item}
                    onSelect={(value, item) => {
                        // set the menu to only the selected item
                        this.setState({value, cardslist: [item]})
                        // or you could reset it to a default list again
                        // this.setState({ unitedStates: getStates() })
                    }}

                    onChange={(event, value) => {
                        this.setState({value});
                        // clearTimeout(this.requestTimer);
                        this.getScryfallSuggestions(value);
                    }}


                    renderMenu={children => (
                        <div className="menu" children={children}>

                        </div>
                    )}

                    renderItem={(item, isHighlighted) => (
                        <div
                            key={item}
                            style={{background: isHighlighted ? 'lightgray' : 'white'}}
                        >
                            {item}
                        </div>
                    )}
                />
            </div>

        );
    }
}

export default EditableCardName;