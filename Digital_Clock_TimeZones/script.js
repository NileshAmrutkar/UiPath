// Time Zone Data
const timeZones = {
    'ny': 'America/New_York',
    'london': 'Europe/London',
    'paris': 'Europe/Paris',
    'dubai': 'Asia/Dubai',
    'india': 'Asia/Kolkata',
    'singapore': 'Asia/Singapore',
    'tokyo': 'Asia/Tokyo',
    'sydney': 'Australia/Sydney',
    'la': 'America/Los_Angeles',
    'local': Intl.DateTimeFormat().resolvedOptions().timeZone
};

// Function to format time
function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Function to format date
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// Function to get time in specific timezone
function getTimeInTimeZone(timeZone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const parts = formatter.formatToParts(new Date());
    const values = {};

    parts.forEach(part => {
        values[part.type] = part.value;
    });

    return {
        time: `${values.hour}:${values.minute}:${values.second}`,
        date: `${values.month}/${values.day}/${values.year}`
    };
}

// Function to update all clocks
function updateClocks() {
    // Update timezone clocks
    for (const [key, timeZone] of Object.entries(timeZones)) {
        if (key !== 'local') {
            const { time, date } = getTimeInTimeZone(timeZone);
            
            const clockElement = document.getElementById(`clock-${key}`);
            const dateElement = document.getElementById(`date-${key}`);
            
            if (clockElement) {
                clockElement.textContent = time;
            }
            if (dateElement) {
                dateElement.textContent = date;
            }
        }
    }

    // Update local time
    const now = new Date();
    const localTime = formatTime(now);
    const localDate = formatDate(now);
    const localTimeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const localClockElement = document.getElementById('clock-local');
    const localDateElement = document.getElementById('date-local');
    const localTimeZoneElement = document.getElementById('timezone-name');

    if (localClockElement) {
        localClockElement.textContent = localTime;
    }
    if (localDateElement) {
        localDateElement.textContent = localDate;
    }
    if (localTimeZoneElement) {
        localTimeZoneElement.textContent = `Your Timezone: ${localTimeZoneName}`;
    }
}

// Initial update
updateClocks();

// Update every second
setInterval(updateClocks, 1000);

// Log timezone information
console.log('World Clock Application Started');
console.log('Your Local Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
