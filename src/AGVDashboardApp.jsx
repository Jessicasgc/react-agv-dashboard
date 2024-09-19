import React from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import DashboardPage from "./pages/DashboardPage";
import E404Pages from "./pages/E404Pages";
import { LocaleProvider } from "./contexts/LocaleContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import NavSlide from "./components/NavSlide";
import ItemsPage from "./pages/ItemsPage";
import TaskPage from "./pages/TaskPage";
import AddTaskButton from "./components/Task/AddTaskButton";
import WaitingTaskButton from "./components/Task/WaitingTaskButton";
import { Layout } from "antd";
import { getUserLogged, putAccessToken, logout} from '../src/utils/crud_api';
import LoginPage from '../src/pages/LoginPage';
import { FaUser } from "react-icons/fa";
import { ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import LogoutButton from "./components/User/LogoutButton";
import NavSlideOperator from "./components/NavSlideOperator";
import StationsPage from "./pages/StationsPage";
import UsersPage from "./pages/UsersPage";
import useWaitingTasks from "./custom_hooks/GET_HOOKS/Tasks/useWaitingTasks";
import AdminProfilePage from "./pages/AdminProfilePage";
import OperatorProfilePage from "./pages/OperatorProfilePage";

const { Header, Footer} = Layout;
// import { Content, Footer } from 'antd/es/layout/layout';

const JustDashboardButtons = () => {
  const { tasks, setTasks, fetchWaitingTasks } = useWaitingTasks();
  const location = useLocation();

  // Determine whether to show buttons based on location
  const showButtons = location.pathname === "/";
//   const handleAddTask = (newTask) => {
//     setTasks((prevTasks) => [...prevTasks, newTask]);
// };
  return (
    <div className="just-dashboard-button">
      {showButtons && (
        <>
            <AddTaskButton onAddTask={fetchWaitingTasks} />
            <WaitingTaskButton tasks={tasks} setTasks={setTasks} />
        </>
      )}
    </div>
  );
};


class AGVDashboardApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: null,
      initializing: true,
      isDrawerOpen: false,
      theme: localStorage.getItem("theme") || "light",
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "light" ? "dark" : "light";
          localStorage.setItem("theme", newTheme);
          return {
            theme: newTheme,
          };
        });
      },
      localeContext: {
        locale: localStorage.getItem("locale") || "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  componentDidUpdate(prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  async onLoginSuccess({ access_token }) {
    putAccessToken(access_token);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  async onLogout(){
    await logout();
    this.setState(() => {
      return {
        authedUser: null,
      };
    });

    putAccessToken('');
  }
  
  render() {
    if (this.state.initializing) {
      return null;
    }
    
    if(this.state.authedUser === null){
    return (
      <ThemeProvider value={this.state}>
        <LocaleProvider value={this.state.localeContext}>
          <Layout style={{minHeight:"100%"}}>
            <Header className="headerStyle">
              <h1 className="dash-name" style={{paddingLeft: 150}} >
                {this.state.localeContext.locale === "id"
                  ? "Dasbor AGV"
                  : "AGV Dashboard"}
              </h1>
              <Navigation />
            </Header>
              <Layout  style={{backgroundColor: 'var(--body)', minHeight: "100%"}}>
                <ToastContainer />
                <Routes>
                  <Route path='/*' element={<LoginPage loginSuccess={this.onLoginSuccess}/>} />
                </Routes>
              </Layout>
            
            <Footer>
              {/* <p> */}
                AGV Dashboard ©{new Date().getFullYear()} All Rights Reserved
              {/* </p> */}
            </Footer>
          </Layout>
        </LocaleProvider>
      </ThemeProvider>
    )}
    // {console.log(this.state.authedUser)}
   
    if(this.state.authedUser.role === 'operator'){
    return (
      <ThemeProvider value={this.state}>
        <LocaleProvider value={this.state.localeContext}>
          <Layout style={{minHeight:"100%"}}>
            <Header className="headerStyle">
              <NavSlideOperator/>

            <h1 className="dash-name">
              {this.state.localeContext.locale === "id"
                ? "Dasbor AGV"
                : "AGV Dashboard"}
            </h1>
            <div className="header-icons">
                <Link to='/profile'><FaUser/></Link>
            </div>
                <LogoutButton logout={this.onLogout} name={this.state.authedUser.name}/>
                <Navigation />
                <JustDashboardButtons />
            </Header>
              <Layout  style={{backgroundColor: 'var(--body)', minHeight: "100%"}}>
              <ToastContainer />
                <Routes>
                  <Route path='/' element={
                      <DashboardPage isDrawerOpen={this.state.isDrawerOpen} />}
                  />
                  <Route path='/item' element={<ItemsPage />} />
                  <Route path='/task' element={<TaskPage />} />
                  <Route path='/profile' element={<OperatorProfilePage/>} />
                  <Route path='*' element={<E404Pages />} />

                </Routes>
              </Layout>
            
            <Footer>
              {/* <p> */}
                AGV Dashboard ©{new Date().getFullYear()} All Rights Reserved
              {/* </p> */}
            </Footer>
          </Layout>
        </LocaleProvider>
      </ThemeProvider>
    );
  } else if (this.state.authedUser.role === 'admin'){
    return (
      <ThemeProvider value={this.state}>
        <LocaleProvider value={this.state.localeContext}>
            <Layout style={{minHeight:"100%"}}>
              <Header className="headerStyle">
              <NavSlide/>
            
              <h1 className="dash-name" style={{paddingLeft: 150}} >
                {this.state.localeContext.locale === "id"
                  ? "Dasbor AGV"
                  : "AGV Dashboard"}
              </h1>
              <div className="header-icons">
                <Link to='/profile'><FaUser/></Link>
              </div>
                <LogoutButton logout={this.onLogout} name={this.state.authedUser.name}/>
                <Navigation />
                <JustDashboardButtons />
              </Header>
                <Layout  style={{backgroundColor: 'var(--body)', minHeight: "100%"}}>
                <ToastContainer />
                  <Routes>
                    <Route path="/" element={
                        <DashboardPage isDrawerOpen={this.state.isDrawerOpen} />}
                    />
                    <Route path="/item" element={<ItemsPage />} />
                    <Route path="/task" element={<TaskPage />} />
                    <Route path="/station" element={<StationsPage/>}/>
                    <Route path="/user" element={<UsersPage/>}/>
                    <Route path='/profile' element={<AdminProfilePage/>} />
                    <Route path="*" element={<E404Pages />} />
                  </Routes>
                </Layout>
              
              <Footer>
                {/* <p> */}
                  AGV Dashboard ©{new Date().getFullYear()} All Rights Reserved
                {/* </p> */}
              </Footer>
            </Layout>
        </LocaleProvider>
      </ThemeProvider>
    );
  } else {
      return (
        <ThemeProvider value={this.state}>
          <LocaleProvider value={this.state.localeContext}>
            <Layout style={{minHeight:"100%"}}>
              <Header className="headerStyle">
                <LogoutButton logout={this.onLogout} name={this.state.authedUser.name}/>
                <h1 className="dash-name" style={{paddingLeft: 150}} >
                  {this.state.localeContext.locale === "id"
                    ? "Dasbor AGV"
                    : "AGV Dashboard"}
                </h1>
                <Navigation />
                <JustDashboardButtons />
              </Header>
                <Layout  style={{backgroundColor: 'var(--body)', minHeight: "100%"}}>
                <ToastContainer />
                  <Route path="/" element={<p>No access for this role</p>}/>
                </Layout>
              
              <Footer>
                {/* <p> */}
                  AGV Dashboard ©{new Date().getFullYear()} All Rights Reserved
                {/* </p> */}
              </Footer>
            </Layout>
          </LocaleProvider>
        </ThemeProvider>
      );
    }
  }
}

export default AGVDashboardApp;
