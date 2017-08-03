const fs = require('fs');

function formatDate(input) {
    let r = input.toString().length === 1 ? `0${input}` : input;
    r = r.toString();
    if (r === '60') {
        r = '00';
    }
    return r;
}

const nowDate = new Date();
const year = nowDate.getFullYear();
const month = formatDate(nowDate.getMonth() + 1);
const day = formatDate(nowDate.getDate());

const title = `${year}${month}${day}`;

const dst = `${title}.md`;

fs.writeFile(dst, '');
const logger = fs.createWriteStream(dst, {
    flags: 'a', // 'a' means appending (old data will be preserved)
});

logger.write(`# ${title} \n`);
logger.write(`\n`);
logger.write(`## TODO\n`);
logger.write(`\n`);
logger.write(`## 记录\n`);
logger.write('时间 | 事件 \n');
logger.write('------------ | ------------- \n');
const minuteInterval = 15;
const minHour = 8;
const maxHour = 18;
for (let hour = minHour; hour <= maxHour; hour++) {
    for (let minute = 0; minute < 60;) {
        const minuteStart = formatDate(minute);
        const hourStart = formatDate(hour);

        let minuteEnd = minute + minuteInterval;
        let hourEnd = minuteEnd === 60 ? (hour + 1) : hour;
        hourEnd = formatDate(hourEnd);
        minuteEnd = formatDate(minuteEnd);
        logger.write(`${hourStart}:${minuteStart} - ${hourEnd}:${minuteEnd} | \n`);
        minute += minuteInterval;
    }
}
