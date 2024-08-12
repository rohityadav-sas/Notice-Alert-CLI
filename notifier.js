const notifier = require('node-notifier');
const { exec } = require('child_process');

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