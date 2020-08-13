import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Component
import NavBar from './components/layout/NavBar';
import Home from './pages/home/Home';
import Contact from './pages/home/Contact';

// style
import './App.css';
import themeStyles from './utils/theme';

const theme = createMuiTheme(themeStyles);
function App() {
  return (
    <div className='App'>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter basename='/code-playground'>
          <NavBar />
          <Container maxWidth='xl' className='main-container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/contact' component={Contact} />
            </Switch>
          </Container>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
