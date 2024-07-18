// Your code here
// Define global variables or utilities if needed

// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(data => createEmployeeRecord(data));
}

// Function to record an employee's clock-in time
function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });

    return employee;
}

// Function to record an employee's clock-out time
function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });

    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);

    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate total wages for all dates worked
function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}

// Function to calculate payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

// Example usage (for testing purposes)
const employeeData = [
    ["John", "Doe", "Manager", 25],
    ["Jane", "Smith", "Developer", 20]
];

const employees = createEmployeeRecords(employeeData);

createTimeInEvent(employees[0], "2024-07-17 0800");
createTimeOutEvent(employees[0], "2024-07-17 1700");

createTimeInEvent(employees[1], "2024-07-17 0900");
createTimeOutEvent(employees[1], "2024-07-17 1800");

console.log(hoursWorkedOnDate(employees[0], "2024-07-17")); // Example output: 9
console.log(wagesEarnedOnDate(employees[0], "2024-07-17")); // Example output: 225
console.log(allWagesFor(employees[0])); // Example output: 225

console.log(calculatePayroll(employees)); // Example output: 880 (assuming no taxes or deductions)