FROM node
WORKDIR /app
COPY package.json .
RUN npm config set legacy-peer-deps true
RUN npm install
ARG SERVER_URL
ENV SERVER_URL=$SERVER_URL
COPY . .
EXPOSE 3000
RUN npm run build
CMD ["npm","start"]