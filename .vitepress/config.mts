import {defineConfig} from 'vitepress'
import * as fs from "node:fs";
import * as path from "node:path";
import {loadLink} from "../config"
const {NavData,SidebarData} = loadLink();
function copyDirSync(source, target) {
    // Check if target directory exists, if not, create it
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    // Get the files in the source directory
    const files = fs.readdirSync(source);

    for (let i = 0; i < files.length; i++) {
        const current = fs.lstatSync(path.join(source, files[i]));
        if (current.isDirectory()) {
            // If directory, recursive call with new source and target
            copyDirSync(path.join(source, files[i]), path.join(target, files[i]));
        } else if (current.isSymbolicLink()) {
            // If symlink, create a new one in the target directory
            const symlink = fs.readlinkSync(path.join(source, files[i]));
            fs.symlinkSync(symlink, path.join(target, files[i]));
        } else {
            // If file, copy it into the target directory
            fs.copyFileSync(path.join(source, files[i]), path.join(target, files[i]));
        }
    }
}

export default defineConfig({
    srcDir: "./path",
    title: "Jane GM",
    description: "VitePress网站",
    base:'/JaneVitePres/',
    themeConfig: {
        logo: "/assets/avatar.png",
        // https://vitepress.dev/reference/default-theme-config
        nav: NavData,
        // @ts-ignore
        sidebar: SidebarData,
        socialLinks: [
            {icon: 'github', link: '/'}
        ],
        footer: {
            message: 'Telegram: <a href="https://t.me/JianAnn123"> @JianAnn123 </a> ',
            copyright: 'Copyright © 2017-2025 '
        },
    },
    lastUpdated: true,
    buildEnd: function (app) {
        copyDirSync(`./${app.assetsDir}`, `${app.outDir}/${app.assetsDir}`)
    }
})
