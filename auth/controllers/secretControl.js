// const AWS = require('aws-sdk');
// const path = require('path')
// const fs = require("fs");
// const localControl = require("./localControl")

// let client = null;
  
//   const retreiveSecret = async (secretName) => {
//     const isLocalMode = localControl.returnLocalMode();
//     console.log("Are we running in local?: " + isLocalMode)
//     if(isLocalMode){
//       const configPath = path.join(__dirname, '../../secrets/config.json');
//       const configData = fs.readFileSync(configPath, 'utf8');
//       const config = JSON.parse(configData).aws;
//       AWS.config.update({
//         region: 'eu-west-1', // Replace with your desired AWS region
//         accessKeyId: config.accessKey,
//         secretAccessKey: config.secretKey
//       });
//     }
//       client = new AWS.SecretsManager({
//       region: "eu-west-1",
//     });

//     let response;
//     try {
//         response = await client.getSecretValue({
//           SecretId: secretName,
//           VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
//         }).promise();
//         try{
//           const secret = JSON.parse(response.SecretString);
//           return secret;
//         }catch{
//           //incase the info is not JSON
//           return response.SecretString
//         }
//       } catch (error) {
//         // For a list of exceptions thrown, see
//         // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
//         throw error;
//       }
//   }

//   module.exports = {retreiveSecret}
