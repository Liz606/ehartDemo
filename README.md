## 技术背景

基于React+Redux+Webpack搭建的前端脚手架，开发者需要掌握es6、react、redux等相关知识，编译工具需要掌握Wepack相关知识。

## 开发环境

- 安装Homebrew，命令行输入`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- 使用HomeBrew安装Node.js和npm包管理器，命令分别为`brew install node`和`brew install npm`
- IDE：Atom、Sublime Text、VSCode等不限

## 使用指南

本脚手架可供内部开发者和外部开发者使用，外部开发者使用的话需要我们内容人员从我们的git仓库里下载一份供别人使用，公司内部开发者的话建议使用下面的方式：

1. 首先确保新建的仓库是空的，然后添加本仓库地址到工程里：

```shell
git remote add sketch git@git.nanyudsp.com:nanyu-contract/react-app-sketch.git
git fetch sketch master
git merge sketch/master --allow-unrelated-histories
```

2. 添加成功之后，运行下面代码：

```shell
npm install
```

完成之后再运行`npm start`，浏览器会自动打开[localhost:3000](http://localhost:3000)页面，能看到内容说明工程的初始化工作已经成功完成了。

然后开发者就可以在此基础上继续进行开发了。

>开发者在第一次使用本脚手架之前需要了解下它的工程文件组织架构，不同文件夹不同文件都有哪些作用和功能呢？下面的内容就具体介绍一下：

## 组织架构
...

## 相关链接

- [React官方文档](https://facebook.github.io/react/docs/hello-world.html)
- [Redux官方文档](http://redux.js.org/)
- [React Router中文文档](https://react-guide.github.io/react-router-cn/)
- [Webpack中文指南](http://zhaoda.net/webpack-handbook/index.html)
- [ECMAScript 6 入门](http://es6.ruanyifeng.com/)
- [less用法](http://less.bootcss.com/)
- [scss用法](http://sass.bootcss.com/docs/sass-reference/)
- [ESLint](http://eslint.org/)