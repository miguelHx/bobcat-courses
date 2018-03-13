// Visibility Toggle - render, constructor, handleToggleVisibility
// Visibility -> false
class VisiblityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    this.state = {
      details: "here are some details!",
      showDetails: false
    }
  }

  handleToggleVisibility() {
    this.setState((prevState) => {
      return {
        showDetails: !prevState.showDetails
      };
    });
  }
  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.handleToggleVisibility}>
          {this.state.showDetails ? "Hide Details" : "Show Details"}
        </button>
        <p>{this.state.showDetails && this.state.details}</p>
      </div>
    );

  }
}


ReactDOM.render(<VisiblityToggle />, document.getElementById('app'));



//
//
//
// const appRoot = document.getElementById('app');
//
// const detailsObj = {
//   details: <p>Here are some details!!!</p>,
//   showDetails: false
// };
//
// const toggleDetails = () => {
//   if (detailsObj.showDetails) {
//     detailsObj.showDetails = false;
//   }
//   else {
//     detailsObj.showDetails = true;
//   }
//   render();
// };
//
// const render = () => {
//   const template = (
//     <div>
//       <h1>Visibility Toggle</h1>
//       <button onClick={toggleDetails}>
//         {detailsObj.showDetails ? "Hide Details" : "Show Details"}
//       </button>
//       {detailsObj.showDetails && detailsObj.details}
//     </div>
//   );
//   ReactDOM.render(template, appRoot);
// }
//
// render();
