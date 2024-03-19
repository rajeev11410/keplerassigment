const fs = require('fs');

// Read data from CSV file
const data = fs.readFileSync('./data.csv', 'utf8');

// Split data into lines and remove header
const lines = data.trim().split('\n').slice(1);

// Initialize counters for age groups
let ageLessThan20 = 0;
let age20to40 = 0;
let age40to60 = 0;
let ageGreaterThan60 = 0;

// Iterate through each record to count age groups
for (const line of lines) {
    const fields = line.split(',');
    const age = parseInt(fields[2]);

    if (age < 20) {
        ageLessThan20++;
    } else if (age >= 20 && age <= 40) {
        age20to40++;
    } else if (age > 40 && age <= 60) {
        age40to60++;
    } else {
        ageGreaterThan60++;
    }
}

// Calculate total number of users
const totalUsers = lines.length;

// Calculate percentage distribution for each age group
const percentageLessThan20 = ((ageLessThan20 / totalUsers) * 100).toFixed(2);
const percentage20to40 = ((age20to40 / totalUsers) * 100).toFixed(2);
const percentage40to60 = ((age40to60 / totalUsers) * 100).toFixed(2);
const percentageGreaterThan60 = ((ageGreaterThan60 / totalUsers) * 100).toFixed(2);

// Print the report
console.log('Age-Group    % Distribution');
console.log('< 20         ', percentageLessThan20);
console.log('20 to 40     ', percentage20to40);
console.log('40 to 60     ', percentage40to60);
console.log('> 60         ', percentageGreaterThan60);
