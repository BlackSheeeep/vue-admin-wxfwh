FROM node:carbon-onbuild AS builder

RUN npm run build

FROM registry-vpc.cn-hangzhou.aliyuncs.com/glh/nginx:alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
