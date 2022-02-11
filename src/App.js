import "../src/Assets/scss/index.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import Builder from "./Components/Builder/Builder";
import CheckOut from "./Components/CheckOut/CheckOut";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/builder/checkout"
            name="CheckOut Page"
            component={CheckOut}
          />
          ;
          <Route exact path="/builder" name="Build Page" component={Builder} />
          <Route exact path="/" name="Home Page" component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
