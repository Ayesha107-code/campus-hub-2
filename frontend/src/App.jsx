import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Event from './Pages/Event'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import CreateEvent from './Pages/CreateEvent'
import EditEvent from './Pages/EditEvent'
import EventDetails from './Pages/EventDetails'
import  Dashboard  from './Pages/Dashboard'
import MyRegistrations from './Pages/MyRegistrations'
import Notifications from './Pages/Notifications'
import Footer from './Components/Footer'
import {BrowserRouter , Route , Routes} from 'react-router-dom'


const App = () => {
  return (
     <>
     <BrowserRouter>

     <Navbar/>

     <Routes>
      <Route path = "/" element={<Home/>} />
      <Route path = "/events" element={<Event/>} />
      <Route path = "/login" element={<Login/>} />
      <Route path = "/dashboard" element={<Dashboard/>} />
      <Route path = "/createEvent" element={<CreateEvent/>} />
      <Route path = "/events/:id/edit" element={<EditEvent/>} />
      <Route path = "/my-registrations" element={<MyRegistrations/>} />
      <Route path = "/notifications" element={<Notifications/>} />
      <Route path = "/events/:id" element={<EventDetails />} />
      <Route path = "/signup" element={<Signup/>} />
      
      
      </Routes>
      <Footer/>
      
      </BrowserRouter>
     

     </>
     
  )
}



export default App