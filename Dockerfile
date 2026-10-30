# 개발용 이미지. 소스는 compose 에서 볼륨으로 마운트하고, node_modules 는 컨테이너 안에 둔다 (Mac/Linux 바이너리 충돌 방지).
FROM node:26-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]
