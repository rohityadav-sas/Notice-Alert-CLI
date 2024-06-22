## Notice-Notifier

NoticeNotifier is a Node.js application that retrieves examination result notifications from the Institute of Medicine’s (IOM) website and delivers them directly to your computer when new notices are available.

## Table of Contents

- [Preview](#preview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Dependencies](#dependencies)
- [License](#license)
- [Contributing](#contributing)


## Preview
![preview.png](./assets/preview.png?raw=true)

## Features

- Fetches the latest exam result notices from the IOM website.
- Compares the fetched notices with previously saved notices to identify new notices.
- Sends desktop notifications for any new notices.
- Schedules the notice fetching and notification process to run every hour.

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/rohityadav-sas/Notice-Notifier
    
2. Navigate to the source directory:
    ```bash
    cd Notice-Notifier

3. Install the required dependencies
    ```bash
    npm install

## Usage

- Make sure you have Node.js and npm installed.
- Clone this repository and navigate to the project directory.
- Install the required dependencies using npm install.
- Run the application:
    ```bash
    node app.js

- The application will start fetching notices every hour and will notify you of any new notices.

## How It Works

- **Fetch Current Notices**: The application fetches the latest notices from the IOM website using Axios and Cheerio.
- **Fetch Saved Notices**: The application reads previously saved notices from savedNotices.json.
- **Check for New Notices**: The application compares the current notices with the saved notices to identify any new notices.
- **Notify**: If there are any new notices, the application sends desktop notifications using node-notifier.
- **Save Notices**: The application updates savedNotices.json with any new notices.
- **Scheduling**: The application uses @breejs/later to schedule the notice fetching process to run every hour.

## Dependencies

- **axios**: For making HTTP requests.
- **cheerio**: For parsing HTML and extracting data.
- **node-notifier**: For sending desktop notifications.
- **@breejs/later**: For scheduling tasks.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
