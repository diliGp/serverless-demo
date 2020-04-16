'use strict';
const AWS = require('aws-sdk');
const ddbDocClient = new AWS.DynamoDB.DocumentClient();


module.exports.handler = (event, context, callback) => {
    const data = JSON.parse(event.body);
    const time = new Date().getTime();

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id
        },
        ExpressionAttributeNames: {
            '#todo_text': 'text'
        },
        UpdateExpression: 'set #todo_text = :text, checked = :checked, updatdAt = :updatedAt',
        ExpressionAttributeValues: {
            ':text': data.text,
            ':checked': data.checked,
            ':updatedAt': time
        }
    };

    ddbDocClient.update(params, (error, result) => {
        if (error) {
            console.log(error);
            callback(new Error('Error updating item!!'));
            return;
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(result)
        })
    })
};
