// count - setup default prop value to 0

class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    console.log('fetching data...');
    const countStr = localStorage.getItem('count');
    const retrievedCount = parseInt(countStr, 10);
    if (isNaN(retrievedCount)) {
      return;
    }
    // load to current state
    this.setState(() => ({ count: retrievedCount }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      localStorage.setItem('count', this.state.count);
      console.log('saving data');
    }

  }


  handleAddOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      };
    });
  }
  handleMinusOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count - 1
      };
    });
  }
  handleReset() {
    this.setState(() => {
      return {
        count: 0
      };
    });
  }
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <h2>Name: {this.state.name}</h2>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}



ReactDOM.render(<Counter count={100}/>, document.getElementById('app'));
















//
// let count = 0;
// const addOne = () => {
//   count++;
//   console.log('add one', count);
//   renderCounterApp();
// };
// const minusOne = () => {
//   count--;
//   console.log('minus one');
//   renderCounterApp();
// };
// const reset = () => {
//   count = 0;
//   console.log('reset');
//   renderCounterApp();
// };
//
// const renderCounterApp = () => {
//   const templateTwo = (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={addOne}>+1</button>
//       <button onClick={minusOne}>-1</button>
//       <button onClick={reset}>reset</button>
//     </div>
//   );
//   ReactDOM.render(templateTwo, appRoot);
// }
//
// renderCounterApp();
