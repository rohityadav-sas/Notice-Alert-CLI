const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const iomFile = path.join(__dirname, './IOMSavedNotices.json');

async function fetchCurrentNoticesIOM() {
    try {
        const currentNotices = [];
        const result = await axios.get('http://www.iomexam.edu.np/index.php/exam/results');
        const $ = cheerio.load(result.data);
        const table = $('.table.table-striped.table-bordered.dTableR tbody');
        for (let i = 0; i < 5; i++) {
            const row = table.eq(i);
            const date = row.find('td').eq(0).text().trim();
            const description = row.find('td').eq(2).text().trim();
            const url = row.find('td').eq(3).find('a').attr('href');
            currentNotices.push({ Date: date, Description: description, Url: url });
        }
        return currentNotices;
    }
    catch (err) {
        throw (err);
    }
}

async function fetchSavedNoticesIOM() {
    try {
        if (!fs.existsSync(iomFile)) {
            fs.writeFileSync(iomFile, '[]');
        }
        const data = fs.readFileSync(iomFile, 'utf-8');
        if (data.length === 0) { return [] };
        return JSON.parse(data);
    }
    catch (err) {
        throw (err);
    }
}

async function saveNotices(notices) {
    fs.writeFileSync(iomFile, JSON.stringify(notices, null, 2));
}

async function checkForNewNoticesIOM(currentNotices, savedNotices) {
    const newNotices = currentNotices.filter((notice) =>
        !savedNotices.some(savedNotice =>
            savedNotice.Date === notice.Date &&
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

module.exports = { fetchCurrentNoticesIOM, fetchSavedNoticesIOM, checkForNewNoticesIOM };