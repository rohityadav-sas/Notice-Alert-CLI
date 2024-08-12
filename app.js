const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const notifier = require('node-notifier');
const { exec } = require('child_process');
const readline = require('readline');

function stopProcess() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    console.log("Press any key to exit...");
    process.stdin.on('keypress', () => process.exit());
}


async function fetchCurrentNotices() {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get('http://www.iomexam.edu.np/index.php/exam/results');
            const $ = cheerio.load(result.data);
            const table = $('.table.table-striped.table-bordered.dTableR tbody');
            const currentNotices = [];
            for (let i = 0; i < 5; i++) {
                const row = table.eq(i);
                const date = row.find('td').eq(0).text().trim();
                const title = row.find('td').eq(1).text().trim();
                const description = row.find('td').eq(2).text().trim();
                const url = row.find('td').eq(3).find('a').attr('href');
                currentNotices.push({ Date: date, Title: title, Description: description, Url: url });
            }
            resolve(currentNotices);
        }
        catch (err) {
            reject(err);
        }
    });
}

async function fetchSavedNotices() {
    try {
        if (!fs.existsSync('./assets/savedNotices.json')) {
            fs.writeFileSync('./assets/savedNotices.json', '[]');
        }
        const data = fs.readFileSync('./assets/savedNotices.json', 'utf-8');
        if (data.length === 0) { return [] };
        return JSON.parse(data);
    }
    catch (err) {
        console.error('Error reading file');
        return [];
    }
}

async function saveNotices(notices) {
    fs.writeFileSync('./assets/savedNotices.json', JSON.stringify(notices, null, 2));
}

async function checkForNewNotices(currentNotices, savedNotices) {
    const newNotices = currentNotices.filter((notice) =>
        !savedNotices.some(savedNotice =>
            savedNotice.Date === notice.Date &&
            savedNotice.Title === notice.Title &&
            savedNotice.Description === notice.Description
        )
    );
    if (newNotices.length > 0) {

        savedNotices.unshift(...newNotices);
        saveNotices(savedNotices);
        return newNotices;
    }
    else {
        return [];
    }
}

async function notify(notices) {
    notifier.on('click', function (notifierObject, options, event) {
        const notice = notices.find(n => n.Title === options.t.split('\n')[1]);
        if (notice) {
            exec(`start ${notice.Url}`);
        }
    });

    for (let notice of notices) {
        notifier.notify({
            title: "Date: " + notice.Date + '\n' + notice.Title,
            message: notice.Description,
            icon: './assets/icon.png',
            wait: true
        });
    }
}

async function main() {
    console.log('Fetching notices...');
    const currentNotices = await fetchCurrentNotices();
    const savedNotices = await fetchSavedNotices();
    console.log('\nChecking for new notices...');
    const newNotices = await checkForNewNotices(currentNotices, savedNotices);
    if (newNotices.length > 0) {
        console.log('\nNew notices found');
        console.log(newNotices);
        notify(newNotices);
    } else { console.log('\nNo new notices\n') }
    stopProcess();

}
main();

const interval = 1000 * 60 * 60; //1 hour
setInterval(main, interval);