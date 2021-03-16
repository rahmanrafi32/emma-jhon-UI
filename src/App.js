import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import Inventory from "./Components/Inventory/Inventory";
import Login from "./Components/Login/Login";
import NothingFound from "./Components/NonthingFound/NothingFound";
import PrivateRoute from "./Components/PrivateRout/PrivateRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ReviewItems from "./Components/ReviewItems/ReviewItems";
import Shipment from "./Components/Shipment/Shipment";
import Shops from './Components/shops/Shops';

export const UserContext = createContext();

function App() {
  const [loggedUser, setLoggedUser] = useState({})
  return (
    <UserContext.Provider value = {[loggedUser, setLoggedUser]}>
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
            <PrivateRoute path='/inventory'>
              <Inventory />
            </PrivateRoute>
            <Route path='/login'>
              <Login />
            </Route>
            <PrivateRoute path='/shipment'>
              <Shipment />
            </PrivateRoute>
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
    </UserContext.Provider>
  );
}

export default App;
