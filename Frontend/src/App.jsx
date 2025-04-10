import './App.css'
import Homepage from './pages/User/homepage/homepage';
import Register from "./pages/User/Register/register"; 
import Otp from "./pages/User/otp/otp";
import Login from "./pages/User/Login/Login"
import Logout from "./pages/User/Logout/logout"
import Profile from "./pages/User/Profile/profile"
import { Routes, Route } from "react-router-dom";
import AdminLogin from './pages/Dashboard/AdminLogin/AdminLogin';
import AdminHomePage from './pages/Dashboard/AdminHomePage/AdminHomePage';
import ManageUser from './pages/Dashboard/ManageUser/ManageUser';
import Category from './pages/Dashboard/category/category';
import ProductDescription from "./pages/User/productDescription/productDescriptionPage"; // 👈 make sure this is imported
import AddToCart from './pages/User/addToCart/addToCart';
import AboutPage from './pages/User/aboutpage/aboutPage';
import ContactPage from './pages/User/concatPage/concatPage';
import AddPassengerDetails from './pages/User/addPassengerDetails/addPassengerDetails';
import BillingPage from './pages/User/billingDetails/BillingPage';
import PaymentPage from './pages/User/paymentGateway.jsx/PaymentPage';
import BookingMessageMail from './pages/User/bookingMessageMail/bookingMessageMail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/AdminLogin" element={<AdminLogin/>}/>
      <Route path='/AdminHomePage' element={<AdminHomePage/>}/>
      <Route path='/admin/manage-users' element={<ManageUser/>}/>
      <Route path='/admin/category' element={<Category/>}/>
      <Route path="/product/:id" element={<ProductDescription />} />
      <Route path="/addToCart" element={<AddToCart />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/add-passenger" element={<AddPassengerDetails   />} />
      <Route path="/billing" element={<BillingPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/booking-message" element={<BookingMessageMail />} />


    </Routes>
  );
}

export default App;
