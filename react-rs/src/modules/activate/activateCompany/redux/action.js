import { actionFactory } from 'utils/utils'
import {
  ACTIVATECOMPANY_SAVECOMPANYINFO,
  ACTIVATECOMPANY_GETCOMPANYSTATE
} from './constants'

export const aAC_saveActivateCompanyInfo = actionFactory(ACTIVATECOMPANY_SAVECOMPANYINFO, 'POST', '/companyAcc/saveInfo') // 保存激活账户信息
export const aAC_getActivateCompanyState = actionFactory(ACTIVATECOMPANY_GETCOMPANYSTATE, 'POST', '/companyAcc/getInfo') // 获取激活账户状态
