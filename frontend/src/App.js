import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {AuthProvider} from './AuthContext'
//first import
import { HomePages } from './Pages/HomePages';
import { LoginPages } from './Pages/LoginPages';
import { RegisterPages } from './Pages/RegisterPages';
import { DasbordPages } from './Pages/DasbordPages';
import { NotFound } from './Pages/NotFoundPages';
import { AddPost } from './Pages/AddPost';
import { ListPosts } from './Pages/ListPosts';
import {ReadBlogPages} from './Pages/ReadBlog';
import {UpdateBlogPages} from './Pages/UpdateBlog';
import { ReadBlogHome } from './Pages/ReadBlogHome';


function App() {
  return (
   <div>
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<HomePages />}></Route>
        <Route path='/login' element={<LoginPages />}></Route>
        <Route path='/register' element={<RegisterPages />}></Route>
        <Route path='/readblog/:id' element={<ReadBlogHome />}></Route>
        <Route path='/dasbord/:Username' element={<DasbordPages />}></Route>
        <Route path='/addpost/:Username' element={<AddPost />}></Route>
        <Route path='/listposts/:Username' element={<ListPosts />}></Route>
        <Route path='/readblog/:Username/:id' element={<ReadBlogPages/>}></Route>
        <Route path='/updateblog/:Username/:id' element={<UpdateBlogPages />}></Route>
        {/* pembatasan */}
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      </AuthProvider>
    </Router>
   </div>
  );
}

export default App;
