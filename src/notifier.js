const notifier = require('node-notifier');
const { exec } = require('child_process');

async function notify(notices, command) {
    notifier.on('click', function (notifierObject, options, event) {
        let notice = notices.find(n => n.Description === options.m);
        if (notice) {
            notice.Url = notice.Url.replace(/ /g, '%20');
            exec(`start ${notice.Url}`);
        }
    });

    for (let notice of notices) {
        notifier.notify({
            title: "Date: " + notice.Date,
            message: notice.Description,
            icon: './assets/icon.png',
            wait: true
        });
    }
}

module.exports = { notify };