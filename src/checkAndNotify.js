const { fetchCurrentNoticesIOM, fetchSavedNoticesIOM, checkForNewNoticesIOM } = require('./iomnotice/noticeManagerIOM');
const { fetchCurrentNoticesIOE, fetchSavedNoticesIOE, checkForNewNoticesIOE } = require('./ioenotice/noticeManagerIOE');
const { notify } = require('./notifier');
const readline = require('readline');

function stopProcess() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    console.log("Press any key to exit...\n");
    process.stdin.on('keypress', () => process.exit());
}

async function fetchCurrentNotices(command) {
    if (command === "iomnotice") {
        return await fetchCurrentNoticesIOM();
    }
    else if (command === "ioenotice") {
        return await fetchCurrentNoticesIOE();
    }
}

async function fetchSavedNotices(command) {
    if (command === "iomnotice") {
        return await fetchSavedNoticesIOM();
    }
    else if (command === "ioenotice") {
        return await fetchSavedNoticesIOE();
    }
}

async function checkForNewNotices(currentNotices, savedNotices, command) {
    if (command === "iomnotice") {
        return await checkForNewNoticesIOM(currentNotices, savedNotices);
    }
    else if (command === "ioenotice") {
        return await checkForNewNoticesIOE(currentNotices, savedNotices);
    }
};

async function checkAndNotify(command) {
    console.log('Fetching notices...');
    const currentNotices = await fetchCurrentNotices(command);
    const savedNotices = await fetchSavedNotices(command);
    console.log('\nChecking for new notices...');
    const newNotices = await checkForNewNotices(currentNotices, savedNotices, command);
    if (newNotices.length > 0) {
        console.log('\nNew notices found');
        console.log(newNotices);
        notify(newNotices, command);
    } else { console.log('\nNo new notices found\n') }
    stopProcess();
}

module.exports = { checkAndNotify };