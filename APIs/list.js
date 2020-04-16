'use strict';
const AWS = require('aws-sdk');
const ddbDocClient = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: process.env.DYNAMODB_TABLE
}

module.exports.handler = (event, context, callback) => {
    ddbDocClient.scan(params, (error, result) => {
        if(error) {
            console.log(error);
            callback(new Error('Error fetcing list!!'));
            return;
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(result)
        })
    })
};
