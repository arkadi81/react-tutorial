import React, { Component } from "react";

// sfc
// input: liked: boolean, onclickCustom event
// output: onClick event to be bubbled to the caller component

class Like extends Component {
  // like component. uses font-awesome filled in/empty heart markup to toggle between like and unlike state
  state = {
    //ideally this information would be piped down from props
    liked: true
  };

  handleToggle = () => {
    const state = this.state;
    state.liked = !state.liked;
    this.setState({ state });
  };

  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) {
      classes += "-o";
    }
    return (
      <i
        onClick={this.props.onClick}
        className={classes}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
