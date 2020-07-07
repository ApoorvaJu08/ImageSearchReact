import React from 'react';
import './SearchBar.css';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

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
                    {/* <label><h2>Image Search: </h2></label> */}
                    <input
                        className="inputStyle"
                        type="text"
                        value={this.state.val}
                        onChange={this.onInputChange}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                             )
                            }}
                    />
                    {/* <TextField
                        label="With normal TextField"
                        InputProps={{
                            endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                        /> */}
                </form>
            </div>
        )
    }
}

export default SearchBar;