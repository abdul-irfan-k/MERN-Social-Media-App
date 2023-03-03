import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from './State/Reducer/UserReducer'

import Homepage from './page/homepage'
import Addpostpage from './page/Addpostpage'
import Searchpage from './page/Searchpage'
import Editpost from './page/Editpostpage'
import Viewpostpage from './page/Viewpostpage'
import Signuppage from './page/Signuppage'
import Loginpage from './page/Loginpage'
import Edituserpage from './page/Edituserpage'
import ProfilePage from './page/ProfilePage'
import Otheruserprofilepage from './page/Otheruserprofilepage'
import Resetpasswordpage from './page/Resetpasswordpage'
import Pagenotfound from './page/Pagenotfound'
import './index.css'

function App() {
  let firstRender = true
  const dispatch = useDispatch()
  const userloged = useSelector(state => state.user.userloged)  // it helps render when user is logouted 

  useEffect(() => {
    firstRender = false
  }, [])

  if (firstRender) dispatch(getCurrentUser())

  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Homepage />} />
            <Route path='/addpost' element={<Addpostpage />} />
            <Route path='/search' element={<Searchpage />} />
            <Route path='/editpost/:id' element={<Editpost />} />
            <Route path='/viewpost/:id' element={<Viewpostpage />} />

            <Route path='/signup' element={<Signuppage />} />
            <Route path='/login' element={<Loginpage />} />
            <Route path='/edituser' element={<Edituserpage />} />
            <Route path='/profile' index element={<ProfilePage />} />
            <Route path='/profilepage/:id' index element={<Otheruserprofilepage />} />
            <Route path='/resetpassword' element={<Resetpasswordpage />} />
            <Route path='*' element={<Pagenotfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
