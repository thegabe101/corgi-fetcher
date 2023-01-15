import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './components/Nav';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { CreatePost } from './pages/CreatePost';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import { RandomCorgi } from './components/RandomCorgi';


function App() {
const client = new QueryClient({});

  return (
    <div className="App">
      <QueryClientProvider client={client}>
      <Router>
        <NavigationBar/>
        {/* <RandomCorgi/> */}
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/createpost' element={<CreatePost/>}></Route>
        </Routes>
      </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
