let header = document.querySelector('header');

document.addEventListener('scroll', () => {

      let scrollPos = window.pageYOffset;

      if (scrollPos > 90) {
            header.classList.add('bg-white');
            header.classList.add('sticky-top');
      } else {
            header.classList.remove('bg-white');
            header.classList.remove('sticky-top');
      }


});



let employees_array = [];
if (JSON.parse(localStorage.getItem('employees'))) employees_array = JSON.parse(localStorage.getItem('employees'));


const id = document.querySelector('#id')
const form = document.querySelector('.was-validated')


if (document.querySelector('body').id === 'employee-page') {

      const table_body = document.querySelector('#employees')
      const fname = document.querySelector('#first-name')
      const lname = document.querySelector('#last-name')
      const address = document.querySelector('#address')
      const email = document.querySelector('#email')
      const phone = document.querySelector('#phone')
      const text = document.querySelector('.text-success')

      class Employee {
            constructor(fname, lname, address, email, phone, id) {
                  this.fname = fname;
                  this.lname = lname;
                  this.address = address;
                  this.email = email;
                  this.phone = "+20" + phone;
                  this.id = id;
            }
      }

      const setId = () => {
            if (employees_array.length > 0) {
                  const value = Number(employees_array[employees_array.length - 1].id);
                  id.value = value + 1;
            }
            else {
                  id.value = 1;
            }
      }
      setId();


      const viewEmployees = () => {
            if (employees_array.length > 0) {
                  employees_array = JSON.parse(localStorage.getItem('employees'));


                  table_body.innerHTML = '';
                  employees_array.map(employee => {
                        table_body.innerHTML += `
                        <tr>
                        <td>${employee.id}</td>
                        <td>${employee.fname}</td>
                        <td>${employee.lname}</td>
                        <td>${employee.address}</td>
                        <td>${employee.email}</td>
                        <td>${employee.phone}</td>
                        <td><button id="${employee.id}" class="btn btn-danger" onclick="delUser(this);"><i class="fa fa-trash-o"></i></button></td>
                        </tr>
                        `
                  })
            }
            else {
                  table_body.innerHTML = '';
            }
      }

      const setText = () => {
            setTimeout(() => {
                  text.classList.remove("opacity-100");
            }, 5000)
            text.classList.add("opacity-100");
      }


      form.addEventListener("submit", e => {
            e.preventDefault();
            const employee = new Employee(fname.value, lname.value, address.value, email.value, phone.value, id.value);
            employees_array.push(employee);
            localStorage.setItem('employees', JSON.stringify(employees_array));
            fname.value = '';
            lname.value = '';
            address.value = '';
            email.value = '';
            phone.value = '';
            id.value = '';
            setText();
            viewEmployees();
            setId();
      })

      function delUser(button) {
            employees_array = JSON.parse(localStorage.getItem('employees'));

            let deleted_id = button.id
            let del_employee = employees_array.map(employee => employee.id).indexOf(deleted_id);
            employees_array.splice(del_employee, 1);
            localStorage.setItem('employees', JSON.stringify(employees_array));
            setId();
            viewEmployees();
      }

      viewEmployees();

}

// ---------------------------------------------------------------------------------------------------------------


else {
      // Cookies Functions

      const createCookie = (name, value, days) => {
            var expires;
            if (days) {
                  var date = new Date();
                  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                  expires = "; expires=" + date.toGMTString();
            }
            else {
                  expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
      }

      const getCookie = (c_name) => {
            if (document.cookie.length > 0) {
                  c_start = document.cookie.indexOf(c_name + "=");
                  if (c_start != -1) {
                        c_start = c_start + c_name.length + 1;
                        c_end = document.cookie.indexOf(";", c_start);
                        if (c_end == -1) {
                              c_end = document.cookie.length;
                        }
                        return decodeURI(document.cookie.substring(c_start, c_end));
                  }
            }
            return "";
      }


      // ---------------------------------------------------------------------------------------------------------------

      let employees_attendance_array = [];
      if (getCookie('attendance'))
            employees_attendance_array = JSON.parse(getCookie('attendance'));


      const warning = document.querySelector('#warning');
      const table_body = document.querySelector('#employees-attendance')

      const formatAMPM = (date) => {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
            return strTime;
      }

      class EmployeeAttendance {
            constructor(id, fname, lname) {
                  this.id = id;
                  this.fname = fname;
                  this.lname = lname;
                  this.attendanceDate = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
                  this.attendanceTime = formatAMPM(new Date);
            }
      }
      // ---------------------------------------------------------------------------------------------------------------
      const checkValidation = (value) => {
            let index = employees_array.map(employee => employee.id).indexOf(value);
            if (index === -1) {
                  warning.innerHTML = "Please enter a valid ID ..."
                  warning.classList.remove("opacity-0")
                  warning.classList.add("text-danger")
                  setTimeout(() => {
                        warning.innerHTML = ""
                        warning.classList.remove("text-danger")
                        warning.classList.add("opacity-0")
                  }, 5000)

                  return false;
            }
            else {
                  warning.innerHTML = "Attendance is recorded successfully."
                  warning.classList.remove("opacity-0")
                  warning.classList.add("text-success")
                  setTimeout(() => {
                        warning.innerHTML = ""
                        warning.classList.remove("text-success")
                        warning.classList.add("opacity-0")
                  }, 5000)

                  return true;
            }
      }

      const viewEmployeesAttendance = () => {
            if (employees_attendance_array.length > 0) {
                  employees_attendance_array = JSON.parse(getCookie('attendance'));

                  table_body.innerHTML = '';
                  employees_attendance_array.map(employee => {
                        table_body.innerHTML += `
                        <tr>
                        <td>${employee.id}</td>
                        <td>${employee.fname}</td>
                        <td>${employee.lname}</td>
                        <td>${employee.attendanceDate}</td>
                        <td>${employee.attendanceTime}</td>
                        </tr>
                        `
                  })
            }
            else {
                  table_body.innerHTML = '';
            }
      }


      form.addEventListener("submit", e => {
            e.preventDefault();
            if (checkValidation(id.value)) {
                  const employee_index = employees_array.map(employee => employee.id).indexOf(id.value);
                  const employee = employees_array[employee_index];
                  const employees_attendance = new EmployeeAttendance(employee.id, employee.fname, employee.lname);
                  employees_attendance_array.push(employees_attendance);

                  const attendance = JSON.stringify(employees_attendance_array)
                  createCookie('attendance', attendance, 7);

                  id.value = '';
            }

            viewEmployeesAttendance();
      })

      viewEmployeesAttendance();

      // ---------------------------------------------------------------------------------------------------------------

}
