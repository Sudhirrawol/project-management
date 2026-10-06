# LOCAL DEVELOPMENT

# Source Code
#     ↓
# 1. Dockerize backend
#     ↓
# 2. Test containers locally
#     ↓
# 3. Push Docker images to ECR
#     ↓
# 4. ECS/Fargate runs containers
#     ↓
# 5. Configure VPC/networking
#     ↓
# 6. ALB exposes backend
#     ↓
# 7. Deploy frontend
#     ↓
# 8. Connect frontend → backend
#     ↓
# 9. CloudWatch logs/monitoring
#     ↓
# 10. CI/CD
#     ↓
# # 11. Jenkins

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Production/runtime
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit-dev

COPY --from=builder /app/dist ./dist

EXPOSE 5001

CMD ["npm","start"]