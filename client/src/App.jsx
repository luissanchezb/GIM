import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ResponsiveAppBar from './components/menu';
import {ThemeProvider, createTheme} from '@mui/material/styles'
import PlanList from './components/PlanList'
import ClienteList from './components/ClienteList'
import PlanForm from './components/PlanForm'
import Welcome from './components/Welcome'



const darkTheme = createTheme({
  palette: {
    mode: 'dark',

  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    {/* <div> */}

      <ResponsiveAppBar />
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<Welcome />} />
            <Route path='/planes' element={<PlanList />} />
            <Route path='/plan/new' element={<PlanForm />}  />
            {/* <Route path='/clientes' element={ <ClienteList />} /> */}
            {/* <Route path='/order/new' element={<OrderForm />}/>
            <Route path='/seller/list' element={<SellerList />}/>
            <Route path='/seller/new' element={<SellerForm />}/> */}


          </Routes>
        </BrowserRouter>

    {/* </div> */}
    
 
   </ThemeProvider>
     
  
  );
}

export default App;
