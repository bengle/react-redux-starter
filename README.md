#react-redux-starter

整体架构采用react,redux,react-router3.x,webpack3,sass构建，模块做了切分可以按需加载，UI组件使用antd，字体文件已经本地化可以支持内网部署，推荐使用yarn管理。

vender配置在build/webpack.base.config.js中，目前指定了react,react-dom,react-router,lodash4个库

本地开发服务配置可以在build/webpack.dev.config.js中的devSever配置修改。

# structure
![](http://ojo0vdkcl.bkt.clouddn.com/react-redux-structure.jpg)

```
yarn 
yarn run dev
yarn run build
```