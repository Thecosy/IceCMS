# ----------------------------------------------------
# 步骤 1：选择一个包含 Node.js 的基础镜像
# ----------------------------------------------------
    FROM node:22-slim

    # 安装 Java JRE 以便运行 Spring Boot 应用
    RUN apt-get update && apt-get install -y openjdk-17-jre-headless && rm -rf /var/lib/apt/lists/*
    
    # ----------------------------------------------------
    # 步骤 2：设置 Nuxt.js 项目和 Vue 项目 (使用 pnpm)
    # ----------------------------------------------------
    # 设置工作目录
    WORKDIR /app

    # 全局安装 pnpm
    RUN npm install -g pnpm

    # 复制 Nuxt.js 的配置文件并安装依赖
    COPY package*.json ./
    RUN pnpm install 

    # 复制 Nuxt.js 的所有源代码
    COPY . .

    # 构建 Nuxt.js 应用
    RUN pnpm run build

    # 安装 Vue 项目的依赖（假设 vue-app 是子目录）
    WORKDIR /app/vue-app
    COPY vue-app/package*.json ./
    RUN pnpm install 
    COPY vue-app/ ./
    RUN pnpm run build
    WORKDIR /app
    
    # ----------------------------------------------------
    # 步骤 3：准备 Java API
    # ----------------------------------------------------
    COPY main.jar /app/api/main.jar
    
    # ----------------------------------------------------
    # 步骤 4：配置环境变量和端口
    # ----------------------------------------------------
    ENV NUXT_HOST=0.0.0.0 \
        NUXT_APP_VERSION=latest \
        DATABASE_URL=file:./db.sqlite \
        NODE_ENV=production
    
    # 声明服务运行的端口
    EXPOSE 3000  
    EXPOSE 8181  
    EXPOSE 2580  
    
    # ----------------------------------------------------
    # 步骤 5：启动所有服务
    # ----------------------------------------------------
    CMD sh -c "node /app/output/server/index.mjs & java -Xmx128m -Xss256k -XX:ParallelGCThreads=2 -Djava.compiler=NONE -jar /app/api/main.jar & cd /app/vue-app && npm run serve & wait"