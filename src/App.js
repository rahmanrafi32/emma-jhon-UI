import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import NothingFound from "./Components/NonthingFound/NothingFound";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ReviewItems from "./Components/ReviewItems/ReviewItems";
import Shops from './Components/shops/Shops';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
          <Switch>
            <Route path ='/shop'>
              <Shops />
            </Route>
            <Route path='/order'>
              <ReviewItems />
            </Route>
            <Route path='/review'>
              <ReviewItems />
            </Route>
            <Route exact path='/'>
              <Shops />
            </Route>
            <Route path='/product/:prodkey'>
              <ProductDetails />
            </Route>
            <Route path='*'>
              <NothingFound />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
