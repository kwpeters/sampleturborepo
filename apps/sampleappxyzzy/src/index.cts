// import { greet } from "@repo/samplelibxyzzy/stringHelpers";

import("@repo/samplelibxyzzy/stringHelpers")
.then(
    (sh) => {
        console.log(sh.greet("Fred"));
    },
    (err) => {}
);
