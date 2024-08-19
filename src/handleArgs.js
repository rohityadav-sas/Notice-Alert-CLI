const { checkAndNotify } = require('./checkAndNotify');

const args = process.argv.slice(2);

function parseInterval(argument) {
    const match = argument.match(/^(\d+)(hr|h|min|m|sec|s)$/i);
    if (!match) {
        console.log("Invalid interval format. Using default interval.");
        return 1000 * 60 * 60; // Default interval: 1 hour
    }

    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    switch (unit) {
        case 'hr':
        case 'h':
            return { duration: value * 1000 * 60 * 60, unit: "hours" }; // Convert hours to milliseconds
        case 'min':
        case 'm':
            return { duration: value * 1000 * 60, unit: "minutes" }; // Convert minutes to milliseconds
        case 'sec':
        case 's':
            return { duration: value * 1000, unit: "seconds" }; // Convert seconds to milliseconds
        default:
            return { duration: 1000 * 60 * 60, unit: "hour" }; // Default to 1 hour if unknown unit
    }
}


function handleArguments(command) {
    switch (args[0]) {
        case '-interval':
            const intervalArg = args[1];
            let interval = parseInterval(intervalArg);
            console.log(`\nRunning script in interval mode with ${interval.duration / 1000 / (interval.unit === 'seconds' ? 1 : interval.unit === 'minutes' ? 60 : 3600)} ${interval.unit}\n`);
            checkAndNotify();
            setInterval(checkAndNotify, interval.duration);
            break;
        case '-help':
            if (args.length === 0 || args.includes('-help')) {
                console.log(`\nUsage: iomnotice [-interval duration] [-help]\n
    -interval duration : Run the script in interval mode with the specified duration.
                         Duration can be in hours (hr, h), minutes (min, m), or seconds (sec, s).
                         Default duration is 1 hour.
                         Example: iomnotice -interval 30min
                `);
            }
            break;
        default:
            if (args.length === 0) {
                console.log("\nRunning script in interval mode with default interval 1 hour\n");
                checkAndNotify(command);
                setInterval(checkAndNotify, 3600000);
            }
            else {
                console.log('\nInvalid arguments. Use iomnotice -help for help\n');
            }
            break;
    }
}

module.exports = { handleArguments };
