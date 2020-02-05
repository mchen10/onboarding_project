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
      employees: [
        {
          id: 1,
          name: 'Richard Hendricks',
          email: 'richard@piedpiper.com',
          job: 'Accountant',
        },
        {
          id: 2,
          name: 'Bertram Gilfoyle',
          email: 'gilfoyle@piedpiper.com',
          job: 'Software Engineer',
        },
        {
          id: 3,
          name: 'Dinesh Chugtai',
          email: 'dinesh@piedpiper.com',
          job: 'Janitor',
        },
      ],
      admin: false,
    }
  },
  methods: {
    addEmployee(employee) {
      console.log(employee.name)
      const lastId =
        this.employees.length > 0
          ? this.employees[this.employees.length - 1].id
          : 0;
      const id = lastId + 1;
      const newEmployee = { ...employee, id };

      this.employees = [...this.employees, newEmployee];
    },
    deleteEmployee(id) {
      console.log(id)
      this.employees = this.employees.filter(
        employee => employee.id !== id
      )
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
