This is a Calculator made by David Hutsenko
## Getting Started

1: Go to the project's folder

```bash
cd calculator
```

2: Pull docker image

```bash
docker pull dazy/calculator:latest
```
3: Run docker container

```bash
docker run -d -p 3000:3000 --rm --name stopwatch dazy/stopwatch
```

Then open http://localhost:3000/ in your browser and use