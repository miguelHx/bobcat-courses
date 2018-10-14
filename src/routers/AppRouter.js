import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import LoginPage from '../components/Pages/LoginPage';
import NavBar from '../components/NavBar/NavBar';
import NotFoundPage from '../components/Pages/NotFoundPage';
import SignUpPage from '../components/Pages/SignUpPage';
import SettingsPage from '../components/Pages/SettingsPage';
import PlanSchedulePage from '../components/Pages/PlanSchedulePage';
import SavedSchedulesPage from '../components/Pages/SavedSchedulesPage';
import withAuth from '../login/withAuth';
import { ToastContainer } from "react-toastify";

// pages: 1. PlanSchedulePage 2. SavedSchedulesPage 3. Login Page 4. Register Page
// will have authentication state in this component.  This means that when we log in, we want to update login state.
// when we logout, we want to update logout state in this 'root' component



const AppRouter = (props) => {
  const { isLoggedIn, updateLoginStatus, updateLogoutStatus } = props;
  return (
    <HashRouter >
      <div>
        <NavBar
          history={props.history}
          username={props.username}
          isLoggedIn={props.isLoggedIn}
          updateLogoutStatus={updateLogoutStatus}
        />
        <Switch>
          <Route
            path="/"
            exact={true}
            component={(props) => {
              return (
                <PlanSchedulePage
                  isLoggedIn={isLoggedIn} // will use to toggle save schedules button
                  {...props} // props from react router.
                />
              );
            }}
          />
          <Route
            path="/saved-schedules"
            exact={true}
            component={(props) => {
              return (
                <SavedSchedulesPage
                  isLoggedIn={isLoggedIn} // will use to toggle save schedules button
                  {...props} // props from react router.
                />
              );
            }}
          />
          <Route
            path="/login"
            exact={true}
            component={(props) => {
              return (
                <LoginPage
                  isLoggedIn={isLoggedIn} // custom props
                  updateLoginStatus={updateLoginStatus}
                  {...props} // props from react router.
                />
              );
            }}
          />
          <Route
            path="/signup"
            exact={true}
            component={(props) => {
              return (
                <SignUpPage
                  isLoggedIn={isLoggedIn} // will use to toggle save schedules button
                  updateLoginStatus={updateLoginStatus}
                  {...props} // props from react router.
                />
              );
            }}
          />
          {/* Settings page requires login. */}
          <Route
            path="/settings"
            exact={true}
            component={(props) => {
              return (
                <SettingsPage
                  isLoggedIn={isLoggedIn} // will use to toggle save schedules button
                  {...props} // props from react router.
                />
              );
            }}
          />
          <Route component={NotFoundPage} />
        </Switch>
        <ToastContainer autoClose={3500}/>
      </div>
    </HashRouter>
  );
};

export default withAuth(AppRouter);
