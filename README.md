# Sudoku Solver

![npm](https://img.shields.io/npm/v/@lifeni/sudoku-solver)
![license](https://img.shields.io/npm/l/@lifeni/sudoku-solver)

A command line interface Sudoku solver, based on Node.js.

## Install

You can use npm or yarn to install it.

```shell
$ npm i -g @lifeni/sudoku-solver
# or
$ yarn global add @lifeni/sudoku-solver
```

## Usage

You should write Sudoku into a csv file like this:

```cvs
# example.cvs
1,, , ,4,8, , ,5
5,2, ,6, , , ,1,9
 ,7, , , ,1, , ,8
8,4, ,5, , ,9,3,
7,9, , , ,3, , ,
6, ,3, ,7, ,5,2,4
 , ,9, ,8,4, ,5,
3, ,1,7, ,2,8,4,6
 , ,7,3,6,5,1,9,
```

Run the command to get the result:

```shell
$ sudoku-solver example.cvs

┌───────┬───────┬───────┐
│ 1 3 6 │ 9 4 8 │ 2 7 5 │
│ 5 2 8 │ 6 3 7 │ 4 1 9 │
│ 9 7 4 │ 2 5 1 │ 3 6 8 │
├───────┼───────┼───────┤
│ 8 4 2 │ 5 1 6 │ 9 3 7 │
│ 7 9 5 │ 4 2 3 │ 6 8 1 │
│ 6 1 3 │ 8 7 9 │ 5 2 4 │
├───────┼───────┼───────┤
│ 2 6 9 │ 1 8 4 │ 7 5 3 │
│ 3 5 1 │ 7 9 2 │ 8 4 6 │
│ 4 8 7 │ 3 6 5 │ 1 9 2 │
└───────┴───────┴───────┘

 ⏰ Time: 13.003ms
```

```shell
$ sudoku-solver -h

Usage: index [file]

A command line interface Sudoku solver, based on Node.js.

Options:
  -v, --version  show the version
  -h, --help     display help for command

Commands:
  log|logs       show logs
  read <file>    read a Sudoku from file
```

## License

MIT License