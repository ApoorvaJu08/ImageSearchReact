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
            <div>
                <form onSubmit={this.onFormSubmit}  className="flexContainer">
                    <input
                        className="inputStyle"
                        type="text"
                        value={this.state.val}
                        onChange={this.onInputChange}
                        placeholder="Search..."
                    />
                    {/* <MDBIcon icon="search" /> */}
                </form>
            </div>
        )
    }
}

export default SearchBar;