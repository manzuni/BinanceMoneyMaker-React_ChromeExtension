import React from "react";
import HistoricFluctuation from "../components/HistoricFluctuation";
import PriceNow from "../components/PriceNow";
import CalculateFluctuationVsTime from "../components/CalculateFluctuationVsTime";
import "./App.css";

class App extends React.Component {
  state = {
    priceNow: null,
    time: null,
    percentageDiffSinceLast: null,
    previousPrice: null,
    arrayX: [],
  };
  getDataConstantly = () => {
    console.log("DOM Loaded.");

    this.interval = setInterval(() => {
      const price = document.querySelector(".contractPrice").textContent;
      if (price === this.state.priceNow) return; //return early if no changes in price

      this.setState((prevState) => {
        const timeNow = new Date();

        return {
          ...prevState,
          priceNow: price, // dual check, to make sure
          arrayX: [...prevState.arrayX, { time: timeNow, price: price }],
          previousPrice: prevState.priceNow,
          percentageDiffSinceLast: prevState.priceNow
            ? (price - prevState.priceNow).toFixed(5)
            : null,
          time: timeNow.toLocaleTimeString(),
        };
      }),
        400;
    });
  };
  componentDidMount() {
    window.addEventListener("load", () => getDataConstantly()); //
    // after DOM loaded
  }
  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad);
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="ui grid sticky my-grid">
        <div className="ui grid">
          <div className="four wide column">
            <PriceNow priceNow={this.state.priceNow} />
          </div>

          <div className="four wide column">
            <HistoricFluctuation
              time={this.state.time}
              diff={this.state.percentageDiffSinceLast}
            />

            <CalculateFluctuationVsTime data={this.state.arrayX} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// const [cryptocoins, setCryptocoins] = useState([]);

// useEffect(() => {
//   async function search() {
//     const response = await binance.get("/exchangeInfo"); // means i get the data property from the response
//     setCryptocoins(response.data.symbols);
//   }
//   search();
// }, []);

// console.log(cryptocoins);

// return (
//   <div>
//     {cryptocoins.map((cryptocoin) => (
//       <tbody>
//         <tr key={cryptocoin.symbol}>{cryptocoin.baseAsset}</tr>
//         <tr>{cryptocoin.baseAsset}</tr>
//       </tbody>
//     ))}
//   </div>
// );

// <div
//   id="39jdjsdssd"
//   className="ui grid"
//   style={{
//     position: "fixed",
//     bottom: "0px",
//     left: "0px",
//     background: "black",
//     color: "white",
//     height: "200px",
//     width: "600px",
//     opacity: "0.8",
//   }}
// >
//   <div className="ui left floated five wide column">
//     {this.state.priceNow}
//   </div>
//   <div className="ui right floated five wide column">
//     {this.state.time}, {this.state.percentageDiffSinceLast}
//   </div>
// </div>
