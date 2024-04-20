import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import { Flex, Layout } from "antd";
const { Header, Footer, Content } = Layout;
// import { Content, Footer } from 'antd/es/layout/layout';

const JustDashboardButtons = () => {
  const location = useLocation();

  // Determine whether to show buttons based on location
  const showButtons = location.pathname === "/";

  return (
    <div className="just-dashboard-button">
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
  constructor(props) {
    super(props);
    this.state = {
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
  }

  async componentDidMount() {
    //const { data } = await getUserLogged();
    this.setState(() => {
      return {
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

  render() {
    if (this.state.initializing) {
      return null;
    }

    return (
      <ThemeProvider value={this.state}>
        <LocaleProvider value={this.state.localeContext}>
          <div className="app-container">
            {/* <Layout className='layoutStyle'>
          <Header className='headerStyle'>Header</Header>
          <Layout>
            <Sider width="25%" className='siderStyle'>
              Sider
            </Sider>
            <Content className='contentStyle'>Content</Content>
          </Layout>
          <Footer className='footerStyle'>Footer</Footer>
        </Layout> */}
         <Flex gap="middle" wrap="wrap">
            <Layout className="layoutStyle">
              <Header className="headerStyle">
                <NavSlide
                  isDrawerOpen={this.state.isDrawerOpen}
                  setDrawerOpen={(isOpen) =>
                    this.setState({ isDrawerOpen: isOpen })
                  }
                />
                <h1 className="dash-name">
                  {this.state.localeContext.locale === "id"
                    ? "Dasbor AGV"
                    : "AGV Dashboard"}
                </h1>
                <Navigation />
                <JustDashboardButtons />
              </Header>
              <main>
                {/* <Content className="contentStyle"> */}
                  <Routes>
                    <Route path="/" element={
                        <DashboardPage isDrawerOpen={this.state.isDrawerOpen} />}
                    />
                    <Route path="/item" element={<ItemsPage />} />
                    <Route path="/task" element={<TaskPage />} />
                    <Route path="*" element={<E404Pages />} />
                  </Routes>
                {/* </Content> */}
              </main>
              <Footer className="footerStyle">
                <p>
                  AGV Dashboard ©{new Date().getFullYear()} All Rights Reserved
                </p>
              </Footer>
            </Layout>
            </Flex>
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );
  }
}

export default AGVDashboardApp;
