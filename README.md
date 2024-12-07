# prog3175-assignment2-node-api

# Student Name: Xiangdong Li

# Program: PROG3175

# Assignment 2

# My GitHUb link: https://github.com/JoeJoeLXD/prog3175-assignment2-node-api/blob/main/README.md

Part I, II

# Greetings API

This is an API for greeting users based on the time of day, language, and tone provided in the request. It uses Node.js and SQLite for data handling.

## API Endpoints

---

### 1. Greet Endpoint

**URL:**
##POST## http://localhost:4000/api/greetings/greet

**Description:**
Returns a greeting message based on the provided `timeOfDay`, `language`, and `tone`.

**Request Body:**
{
"timeOfDay": "Morning",
"language": "English",
"tone": "Formal"
}

### Response Example:

{
"greetingMessage": "Good Morning"
}

Response Status Codes:

200 OK: The greeting was found and returned.

---

### 2. Get All Times of Day Endpoint

**URL:**
**GET** http://localhost:4000/api/greetings/timesofday

Description:
Returns a list of all available times of day that are supported by the greetings database.

**Request Body:**
[
"Morning",
"Afternoon",
"Evening"
]

Response Status Codes:

200 OK: Successfully retrieved the list of times of day.

---

### 3. Get Supported Languages Endpoint

**URL:**
**GET** http://localhost:4000/api/greetings/languages

**Description:**
Returns a list of all supported languages for the greeting messages.

Response Status Codes:
[
"English",
"French",
"Spanish"
]

Response Status Codes:

200 OK: Successfully retrieved the list of supported languages.

# Part III

## Console Client

### A console application is provided to interact with the Greetings API. This client fetches available times of day and supported languages, prompts the user for input, and then sends a request to the API to receive an appropriate greeting.

Console Client Features

Fetches available times of day and languages when started.

Prompts the user to select a timeOfDay, language, and tone (Formal or Casual).

Sends a request to the API and displays the greeting.

Example Usage

When running the console application, the user will be asked to select a timeOfDay, language, and tone.

The application will send a request to:
http://localhost:4000/api/greetings/greet
and display the received greeting message.

Running the Console Application

Ensure the Node.js API server is running on:
http://localhost:4000.

Navigate to the console client project directory.

Run the following command:

dotnet run

Follow the prompts to select a time of day, language, and tone.

The greeting message will be displayed upon successful interaction with the API.

---

# prog3175-assignment2-node-api

## Student Name: Xiangdong Li

## Program: PROG3175

## Greetings API - Assignment 3

### Table of Contents

1. [Introduction]
2. [API Endpoints]
   - [Accessing the API]
   - [Example Requests and Responses]
3. [Deployment Information]
4. [Running the Console Client]
   - [Setting Up](#setting-up)
   - [How to Run](#how-to-run)
5. [Error Handling]
6. [Contact](#contact)

### Introduction

This project is a simple web API developed as part of the assignment for the course `PROG3210-24F-Sec2`. The API is deployed using Vercel and provides different greetings based on the time of day, language, and tone specified by the user. A console application has also been created to consume this web API, allowing users to interact with it via the command line.

### API Endpoints

#### Accessing the API

The API has been deployed on Vercel and can be accessed using the following live URL:

**[Greetings API on Vercel](https://prog3175-assignment2-node-api.vercel.app)**

#### Example Requests and Responses

Below are the available API endpoints in this application:

1. **Get a Greeting** (`POST /api/greetings/greet`):

   - **URL**: `/api/greetings/greet`
   - **Method**: POST
   - **Description**: Fetches a greeting message based on the specified time of day, language, and tone.
   - **Request Body**:
     {
    "timeOfDay": "Morning",
    "language": "French",
    "tone": "Casual",
    "greetingMessage": "Salut"
}

2. **Get All Times of Day** (`GET /api/greetings/timesofday`):

   - **URL**: `/api/greetings/timesofday`
   - **Method**: GET
   - **Description**: Returns a list of all available times of day.
   - **Example Response**:
     [
     "Morning",
     "Afternoon",
     "Evening"
     ]

3. **Get Supported Languages** (`GET /api/greetings/languages`):

   - **URL**: `/api/greetings/languages`
   - **Method**: GET
   - **Description**: Returns a list of all languages supported by the API.
   - **Example Response**:
     [
     "English",
     "French",
     "Spanish"
     ]

4. **Get Supported Tones** (`GET /api/greetings/tones`):
   - **URL**: `/api/greetings/tones`
   - **Method**: GET
   - **Description**: Returns a list of all supported tones.
   - **Example Response**:
     [
     "Formal",
     "Casual"
     ]

### Deployment Information

The application is deployed on **Vercel**, a serverless deployment platform that allows for easy hosting and deployment of Node.js applications. Below is a summary of the deployment configuration:

- **Platform**: Vercel
- **Live URL**: [Greetings API on Vercel](https://prog3175-assignment2-node-api.vercel.app)
- **Configuration File**: `vercel.json`
  - Configured for serverless deployment
  - Defines the build and route handling for the application

### Running the Console Client

#### Setting Up

To run the console application that consumes the web API:

1. Clone the GitHub repository.
2. Install the required dependencies for both the Node.js API and the console client.

#### How to Run

1. **Update Base URL**: Make sure the console client points to the live URL of your deployed API (`https://prog3175-assignment2-node-api.vercel.app`).
2. **Execute the Console Client**: Run the console application using an IDE like Visual Studio or directly from the command line.

The console application will prompt you to select a time of day, language, and tone. It will then send a request to the live API and display the greeting response.

### Error Handling

The API is designed to handle errors gracefully:

- **Invalid Requests**: If invalid parameters are passed, the API will return a `400` status code with an appropriate error message.
- **Database Issues**: If there are any issues accessing the database, the API will return a `500` status code.
- **Not Found**: If a greeting could not be found for the provided parameters, the API will return a `404` status code.

### Contact

For any questions or support regarding the Greetings API project, feel free to contact:

- **Name**: Xiangdong Li
- **Student ID**: 8803963
- **Email**: [xli3963@conestogac.on.ca]

