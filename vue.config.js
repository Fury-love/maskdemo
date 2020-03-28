module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.ts',
            template: 'public/index.html',// 模板来源
            filename: 'index.html',// 在 dist/index.html 的输出
            title: 'shopping-center',// 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
        }
    }
};
