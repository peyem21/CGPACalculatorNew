import React, { useState } from "react";
import "./CGPACalculator.css";

const CgpaCalculator = () => {
  const [courses, setCourses] = useState([
    { credit: "", grade: "" }

    // Add more course fields as needed
  ]);

  const [cgpa, setCgpa] = useState(0);
  const [message, setMessage] = useState("");

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedCourses = [...courses];
    updatedCourses[index][name] = value;
    setCourses(updatedCourses);
  };

  const calculateCgpa = () => {
    const totalCredits = courses.reduce(
      (total, course) => total + parseFloat(course.credit || 0),
      0
    );
    const totalGradePoints = courses.reduce(
      (total, course) =>
        total + parseFloat(course.credit || 0) * getGradePoint(course.grade),
      0
    );
    const calculatedCgpa = totalGradePoints / totalCredits;
    setCgpa(calculatedCgpa.toFixed(2));

    if (parseInt(cgpa) >= 4.5) {
      setMessage("FirstClass");
    } else if (parseInt(cgpa) >= 4.0) {
      setMessage("SecondClass\n(Upper)");
    } else if (parseInt(cgpa) >= 3.5) {
      setMessage("SecondClass\n(Lower)");
    } else if (parseInt(cgpa) >= 2.5) {
      setMessage("SecondClass\n(Lower)");
    } else {
      setMessage("");
    }
  };

  const getGradePoint = (grade) => {
    // You can define the grading scale and corresponding grade points here
    switch (grade) {
      case "A":
      case "a":
        return 5;
        break;
      case "B":
      case "b":
        return 4;
        break;
      case "C":
      case "c":
        return 3;
        break;
      case "D":
      case "d":
        return 2;
        break;
      case "E":
      case "e":
        return 1;
        break;
      case "F":
      case "f":
        return 0;
        break;
      default:
        alert("Grade should be A,B,C,D,E or F");
    }
  };
  const handleAddMoreInput = () => {
    setCourses([...courses, { credit: "", grade: "" }]);
  };

  const removeLastInput = () => {
    setCourses((prevCourse) => prevCourse.slice(0, -1));
  };

  // const reset = () => {
  //   setCourses(0)
  // }

  return (
    <div>
      <nav>
        CGPACalculator
        <span>BY PEYEM</span>
      </nav>
      <div className="container1">
        <p>INPUT ALL SEMESTERS</p>
        <div className="container1-1">
          {courses.map((course, index) => (
            <div key={index}>
              <input
                type="number"
                name="credit"
                className="credit"
                placeholder="Course Unit"
                value={course.credit}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="text"
                name="grade"
                className="grade"
                placeholder="Grade"
                value={course.grade}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          ))}
        </div>
        <div className="container1-2">
          <button onClick={calculateCgpa}>Calculate CGPA</button>
          <button onClick={handleAddMoreInput}>Add</button>
          <button onClick={removeLastInput}>Delete</button>
        </div>
        <div className="container1-3">
          <div className="container1-3-1">CGPA</div>
          <div className="container1-3-2">{cgpa}</div>
          <div className="container1-3-3">{message}</div>
        </div>
        {/* <button onClick={reset}></button> */}
      </div>
    </div>
  );
};

export default CgpaCalculator;
