const { fetchCurrentNotices, fetchSavedNotices, checkForNewNotices } = require('./noticeManager');
const readline = require('readline');

function stopProcess() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    console.log("Press any key to exit...\n");
    process.stdin.on('keypress', () => process.exit());
}

async function checkAndNotify() {
    console.log('Fetching notices...');
    const currentNotices = await fetchCurrentNotices();
    const savedNotices = await fetchSavedNotices();
    console.log('\nChecking for new notices...');
    const newNotices = await checkForNewNotices(currentNotices, savedNotices);
    if (newNotices.length > 0) {
        console.log('\nNew notices found');
        console.log(newNotices);
        notify(newNotices);
    } else { console.log('\nNo new notices found\n') }
    stopProcess();

}

module.exports = { checkAndNotify };