import React from 'react';
import './SearchBar.css';
// import { MDBIcon } from "mdbreact";

class SearchBar extends React.Component {
    state = { val: '' }

    onInputChange = (event) => {
        this.setState({ val: event.target.value })
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.userSubmit(this.state.val);
    }

    render() {
        return (
                <div className="div-for-border">
                    <form onSubmit={this.onFormSubmit}>
                        <div class="input-field">
                            <input
                                className="inputStyle"
                                type="search"
                                value={this.state.val}
                                onChange={this.onInputChange}
                                placeholder="Search..."
                            />
                        </div>
                    </form>
                </div>
        )
    }
}

export default SearchBar;