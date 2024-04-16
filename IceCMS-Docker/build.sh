#!/bin/bash

RELEASE_VERSION=$1
if [ ! -n "$RELEASE_VERSION" ] ; then
echo "发布失败,请在命令后输入分支名或tag版本号,如:restart-backend release-1.0" && exit 1
fi

echo "当前发布版本号:"$RELEASE_VERSION

echo "starting deployment..."

# 获取当前脚本文件所在目录的绝对路径
CURR_DIR=`S=\`readlink "$0"\`; [ -z "$S" ] && S=$0; dirname $S`
echo $CURR_DIR

# 重新激活环境配置
source /etc/profile

# 切换到后端工程项目根路径
cd $CURR_DIR/../

git fetch && git checkout $1 && git pull || ! echo '[ERROR]Git拉取代码失败' || exit
echo "[check point] code update successful"

# maven打包构建
mvn clean package -Dmaven.test.skip=true || ! echo '[ERROR]Maven编译构建失败！' || exit
echo "[check point] package successful"

# 构建容器镜像
docker-compose -f renren-generator/docker-compose-renren-generator.yml build || ! echo '[ERROR]镜像构建失败' || exit
echo "[check point]  image build successful"

# 停止容器
docker-compose -f renren-generator/docker-compose-renren-generator.yml down || ! echo '[ERROR]停止容器失败' || exit
echo "[check point] down successful..."

# 启动容器
docker-compose -f renren-generator/docker-compose-renren-generator.yml up -d || ! echo '[ERROR]容器启动失败' || exit
echo "[check point] starting up..."

# 清理虚悬镜像
docker image prune -a -f || ! echo '[ERROR]虚悬镜像清理失败' || exit
echo "[check point] clean suspended images successful"

echo "[check point] Congratulations! startup successful!"
