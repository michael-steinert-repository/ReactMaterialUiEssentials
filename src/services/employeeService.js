const CONSTANTS = {
    employees: "employees",
    employeeId: "employeeId"
}
export const getDepartmentOptions = () => ([
    {id: "1", title: "Development"},
    {id: "2", title: "Marketing"},
    {id: "3", title: "Accounting"}
]);

export const insertEmployee = (data) => {
    let employees = getEmployees();
    data["id"] = generateEmployeeId();
    employees.push(data);
    localStorage.setItem(CONSTANTS.employees, JSON.stringify(employees));
};

export const updateEmployee = (data) => {
    let employees = getEmployees();
    let recordIndex = employees.findIndex(x => x.id === data.id);
    employees[recordIndex] = {
        ...data
    };
    localStorage.setItem(CONSTANTS.employees, JSON.stringify(employees));
};

export const deleteEmployee = (id) => {
    let employees = getEmployees();
    employees = employees.filter(x => x.id !== id);
    localStorage.setItem(CONSTANTS.employees, JSON.stringify(employees));
};

export const generateEmployeeId = () => {
    if (localStorage.getItem(CONSTANTS.employeeId) == null) {
        localStorage.setItem(CONSTANTS.employeeId, JSON.stringify(["0"]));
    }
    let id = parseInt(localStorage.getItem(CONSTANTS.employeeId));
    localStorage.setItem(CONSTANTS.employeeId, JSON.stringify([(++id).toString()]));
    return id;
};

export const getEmployees = () => {
    if (localStorage.getItem(CONSTANTS.employees) == null) {
        localStorage.setItem(CONSTANTS.employees, JSON.stringify([]));
    }
    let employees = JSON.parse(localStorage.getItem(CONSTANTS.employees));
    let departments = getDepartmentOptions();
    /* Mapping Department Id to Department Title */
    return employees.map(employee => ({
        ...employee,
        department: departments[employee.departmentId - 1].title
    }));
};
