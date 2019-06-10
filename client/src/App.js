import React from "react";
import { Route } from "react-router-dom";

// Firebase Login
import Login from "./pages/Login/Login";

// Onboarding
import Onboarding from "./pages/Onboarding/Onboarding";

// View houses all pages for /dashboard including ReportsDash (shows reports) and Dashboard (shows team)
import View from "./pages/View/View";
import ReportsDash from "./pages/Dashboard/ReportsDash";

// Stats Dashboard
import StatsDashboard from "./pages/Stats/StatsDashboard";

// Profile Page
import Profile from "./pages/Profile/Profile";

// Marketing Page
import MarketingPage from "./pages/Marketing/MarketingPage";
import DevTeam from "./pages/Marketing/DevTeam";

// Nav and Footer
import Navigation from "./pages/Navigation/Navigations";
import Footer from "./pages/Navigation/Footer";

// Slack Routes
import Slack from "./pages/Slack/Slack";
import SlackRedirect from "./pages/Slack/SlackRedirect";

//Protected Routes
import PrivateRoute from "./auth/PrivateRoute";
import NewUserRoute from "./auth/NewUserRoute";

// CSS
import "./App.css";

function App() {
  return (
    <div className = "App">


      {/* Marketing Pages*/}
      <Route exact path="/" component={MarketingPage} />
      <Route exact path="/team" component={DevTeam} />

      {/* Login */}
      <Route path="/login" component={Login} />

      {/* Navigation */}
      <Route path="/slackr" component={Navigation}/>
                  {/* Onboarding */}
      <NewUserRoute exact path="/slackr/onboarding" component={Onboarding} />

          {/* Dashboard */}
      <PrivateRoute exact path="/slackr/dashboard" component={View} />

          {/* Stats Dashboard */}
      <Route path="/slackr/dashboard/stats" component={StatsDashboard} />

          {/* Reports */}
      <PrivateRoute path="/slackr/dashboard/reports" component={ReportsDash} />

          {/* Profile */}
      <PrivateRoute exact path="/slackr/dashboard/profile" component={Profile} />

          {/* Slack Connection */}
      <Route exact path="/slackr/slack" component={Slack} />
      <Route exact path="/slackr/slack/auth" component={SlackRedirect} />

          {/* Footer */}
      <Route path="/slackr" component={Footer} />
     
    </div>
  );
}

export default App;
