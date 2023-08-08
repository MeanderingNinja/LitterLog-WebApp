FROM node:16.3.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the web app files to the container
COPY . /app/

# Expose the necessary port(s)
EXPOSE 5001

# Run the web app
CMD ["npm", "start"]