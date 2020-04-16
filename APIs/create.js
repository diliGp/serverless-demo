'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');

// Create DynamoDB document client
const ddbDocClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
    const data = JSON.parse(event.body);
    const timestamp = new Date().getTime();

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            text: data.text,
            checked: data.checked,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    };

    ddbDocClient.put(params, (err, response) => {
        if (err) {
            console.log(err)
            callback(err);
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(response)
        });
    });
};
