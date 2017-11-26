import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {history} from './redux/store';
import App from './App';
import {
  Home,
  Login,
  LoginRedux,
  SignUpMethods,
  SignUpTutor,
  SignUpStudent,
  DashboardTutor,
  DashboardStudent,
  ProfileStudent,
  LinkAccount,
  RequestMoney,
  PreviousExpenses,
  ProfileTutor,
  AddCredits,
  SearchResults,
  Chat,
  Messaging,
  TermsOfService,
  TosStudent,
  TosTutor,
  PrivacyPolicy,
  ContactUs
} from './modules';

const Routes = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={'/'} component={App}/>
      </Switch>
    </ConnectedRouter>
  );
};

export default Routes;

// const x = () => (
//   <Router history={history}>
//     <Route path="/" component={App}>
//       <IndexRoute component={Home}/>
//       <Route path='/chats' component={Chat}/>
//       <Route path='/messages' component={Messaging}/>
//       <Route path='/contact' component={ContactUs}/>
//       <Route path='/terms-of-service'>
//         <IndexRoute component={TermsOfService}/>
//         <Route path='student' component={TosStudent}/>
//         <Route path='tutor' component={TosTutor}/>
//       </Route>
//       <Route path='/privacy-policy' component={PrivacyPolicy}/>
//       <Route path='login' component={LoginRedux}/>
//       <Route path='dashboard'>
//         <Route path='student' component={DashboardStudent}/>
//         <Route path='tutor' component={DashboardTutor}/>
//       </Route>
//       <Route path='profile'>
//         <Route path='student' component={ProfileStudent}/>
//         <Route path='tutor' component={ProfileTutor}/>
//       </Route>
//       <Route path='/search' component={SearchResults}/>
//       <Route path='/add-credits' component={AddCredits}/>
//       <Route path='/link-account' component={LinkAccount}/>
//       <Route path='/request-money' component={RequestMoney}/>
//       <Route path='/previous-expenses' component={PreviousExpenses}/>
//       <Route path='sign-up'>
//         <IndexRoute component={SignUpMethods}/>
//         <Route path='tutor' component={SignUpTutor}/>
//         <Route path='student' component={SignUpStudent}/>
//       </Route>
//     </Route>
//   </Router>
// );