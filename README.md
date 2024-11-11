# Movie Factions

A Next.js project to explore and select different factions within various movie universes, such as Harry Potter (Muggles and Wizards).

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Building for Production](#building-for-production)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a simple application built with Next.js that allows users to select different factions from various movie universes. For example, in the Harry Potter universe, users can choose between Muggles and Wizards.

## Features

- Select factions from various movie universes
- Interactive UI built with Next.js
- Easy setup and customization

## Installation

To get started with the project, follow these steps to set it up locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/j3rryl/cine-tribe.git
   cd cine-tribe
   ```

2. **Install the required packages:**

   ```bash
   npm install
   ```

3. **Update your .env.local values**

```bash
   cp .env.example .env.local
```

4. **Create database if not present already**

```bash
npm run db:create
```

4. **Run Drizzle Migrations**

```bash
npx drizzle-kit generate
```

```bash
npx drizzle-kit migrate
```

## Running the Project

To run the project in development mode:

```bash
npm run dev
```

## Building for Production

To build the project:

```bash
npm run build
```

Then start the optimized build:

```bash
npm run start
```

## Technologies Used

- [Next.js](https://nextjs.org/)
- [shadcnui](https://ui.shadcn.com//)
- [Auth.js](https://authjs.dev/)

## Contributing

We welcome contributions from everyone. Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add some new-feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a pull request

When submitting a pull request, please make sure your code adheres to our coding standards and conventions.

## License

Distributed under the MIT License. See `LICENSE` for more information.
