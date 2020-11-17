import { getBox } from "./box"

const check = async (table: Array<string>) => {
    for (let i = 0; i < 9; i++) {
        let test = new Set()
        let row = table[i]
        for (let j = 0; j < 9; j++) {
            if (row[j].trim() != "") {
                test.add(Number(row[j]))
            }
        }
        if (test.size != 9) {
            return false
        }
    }

    for (let i = 0; i < 9; i++) {
        let test = new Set()
        let col = table.map((arr) => arr[i])
        for (let j = 0; j < 9; j++) {
            if (col[j].trim() != "") {
                test.add(Number(col[j]))
            }
        }
        if (test.size != 9) {
            return false
        }
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let test = new Set()
            let box = getBox(table, i, j)
            for (let k = 0; k < 9; k++) {
                if (box[k].trim() != "") {
                    test.add(Number(box[k]))
                }
            }
            if (test.size != 9) {
                return false
            }
        }
    }

    return true
}

export { check }