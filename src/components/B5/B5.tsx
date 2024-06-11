import axios from "axios";

export default function B5() {
  const createStudent = () => {
    const newStudent = {
      student_name: "Hồng",
      email: "hong@gmail.com",
      address: "Đắk Lắk",
      phone: "0394395312",
      status: true,
      created_at: "10/04/2000",
    };
    axios
      .post("http://localhost:3000/students", newStudent)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  //   createStudent();
  return <div>B5</div>;
}
