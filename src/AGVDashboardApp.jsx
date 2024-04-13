import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import DashboardPage from './pages/DashboardPages';
import E404Pages from './pages/E404Pages';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import NavSlide from './components/NavSlide';
import ItemsPage from './pages/ItemsPage';
import TaskPage from './pages/TaskPage';
import AddTaskButton from './components/Task/AddTaskButton';
import WaitingTaskButton from './components/Task/WaitingTaskButton';
// import { Content, Footer } from 'antd/es/layout/layout';

const JustDashboardButtons = () => {
  const location = useLocation();
  
  // Determine whether to show buttons based on location
  const showButtons = location.pathname === '/';

  return (
    <div className='just-dashboard-button'>
      {showButtons && (
        <>
          <AddTaskButton />
          <WaitingTaskButton />
        </>
      )}
    </div>
  );
};

class AGVDashboardApp extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      initializing: true,
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme
          };
        });
      },
      localeContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale
              }
            }
          })
        }
      },
    };


  }

  async componentDidMount() {
    //const { data } = await getUserLogged();
    this.setState(() => {
      return {
        initializing: false,
      };
    });
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }

  componentDidUpdate(prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }
  
  render() {
    if (this.state.initializing) {
      return null;
    }


    return(
      <ThemeProvider value={this.state}>
        <LocaleProvider value = {this.state.localeContext}>
          <div className='app-container'>
            <header>
              <h1>{this.state.localeContext.locale === 'id' ? 'Dasbor AGV' : 'AGV Dashboard'}</h1>
                <Navigation/>
                <JustDashboardButtons/>
            </header>
            <main>
              <NavSlide/>
              <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/item' element={<ItemsPage />}/>
                <Route path='/task' element={<TaskPage />} />
                <Route path='*' element={<E404Pages />} />
              </Routes>
            </main>
            <footer>
              <p>AGV Dashboard ©{new Date().getFullYear()} All Rights Reserved</p>
            </footer>
          </div>
        </LocaleProvider>
      </ThemeProvider>
    )
  }
}

export default AGVDashboardApp;
