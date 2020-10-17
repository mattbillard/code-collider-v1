# Code Collider v1
An experiment to inject code from an app into a proxied website. This would be useful when you are asked to collaborate with another team and provide them with code but aren't able/allowed to run their dev environment.

Also a chance to practice Webpack + proxy + Babel + TypeScript + VSCode debugging configs


## Set up
- Prerequisites: Node 
- Run the following
  ```
  npm install
  ```


## To Run
- Run the following (or use the corresponding VSCode debug script) 
  ```
  npm start
  ```
- Open the following in your browser  
  https://localhost:8080/dist/index.html  
  https://localhost:8080  


## To Build
- Run the following (or use the corresponding VSCode debug script) 
  ```
  npm build
  ```
- The dist directory could be put on another website to add the built version of this app to it


## Notable Files
These are most interesting files to look at and learn from:  
- package.json's scripts 
- webpack.config.js 
- proxy/index.js


## Resources 
The following resources were important in creating this project
- Webpack
  - Guides (set up, local dev, code splitting, environment vars, build performance, tree shaking, TypeScript, and more)  
    https://webpack.js.org/guides/getting-started/
  - Using Babel instead of ts-loader to speed up TS->JS transpiling  
    https://2ality.com/2019/10/babel-loader-typescript.html
  - Microsoft's starter for Webpack + TypeScript + Babel  
    https://github.com/microsoft/TypeScript-Babel-Starter
- Proxy  
  - Set up  
    https://sdk.gooddata.com/gooddata-ui/docs/4.1.1/ht_configure_webpack_proxy.html  
    https://stackoverflow.com/questions/31654239/proxy-websockets-connection-within-webpack-dev-server/50196176#50196176  
  - Modifying response  
    https://github.com/http-party/node-http-proxy#modify-response  
    https://www.npmjs.com/package/http-proxy#listening-for-proxy-events  
    https://stackoverflow.com/questions/38806249/node-http-proxy-http-proxy-middleware-how-do-you-manipulate-proxy-response/54923241#54923241  
  - Ask website not to GZIP contents  
    https://github.com/visionmedia/superagent/issues/927#issuecomment-335444720
