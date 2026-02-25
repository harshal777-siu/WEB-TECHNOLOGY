document.addEventListener("DOMContentLoaded", loadStudents);

const form = document.getElementById("studentForm");
const studentTable = document.querySelector("#studentTable tbody");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;
    const email = document.getElementById("email").value;

    const student = { id: id ? id : Date.now(), name, age, grade, email };

    let students = getStudents();

    if (id) {
        students = students.map(s => s.id == id ? student : s);
    } else {
        students.push(student);
    }

    localStorage.setItem("students", JSON.stringify(students));

    form.reset();
    document.getElementById("studentId").value = "";

    loadStudents();
});

function getStudents() {
    return JSON.parse(localStorage.getItem("students")) || [];
}

function loadStudents() {
    const students = getStudents();
    studentTable.innerHTML = "";

    students.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>${student.email}</td>
            <td>
                <button class="action-btn edit" onclick="editStudent(${student.id})">Edit</button>
                <button class="action-btn delete" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;

        studentTable.appendChild(row);
    });
}

function editStudent(id) {
    const students = getStudents();
    const student = students.find(s => s.id == id);

    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("grade").value = student.grade;
    document.getElementById("email").value = student.email;
}

function deleteStudent(id) {
    let students = getStudents();
    students = students.filter(s => s.id != id);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}
