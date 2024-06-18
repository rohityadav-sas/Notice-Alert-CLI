const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const notifier = require('node-notifier');
const later = require('@breejs/later');

async function fetchTexts() {
    const { data } = await axios.get('http://127.0.0.1:5500/index.html');
    const $ = cheerio.load(data);
    const texts = [];
    $('script').remove();
    texts.push($('body').text().trim());
    return texts;
}


async function getSavedTexts() {
    try {
        const data = fs.readFileSync('texts.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveTexts(texts) {
    fs.writeFileSync('texts.json', JSON.stringify(texts, null, 2));
}

function notifynewTexts(texts) {
    notifier.notify({
        title: 'New Texts',
        message: texts.join('\n'),
        timeout: 10
    });
}



async function checkForNewText() {
    const currentTexts = await fetchTexts();
    const savedTexts = await getSavedTexts();
    const newTexts = currentTexts.filter((text) => !savedTexts.includes(text));

    if (newTexts.length > 0) {
        notifynewTexts(newTexts);
        savedTexts.push(...currentTexts);
        saveTexts(savedTexts);
    }
}


later.date.localTime();

let sched = later.parse.text('at 10:51 pm');

later.setInterval(checkForNewText, sched);

