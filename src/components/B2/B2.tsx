import axios from "axios";

export default function B2() {
  const getAllStudents = () => {
    axios
      .get("http://localhost:3000/students")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  getAllStudents();
  return <div>B2</div>;
}
