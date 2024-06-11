import axios from "axios";

export default function B6() {
  const updateStudentById = () => {
    const updateStudent = {
      student_name: "Huy",
      email: "huy@gmail.com",
    };
    axios
      .patch("http://localhost:3000/students/3", updateStudent)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  updateStudentById();
  return <div>B6</div>;
}
