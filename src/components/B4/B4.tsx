import axios from "axios";

export default function B4() {
  const removeStudentById = () => {
    axios
      .delete("http://localhost:3000/students/4")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  removeStudentById();
  return <div>B4</div>;
}
