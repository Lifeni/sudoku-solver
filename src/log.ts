import fs from "fs"
import os from "os"
import tracer from "tracer"
import path from "path"

const logName = path.resolve(os.tmpdir(), "sudoku-solver.log")

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

if (!fs.existsSync(logName)) {
    log.log("Create Log File")
}

const show = async () => {
    console.log("\nLogs", logName, "\n")
    try {
        const logs = fs.readFileSync(logName)
        console.log(logs.toString())
    } catch (err) {
        console.log(err)
    }
}

export { log as logger, show }