import { greet } from "@repo/samplelibxyzzy/stringHelpers";


export async function main(): Promise<number> {
    await Promise.resolve(0);
    console.log(greet("Fred"));
    return 0;
}
