import React, { FC } from "react";
import Header from "./Header";
import Main from "@c/Main";
import Footer from "./Footer";
import GlobalModal from "./common/Modal";
import Notice from "./common/Notice";
import "@/styles/App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";

const App: FC = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Main} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </main>
      <Footer />
      <GlobalModal />
      <Notice />
    </div>
  );
};

export default App;
