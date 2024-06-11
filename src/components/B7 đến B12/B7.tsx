import axios, { AxiosResponse } from "axios";
import "./B7.css";
import React, { useEffect, useState } from "react";

interface Students {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: string;
}

export default function B7() {
  const [students, setStudents] = useState<Students[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  );
  const [typeSubmit, setTypeSubmit] = useState<string>("add");
  const [inputValue, setInputValue] = useState<Students>({
    id: Math.ceil(Math.random() * 10000),
    student_name: "",
    email: "",
    address: "",
    phone: "",
    status: false,
    created_at: "",
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [studentsPerPage] = useState<number>(5); // Number of students per page
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const loadData = () => {
    axios
      .get("http://localhost:8000/students")
      .then((data: AxiosResponse<Students[]>) => {
        setTotalStudents(data.data.length);
      })
      .catch((err) => console.log(err));
  };

  const getDataPage = (page: number) => {
    axios
      .get(
        `http://localhost:8000/students?_page=${page}&_limit=${studentsPerPage}`
      )
      .then((data: AxiosResponse<Students[]>) => {
        setStudents(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [inputValue]);

  // Reset giá trị trong form
  const resetData = () => {
    setInputValue({
      id: Math.ceil(Math.random() * 10000),
      student_name: "",
      email: "",
      address: "",
      phone: "",
      status: false,
      created_at: "",
    });
  };
  // Hàm xóa sinh viên
  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:8000/students/${id}`)
      .then(() => {
        students.filter((student) => student.id !== id);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  // Hàm thêm sinh viên
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeSubmit === "add") {
      axios
        .post("http://localhost:8000/students")
        .then(() => {
          loadData();
          resetData();
          setTypeSubmit("add");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(`http://localhost:8000/students/${inputValue.id}`, inputValue)
        .then(() => {
          loadData();
          resetData();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Cập nhật lại state
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // Hàm sửa sinh viên
  const handleEdit = (id: number) => {
    setTypeSubmit("update");
    axios(`http://localhost:8000/students/${id}`)
      .then((data: AxiosResponse<Students>) => {
        setInputValue(data.data), setSelectedStudentId(id);
      })
      .catch((err) => console.log(err));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Hàm phân trang sau
  const handleNext = () => {
    if (currentPage * studentsPerPage < totalStudents) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalStudents / studentsPerPage);
  return (
    <>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Quản lý <b>sinh viên</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <a
                    href="#addEmployeeModal"
                    className="btn
                              btn-success"
                    data-toggle="modal"
                  >
                    <i className="material-icons"></i>
                    <span>Thêm mới sinh viên</span>
                  </a>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    <span className="custom-checkbox">
                      <input type="checkbox" id="selectAll" />
                      <label htmlFor="selectAll" />
                    </span>
                  </th>
                  <th>Tên sinh viên</th>
                  <th>Email</th>
                  <th>Địc chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Lựa chọn</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student: Students) => (
                  <tr>
                    <td>
                      <span className="custom-checkbox">
                        <input
                          type="checkbox"
                          id="checkbox5"
                          name="options[]"
                          defaultValue={1}
                        />
                        <label htmlFor="checkbox5" />
                      </span>
                    </td>
                    <td>{student.student_name}</td>
                    <td>{student.email}</td>
                    <td>{student.address}</td>
                    <td>{student.phone}</td>
                    <td>
                      <a
                        href="#editEmployeeModal"
                        className="edit"
                        data-toggle="modal"
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Edit"
                          onClick={() => handleEdit(student.id)}
                        >
                          
                        </i>
                      </a>
                      <a
                        href="#deleteEmployeeModal"
                        className="delete"
                        data-toggle="modal"
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Delete"
                          onClick={() => setSelectedStudentId(student.id)}
                        >
                          
                        </i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="clearfix">
              <div className="hint-text">
                Hiển thị <b>{students.length}</b> trên <b>{totalStudents}</b>{" "}
                bản ghi
              </div>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <a href="#" className="page-link" onClick={handlePrevious}>
                    Trước
                  </a>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <a
                      href="#"
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <a href="#" className="page-link" onClick={handleNext}>
                    Sau
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Modal HTML */}
      <div id="addEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Thêm mới sinh viên</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Tên sinh viên</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="student_name"
                    onChange={handleChange}
                    value={inputValue.student_name}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    name="email"
                    onChange={handleChange}
                    value={inputValue.email}
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ</label>
                  <input
                    className="form-control"
                    required
                    defaultValue={""}
                    name="address"
                    onChange={handleChange}
                    value={inputValue.address}
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="phone"
                    onChange={handleChange}
                    value={inputValue.phone}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  defaultValue="Cancel"
                />
                <input
                  type="submit"
                  className="btn btn-success"
                  defaultValue="Add"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Edit Modal HTML */}
      <div id="editEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Sửa thông tin sinh viên</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Tên sinh viên</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="student_name"
                    onChange={handleChange}
                    value={inputValue.student_name}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={inputValue.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ</label>
                  <input
                    className="form-control"
                    required
                    value={inputValue.address}
                    defaultValue={""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={inputValue.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  defaultValue="Thoát"
                />
                <input
                  type="submit"
                  className="btn btn-info"
                  defaultValue="Lưu"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Delete Modal HTML */}
      <div id="deleteEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h4 className="modal-title">Xóa nhân viên</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>Bạn chắc chắn muốn xóa sinh viên&lt;ST001&gt;?</p>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  defaultValue="Hủy"
                />
                <input
                  type="submit"
                  className="btn btn-danger"
                  defaultValue="Xóa"
                  onClick={() => {
                    if (selectedStudentId !== null) {
                      handleDelete(selectedStudentId);
                    }
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
