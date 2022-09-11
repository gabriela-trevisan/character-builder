FROM node:14

WORKDIR /character-builder
COPY /character-builder/package.json .
RUN npm install -g nodemon && npm install
COPY /character-builder .
EXPOSE 3000
CMD ["npm", "start"]
