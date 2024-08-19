# Notice-Alert-CLI

**NoticeAlertCLI** is a Node.js application that retrieves examination result notifications from the Institute of Engineering (IOE) and Institute of Medicine’s (IOM) website and delivers them directly to your terminal when new notices are available.

## Features

- Fetches the latest exam result notices from the IOM website.

- Compares the fetched notices with previously saved notices to identify new notices.

- Sends desktop notifications for any new notices.

- Allows scheduling of the notice fetching and notification process with customizable intervals.

## Prerequisites

- Node.js (v12 or higher)

- npm (v6 or higher)

## Installation

- Install the package globally using npm:
    ```bash
    npm install -g notice-alert-cli
    ```

- Or install it locally in your project:
    ```bash
    npm install notice-alert-cli
    ```

## Usage
- To run the application with a specific interval:

    ```bash
    npx iomnotice -interval 30min
    ```
    OR
    ```bash
    npx ioenotice -interval 30min
    ```
*Duration can be in hours (hr or h), minutes (min or m), or seconds (sec or s).*

- To run the application with default settings (1-hour interval):

    ```bash
    npx iomnotice
    ```
    OR
    ```bash
    npx ioenotice
    ```

- To see usage instructions:

    ```bash
    npx iomnotice --help
    ```
    OR
    ```bash
    npx ioenotice --help
    ```

## How It Works

- **Fetch Current Notices**: The application fetches the latest notices from the IOE and IOM website using Axios and Cheerio.

- **Fetch Saved Notices**: The application reads previously saved notices from saved Notices.

- **Check for New Notices**: The application compares the current notices with the saved notices to identify any new 
notices.

- **Notify**: If there are any new notices, the application sends desktop notifications using node-notifier.

- **Save Notices**: The application updates the Notices file with any new notices.

- **Scheduling**: The application allows scheduling the notice fetching process with customizable intervals.

## Dependencies

- ***axios***: For making HTTP requests.

- ***cheerio***: For parsing HTML and extracting data.

- ***node-notifier***: For sending desktop notifications.

## License

This project is licensed under the ISC License. See the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
