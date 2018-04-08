import GrossSettlementRoute from 'modules/grossSettlement/router' // 支付结算
import CreditManagementRoute from 'modules/creditManagement/router' // 授信管理
import FinanceRoute from 'modules/finance/router' // 财务查询
import HomeRoute from 'modules/home/router' // 首页
import SystemManageRoute from 'modules/systemManage/router' // 系统管理
import IssuingRoute from 'modules/issuing/router' // 代发
import EnterpriseFinancingRoute from 'modules/enterpriseFinancing/router' //企业理财
import AntHrRoute from 'modules/antHr/router' //蚂蚁Hr
import DataStatisticsRoute from 'modules/dataStatistics/router' //数据统计
// 后台不会返回
import ActivateRoute from 'modules/activate/router' //激活
import OtherInfoRoute from 'modules/otherInfo/router' // 其他
export default {
  GrossSettlementRoute,
  CreditManagementRoute,
  FinanceRoute,
  HomeRoute,
  IssuingRoute,
  SystemManageRoute,
  OtherInfoRoute,
  ActivateRoute,
  EnterpriseFinancingRoute,
  AntHrRoute,
  DataStatisticsRoute
}