# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app
# Install Truffle globally
RUN npm install -g truffle

# Install Ganache CLI globally
RUN npm install -g ganache-cli

# Install Solc (Solidity Compiler) globally
RUN npm install -g solc

RUN npm install --save-dev -g jest

RUN npm install chai

RUN npm install -g chai chai-as-promised

RUN npm install -g @openzeppelin/contracts


#RUN yarn add --dev jest-junit

#RUN npm install truffle-plugin-junit-reporter --save-dev

# Add `node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install application dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY --chown=node:node . .

RUN chown node:node ./build

EXPOSE 8545

RUN npm install chai chai-bn
RUN npm install @openzeppelin/test-helpers

USER node

CMD ganache-cli > /dev/null & sleep 5 && truffle compile && truffle migrate && npm test


#CMD ganache-cli > /dev/null & sleep 5 && truffle compile && truffle migrate && sleep 1200
#CMD sleep 1200