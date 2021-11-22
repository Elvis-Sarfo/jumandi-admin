# FROM node:16-alpine AS development

# ENV NODE_ENV development
# # Add a work directory
# WORKDIR /app

# # Cache and Install dependencies
# COPY package.json .
# COPY package-lock.json .

# RUN npm install

# # COPY yarn.lock .
# # RUN yarn install

# # Copy app files
# COPY . .
# # Expose port
# EXPOSE 3000
# # Start the app
# CMD [ "npm", "start" ]


FROM node:16-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.20.2 as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 3000
# Start nginx
CMD ["nginx", "-g", "daemon off;"]