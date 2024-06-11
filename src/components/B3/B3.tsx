import axios from "axios";

export default function B3() {
  const getStudentById = () => {
    axios
      .get("http://localhost:3000/students/2")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  getStudentById();
  return <div>B3</div>;
}
