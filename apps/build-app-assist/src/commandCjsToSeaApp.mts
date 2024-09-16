import * as os from "node:os";
import { promisify } from "node:util";
import * as childProcess from "node:child_process";
import { ArgumentsCamelCase, Argv } from "yargs";
import { FailedResult, Result, SucceededResult } from "@repo/depot/result";
import { pipeAsync } from "@repo/depot/pipeAsync2";
import { Directory } from "@repo/depot-node/directory";
import { File } from "@repo/depot-node/file";
import { PromiseResult } from "@repo/depot/promiseResult";


const exec = promisify(childProcess.exec);

/**
  * A type that describes the properties that are added to the Yargs arguments
  * object once the command line has been parsed.  This must be kept in sync with
  * the builder.
  */
interface IArgsCommand {
    inputCjsFile: string;
    exeBaseName: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const builder = (yargs: Argv<NonNullable<unknown>>) => {
    return  yargs
    .usage(
        [
            "Bundles the specified CJS app into a Node Single Executable Application (SEA).",
            "See: https://nodejs.org/dist/latest-v20.x/docs/api/single-executable-applications.html"
        ].join(os.EOL)
    )
    .option(
        "inputCjsFile",
        {
            describe:     "Path to CommonJS app entry point",
            type:         "string",
            demandOption: true
        }
    )
    .option(
        "exeBaseName",
        {
            describe:     "Base name of the output executable (without extension)",
            type:         "string",
            demandOption: true
        }
    );
};


interface ISeaConfig {
    main: string;
    output: string;
    disableExperimentalSEAWarning: boolean;
}


async function handler(argv: ArgumentsCamelCase<IArgsCommand>): Promise<Result<number, string>> {

    const configRes = await argsToConfig(argv);
    if (configRes.failed) {
        return configRes;
    }

    const config = configRes.value;
    const bundleFile = new File(config.inputCjsFile.directory,
                                config.inputCjsFile.baseName + "-bundle" + config.inputCjsFile.extName);
    const blobFile = new File(config.inputCjsFile.directory,
                              bundleFile.baseName + ".blob");

    // Generate the SEA config file.
    const seaConfigFile = new File(config.inputCjsFile.directory,
                                   "sea-config.json");
    const seaConfig: ISeaConfig = {
        main:                          bundleFile.fileName,
        output:                        blobFile.fileName,
        disableExperimentalSEAWarning: true
    };
    seaConfigFile.writeJsonSync(seaConfig);

    const exeFile = new File(config.inputCjsFile.directory,
                             config.exeBaseName + ".exe");

    const res = pipeAsync(
        bundle(),
        (res) => PromiseResult.bind(async () => {}, res)
    );

    // Bundle
    // esbuild .\\dist\\index.cjs --bundle --platform=node --outfile=.\\dist\\index-bundle.cjs

    // Generate the blob.
    // node --experimental-sea-config sea-config.json

    // Create a copy of the Node executable.
    // node -e \"require('fs').copyFileSync(process.execPath, 'dist/hello.exe')\"

    // Remove the Node executable's signature.
    // signtool remove /s dist/hello.exe

    // Inject the blob into the Node executable.
    // postject dist/hello.exe NODE_SEA_BLOB dist/index-bundle.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2


    // async function lsExample() {
    //     const { stdout, stderr } = await exec("ls");
    //     console.log("stdout:", stdout);
    //     console.error("stderr:", stderr);
    // }

    return new SucceededResult(0);
}


/**
 * Config object for this subcommand.
 */
interface IConfig {
    inputCjsFile: File;
    exeBaseName: string;
}


/**
 * Converts this subcommand's arguments to its configuration object.
 *
 * @param argv - This subcommand's arguments
 * @return If successful, a successful Result containing the config object.
 */
async function argsToConfig(
    argv: ArgumentsCamelCase<IArgsCommand>
): Promise<Result<IConfig, string>> {

    const inputCjsFile = new File(argv.inputCjsFile);
    const exeBaseName = argv.exeBaseName;

    // Validate the exe base name.
    if (exeBaseName.length === 0) {
        return new FailedResult(`Base name of output executable cannot be empty.`);
    }

    // Validate the input CJS JavaScript file.
    const inputCjsExists = await inputCjsFile.exists();
    if (!inputCjsExists) {
        return new FailedResult(`Input CJS file "${inputCjsFile.toString()}" does not exist.`);
    }
    else {
        return new SucceededResult({inputCjsFile, exeBaseName});
    }
}


/**
 * Definition of this subcommand.
 */
export const def = {
    command:     "import",
    description: "Imports files into the specified photo library.",
    builder:     builder,
    handler:     handler
};
