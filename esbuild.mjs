import * as esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";
import { clean } from "esbuild-plugin-clean";
import { sassPlugin } from "esbuild-sass-plugin";
import builtins from "builtin-modules";


const prod = (process.argv[2] === "production");


await esbuild.build({
    entryPoints: ["src/main.ts", "src/styles.scss"],
    outdir: "build",
    bundle: true,
    minify: prod,
    sourcemap: prod ? false : "inline",

    external: ["obsidian", "electron", ...builtins],
    format: "cjs",
    target: "es2020",

    treeShaking: true,

    plugins: [
        clean({
            patterns: ["./build/*"],
        }),
        copy({
            assets: {
                from: "./public/*",
                to: "./",
            },
        }),
        sassPlugin(),
    ],
});
