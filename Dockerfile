# Use the official Node.js image.
FROM node:22-alpine

# Set working directory.
WORKDIR /app

# Copy package.json and install dependencies.
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application.
COPY . .

# Build the Next.js app.
RUN npm run build

# Expose the port the app will run on.
EXPOSE 3000

# Start the Next.js app.
CMD ["npm", "start"]
