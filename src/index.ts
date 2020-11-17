#!/usr/bin/env node

import chalk from "chalk"
import fs from "fs"
import figlet from "figlet"
import parse from "csv-parse/lib/sync"
import path from "path"
import program from "commander"

import { format } from "./format"
import { solve } from "./solve"
import { logger, show } from "./log"
import { check } from "./check"

const version = "0.2.1"
const date = "2020/11/17"
const description = "A command line interface Sudoku solver, based on Node.js."
const meta = `v${version} ${date}`

program
    .version(meta, "-v, --version", "show the version")
    .description(description)
    .usage("[file]")
    .arguments("[file]")
    .action(async (cmd: string): Promise<void> => {
        if (cmd) {
            try {
                console.time(" ⏰ Time")

                const file = fs.readFileSync(path.resolve(cmd))
                logger.log("Get File -", path.resolve(cmd))

                const sudoku = await parse(file)
                const result = await solve(sudoku)
                const correct = await check(result)

                if (!correct) {
                    console.log(" ❌ This Sudoku may have no solution")
                    logger.info("This Sudoku may have no solution")
                } else {
                    await format(result)
                    console.timeEnd(" ⏰ Time")
                    logger.info("Sudoku has been solved")
                }

                console.log("")
            } catch (err) {
                console.error(err.message)
                logger.error("Read File Error -", err.message)
            }
        } else {
            console.log("\n", figlet.textSync("Sudoku Solver"), "\n")
            console.log(chalk.bold(" Sudoku Solver " + meta))
            console.log("\n " + description + "\n")
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
            const file = fs.readFileSync(path.resolve(cmd))
            logger.log("Get File -", path.resolve(cmd))

            const sudoku = await parse(file)
            await format(sudoku)
            console.log(" ✅ " + path.resolve(cmd).toString(), "\n")
        } catch (err) {
            console.error(err.message)
            logger.error("Read File Error -", err.message)
        }
    })

program.parse(process.argv)

