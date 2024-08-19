const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const ioeFile = path.join(__dirname, './IOESavedNotices.json');

async function fetchCurrentNoticesIOE() {
    try {
        const currentNotices = [];
        const result = await axios.get('http://exam.ioe.edu.np/');
        const $ = cheerio.load(result.data);
        const table = $('#datatable tbody tr');
        for (let i = 0; i < 5; i++) {
            const row = table.eq(i);
            const date = row.find('td').eq(2).text().trim();
            const description = row.find('td').eq(1).text().trim();
            const url = 'http://exam.ioe.edu.np' + row.find('td').eq(3).find('a').eq(1).attr('href');
            currentNotices.push({ Date: date, Description: description, Url: url });
        }
        return currentNotices;
    }
    catch (err) {
        throw (err);
    }
}

async function fetchSavedNoticesIOE() {
    try {
        if (!fs.existsSync(ioeFile)) {
            fs.writeFileSync(ioeFile, '[]');
        }
        const data = fs.readFileSync(ioeFile, 'utf-8');
        if (data.length === 0) { return [] };
        return JSON.parse(data);
    }
    catch (err) {
        throw (err);
    }
}

async function saveNotices(notices) {
    fs.writeFileSync(ioeFile, JSON.stringify(notices, null, 2));
}

async function checkForNewNoticesIOE(currentNotices, savedNotices) {
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

module.exports = { fetchCurrentNoticesIOE, fetchSavedNoticesIOE, checkForNewNoticesIOE };