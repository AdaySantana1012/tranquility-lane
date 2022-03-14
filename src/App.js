import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Components
import Layout from "./layout/Layout";

// Views
import ProductInformation from "./views/ProductInformation/ProductInformation";
import CreaNewUser from './views/CreateNewUser/CreateNewUser';
import UserProfile from './views/UserProfile/UserProfile';

// Firebase
import { AuthProvider } from "./firebase/firebase";

function App() {
  return (
    <>
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}> 
                    <Route index element={<ProductInformation />}/>
                    <Route path="/nuevo-cliente" element={<CreaNewUser />} />
                    <Route path="/profile" element={<UserProfile/>} />
                </Route>
            </Routes>
        </Router>
    </AuthProvider>
  </>
  );
}

export default App;
