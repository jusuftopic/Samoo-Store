// Funkcionalnost za login i registraciju
var adminAccount = {
    email: "admin@gmail.com",
    password: "admin123"
}
var LOCAL_STORAGE_EMPLOYEE_DATA = "Employee_Account";


function openLogin(isAdmin) {
    if(isAdmin === true) {
        document.getElementById("adminLogin").className += ' displaySidee';
    }
    else {
        document.getElementById("employeeLogin").className += ' displaySidee';
    }
}
function closeLogin(isAdmin) {
    if(isAdmin === true) {
          document.getElementById("adminLogin").className = 'adminPanelLogin';
    }
    else {
        document.getElementById("employeeLogin").className = 'employeePanelLogin';
    }
}


function adminLogin() {
    if (isAdmin()) {
        document.getElementById("display1").style.display = 'block';
        document.getElementById("error2").style.display = 'none';
        // ukoliko je login uspjesan, prebaci na admin panel html
        setTimeout(function () {
            location = 'adminpanel.html'
        }, 2000)
    }
    else {
        document.getElementById("error2").style.display = 'block';
        document.getElementById("emailM").value = '';
        document.getElementById("passwordM").value = '';
    }
}

function isAdmin() {
    var email = document.getElementById("emailM").value;
    email.toLowerCase();
    var password = document.getElementById("passwordM").value;
    return email === adminAccount.email && password === adminAccount.password
}

function signUpEmployee() {
    var name = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var employeeAccount = {
        name: name,
        email: email,
        password: password
    }
    
    // sacuvaj employee podatke u local storage prilikom registracije
    localStorage.setItem(LOCAL_STORAGE_EMPLOYEE_DATA, JSON.stringify(employeeAccount));
    document.getElementById("display").style.display = 'block';
    setTimeout(function () {
        location = 'employelogin.html'
    }, 2000)

};

function employelogin() {
    if (isEmployeeRegistred()) {
        document.getElementById("display1").style.display = 'block';
        document.getElementById("error2").style.display = 'none';
        setTimeout(function () {
            location = 'employeepanel.html'
        }, 2000)
    }
    else {
        document.getElementById("error2").style.display = 'block';
    }
}

function isEmployeeRegistred() {
    var email = document.getElementById("emailM").value;
    var password = document.getElementById("passwordM").value;
    // employee podaci se uzimaju iz local storage i uporedjuju sa unesenim podacima.
    var savedEmployee = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EMPLOYEE_DATA));

    if(savedEmployee) {
        return email === savedEmployee.email && password === savedEmployee.password;
    }

    return false;
}

function logout() {
    var logoutArea = document.getElementById("container");
    var a = document.createElement("h1");
    a.setAttribute("class", "logout");
    var logoutFA = document.createElement("i");
    logoutFA.setAttribute("class", "fa fa-spinner");
    a.appendChild(logoutFA);
    var atext = document.createTextNode(" Logging Out...");
    a.appendChild(atext);
    logoutArea.appendChild(a);
    setTimeout(function () {
        location = 'index.html';
    }, 2000)
}