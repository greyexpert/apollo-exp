import { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

class App extends Component {
  state = {
    c: 0,
  };

  render() {
    return (
      <div>
        <FlatButton label="Default" onClick={() => this.setState({c: this.state.c + 1})}/>
        :
        {this.state.c}
      </div>
    );
  }
}

export default App;