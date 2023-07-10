## Calculator project
**Author**: Davyd Hutsenko

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

4) Open http://localhost:3000/ in your browser and use

## Description


Calculator is a web application developed with Next.js, TypeScript, SCSS, and Redux-Toolkit. It aims to provide a convenient and efficient way to perform mathematical calculations in a visually appealing interface.

Key Features:

* User-friendly Interface: The calculator features a clean and intuitive user interface that allows users to easily input numbers and perform calculations.

* Basic Operations: It supports all the basic mathematical operations, including addition, subtraction, multiplication, and division.

* Advanced Functions: In addition to the basic operations, the calculator includes advanced functions such as square root, exponentiation, and percentage calculations.

* Responsive Design: The application is built with responsiveness in mind, ensuring optimal user experience across different devices and screen sizes.

This project leverages the power of Next.js, a React framework, to provide server-side rendering and optimized performance. TypeScript enhances the development process by adding static typing, improving code quality and maintainability. SCSS is used for styling, allowing for easy customization and consistent design. Redux-Toolkit is employed for state management, enabling efficient data handling and synchronization.

Whether you need to perform simple calculations or tackle more complex mathematical tasks, Calculator has got you covered. Explore the codebase, customize it to your needs, and enjoy hassle-free calculations with this powerful web application.
