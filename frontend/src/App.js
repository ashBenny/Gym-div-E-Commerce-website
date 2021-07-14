import {BrowserRouter as Router,Route} from  'react-router-dom';
import {useEffect,useState} from 'react';
import axios from 'axios';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtuctedRoute  from './components/route/ProtuctedRoute';
import Home  from './components/Home';
import ProductDetails  from './components/products/ProductDetails';

// auth
import Register  from './components/user/Register';
import Login  from './components/user/Login';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';


// cart
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrders';
import Payment from './components/cart/Payment';

//Admin
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';


import {loadUser} from './actions/userActions';
import store from './store';


function App() {

  const[stripeApiKey, setStripeApiKey] = useState('');

  // to avoid changing state while refreshing page(user wont logOut)
  useEffect(() => {
    store.dispatch(loadUser());

    // stripe
    async function getStripeApikey() {
      const {data} = await axios.get('/api/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApikey();

  },[])


  return (
    <Router>

    <div className="App">
     <Header />
      <div className="container container-fluid">
          < Route path="/" component ={Home} exact />
          < Route path="/search/:keyword" component ={Home}  />
          < Route path="/product/:id" component ={ProductDetails} exact />
          < Route path="/login" component ={Login} exact />
          < Route path="/register" component ={Register} exact />
          < ProtuctedRoute path="/profile" component ={Profile} exact />
          < ProtuctedRoute path="/profile/update" component ={UpdateProfile} exact />
          < ProtuctedRoute path="/password/update" component ={UpdatePassword} exact />
          < Route path="/password/forgot" component ={ForgotPassword} exact />
          < Route path="/password/reset/:token" component ={NewPassword} exact />
          < Route path="/cart" component ={Cart} exact />
          < ProtuctedRoute path="/shipping" component ={Shipping}  />
          < ProtuctedRoute path="/order/confirm" component ={ConfirmOrder}  />

          {stripeApiKey && 
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtuctedRoute path="/payment" component ={Payment} />
            </Elements> 
          }
      </div>
          < ProtuctedRoute path="/dashboard" isAdmin={true} component ={Dashboard} exact />
          < ProtuctedRoute path="/admin/products" isAdmin={true} component ={ProductsList} exact />
          < ProtuctedRoute path="/admin/product" isAdmin={true} component ={NewProduct} exact />
          < ProtuctedRoute path="/admin/product/:id" isAdmin={true} component ={UpdateProduct} exact />
     <Footer />
    
    </div>
    </Router>
  );
}

export default App;
