import fs from 'node:fs';
import yaml from "js-yaml"
import path from "node:path"

const loadYaml = (filename) => {
    // 读取 docs 目录下的 config.yaml 文件
    try {
        //逻辑代码
        const filePath = path.join(filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return yaml.load(fileContents);
    } catch (e) {
        return false;

    }


}


const scanFilePath = (dir) => {
    const file_pathes = fs.readdirSync(dir);
    if (!file_pathes || file_pathes.length === 0) return [];
    const result = {
        file: [],
        path: []
    };
    file_pathes.forEach(file_path => {
        const fileDir = path.join(dir, file_path);
        // 获取文件或目录的状态信息
        const stat = fs.statSync(fileDir);
        if (!stat.isDirectory()) {
            if (file_path.endsWith('.yaml')) return;
            result.file.push(fileDir);
        } else {
            result.path.push(fileDir);
        }
    });
    return result;
}

const loadConfig = (dir, filePath = "") => {
    let nav = []
    const config = loadYaml(path.join(dir, filePath, 'link.yaml'));
    if (!config) return nav;
    Object.keys(config).forEach((item) => {
        let fileDir = path.join(dir, filePath, item);
        const stat = fs.statSync(fileDir);
        if (stat.isDirectory()) {
            let itemLoad = loadConfig(dir, path.join(filePath, item))
            if (itemLoad.length > 0) nav.push({
                text: config[item].text,
                items: itemLoad,
                pathName: path.join(filePath, item)
            })
        } else {
            if (config[item]?.isShow === undefined ? true : config[item].isShow) nav.push({
                text: config[item].text,
                link: `${filePath ? '/' + filePath : ''}/${item.replace('.md', '.html')}`,
                pathName: false
            })
        }
    })
    return nav;
}

const getSidebarItem = (jsonData) => {
    let sidebar = {}
    if (!Array.isArray(jsonData.items) || jsonData.items === 0) return sidebar;
    const jsonDataItems = jsonData.items;
    const jsonDataItemsData = jsonDataItems.filter(item => {
        return item.pathName === false
    }).map(item => {
        return {
            text: item.text,
            link: item.link
        }
    })
    if (jsonDataItemsData.length > 0) sidebar[`/${jsonData.pathName}/`] = {
        text: jsonData.text,
        items: jsonDataItemsData
    }
    jsonDataItems.filter(item => item.pathName).forEach(item => {
        sidebar = Object.assign(sidebar, getSidebarItem(item))
    })
    return sidebar;

}
const getSidebar = (jsonData) => {
    let sidebar = {}
    if (!Array.isArray(jsonData) || jsonData.length === 0) return sidebar;
    jsonData.forEach((item) => {
        if (item.pathName && Array.isArray(item.items)) {
            let siderbarItems = item.items.filter(itemItems => {
                return itemItems.pathName === false
            }).map(itemItemsmap => {
                return {
                    text: itemItemsmap.text,
                    link: itemItemsmap.link,
                }
            })
            if (siderbarItems.length > 0) {
                sidebar[`/${item.pathName}/`] = {
                    text: item.text,
                    items: siderbarItems
                }
            }
            item.items.filter(itemItems => {
                return itemItems.pathName
            }).forEach(itemItems => {
                sidebar = Object.assign(sidebar, getSidebarItem(itemItems))
            })
        }
    })
    return sidebar;
}


export const loadLink = () => {
    const Nav = loadConfig(path.join(__dirname, 'path'), '')
    const Sidebar = getSidebar(Nav)
    return {
        NavData: Nav,
        SidebarData: Sidebar || {}
    }
}
