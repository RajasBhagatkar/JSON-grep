# JSON grep

This repository contains a solution for the programming challenge of creating a tool called `json_grep` that can search for patterns in JSON log files. The tool can be invoked from the command line with various options to customize the search behavior, such as searching only in keys or values, ignoring invalid JSON lines, case insensitive search, showing only the number of matched lines, or printing only the non-matched lines. The tool is implemented in **Javascript** using standard libraries and yargs for parsing command line arguments. The solution is tested on a Unix-like OS and follows the general instructions provided in the challenge document.

## Usage

To use this tool, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the root directory of this repository.
3. Install the required dependencies by running `npm install`.
4. Run the tool with `node json_grep.js [OPTIONS] PATTERN FILE`.

Here are some examples of how to use this tool:

- Search for a pattern in all keys and values of a JSON file: `node json_grep.js -a "pattern" file.json`
- Search for a pattern in all values of a JSON file: `node json_grep.js -v "pattern" file.json`
- Search for a pattern in all keys of a JSON file: `node json_grep.js -k "pattern" file.json`
- Search for a pattern in all keys and values of a JSON file, ignoring invalid lines: `node json_grep.js -a -i "pattern" file.json`
- Show only the number of matched lines: `node json_grep.js -c "pattern" file.json`
- Print only the non-matched lines: `node json_grep.js -n "pattern" file.json`

For more information on how to use this tool, run `node json_grep.js --help`.
