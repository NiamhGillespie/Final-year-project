'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return (
      <p>
        Like
      </p>
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<LikeButton />, domContainer);