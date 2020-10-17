const chalk = require('chalk');
const consts = require('../constants.js');

// Check proxy requests. If they start with '/dist, serve our own code, not the proxied site
const bypass = (req, res, proxyOptions) => {
  if (req.url.startsWith('/dist')) {
    return req.url;
  }
}

// Request non-gzipped code, so we can alter the HTML below and inject our own code
const onProxyReq = (proxyReq, req, res) => {
  proxyReq.setHeader('accept-encoding', 'identity');
};

// Inject our code into HTML requests 
const onProxyRes = (proxyRes, req, res) => {
  console.log(`${chalk.yellow(proxyRes.statusCode)} ${req.path}`);
  const contentType = proxyRes.headers['content-type'];

  if (contentType && contentType.includes('html')) {
    const body = [];

    proxyRes.on('data', (chunk) => {
      body.push(chunk);
    });

    proxyRes.on('end', () => {
      let buff = Buffer.concat(body);
      let str = buff.toString();

      const reg = new RegExp(consts.WEBSITE_TO_PROXY, 'gi');
      str = str
        .replace(reg, '') // Ensure all absolute links to relative so links don't navigate to the actual website
        .replace('</body>', `${consts.INJECTED_CODE}</body>`);
        
      setHeaders(proxyRes, res);
      res.end(str);
    });
    
  } else {
    setHeaders(proxyRes, res);
    proxyRes.pipe(res);
  }
}

const setHeaders = (proxyRes, res) => {
  res.writeHead(proxyRes.statusCode, proxyRes.headers);
}

exports.bypass = bypass;
exports.onProxyReq = onProxyReq;
exports.onProxyRes = onProxyRes;