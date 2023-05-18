const factories = [
    { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
    { name: "BR2", employees: ["Jessie", "Karen", "John"] },
    { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
    { name: "BR4", employees: [] }
];

//Q1
function countEmployeesByFactory() {
    return factories.map(factory => ({ 
        name: factory.name, 
        count: factory.employees.length 
    }));
}

//Q2
function countFactoriesByEmployee() {
    const employeeCount = {};
  
    for (let factory of factories) {
        for (let employee of factory.employees) {
          if(employeeCount[employee]) {
            employeeCount[employee]++;
          } else {
            employeeCount[employee] = 1;
          }
        }
    }

    const result = [];
    for (let employee in employeeCount) {
        result.push({ employee: employee, count: employeeCount[employee] });
    }
  
    return result;
}

//Q3
function sortEmployeesAlphabetically() {
    return factories.map(factory => ({ 
        name: factory.name, 
        employees: factory.employees.sort() 
    }));
}


console.log(countEmployeesByFactory(factories));
console.log(countFactoriesByEmployee(factories));
console.log(sortEmployeesAlphabetically(factories));

const employeeType = [
    {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
    {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
    {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];

const employees = [
      {id: 1, name: "Alice", type: 2},
      {id: 2, name: "Bob", type: 3},
      {id: 3, name: "John", type: 2},
      {id: 4, name: "Karen", type: 1},
      {id: 5, name: "Miles", type: 3},
      {id: 6, name: "Henry", type: 1}
];

const tasks = [
    {id: 1, title: "task01", duration: 60}, //min
    {id: 2, title: "task02", duration: 120},
    {id: 3, title: "task03", duration: 180},
    {id: 4, title: "task04", duration: 360},
    {id: 5, title: "task05", duration: 30},
    {id: 6, title: "task06", duration: 220},
    {id: 7, title: "task07", duration: 640},
    {id: 8, title: "task08", duration: 250},
    {id: 9, title: "task09", duration: 119},
    {id: 10, title: "task10", duration: 560},
    {id: 11, title: "task11", duration: 340},
    {id: 12, title: "task12", duration: 45},
    {id: 13, title: "task13", duration: 86},
    {id: 14, title: "task14", duration: 480},
    {id: 15, title: "task15", duration: 900}
];

//Q4
function getTotalHours() {
    let totalHours = 0;
    for (let type of employeeType) {
        let startHour = parseInt(type.work_begin.split(':')[0]);
        let endHour = parseInt(type.work_end.split(':')[0]);
        totalHours += (endHour >= startHour) ? endHour - startHour : (24 - startHour) + endHour;
    }
    return totalHours;
}

//Q5
//Solution 1
function howManyEmployeeByTime1(time) {
    let inputHour = parseInt(time.split(':')[0]);
    let employeeCount = 0;

    for (let employee of employees) {
        let type = employeeType.find(eType => eType.id === employee.type);
        let startHour = parseInt(type.work_begin.split(':')[0]);
        let endHour = parseInt(type.work_end.split(':')[0]);
        if ((startHour <= endHour && inputHour >= startHour && inputHour < endHour) || (startHour > endHour && (inputHour >= startHour || inputHour < endHour))) {
            employeeCount++;
        }
    }
    return employeeCount;
}
//Solution 2
function howManyEmployeeByTime2(time) {
    let inputHour = parseInt(time.split(':')[0]);
    let employeeCount = 0;
    let rangeType = {}

    for (let type of employeeType) {
        let startHour = parseInt(type.work_begin.split(':')[0]);
        let endHour = parseInt(type.work_end.split(':')[0]);
        if ((startHour <= endHour && inputHour >= startHour && inputHour < endHour) || (startHour > endHour && (inputHour >= startHour || inputHour < endHour))) {
            rangeType[type.id] = true;
        }
    }

    for (let employee of employees) {
        if (rangeType[employee.type]){
            employeeCount++;
        }
    }

    return employeeCount;
}

//Q6
function workDaysToFinishTasks() {
    let totalTaskMinutes = tasks.reduce((acc, task) => acc + task.duration, 0);

    const employeeTypeCount = {};
  
    for (let employee of employees) {
        if(employeeTypeCount[employee.type]) {
            employeeTypeCount[employee.type]++;
        } else {
            employeeTypeCount[employee.type] = 1;
        }
    }

    let totalHours = 0;
    for (let type of employeeType) {
        let startHour = parseInt(type.work_begin.split(':')[0]);
        let endHour = parseInt(type.work_end.split(':')[0]);
        let typeHours = (endHour >= startHour) ? endHour - startHour : (24 - startHour) + endHour;
        totalHours += typeHours * employeeTypeCount[type.id];
    }

    let totalMinutesInDay = totalHours * 60;
    return Math.ceil(totalTaskMinutes / totalMinutesInDay);
}

console.log(getTotalHours());
console.log(howManyEmployeeByTime1('13:00:00'));
// console.log(howManyEmployeeByTime2('13:00:00'));
console.log(workDaysToFinishTasks());