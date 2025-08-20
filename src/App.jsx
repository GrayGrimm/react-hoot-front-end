import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import HootList from './components/HootList/HootList'
import HootForm from './components/HootForm/HootForm'


import { UserContext } from './contexts/UserContext';

import * as hootService from './services/hootService';
import HootDetails from './components/HootDetails/HootDetails';

const App = () => {
  const { user } = useContext(UserContext);

  const [hoots, setHoots] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();

      // update to set state:
      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);

  const handeAddHoot = async (hootFormData) => {
    console.log('hootFormData', hootFormData);
    navigate('/hoots');
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/hoots' element={<HootList hoots={hoots} />} />
            <Route 
            path='/hoots/:hootId'
            element={ <HootDetails />}
            />
            <Route path='/hoots/new' element={ <HootForm handeAddHoot={handeAddHoot}/> } />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}

      </Routes>
    </>
  );
};

export default App;
