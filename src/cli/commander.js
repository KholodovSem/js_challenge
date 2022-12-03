import { Command } from "commander";

const program = new Command();
program.option("-url, --url <type>", "write url")

program.parse(process.argv);

const argv = program.opts();

export default argv;