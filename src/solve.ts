import { getBox } from "./box"

const getPossibleNumber = (row: Array<string>, col: Array<string>, box: Array<string>) => {
    const arr: Array<number> = Array(9).fill(0)

    for (let i = 0; i < 9; i++) {
        row[i].trim() && arr[Number(row[i]) - 1]++
        col[i].trim() && arr[Number(col[i]) - 1]++
        box[i].trim() && arr[Number(box[i]) - 1]++
    }

    return arr.map((num, index) => num === 0 ? index + 1 : 0).filter((num) => !!num)
}

const find = (table: Array<any>, x = 0, y = 0) => {
    for (let i = x; i < 9; i++) {
        let z = i === x ? y : 0
        for (let j = z; j < 9; j++) {
            if (table[i][j].trim() === "") {
                const row = table[i]
                const col = table.map((arr) => arr[j])
                const box = getBox(table, i, j)
                const result = getPossibleNumber(row, col, box)
                switch (result.length) {
                    case 0: {
                        return table
                    }
                    case 1: {
                        table[i][j] = result[0].toString()
                        table = find(table, i, j)

                        if (table[8][8].trim() === "") {
                            table[i][j] = " "
                        } else {
                            return table
                        }
                        return table
                    }
                    default: {
                        for (let k = 0; k < result.length; k++) {
                            table[i][j] = result[k].toString()
                            table = find(table, i, j)

                            if (table[8][8].trim() === "") {
                                table[i][j] = " "
                            } else {
                                return table
                            }
                        }
                        return table
                    }
                }
            }
        }
    }
    return table
}

const solve = async (data: Array<any>): Promise<Array<any>> => {
    return find(data, 0, 0)
}

export { solve }