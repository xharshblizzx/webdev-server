import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (enrollment) => !(enrollment.user === userId && enrollment.course === courseId),
    );
  }
  function findUsersForCourse(courseId) {
    const { users, enrollments } = db;
    return users.filter((user) =>
      enrollments.some(
        (enrollment) => enrollment.user === user._id && enrollment.course === courseId,
      ),
    );
  }
  return { enrollUserInCourse, unenrollUserFromCourse, findUsersForCourse };
}
