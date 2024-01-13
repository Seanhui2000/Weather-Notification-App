# Weather Notification App

## Overview

The Weather Notification App is a web application that provides local weather data for a specified city. It includes a feature to send weather notifications via SMS to a specified phone number using AWS Simple Notification Service (SNS).

## Features

- Display local weather data including average temperature and weather conditions.
- Send weather notifications as SMS to a specified phone number using AWS SNS.

## Prerequisites

Before running the app, make sure you have the following:

- Node.js installed
- AWS account with access to SNS and IAM for creating users and obtaining access keys

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### Set Up AWS SNS
2.1 Create an SNS Topic
1. Go to the AWS SNS Console.
2. Click on "Create Topic."
3. Enter a name for your topic (e.g., "WeatherAlerts").
4. Click on "Create Topic."

2.2 Subscribe Your Phone Number
1. In the SNS Console, select the topic you just created.
2. Click on "Create Subscription."
3. Choose "SMS" as the protocol.
4. Enter your iPhone number with the country code (e.g., +1234567890).
5. Click on "Create Subscription."
6. Confirm the subscription on your phone.

2.3 Obtain AWS Credentials
1. Go to the AWS IAM Console.
2. Create a new IAM user or use an existing one.
3. Attach the "AmazonSNSFullAccess" policy to the user.
4. Retrieve the Access Key ID and Secret Access Key for the user.

### Configure AWS SDK
```Javascript
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
    region: 'YOUR_AWS_REGION'
});

const sns = new AWS.SNS();
```

### Usage
1. Open the Weather Notification App in your browser.
2. Enter the specified city for weather data.
3. View the local weather information on the webpage.
4. Weather notifications will be sent to your iPhone via SMS.