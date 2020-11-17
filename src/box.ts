const box = (table: Array<any>, x: number, y: number): Array<string> => {
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

export { box as getBox }