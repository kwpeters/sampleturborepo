import { SomeOption } from "./option.mjs";
import {matchesAny, setFlags, clearFlags, strToRegExp, extractNamedGroup} from "./regexpHelpers.mjs";


describe("matchesAny()", () => {

    it("returns true when one of the regexes matches", () => {
        const str = "2011-12-23\\IMG_4394.JPG";
        const regexes = [
            /foo/,
            /bar/,
            /^\d/
        ];

        expect(matchesAny(str, regexes)).toEqual(true);
    });


    it("returns false when none of the regexes match", () => {
        const str = "2011-12-23\\IMG_4394.JPG";
        const regexes = [
            /foo/,
            /bar/
        ];

        expect(matchesAny(str, regexes)).toEqual(false);
    });

});


describe("clearFlags", () => {
    it("clears the specified flags", () => {
        const srcRegex = /bar/sig;
        const newRegex = clearFlags(srcRegex, ["i", "g", "y"]);
        expect(newRegex.flags).toEqual("s");
    });
});


describe("setFlags()", () => {
    it("sets the specified flags", () => {
        const srcRegex = /bar/s;
        const newRegex = setFlags(srcRegex, ["i", "g"]);
        expect(newRegex.flags).toEqual("gis");
    });
});


describe("strToRegExp()", () => {
    it("succeeds when given a valid regex", () => {
        const result = strToRegExp("foo");
        expect(result.succeeded).toBeTrue();
    });


    it("succeeds when given a regex with flags", () => {
        const result = strToRegExp("/foo/i");
        expect(result.succeeded).toBeTrue();
        expect(result.value?.flags).toEqual("i");
    });


    it("fails when given in invalid regex", () => {
        const result = strToRegExp("foo\\");
        expect(result.failed).toBeTrue();
        expect(result.error?.length).toBeGreaterThan(0);
    });
});


describe("extractNamedGroup()", () => {

    it("returns NoneOption when the regex does not contain any named groups", () => {

        const extractedOpt = extractNamedGroup(/foo/, "bar", "foo");
        expect(extractedOpt.isNone).toBeTrue();
    });


    it("returns NoneOption when named groups exist but not the specified named group", () => {
        const extractedOpt = extractNamedGroup(/(?<begin>foo)/, "bar", "foo");
        expect(extractedOpt.isNone).toBeTrue();
    });


    it("returns a SomeOption containing matched text", () => {
        const extractedOpt = extractNamedGroup(/(?<begin>.{3})/, "begin", "foobarbaz");
        expect(extractedOpt).toEqual(new SomeOption("foo"));
    });


    it("returns a SomeOption even when matched text is an empty string", () => {
        const extractedOpt = extractNamedGroup(/(?<begin>.{0,3})foo/, "begin", "foobarbaz");
        expect(extractedOpt).toEqual(new SomeOption(""));
    });
});
