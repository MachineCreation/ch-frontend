import { HashRouter, Routes, Route } from 'react-router-dom';
import landing_page from './pages/landing_page';
import dashboard from './pages/dashboard';
import not_found from './components/not_found';


function App() {
  return (

      <HashRouter>
          <Routes>
            <Route path='' Component={landing_page}></Route>
            <Route path='dashboard' Component = {dashboard}></Route>
            <Route Component={not_found}></Route>
          </Routes>
      </HashRouter>

  );
}

export default App;