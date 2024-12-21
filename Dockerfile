# Step 1: Use a base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Expose a port (e.g., 3000 for a typical Node.js app)
EXPOSE 3000

# Step 7: Specify the command to run the application
CMD ["npm", "start"]
