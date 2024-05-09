# HQsystemFrontEnd

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

配置路由：在src/router目录下配置你的路由。你需要为每个视图定义一个路由。  
状态管理：如果你的应用需要共享状态，你可以使用Vuex进行状态管理。在src/store目录下创建你的store。  
样式：你可以使用CSS或者预处理器（如Sass，Less等）来编写样式。将样式文件放在src/styles目录下。  
运行和构建：使用npm run dev来启动开发服务器，使用npm run build来构建生产版本。

views 目录通常用于存放应用的页面级别的组件。

port:8080
这些组件通常会被路由器直接使用，代表了一个完整的页面。
components 目录则用于存放可复用的 Vue 组件，这些组件可以在多个页面或者其他组件中使用。
如果这两个组件没有直接的使用关系，那么它们可能就是两个独立的组件，各自实现了不同的功能。
