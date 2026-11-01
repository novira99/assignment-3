export function calculateClassAverage(students, courseId) {
    const grades = students
        .map(student => {
            return student.courses.find(course => {
                return course.courseId === courseId;
            });
        })
        .filter(course => course !== undefined)
        .map(course => course.grade);

    if (grades.length === 0) {
        return 0;
    }

    const total = grades.reduce((sum, grade) => {
        return sum + grade;
    }, 0);

    return total / grades.length;
}

export function findTopStudent(students) {
    if (students.length === 0) {
        return null;
    }

    return students.reduce((topStudent, currentStudent) => {
        if (currentStudent.getAverage() > topStudent.getAverage()) {
            return currentStudent;
        }

        return topStudent;
    });
}

export function filterStudents(students, criteriaFn) {
    return students.filter(criteriaFn);
}