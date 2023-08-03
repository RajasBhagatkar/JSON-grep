#!/usr/bin/env node



const yargs = require('yargs')(process.argv.slice(2));
const fs = require('fs')

const argv = yargs
    .option('k', {
        alias: 'keys',
        describe: 'Search only in keys ',
        type: "boolean" //! Important
    })
    .option('v', {
        alias: 'values',
        describe: 'Search only in values ',
        type: "boolean"
    })
    .option('x', {
        alias: 'ignore-invalid',
        describe: 'ignore lines containing invalid JSON',
        type: "boolean"
    })
    .option('i', {
        alias: 'case-insensitive',
        describe: 'case insensitive search',
        type: "boolean"
    })
    .option('c', {
        alias: 'count',
        describe: 'show only the total number of lines matched instead of printing the matched lines',
        type: "boolean"
    })
    .option('d', {
        alias: 'invert-match',
        describe: 'print only the lines which DO not match the pattern provided',
        type: "boolean"
    })
    .help()
    .argv;



/**
 * {
argv: {
_: [ 'hello', 'main.file' ],
k: true,
keys: true,
i: true,
'case-insensitive': true,
caseInsensitive: true,
'$0': 'json_grep.js'
}
}
 */

const pattern = argv._[0]
const fileName = argv._[1]


// reading buffer
fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
        process.stdout.write(err);
        return;
    }

    //* if open successfully 

    const lines = data.split('\n');
    let count = 0
    try {

        //* lineas array

        // console.log("\n");

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            try {
                //* parse the json from each line 
                const json = JSON.parse(line)


                let matchFound = false;
                //* after parsing check for pattern
                Object.entries(json).map(([key, value]) => {
                    // console.log(key);
                    // console.log(value);

                    // if (key.toLowerCase().includes(pattern.toLowerCase()) || value.toString().toLowerCase().includes(pattern.toLowerCase())) {
                    //     console.log(json);
                    // }


                    // in case of multiple flags only single options should be visible so

                    //* if only key
                    if (argv.k) {
                        //* check for case insesative
                        if (argv.i) {
                            if (key.toLowerCase().includes(pattern.toLowerCase())) {
                                matchFound = true

                            }

                        }
                        //* if i is not present
                        else {
                            if (key.includes(pattern)) {
                                matchFound = true
                            }
                        }

                    }
                    //* if only value
                    else if (argv.v) {


                        if (argv.i) {
                            // matchFound = value.toString().toLowerCase().includes(pattern.toLowerCase());
                            if (value.toString().toLowerCase().includes(pattern.toLowerCase())) {
                                matchFound = true
                            }
                        } else {
                            // matchFound = value.toString().includes(pattern);
                            if (value.toString().includes(pattern)) {
                                matchFound = true;
                            }
                        }



                    }

                    // else check for all the key and value if k or v flag is not present
                    else {
                        // console.log('here');

                        if ((key.toLowerCase().includes(pattern.toLowerCase())) || (value.toString().toLowerCase().includes(pattern.toLowerCase()))) {
                            matchFound = true
                        }

                    }



                })

                //* if d flag is present then don't print lines 
                if (argv.d) matchFound = !matchFound

                //* single line at a time 
                if (matchFound) {
                    count++;


                    //* if c flag is not present then show only total lines
                    if (!argv.c) {
                        console.log(line)
                    }

                }



                // console.log(match.includes('hiring'.toLowerCase()));







            } catch (error) {
                //* if parsing gives and error catch will collect it
                //! if x is present don't print the error else print Invalid JSON on line number x
                if (!argv.x) {
                    console.error(`Invalid JSON on line number ${i + 1}`)

                    return;
                }

            }


        }





    } catch (error) {
        process.stdout.write(error)
    }

    if (argv.c) console.log(count);




})



