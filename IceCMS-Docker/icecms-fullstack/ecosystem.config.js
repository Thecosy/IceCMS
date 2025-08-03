// ecosystem.config.js
export default {
  apps: [{
    name: 'ifai',
    port: 3000,  // 注意：port 应该是数字，不是字符串
    args: '', 
    instances: 'max',
    autorestart: true,
    watch: false,
    exec_mode: 'cluster',
    cwd: './server',
    script: '/app/output/server/index.mjs',  // 确保路径正确
    interpreter: 'node',  // 明确指定解释器
    interpreter_args: '--experimental-specifier-resolution=node',  // 关键配置
    env: {
      NODE_ENV: 'production',
      NODE_OPTIONS: '--experimental-vm-modules'  // 启用ESM支持
    }
  }]
}