
### 关于异步action 的说明

```js

{
  callApi: {
    type: 'ADD', // 如果有该类型, 该类型设置后saveAs值根据自己reducer进行设定, 如果没有该类型, 则自动走最外层的reducer
    path: 'Search/orderList', // path
    saveAs: 'orderList',      // 保存到`store`中的`key`值
    method: 'POST', // 请求方式
    param: {},       // body
    query: {} // query信息
  }
}

```

> callApi字段说明
1. `type`: 属性指定reducer匹配的属性, 如果指定该属性,就不需要指定saveAs属性
2. `path`: 指定服务的地址
3. `saveAs`: 当不指定type的时候保存到顶层store树上的key值
4. `param`: 请求参数
5. `query`: url中的参数, 假如传入{a: 'canshu', b: 'canshu1'} , 那么url就会变为location.href + '?a=canshu&b=canshu1'


### 代码规范文档

> js方面
1. 文本缩进，使用两个空格（eslint直接限制）
2. 统一使用ES6语法，包括let/const/class/extends/super/template string/default/rest/import/export/async await、箭头函数、结构赋值等
3. 文件名命名统一只用驼峰命名法
   小驼峰、大驼峰      releaseDetail（变量/方法名）   ReleaseDetail（组件名）
4. 定义有意义的变量名,不能使用`abc_123/def`等等
5. 条件判断避开 `==`，使用`===` (eslint直接限制)

> 公共代码方面
1. 添加备注   格式 //模块+功能  --lpg
2. 代码风格统一
3. 过滤器    统一写在filter中

> 模块方面
2. 命名 (暂时以模块名命名，有好想法的可以说下)
4. propTypes声明写在 类外 (下面)
5. map 数据的时候 key: 构造或使用唯一的 id 建议不使用索引，如`ruleInfo${i}`
6. 组件内部代码组织（1.constructor  2.生命周期代码 3.事件代码  4.render代码  5.propTypes  6.export）
7. 全局变量(禁止使用，万一用到了建立js文件存储)
8. map (统一方法处理  by--dzx)
9. params  (先暂存state，点击按钮再存reducer)
10. componentWillReceiveProps周期内，在自己可控范围内操作
11. 组件参数固定名称 如（paginationConf, params, getSearchParams, clearSearchParams）
12. 弹出框统一放在代码最后（如果只有一层，只放一个）

> JSX语法方面
1. 避免双引号，使用单引号（eslint直接限制）
2. 避免多空格，使用单空格（eslint直接限制）
3. 多行代码时，将它们包含在小括号内（暂时不推荐数组）
4. 自定义组件，如果props参数过多，建议换行写
5. class换成className,for换成htmlFor