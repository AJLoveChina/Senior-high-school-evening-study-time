let fs = require("fs");

let items = JSON.parse(fs.readFileSync('./result.json'));

items = items.map(item => {
    item[1] = item[1].filter(item => item.time)
    return item;
}).filter(item => item[1].length > 0);

items.sort((a, b) => {
    return b[1].length - a[1].length;
});

console.log(items);
let textArr = [
    "| 城市 | 同学 |",
    "|----------|--------------|"
];
items.forEach(item => {
    let filterArr = item[1].filter(u => u.time);
    let users = filterArr.map((u, index) => `${u.author} (${u.time})${(index + 1) % 5 === 0 ? '<br>': ''}`).join(' ');
    textArr.push(`|${item[0]}(${filterArr.length})|${users}|`)
});

console.log(textArr);
fs.writeFileSync('show.md', textArr.join('\n'));
