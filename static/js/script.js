console.log("Welcome to AgriCashew!");
window.onload = function () {
    console.log("AgriCashew homepage loaded successfully.");
};

// Get the Farmer Registration Form
const farmerForm = document.getElementById("farmerForm");

// Check whether the form exists
if (farmerForm) {

    farmerForm.addEventListener("submit", function(event) {

        // Stop the form from submitting automatically
        event.preventDefault();

        // Get values from input fields
        const farmerId = document.getElementById("farmerId").value.trim();

        const name = document.getElementById("name").value.trim();

        const phone = document.getElementById("phone").value.trim();

        const experience = document.getElementById("experience").value;

        const password = document.getElementById("password").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        // Check Farmer ID
        if (farmerId === "") {
            alert("Please enter Farmer ID");
            return;
        }

        // Check Name
        if (name === "") {
            alert("Please enter your name");
            return;
        }

        // Check Phone Number
        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }

        // Check Experience
        if (experience === "" || Number(experience) < 0) {
            alert("Please enter valid farming experience");
            return;
        }

        // Check Password Length
        if (password.length < 6) {
            alert("Password must contain at least 6 characters");
            return;
        }

        // Check Password Match
        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        // If all validations pass
        alert("Farmer Registration Form Validated Successfully!");

    });

}

// Get Buyer Registration Form
const buyerForm = document.getElementById("buyerForm");

if (buyerForm) {

    buyerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const buyerId = document.getElementById("buyerId").value.trim();

        const name = document.getElementById("buyerName").value.trim();

        const phone = document.getElementById("buyerPhone").value.trim();

        const experience = document.getElementById("buyerExperience").value;

        const password = document.getElementById("buyerPassword").value;

        const confirmPassword =
            document.getElementById("buyerConfirmPassword").value;

        if (buyerId === "" || name === "") {
            alert("Please enter Buyer ID and Name");
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Enter a valid 10-digit phone number");
            return;
        }

        if (experience === "" || Number(experience) < 0) {
            alert("Enter valid business experience");
            return;
        }

        if (password.length < 6) {
            alert("Password must contain at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        alert("Buyer Registration Form Validated Successfully!");

    });

}

// Get Farmer Login Form
const farmerLoginForm =
    document.getElementById("farmerLoginForm");

if (farmerLoginForm) {

    farmerLoginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const farmerId =
            document.getElementById("loginFarmerId").value.trim();

        const password =
            document.getElementById("loginFarmerPassword").value;

        if (farmerId === "") {
            alert("Please enter Farmer ID");
            return;
        }

        if (password === "") {
            alert("Please enter Password");
            return;
        }

       alert("Login form validation successful!");

       window.location.href = "farmer_dashboard.html";

    });

}


// Get Buyer Login Form
const buyerLoginForm =
    document.getElementById("buyerLoginForm");

if (buyerLoginForm) {

    buyerLoginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const buyerId =
            document.getElementById("loginBuyerId").value.trim();

        const password =
            document.getElementById("loginBuyerPassword").value;

        if (buyerId === "") {
            alert("Please enter Buyer ID");
            return;
        }

        if (password === "") {
            alert("Please enter Password");
            return;
        }

        alert("Buyer Login Form Validated Successfully!");

    });

}


// Get the harvest form elements
const showHarvestForm =
    document.getElementById("showHarvestForm");

const harvestFormContainer =
    document.getElementById("harvestFormContainer");

const harvestForm =
    document.getElementById("harvestForm");

const cancelHarvestForm =
    document.getElementById("cancelHarvestForm");

const harvestTableBody =
    document.getElementById("harvestTableBody");

// Run only on the Farmer Dashboard
if (showHarvestForm && harvestForm) {

    // Set today's date as the default
    const today = new Date();

    const localDate =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    document.getElementById("harvestDate").value = localDate;

    // Show the form
    showHarvestForm.addEventListener("click", function () {
        harvestFormContainer.hidden = false;
    });

    // Hide the form
    cancelHarvestForm.addEventListener("click", function () {
        harvestFormContainer.hidden = true;
        harvestForm.reset();
        document.getElementById("harvestDate").value = localDate;
    });

    // Add harvest to table
    harvestForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const date =
            document.getElementById("harvestDate").value;

        const quantity =
            document.getElementById("quantity").value;

        const quality =
            document.getElementById("quality").value;

        const price =
            document.getElementById("price").value;

        const status =
            document.getElementById("status").value;

        // Create a new table row
        const row = document.createElement("tr");

        const values = [
            date,
            quantity + " kg",
            quality,
            "₹" + price,
            status
        ];

        // Add each value as a table cell
        values.forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Add the new row to the table
        harvestTableBody.appendChild(row);

        alert("Harvest added successfully!");

        // Clear and hide the form
        harvestForm.reset();
        document.getElementById("harvestDate").value = localDate;
        harvestFormContainer.hidden = true;

    });
    // Calculate available harvest quantity
let total = 0;

document.querySelectorAll("#harvestTableBody tr").forEach(function(row) {
    const status = row.cells[4].textContent.trim();

    if (status === "Available") {
        total += parseFloat(
            row.cells[1].textContent.replace(" kg", "")
        ) || 0;
    }
});

document.getElementById("totalHarvest").textContent =
    total + " kg";

}

async function getWeather() {

    const address = document.getElementById("farmAddress").value.trim();
    const weatherInfo = document.getElementById("weatherInfo");

    if (address === "") {
        alert("Please enter your farm address");
        return;
    }

    weatherInfo.innerHTML = "Loading weather information...";

    try {

        // Step 1: Convert address into coordinates
        const geoUrl =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(address)}&count=1&language=en&format=json`;

        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoResponse.ok) {
            throw new Error("Address search failed");
        }

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("Address not found");
        }

        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // Step 2: Get weather using coordinates
        const weatherUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok) {
            throw new Error("Weather request failed");
        }

        // Step 3: Display weather
        weatherInfo.innerHTML = `
            <h3>${location.name}, ${location.country}</h3>
            <h2>${weatherData.current.temperature_2m} °C</h2>
            <p>Humidity: ${weatherData.current.relative_humidity_2m}%</p>
            <p>Wind Speed: ${weatherData.current.wind_speed_10m} km/h</p>
            <p>Updated: ${weatherData.current.time}</p>
        `;

    } catch (error) {

        weatherInfo.innerHTML =
            `<p>${error.message}</p>`;

        console.log(error);
    }
}