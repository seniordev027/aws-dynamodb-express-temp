# Build Serverless Application with Express JS & DynamoDB Database

### Build Docker Application & Tagging a Docker Images

Example :

```bash
docker build . -t yourusername/yourapp
```

Showing the Docker image after building and tagging

```bash
docker images
```

Here you can see a docker images

```bash
REPOSITORY   TAG   IMAGE   ID   CREATED   SIZE
yourusername/example-node-app latest be083a8e3159 7 minutes ago 83.2MB
```

### Running or Testing a Docker image

```bash
docker run -p8080:8080 yourusername/yourapp
```

### To run the container in a detached mode, you can supply argument -d

```bash
docker run -d -p8080:8080 yourusername/yourapp
```

### Tag your image with the Amazon ECR registry, repository, and optional image tag name combination to use

```bash
docker tag e9ae3c220b23 aws_account_id.dkr.ecr.us-west-2.amazonaws.com/my-repository:tag
```

### Pushing a Docker image to the Docker repository

```bash
docker push aws_account_id.dkr.ecr.us-west-2.amazonaws.com/my-repository:tag
```

## Let's Push your Docker Images using ECS, For Reverence you can see here

<h3>
Follow Link Here : <a href="https://dev.to/raphaelmansuy/deploy-a-docker-app-to-aws-using-ecs-3i1g">Follow Link</a>
</h3>
