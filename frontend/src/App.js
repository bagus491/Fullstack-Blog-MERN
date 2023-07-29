import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

//first import
import { HomePages } from './Pages/HomePages';
import { LoginPages } from './Pages/LoginPages';
import { RegisterPages } from './Pages/RegisterPages';
import { NotFound } from './Pages/NotFoundPages';

function App() {
  return (
   <div>
    <Router>
      <Routes>
        <Route path='/' element={<HomePages />}></Route>
        <Route path='/login' element={<LoginPages />}></Route>
        <Route path='/register' element={<RegisterPages />}></Route>

        {/* pembatasan */}
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
