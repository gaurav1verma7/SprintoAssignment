
# Automated Testing for MakeMyTrip International Trip Planning Featurefor Sprinto Interview 

This repository contains an end-to-end testing framework using Playwright. The structure is designed for the Sprinto interview process.

## Folder structure
```
├── constants                      # Constants folder
│   └── PageConstants.js           # Constants related to pages
├── package-lock.json              # Lock file for dependency versions
├── package.json                   # Project configuration and dependencies
├── pages                          # Page objects folder
│   ├── BasePage.js                # Base page object
│   ├── HomePage.js                # Home page object
│   ├── InternationalTrip.js       # International trip page object
│   ├── TripFaresAndFlights.js     # Trip fares and flights page object
│   └── common.js                  # Common utilities for page objects
├── playwright.config.js           # Playwright configuration file
├── resources                      # Resources folder
│   └── screenshotReports          # Directory for screenshot reports
└── tests                          # Tests folder
    └── makeMyTrip.spec.js         # Test file for MakeMyTrip application
```

## Test Cases
### makeMyTrip.spec.js
- **Verify International Trip Planning Feature**
- **Navigate to Flight Page**
- **Choose Planning a Trip Internationally Functionality**
- **Search Flights Without 'To' City**
- **Choose Planning a Trip Internationally Functionality in Round Trip**
- **Choose Planning a Trip Internationally Functionality in One Way Trip**

## Getting Started 
### 1. Clone this repository
```bash
git clone https://github.com/gaurav1verma7/SprintoAssignment.git
cd SprintoAssignment
```

### 2. Add dependencies
```bash
npm install
npx playwright install
```

### 3. Running Test Locally 
```bash 
npx playwright test        # For headless run
npx playwright test --headed   # For headed run
```

### 5. Additional Commands
Feel free to use any of the following commands supported by Playwright. See the [Playwright documentation](https://playwright.dev/docs/intro) for more details.


### 4.Configuration
The configuration for Playwright is located in `playwright.configjs.`

### Author
[@gaurav1verma7](https://github.com/gaurav1verma7)

   


