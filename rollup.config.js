import { nodeResolve } from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-ts";
import builtins from "builtin-modules";


export default {
    input: "src/main.ts",
    output: {
        dir: "build",
        entryFileNames: "main.js",
        assetFileNames: "styles.css",

        format: "cjs",
        sourcemap: "inline",
        exports: "default",
    },
    external: [
        "obsidian",
        "electron",
        ...builtins,
    ],
    plugins: [
        nodeResolve({ browser: true }),
        ts({tsconfig: "tsconfig.json"}),
    ]
};
