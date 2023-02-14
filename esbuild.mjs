import * as esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";
import builtins from "builtin-modules";


const prod = (process.argv[2] === 'production');


await esbuild.build({
    entryPoints: ["src/main.ts"],
    outdir: "build",
    bundle: true,
    minify: prod,
    sourcemap: prod ? false : "inline",

    external: ["obsidian", "electron", ...builtins],
    format: "cjs",
    target: "es2020",

    treeShaking: true,

    plugins: [
        copy({
            assets: {
                from: "./public/*",
                to: "./",
            },
        }),
    ],
});
