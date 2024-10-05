const { fetchCurrentNoticesIOE } = require('../ioe/IOEUtils');
const { fetchCurrentNoticesIOM } = require('../iom/IOMUtils');
const { fetchSavedNotices, checkForNewNotices } = require('./noticeManager');
const paths = require('./filePaths');
const { notify } = require('./notifier');
const readline = require('readline');

function stopProcess() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    console.log("Press any key to exit...\n");
    process.stdin.on('keypress', () => process.exit());
}

async function fetchNewNotices(fetchFunction, typeOrFilePath, filePath) {
    try {
        const currentNotices = await fetchFunction(typeOrFilePath);
        const savedNotices = await fetchSavedNotices(filePath);
        return await checkForNewNotices(currentNotices, savedNotices, filePath);
    } catch (error) {
        console.error(`Error fetching notices: ${error.message}`);
        throw error;
    }
}

async function handleNotices(source, filePaths, fetchFunction) {
    const newNotices = [];
    try {
        for (const [type, filePath] of Object.entries(filePaths)) {
            newNotices.push(...await fetchNewNotices(fetchFunction, type, filePath));
        }
        return newNotices;
    } catch (error) {
        console.error(`Error fetching notices for ${source}: ${error.message}`);
        throw error;
    }
}

async function checkAndNotify(command) {
    console.log('Fetching notices...');
    let newNotices = [];

    if (command === 'ioenotice') {
        const filePaths = {
            "exam": paths.IOEExamNoticesPath,
            "entrance": paths.IOEEntranceNoticesPath,
            "official": paths.IOEOfficialPageNoticesPath,
            "admission": paths.IOEAdmissionNoticesPath
        };
        newNotices = await handleNotices('IOE', filePaths, fetchCurrentNoticesIOE);
    } else if (command === 'iomnotice') {
        const filePaths = { "exam": paths.IOMExamNoticesPath };
        newNotices = await handleNotices('IOM', filePaths, fetchCurrentNoticesIOM);
    }

    if (newNotices.length > 0) {
        console.log('\nNew notices found');
        console.log(newNotices);
        notify(newNotices, command);
    } else {
        console.log('\nNo new notices found\n');
    }

    stopProcess();
}

module.exports = { checkAndNotify };
