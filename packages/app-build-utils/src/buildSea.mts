// import yargs from "yargs/yargs";
// import { hideBin } from "yargs/helpers";


console.log(`--------------------------------------------------------------------------------`);
console.log(`Building single executable application...`);
console.log(`--------------------------------------------------------------------------------`);




// interface IConfig {
//     foo: string;
// }



// async function getConfiguration(): Promise<Result<IConfig, string>> {
//     const argv = await yargs(hideBin(process.argv))
//     .usage(
//         [
//             "Deletes the specified directories and files.",
//             "",
//             "Specifying items to delete via command line arguments:",
//             "rmrf <file_or_dir_1> <file_or_dir_2>",
//             "",
//             "Specifying items to delete by piping input into this app:",
//             "splat **/node_modules/ | rmrf",
//         ].join(os.EOL)
//     )
//     .help()
//     .wrap(80)
//     .argv;

//     const inputIsPiped = !process.stdin.isTTY;
//     const resFsItems = inputIsPiped ? await pipedInputToFsItems() : await argsToFsItems();

//     return resFsItems.failed ?
//         resFsItems :
//         new SucceededResult({ fsItems: resFsItems.value });

// }
