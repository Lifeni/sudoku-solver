#!/usr/bin/env node

import chalk from "chalk"
import fs from "fs"
import parse from "csv-parse/lib/sync"
import path from "path"
import program from "commander"

import { solve } from "./solve"
import { logger, show } from "./log"
import figlet from "figlet"

console.log(chalk.bold("\nSudoku Solver\n"))

const version = "0.0.1"
const date = "2020/10/28"
const description = "A command line interface Sudoku solver, based on Node.js"
const meta = `v${version} ${date}`

program
    .version(meta, "-v, --version", "show the version")
    .description(description)
    .usage("[file]")
    .arguments("[file]")
    .action(async (cmd: string): Promise<void> => {
        if (cmd) {
            try {
                const file = await fs.readFileSync(path.resolve(cmd))
                logger.log("Get File -", file)

                const sudoku = await parse(file)
                const result = await solve(sudoku)
                console.log(result)
            } catch (err) {
                console.error(err.message)
                logger.error("Read File Error -", err.message)
            }
        } else {
            console.log(figlet.textSync("Sudoku Solver"), "\n")
            console.log(meta, "\n")
            console.log(description)
        }
    }).program
    .command("log")
    .alias("logs")
    .description("show logs")
    .action(async () => {
        await show()
    })

program
    .command("read <file>")
    .description("read a Sudoku from file")
    .action(async (cmd: string): Promise<void> => {
        try {
            const file = path.resolve(cmd)
            const text = await fs.readFileSync(file)

            console.log(file, "\n")
            console.log(text.toString().trim(), "\n")

            logger.log("Get File -", file)
        } catch (err) {
            console.error(err.message)
            logger.error("Read File Error -", err.message)
        }
    })

program.parse(process.argv)

