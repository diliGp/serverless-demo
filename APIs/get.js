'use strict';
const AWS = require('aws-sdk');
const ddbDocClient = new AWS.DynamoDB.DocumentClient();


module.exports.handler = (event, context, callback) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id
        }
    };

    ddbDocClient.get(params, (error, result) => {
        if (error) {
            console.log(error);
            callback(new Error('Error fetcing item!!'));
            return;
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(result)
        })
    })
};
