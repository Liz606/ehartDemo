## 技术背景

基于React+Redux+Webpack搭建的前端脚手架，开发者需要掌握es6、react、redux等相关知识，编译工具需要掌握Wepack相关知识。简单介绍一下Redux的相关知识，具体可查看[相关链接]里的相关文档。

Redux是JavaScript状态容器，提供可预测化的状态管理。应用中所有的state都以一个对象树的形式储存在一个单一的store中。惟一改变state的办法是触发action，一个描述发生什么的对象。为了描述 action如何改变state树，你需要编写reducers。Redux有如下三大原则：

- **单一数据源**，整个应用的state被储存在一棵object tree中，并且这个object tree只存在于唯一一个store中。
- **State是只读的**，惟一改变state的方法就是触发action，action是一个用于描述已发生事件的普通对象。
- **使用纯函数来执行修改**，为了描述 action 如何改变 state tree ，你需要编写 reducers。

## 开发环境
- MacOS
    - 安装Homebrew，命令行输入`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
    - 使用HomeBrew安装Node.js和npm包管理器，命令分别为`brew install node`和`brew install npm`
- Windows
    - 登陆官网[http://nodejs.org/](http://nodejs.org/)下载安装nodejs
    - 安装完成之后控制台输入`node -v`和`npm -v`，出现版本号说明Nodejs和npm已经安装成功了
- IDE：Atom、Sublime Text、VSCode等不限

## 使用指南

本脚手架可供内部开发者和外部开发者使用，外部开发者使用的话需要我们内容人员从我们的git仓库里下载一份供别人使用，公司内部开发者的话建议使用下面的方式：

- 首先确保新建的仓库是空的，然后添加本仓库地址到工程里：

```shell
git remote add sketch git@git.nanyudsp.com:nanyu-contract/react-app-sketch.git
git fetch sketch master
git merge sketch/master --allow-unrelated-histories
```

- 添加成功之后，运行下面代码：

```shell
npm install
```

完成之后再运行`npm start`，浏览器会自动打开[localhost:3000](http://localhost:3000)页面，能看到内容说明工程的初始化工作已经成功完成了。

> 使用npm install时可能需要等很长时间，这里提供一个解决方案，使用淘宝NPM镜像cnpm，cnpm可以很大程度上提升运行速度：
> ```shell
npm install -g cnpm
```
> 安装完成之后再使用`cnpm install`就可以了。**注意，浏览器请选择谷歌浏览器，IE9+上使用会出现BUG不能正常打开，后面会解决这个问题**

然后开发者就可以在此基础上继续进行开发了。

> 开发者在第一次使用本脚手架之前需要了解下它的工程文件组织架构，不同文件夹不同文件都有哪些作用和功能呢？下面的内容就具体介绍一下：

## 组织架构

在开发之前，开发者需要熟悉一下脚手架的工程结构：

```
├── config                      # webpack的配置信息
│   ├── webpack.config.dev.js   # 开发环境配置
│   └── webpack.config.prod.js  # 生产环境配置
├── build/                      # 编译之后的文件存放目录，可用于部署
├── public                      # html模板目录
│   ├── favicon.icon            # 网站图标
│   └── index.html              # 页面模板
├── scripts                     # npm运行脚本
│   ├── build.js                # build脚本，控制台执行`npm run build`
│   ├── start.js                # 启动运行开发环境脚本，执行`npm start`
│   └── test.js                 # 测试脚本
├── src                         # all source code written for this app
│   ├── actions                 # react actions
│   │   ├── api.js
│   │   └── base.js
│   ├── components              # 业务组件都应该存放在改目录下
│   │   └── user                # 实例组件
│   │       ├── index.jsx
│   │       └── style.scss
│   ├── container               # 有状态的容器组件
│   │   ├── home                # 首页容器组件，一般情况下可以在此基础上添加业务内容
│   │   │   ├── index.jsx
│   │   │   └── style.less
│   │   └── layout.jsx          # 最外层的布局组件，所有的路由都是它的子节点
│   ├── middlewares             # react/redux的中间件
│   │   └── callAPI.js
│   ├── reducers                # react reducers
│   │   ├── index.js
│   │   └── comment.js
│   ├── routes                  # routers
│   │   └── index.jsx
│   ├── constants.js            # 用于存放所有的常量
│   ├── index.js                # 程序入口文件
│   └── store.js                # all states
├── package.json                # node的配置文件，开发环境会读取改文件的配置内容
└── README.md                   # 文档说明
```

> package.json文件里面的一些字段作一下解释：
> - devDependencies，开发环境需要的一些包或者插件，使用`--save-dev`安装的都会写入到这里
> - dependencies，生产环境中需要的依赖，即正常运行该包时所需要的依赖项，使用`--save`
> - eslintConfig，覆盖eslint-config-36node包里面的eslint配置
> - proxy，调用API时的代理配置项，凡是通过fetch方法的URL调用都会通过proxy反向代理到后台服务器

> 开发的过程中如碰到问题，欢迎积极交流，邮箱: zhilong.gao@nanyu.tech。

## 相关链接

- [React官方文档](https://facebook.github.io/react/docs/hello-world.html)
- [Redux官方文档](http://redux.js.org/)
- [React Router中文文档](https://react-guide.github.io/react-router-cn/)
- [Webpack中文指南](http://zhaoda.net/webpack-handbook/index.html)
- [ECMAScript 6 入门](http://es6.ruanyifeng.com/)
- [less用法](http://less.bootcss.com/)
- [scss用法](http://sass.bootcss.com/docs/sass-reference/)
- [ESLint](http://eslint.org/)