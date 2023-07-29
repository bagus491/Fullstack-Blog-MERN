import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {AuthProvider} from './AuthContext'
//first import
import { HomePages } from './Pages/HomePages';
import { LoginPages } from './Pages/LoginPages';
import { RegisterPages } from './Pages/RegisterPages';
import { DasbordPages } from './Pages/DasbordPages';
import { NotFound } from './Pages/NotFoundPages';

function App() {
  return (
   <div>
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<HomePages />}></Route>
        <Route path='/login' element={<LoginPages />}></Route>
        <Route path='/register' element={<RegisterPages />}></Route>
        <Route path='/dasbord/:Username' element={<DasbordPages />}></Route>
        {/* pembatasan */}
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      </AuthProvider>
    </Router>
   </div>
  );
}

export default App;
