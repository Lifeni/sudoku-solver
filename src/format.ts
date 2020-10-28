const format = async (table: Array<string>) => {
    for (let i = 0; i < 9; i++) {
        const arr = []
        if (i === 0) {
            console.log("\n┌───────┬───────┬───────┐")
        } else if (i % 3 === 0) {
            console.log("├───────┼───────┼───────┤")
        }
        for (let j = 0; j < 9; j++) {
            if (j % 3 === 0) {
                arr.push("│")
            }
            if (table[i][j].trim() === "") {
                arr.push(" ")
            } else {
                arr.push(table[i][j].trim())
            }
        }
        arr.push("│")
        console.log(arr.join(" "))
    }
    console.log("└───────┴───────┴───────┘\n")
}

export { format }