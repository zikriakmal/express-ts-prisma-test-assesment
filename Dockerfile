# Use the official Node.js LTS image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies (including typescript)
RUN npm install

# Copy the rest of the app source code into the container
COPY . .

# Build the TypeScript project (this will generate the dist directory)
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Command to run the app
CMD ["npm", "run", "start"]
