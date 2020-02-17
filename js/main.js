/* JS for WATS 3020 Roster Project */

///////////////////////////////////////////////////
//////// TODOs ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Fill in the blanks below to complete each TODO task.                       //
////////////////////////////////////////////////////////////////////////////////

// Created a base class called `Person` 
class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.username = email.split('@')[0];
   }
}
// Created another class that extends the `Person` class called `Student`.
class Student extends Person {
    constructor(name, email) {
        super(name, email);
        this.attendance = [];
    }
// Created a method on the `Student` class called `calculateAttendance`.
    calculateAttendance() {
        if (this.attendance.length > 0) {
            let counter = 0;
            //find the total number of days present
            for (let mark of this.attendance) {
                counter += mark;
            }
            let attendancePercentage = (counter / this.attendance.length) * 100;
            return `${attendancePercentage.toFixed(2)}%`; 
        } else {
            return '0%';
        }
    }
}

// Created a class that extends the `Person` class called `Teacher`.
class Teacher extends Person {
    constructor(name, email, honorific){
        super(name, email);
        this.honorific = honorific;
    }
}


class Course {
    constructor(courseCode, courseTitle, courseDescription){
        this.code = courseCode;
        this.title = courseTitle;
        this.description = courseDescription;
        this.teacher = null;
        this.students = [];
    }

    /////////////////////////////////////////
    // TODO: ADD the `addStudent()` method /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //
    // Create a method called `addStudent()` that prompts the user for
    // information required to create a new `Student` object (`name`, `email`)
    // and does so, then adds the student to the `this.students` Array. Be sure
    // to update the roster display by calling `updateRoster()`. You will need
    // to reference the Class instance using `this` as a parameter for
    // `updateRoster()`, so it might look like this: `updateRoster(this)`.
    addStudent() {
        let name = prompt("Enter student full name:", "Speeder 1/c Francis Rizzo");
        let email = prompt("Enter student email:", "rizzof@imperialinfantry.mil");
        let newStudent = new Student(name, email);
        this.students.push(newStudent);
        updateRoster(this);
    }

    /////////////////////////////////////////
    // TODO: ADD the `setTeacher()` method /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //
    // Create a method called `setTeacher()` that prompts the user for the
    // information required to create a `Teacher` object (`name`, `email`) and
    // does so, then sets the `this.teacher` property equal to the new `Teacher` object.
    setTeacher() {
        let name = prompt("Enter full teacher name:","Maximillian Veers");
        let email = prompt("Enter teacher email:","veersm@imperialinfantry.mil");
        let honorific = prompt("Enter honorific:","General");
        this.teacher = new Teacher(name, email, honorific);
        updateRoster(this);
    }
    /////////////////////////////////////////
    // TODO: ADD `markAttendance()` method /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //
    // TODO: Create a method to mark a student's attendance called `markAttendance()`.
    // This method should accept a parameter called `username` containing the
    // `username` that will match the `username` property on the `Student` object.

    // TODO: The FIRST step to create a functioning `markAttendance()` method is
    // to retreive the `Student` object out of the `this.students` Array. You
    // can use the `this.findStudent()` method (provided below) to accomplish
    // that goal. Note that you will also have to handle two cases: The default
    // behavior should be to mark the student present. The alternate behavior
    // should be to mark the student absent.

    // TODO: Now that we have retrieved the specific `Student` object we want
    // to work with, we can use the appropriate method on the `Student` object
    // to record the attendance.
    markAttendance(username, status ="present") {
        let foundStudent = this.findStudent(username);
        if (status === "present") {
            foundStudent.attendance.push(1);
        } else {
            foundStudent.attendance.push(0);
        }
        updateRoster(this);
    }

    //////////////////////////////////////////////
    // Methods provided for you -- DO NOT EDIT /////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    findStudent(username){
        // This method provided for convenience. It takes in a username and looks
        // for that username on student objects contained in the `this.students`
        // Array.
        let foundStudent = this.students.find(function(student, index){
            return student.username == username;
        });
        return foundStudent;
    }
}


// Prompt User for Course Info  

let courseCode = prompt("Enter the course code:","STrooper 3020");

let courseTitle = prompt("Enter the course title: ","Population Submission and Conditioning");

let courseDescription = prompt("Enter the course description:","Provide the surety of absolute Imperial order and dominion");

// Created a new `Course` object instance called `myCourse` using the three data points just collected from the user.

let myCourse = new Course(courseCode, courseTitle, courseDescription);

///////////////////////////////////////////////////
//////// Main Script /////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// This script runs the page. You should only edit it if you are attempting a //
// stretch goal. Otherwise, this script calls the functions that you have     //
// created above.                                                             //
////////////////////////////////////////////////////////////////////////////////

let rosterTitle = document.querySelector('#course-title');
rosterTitle.innerHTML = `${myCourse.code}: ${myCourse.title}`;

let rosterDescription = document.querySelector('#course-description');
rosterDescription.innerHTML = myCourse.description;

if (myCourse.teacher){
    let rosterTeacher = document.querySelector('#course-teacher');
    rosterTeacher.innerHTML = `${myCourse.teacher.honorific} ${myCourse.teacher.name}`;
} else {
    let rosterTeacher = document.querySelector('#course-teacher');
    rosterTeacher.innerHTML = "Not Set";
}

let rosterTbody = document.querySelector('#roster tbody');
// Clear Roster Content
rosterTbody.innerHTML = '';

// Create event listener for adding a student.
let addStudentButton = document.querySelector('#add-student');
addStudentButton.addEventListener('click', function(e){
    console.log('Calling addStudent() method.');
    myCourse.addStudent();
})

// Create event listener for adding a teacher.
let addTeacherButton = document.querySelector('#add-teacher');
addTeacherButton.addEventListener('click', function(e){
    console.log('Calling setTeacher() method.');
    myCourse.setTeacher();
})

// Call Update Roster to initialize the content of the page.
updateRoster(myCourse);

function updateRoster(course){
    let rosterTbody = document.querySelector('#roster tbody');
    // Clear Roster Content
    rosterTbody.innerHTML = '';
    if (course.teacher){
        let rosterTeacher = document.querySelector('#course-teacher');
        rosterTeacher.innerHTML = `${course.teacher.honorific} ${course.teacher.name}`;
    } else {
        let rosterTeacher = document.querySelector('#course-teacher');
        rosterTeacher.innerHTML = "Not Set";
    }
    // Populate Roster Content
    for (student of course.students){
        // Create a new row for the table.
        let newTR = document.createElement('tr');

        // Create table cells for each data point and append them to the new row.
        let nameTD = document.createElement('td');
        nameTD.innerHTML = student.name;
        newTR.appendChild(nameTD);

        let emailTD = document.createElement('td');
        emailTD.innerHTML = student.email;
        newTR.appendChild(emailTD);

        let attendanceTD = document.createElement('td');
        attendanceTD.innerHTML = student.calculateAttendance();
        newTR.appendChild(attendanceTD);

        let actionsTD = document.createElement('td');
        let presentButton = document.createElement('button');
        presentButton.innerHTML = "Present";
        presentButton.setAttribute('data-username', student.username);
        presentButton.setAttribute('class', 'present');
        actionsTD.appendChild(presentButton);

        let absentButton = document.createElement('button');
        absentButton.innerHTML = "Absent";
        absentButton.setAttribute('data-username', student.username);
        absentButton.setAttribute('class', 'absent');
        actionsTD.appendChild(absentButton);

        newTR.appendChild(actionsTD);

        // Append the new row to the roster table.
        rosterTbody.appendChild(newTR);
    }
    // Call function to set event listeners on attendance buttons.
    setupAttendanceButtons();
}

function setupAttendanceButtons(){
    // Set up the event listeners for buttons to mark attendance.
    let presentButtons = document.querySelectorAll('.present');
    for (button of presentButtons){
        button.addEventListener('click', function(e){
            console.log(`Marking ${e.target.dataset.username} present.`);
            myCourse.markAttendance(e.target.dataset.username);
            updateRoster(myCourse);
        });
    }
    let absentButtons = document.querySelectorAll('.absent');
    for (button of absentButtons){
        button.addEventListener('click', function(e){
            console.log(`Marking ${e.target.dataset.username} absent.`);
            myCourse.markAttendance(e.target.dataset.username, 'absent');
            updateRoster(myCourse);
        });
    }
}

