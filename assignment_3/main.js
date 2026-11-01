import { Student } from "./models.js";
import { fetchStudents } from "./database.js";

import {
    calculateClassAverage,
    findTopStudent,
    filterStudents
} from "./analytics.js";

console.log("Fetching student data...");

fetchStudents((rawData) => {

    const students = rawData.map(student => {
        return new Student(
            student.id,
            student.name,
            student.courses
        );
    });

    console.log("Students loaded successfully!");

    // Test immutable ID
    console.log("Original ID:", students[0].id);

    try {
        students[0].id = 999;
    } catch (error) {
        console.log("ID cannot be modified!");
    }

    console.log("ID after modification attempt:", students[0].id);

    // Calculate class average
    const classAverage = calculateClassAverage(students, 101);

    console.log("Course 101 Average:", classAverage.toFixed(2));

    // Find top student
    const topStudent = findTopStudent(students);

    console.log("Top Student:", topStudent.name);

    // Filter students taking Course 102
    const course102Students = filterStudents(students, student => {
        return student.courses.some(course => course.courseId === 102);
    });

    const studentNames = course102Students.map(student => student.name);

    console.log("Students taking Course 102:", studentNames.join(", "));
});