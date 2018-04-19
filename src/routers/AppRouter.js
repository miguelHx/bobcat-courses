import React from 'react';
import { HashRouter, hashHistory, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import PlanSchedulePage from '../components/PlanSchedulePage';
import NotFoundPage from '../components/NotFoundPage';

// three main pages: 1. PlanSchedulePage 2. SavedSchedulesPage 3. Login Page

const AppRouter = () => {
  return (
    <HashRouter >
      <div>
        <Header />
        <Switch>
          <Route path="/" component={PlanSchedulePage} exact={true} />
          {/* <Route path="/saved-schedules" component={SavedSchedulesPage} exact={true} /> */}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default AppRouter;
