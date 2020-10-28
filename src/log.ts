import fs from "fs"
import tracer from "tracer"
import path from "path"

const logName = path.resolve("./sudoku-solver.log")

const log = tracer.console({
    transport: function (data) {
        // console.log(data.output)
        fs.createWriteStream(logName, {
            flags: "a",
            encoding: "utf8",
            mode: 0o666
        }).write(data.rawoutput + "\n")
    }
})

const show = async () => {
    try {
        const logs = fs.readFileSync(logName)
        console.log(logs.toString())
    } catch (err) {
        console.log(err)
    }
}

export { log as logger, show }