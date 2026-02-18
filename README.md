# Multiplication Table Generator

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![tsx](https://img.shields.io/badge/tsx-executor-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/license-ISC-blue?style=for-the-badge)

**A clean, well-structured Node.js + TypeScript CLI app that generates multiplication tables and saves them to disk.**

*Built following Clean Architecture principles with Use Cases and Dependency Injection.*

</div>

---

## Features

- **Generate any multiplication table** — choose your base number
- **Configurable limit** — define how many rows to generate
- **Optional console output** — show or hide the table in terminal
- **Auto file saving** — results are saved as `.txt` files automatically
- **Clean Architecture** — organized with Use Cases, Domain, and Presentation layers

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm

### Installation

```bash
git clone <your-repo-url>
cd 05-multiplication
npm install
```

---

## Usage

### Run in development mode

```bash
npx tsx src/app.ts --base <number> [--limit <number>] [--show]
```

### Arguments

| Flag | Alias | Type | Required | Default | Description |
|------|-------|------|----------|---------|-------------|
| `--base` | `-b` | `number` | Yes | — | The base number for the table |
| `--limit` | `-l` | `number` | No | `10` | How many rows to generate |
| `--show` | `-s` | `boolean` | No | `false` | Print the table to the console |

### Examples

```bash
npx tsx src/app.ts --base 5
npx tsx src/app.ts --base 7 --show
npx tsx src/app.ts --base 3 --limit 20 --show
npx tsx src/app.ts -b 12 -l 15 -s
```

### Sample Output

```
====================================
        Tabla del 7
====================================
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70

File created: outputs/tabla-7.txt
```

---

## Project Structure

```
05-multiplication/
├── src/
│   ├── app.ts                            Entry point
│   ├── app.logic.ts                      Logic scratchpad
│   ├── config/
│   │   └── plugins/
│   │       └── args.plugin.ts            CLI argument parser (yargs)
│   ├── domain/
│   │   └── use-cases/
│   │       ├── create-table.use-case.ts  Generates the multiplication table
│   │       └── save-file.use-case.ts     Saves content to a .txt file
│   └── presentation/
│       └── server-app.ts                 Orchestrates the use cases
├── outputs/                              Generated .txt files land here
├── package.json
├── tsconfig.json
└── README.md
```

---

## Architecture

This project follows **Clean Architecture** principles, separating concerns into distinct layers:

```
┌─────────────────────────────────────────────┐
│              app.ts (Entry Point)           │
│   Parses CLI args → calls ServerApp.run()  │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│         presentation/server-app.ts          │
│         Orchestrates the use cases          │
└──────────┬──────────────────────┬───────────┘
           │                      │
           ▼                      ▼
┌──────────────────┐   ┌──────────────────────┐
│  CreateTable     │   │     SaveFile         │
│  .execute()      │   │     .execute()       │
│                  │   │                      │
│ Generates the    │   │ Writes the result    │
│ table string     │   │ to a .txt file       │
└──────────────────┘   └──────────────────────┘
```

Each **Use Case** follows the same pattern:

```typescript
export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}

export class CreateTable implements CreateTableUseCase {
    execute({ base, limit = 10 }: CreateTableOptions) {
        let outputMessage = '';
        for (let i = 1; i <= limit; i++) {
            outputMessage += `${base} x ${i} = ${base * i}\n`;
        }
        return outputMessage;
    }
}
```

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Run `app.ts` with `tsx` |
| `dev:nodemon` | `npm run dev:nodemon` | Run with auto-reload via nodemon |
| `build` | `npm run build` | Compile TypeScript to `dist/` |
| `start` | `npm start` | Build and run the compiled JS |

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Node.js** | JavaScript runtime |
| **TypeScript** | Type safety and better DX |
| **tsx** | Fast TypeScript executor (no compile step needed) |
| **yargs** | CLI argument parsing |
| **nodemon** | Auto-reload during development |
| **rimraf** | Cross-platform `rm -rf` for build cleanup |

---

## Course

This project was built as part of the **Node.js: De cero a experto** course by [Fernando Herrera](https://fernando-herrera.com/).

---

<div align="center">
Att: Emilmar Cuarez
</div>
