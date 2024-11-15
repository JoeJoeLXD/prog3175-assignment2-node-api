//Program ID: PROG3210-24F-Sec2
//Purpose: Assignment 2 
//Part III: Consume the Web API using a Console Application
//Created Nov 15 2024 by Xiangdong Li

using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

class Program
{
    private static readonly HttpClient client = new HttpClient();

    static async Task Main(string[] args)
    {
        // Set the base address of API
        client.BaseAddress = new Uri("http://localhost:4000");

        // Fetch the available times of day and languages when the application starts
        var timesOfDay = await GetTimesOfDayAsync();
        var languages = await GetLanguagesAsync();

        if (timesOfDay == null || languages == null)
        {
            Console.WriteLine("Error fetching data from the API. Please ensure the Web API is running.");
            return;
        }

        // Display the available times of day
        Console.WriteLine("Available Times of Day:");
        for (int i = 0; i < timesOfDay.Length; i++)
        {
            Console.WriteLine($"{i + 1}. {timesOfDay[i]}");
        }

        // Get user's choice for time of day with validation
        int timeOfDayIndex = -1;
        while (timeOfDayIndex < 0 || timeOfDayIndex >= timesOfDay.Length)
        {
            Console.Write("\nSelect a time of day by entering the corresponding number: ");
            if (!int.TryParse(Console.ReadLine(), out timeOfDayIndex) || timeOfDayIndex < 1 || timeOfDayIndex > timesOfDay.Length)
            {
                Console.WriteLine($"Invalid input. Please enter a number between 1 and {timesOfDay.Length}.");
                timeOfDayIndex = -1;
            }
            else
            {
                timeOfDayIndex--;
            }
        }

        // Display the available languages
        Console.WriteLine("\nAvailable Languages:");
        for (int i = 0; i < languages.Length; i++)
        {
            Console.WriteLine($"{i + 1}. {languages[i]}");
        }

        // Get user's choice for language with validation
        int languageIndex = -1;
        while (languageIndex < 0 || languageIndex >= languages.Length)
        {
            Console.Write("\nSelect a language by entering the corresponding number: ");
            if (!int.TryParse(Console.ReadLine(), out languageIndex) || languageIndex < 1 || languageIndex > languages.Length)
            {
                Console.WriteLine($"Invalid input. Please enter a number between 1 and {languages.Length}.");
                languageIndex = -1;
            }
            else
            {
                languageIndex--;
            }
        }

        // Get user's choice for tone with validation
        string? selectedTone = null;
        while (selectedTone == null)
        {
            Console.Write("\nSelect a tone (1: Formal or 2: Casual): ");
            var toneInput = Console.ReadLine()?.Trim().ToLower();

            if (toneInput == "1" || toneInput == "formal")
            {
                selectedTone = "Formal";
            }
            else if (toneInput == "2" || toneInput == "casual")
            {
                selectedTone = "Casual";
            }
            else
            {
                Console.WriteLine("Invalid input. Please enter '1' for Formal, '2' for Casual, or type 'Formal' or 'Casual'.");
            }
        }

        // Get the selected time of day and language
        string selectedTimeOfDay = timesOfDay[timeOfDayIndex];
        string selectedLanguage = languages[languageIndex];

        // Send a request to the API to get the greeting
        var greeting = await GetGreetingAsync(selectedTimeOfDay, selectedLanguage, selectedTone);

        if (greeting != null)
        {
            Console.WriteLine($"\nGreeting: {greeting.GreetingMessage}");
        }
        else
        {
            Console.WriteLine("\nError: Unable to fetch the greeting. Please try again.");
        }
    }

    // Method to fetch the available times of day
    private static async Task<string[]?> GetTimesOfDayAsync()
    {
        try
        {
            var response = await client.GetAsync("/api/greetings/timesofday");
            response.EnsureSuccessStatusCode();
            var responseBody = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<string[]>(responseBody);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");
            return null;
        }
    }

    // Method to fetch the supported languages
    private static async Task<string[]?> GetLanguagesAsync()
    {
        try
        {
            var response = await client.GetAsync("/api/greetings/languages");
            response.EnsureSuccessStatusCode();
            var responseBody = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<string[]>(responseBody);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");
            return null;
        }
    }

    // Method to get a greeting based on the time of day, language, and tone
private static async Task<GreetingResponse?> GetGreetingAsync(string timeOfDay, string language, string tone)
{
    try
    {
        // Ensure the property names are camelCase
        var requestBody = new
        {
            timeOfDay = timeOfDay,  // Updated to camelCase
            language = language,    // Updated to camelCase
            tone = tone             // Updated to camelCase
        };

        var json = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await client.PostAsync("/api/greetings/greet", content);
        response.EnsureSuccessStatusCode();

        var responseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"\nAPI Response Body: {responseBody}");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        var greetingResponse = JsonSerializer.Deserialize<GreetingResponse>(responseBody, options);

        if (greetingResponse != null)
        {
            Console.WriteLine($"Debug: Greeting Message - {greetingResponse.GreetingMessage}");
        }

        return greetingResponse;
    }
    catch (Exception e)
    {
        Console.WriteLine($"Error: {e.Message}");
        return null;
    }
}


    // Greeting response class for deserialization
    public class GreetingResponse
    {
        public string? GreetingMessage { get; set; }
    }
}




