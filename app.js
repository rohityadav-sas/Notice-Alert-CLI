const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const notifier = require('node-notifier');
const { exec } = require('child_process');
const later = require('@breejs/later');
later.date.localTime();


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
        const data = fs.readFileSync('savedNotices.json', 'utf-8');
        return JSON.parse(data);
    }
    catch (err) {
        console.log('Error reading file');
        return [];
    }
}

async function saveNotices(notices) {
    fs.writeFileSync('savedNotices.json', JSON.stringify(notices, null, 2));
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
    for (let notice of notices) {
        notifier.notify({
            title: "Date: " + notice.Date + '\n' + notice.Title,
            message: notice.Description,
            icon: './assets/icon.png',
            wait: true
        });
        notifier.on('click', function (notifierObject, options, event) {
            // For downloading the notice pdf
            exec(`start ${notice.Url}`);
        });
    }
}

async function main() {
    const currentNotices = await fetchCurrentNotices();
    const savedNotices = await fetchSavedNotices();
    const newNotices = await checkForNewNotices(currentNotices, savedNotices);
    if (newNotices.length > 0) { notify(newNotices) } else { console.log('No new notices') }
}


const schedule = later.parse.text('every 1 hour');

later.setInterval(main, schedule);