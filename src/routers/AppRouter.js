import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
import PlanSchedulePage from '../components/PlanSchedulePage';
import SavedSchedulesPage from '../components/SavedSchedulesPage';
import NotFoundPage from '../components/NotFoundPage';

// pages: 1. PlanSchedulePage 2. SavedSchedulesPage 3. Login Page 4. Register Page

const AppRouter = () => {
  return (
    <HashRouter >
      <div>
        <Header />
        <Switch>
          <Route path="/" component={PlanSchedulePage} exact={true} />
          <Route path="/saved-schedules" component={SavedSchedulesPage} exact={true} />
          <Route path="/login" component={LoginPage} exact={true} />
          <Route path="/sign-up" component={SignUpPage} exact={true} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default AppRouter;
