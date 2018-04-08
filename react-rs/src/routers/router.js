import React from 'react'
import {
  Route, Switch
} from 'react-router-dom'
import AsyncComponent from 'utils/AsyncComponent'
const RouterPage = AsyncComponent(() => import('modules/common/RouterPage'))
const RegisterCom = AsyncComponent(() => import('modules/register/register'))
const LoginCom = AsyncComponent(() => import('modules/login/login'))
const FailCom = AsyncComponent(() => import('modules/fail'))
const SuccessCom = AsyncComponent(() => import('modules/successful'))
const ActivateUserCom = AsyncComponent(() => import('modules/register/activateUser'))
const OnlineProtocol = AsyncComponent(() => import('modules/register/onlineProtocol'))
const SelectRegister = AsyncComponent(() => import('modules/register/selectRegister'))
const SmallRegisterCom = AsyncComponent(() => import('modules/register/smallRegister'))
const RegisterProgress = AsyncComponent(() => import('modules/register/registerProgress'))
const RegisterProgressDetail = AsyncComponent(() => import('modules/register/registerDetail'))


export default () => (
  <div>
    <Switch>
      <Route exact path="/successful" component={SuccessCom} />
      <Route exact path="/fail" component={FailCom} />
      <Route exact path="/login" component={LoginCom} />
      <Route exact path="/register" component={RegisterCom} />
      <Route exact path="/smallRegister" component={SmallRegisterCom} />
      <Route exact path="/registerProgress" component={RegisterProgress} />
      <Route exact path="/registerDetail" component={RegisterProgressDetail} />
      <Route exact path="/onlineProtocol" component={OnlineProtocol} />
      <Route exact path="/selectRegister" component={SelectRegister} />
      <Route exact path="/activateUser" component={ActivateUserCom} />
      <Route exact path="/:modules/:page" component={RouterPage} />
      { /* <Route path="/" component={NotFound} /> */}
      <Route path="/" component={LoginCom} />
    </Switch>
  </div>
)