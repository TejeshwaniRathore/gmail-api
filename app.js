const nodemailer = require('nodemailer') 
const { google } = require('googleapis')

const CLIENT_ID='895022186721-1om0uvg8rlhubtmkbi9ija7cbkjpuikf.apps.googleusercontent.com'
const CLIENT_SECRET= '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'
const REDIRECT_URI='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//04vtiFAdxkf6ICgYIARAAGAQSNwF-L9IrEnExM3OXBaCP-UBJFHz-0iUi3BfCo652RjVZYiTug3YUVjVV4qicLLJz_fxuRMDq-rU'

const oAuth2Client =new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})


async function sendMail(){
    try{
        const accessToken=await oAuth2Client.getAccessToken()

        const transport=nodemailer.createTransport({
            service: 'gmail',
            auth:{
                type:'OAuth2',
                user: 'tejeshwanirathore@gmail.com',
                clientId: CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken

            }
        })

        const mailOptions={
            from:'Tejeshwani Rathore <tejeshwanirathore@gmail.com>',
            to: 'tejeshwanirathore@gmail.com',
            subject: " Hello from gmail using Api",
            text: 'Hello from gmail email using API',
            html: '<h1>Hello from gmail email using API</h1>'

        };
        const result=await transport.sendMail(mailOptions)
        return result

    }catch(error)
    {
        return error
    }

   

}
sendMail()
.then((result)=>console.log('Email sent...',result))
.catch((error)=> console.log(error.message));

