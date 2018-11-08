FROM node:10

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

ENV NODE_ENV="production"

# Copy dependency definitions
COPY . /usr/src/app

# Install dependecies
RUN npm install

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
ENTRYPOINT ["npm", "start"]
# FROM node:10

# ENV PATH=$PATH:/app/node_modules/.bin
# WORKDIR /app
# COPY . .
# RUN npm install --production

# ENTRYPOINT ["probot", "receive"]
# CMD ["/app/index.js"]
