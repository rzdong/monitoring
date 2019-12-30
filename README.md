# monitoring
前端监控demo，获取客户端的脚本运行错误进行上报。


 - 上报数据分类
   - Error   // 由window.onerror监听的错误
   - Request // 请求报告
   - Custom  // 自定义数据，一般记录页面访问，按钮点击等数据
   
 - 消息数据
   - type      // 上报数据类型
   - errorInfo // 错误消息
   - extra     // 自定义数据字段
 
 - 上传数据总结
   - 出错时页面截图
   - 出错时间
   - 出错时最后一次操作节点
   - 出错时的路由
   - 用户UA
   - 错误堆栈信息
   - 请求日志
   - 页面埋点统计
   

## 依赖
 - html2canvas
 - axios
 - route  // vue的路由 方便进行路由上报，这里的实现也可以原生监听pushstate解决
