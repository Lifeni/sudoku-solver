const getRow = (table: Array<any>, x: number): Array<string> => {
    return table[x]
}

const getColumn = (table: Array<any>, y: number): Array<string> => {
    return table.map((arr) => arr[y])
}

const getBox = (table: Array<any>, x: number, y: number): Array<string> => {
    const dx = Math.floor(x / 3)
    const dy = Math.floor(y / 3)

    const arr: Array<string> = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            arr.push(table[i + dx * 3][j + dy * 3])
        }
    }

    return arr
}

const getPossibleNumber = (row: Array<string>, col: Array<string>, box: Array<string>) => {
    const arr: Array<number> = Array(9).fill(0)
    row.forEach((str) => {
        str.trim() && arr[Number(str) - 1]++
    })
    col.forEach((str) => {
        str.trim() && arr[Number(str) - 1]++
    })
    box.forEach((str) => {
        str.trim() && arr[Number(str) - 1]++
    })
    return arr.map((num, index) => num === 0 ? index + 1 : 0).filter((num) => !!num)
}

const isFull = (table: Array<any>) => {
    let count = 0
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            count++
            if (table[i][j].trim() === "") {
                count--
            }
        }
    }

    return count === 9 * 9
}

const find = (table: Array<any>) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (table[i][j].trim() === "") {
                const row = getRow(table, i)
                const col = getColumn(table, j)
                const box = getBox(table, i, j)
                const result = getPossibleNumber(row, col, box)
                switch (result.length) {
                    case 0: {
                        return table
                    }
                    case 1: {
                        table[i][j] = result[0].toString()
                        table = find(table)

                        if (!isFull(table)) {
                            table[i][j] = " "
                        } else {
                            return table
                        }
                        return table
                    }
                    default: {
                        for (let k = 0; k < result.length; k++) {
                            table[i][j] = result[k].toString()
                            table = find(table)

                            if (!isFull(table)) {
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
    let table = data
    table = find(table)
    // console.log("table", table, "\n\n")
    return table
}

export { solve }