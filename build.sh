#!/usr/bin/env bash

echo "您正在部署blog-react项目..."
default_image_name="blog-react"
default_container_name="blog-react"

backend_image_path=
backend_image_tag=

echo "想导入已构建好的镜像？请输入镜像tar包位置。否则直接回车在线构建镜像："
while true; do
    read -r backend_image_path
    echo "image path: $backend_image_path"
    if [[ ! $backend_image_path || $backend_image_path == 'n' || $backend_image_path == 'no' || $backend_image_path == 'N' || $backend_image_path == 'NO' ]]; then
        break;
    elif [ -e "$backend_image_path" ]; then
        echo "镜像文件不存在，请重新输入："
    else
        break;
    fi
done

echo "输入镜像tag："
read -r backend_image_tag
# shellcheck disable=SC2236
if [ ! -n "$backend_image_tag" ]; then
    backend_image_tag="latest"
fi
echo "您的镜像标签: $backend_image_tag"

{
    docker rmi "$default_image_name":"$backend_image_tag"
}

# shellcheck disable=SC2236
if [ ! -n "$backend_image_path" ]; then
    # no support image path, build it auto
    docker build -t "$default_image_name":"$backend_image_tag" .
else
    docker load -i "$backend_image_path"
fi

while true; do
    echo "是否现在创建并启动容器？（y or n）"
    read -r is_create_container
    case $is_create_container in
        yes|y|Y|YES|Yes)
            break
            ;;
        no|n|N|No|NO)
            echo "镜像创建完成，退出程序。"
            exit ;;
        "")
            break ;;
    esac
done

{
    docker rm -f "$default_container_name"
}

{
   docker run \
     --name "$default_container_name" \
     -p 443:443 -p 80:80 \
     -d "$default_image_name":"$backend_image_tag"
} && {
    echo "$default_container_name 容器启动成功。"
}
