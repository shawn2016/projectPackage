/**
 * 财务管理
 */
const DataStatisticsRoute = {
  name: 'dataStatistics',
  actions: [{
    action: 'collectionStatistics',
    name: 'collectionStatistics',
    ensure: () => import('modules/dataStatistics/collectionStatistics')
  }]
}
export default DataStatisticsRoute