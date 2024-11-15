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

````json
{
  "timeOfDay": "Morning",
  "language": "English",
  "tone": "Formal"
}

### Response Example:
{
  "greetingMessage": "Good Morning"
}

**Response Status Codes:**

**200 OK: The greeting was found and returned.**


-----------------------------------------------------------
### 2. Get All Times of Day Endpoint

**URL:**
**GET** http://localhost:4000/api/greetings/timesofday

**Description: **
Returns a list of all available times of day that are supported by the greetings database.

**Request Body:**
```json
[
  "Morning",
  "Afternoon",
  "Evening"
]

##Response Status Codes:##

200 OK: Successfully retrieved the list of times of day.

---------------------------------------------------------
### 3. Get Supported Languages Endpoint

**URL:**
**GET**  http://localhost:4000/api/greetings/languages

**Description:**
 Returns a list of all supported languages for the greeting messages.

##Response Status Codes:##
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


````
