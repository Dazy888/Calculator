This is a Calculator made by David Hutsenko
## Getting Started

1: Go to the project's folder

```bash
cd calculator
```

2: 

1) For view - pull docker image

```bash
docker pull dazy/calculator:latest
```

2) For development - install all dependencies

```bash
npm install
# or
yarn
```

3: 

1) For view - run docker container

```bash
docker run -d -p 3000:3000 --rm --name stopwatch dazy/stopwatch
```

2) For development - run dev server

```bash
npm run dev
# or 
yarn dev
```

Then open http://localhost:3000/ in your browser and use