<template>
  <div id="app">
    <div v-if="!admin">
      <h1> Admin Login </h1>

      <admin-login @admin:login="loginSuccess"/>
    </div>

    <div v-if="admin">
      <h1> Employees </h1>

      <employee-form :jobs="jobs" :admin="admin" @add:employee="addEmployee"/>
      <employee-table :employees="employees" :admin="admin" @delete:employee="deleteEmployee" @edit:employee="editEmployee"/>

      <button @click="signOut"> Sign Out </button>
    </div>
  </div>
</template>

<script>
import EmployeeTable from './components/EmployeeTable.vue'
import EmployeeForm from './components/EmployeeForm.vue'
import AdminLogin from './components/AdminLogin.vue'

export default {
  name: 'app',
  components: {
    EmployeeTable,
    EmployeeForm,
    AdminLogin,
  },
  mounted() {
    this.getEmployees()
  },
  data() {
    return {
      jobs: [
        {
          id:1,
          title:"Accountant",
        },
        {
          id:2,
          title:"Software Engineer",
        },
        {
          id:3,
          title:"Janitor",
        },
      ],
      employees: [],
      admin: false,
    }
  },
  methods: {
    async getEmployees() {
      try {
        const response = await fetch("https://l56k7urwq2.execute-api.us-east-1.amazonaws.com/dev/employee")
        const data = await response.json()
        this.employees = data["employees"]
      } catch (error) {
        console.error(error)
      }
    },
    async addEmployee (employee) {
      try {
        const response = await fetch("https://l56k7urwq2.execute-api.us-east-1.amazonaws.com/dev/employee", {
          method: 'POST',
          body: JSON.stringify(employee)
        })
        const data = await response.json()
        const newEmployee = {...employee, "id": data["employeeId"]}
        this.employees = [...this.employees, newEmployee]
        console.log(this.employees)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteEmployee(id) {
      try {
        await fetch(`https://l56k7urwq2.execute-api.us-east-1.amazonaws.com/dev/employee/${id}`, {
          method: "DELETE"
        });
        this.employees = this.employees.filter(employee => employee.id !== id);
      } catch (error) {
        console.error(error);
      }
    },
    editEmployee(id, updatedEmployee) {
      this.employees = this.employees.map(employee =>
        employee.id === id ? updatedEmployee : employee
      )
    },
    loginSuccess() {
      this.admin = true
    },
    signOut() {
      this.admin = false
    },
  }
}
</script>

<style>
  button {
    background: #009435;
    border: 1px solid #009435;
  }

  .small-container {
    max-width: 680px;
  }
</style>
