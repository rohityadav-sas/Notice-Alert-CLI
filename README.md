## Notice-Alert-CLI

**NoticeAlertCLI** is a Node.js application that retrieves examination result notifications from the Institue of Engineering's (IOM) and Institute of Medicine’s (IOM) website and delivers them directly to your terminal.

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

- Allows scheduling of the notice fetching and notification process with customizable intervals.

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/rohityadav-sas/Notice-Alert-CLI
    ```
    
2. Navigate to the source directory:
    ```bash
    cd Notice-Alert-CLI
    ```

3. Install the required dependencies
    ```bash
    npm install
    ```

## Usage

- Make sure you have Node.js and npm installed.

- Clone this repository and navigate to the project directory.

- Install the required dependencies using npm install.

- Run the application with optional arguments:

    - To run the application with a specific interval:
        ```bash
        npx iomnotice -interval duration
        ```
        OR
        ```bash
        npx ioenotice -interval duration
        ```

        Duration can be in hours (hr or h), minutes (min or m), or seconds (sec or s).

        For example:
        ```bash
        npx iomnotice -interval 30min
        
        npx ioenotice -interval 1hr
        ```

    - To run the application with default settings (1 hour interval):
        ```bash
        npx iomnotice
        ```
        OR
        ```bash
        npx ioenotice
        ```

    - To see usage instructions:
        ```bash
        npx iomnotice -help
        ```
        OR 
        ```bash
        npx ioenotice -help
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
