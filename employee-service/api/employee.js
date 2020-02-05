'use strict';
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.add = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const name = requestBody.name;
  const email = requestBody.email;
  if (typeof name !== 'string' || typeof email !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit employee because of validation errors.'));
    return;
  }
  submitEmployeeP(employeeInfo(name, email))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully submitted employee with name ${name} and email ${email}`,
          employeeId: res.id
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to submit employee with name ${name} and email ${email}`,
        })
      })
    });
};
// helper functions
const submitEmployeeP = employee => {
  console.log('Submitting employee');
  const employeeInfo = {
    TableName: process.env.EMPLOYEE_TABLE,
    Item: employee,
  };
  return dynamoDb.put(employeeInfo).promise()
    .then(res => employee);
};
// structures name and email into JSON, and adds some timestamp metadata
const employeeInfo = (name, email) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid(),
    name: name,
    email: email,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};
