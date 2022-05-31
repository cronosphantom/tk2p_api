

export const mailer = function(){

    const api_key = 'key-7feebf9e516c407250a971d69230c72e';
    const domain = 'mg.edrivenapps.com';
    const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
    var data = {
    from: 'Entwine Support <levar.berry@edrivenent.com>',
    to: 'levar.berry@edrivenapps.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
    };
 
    mailgun.messages().send(data, function (error: any, body: any) {
    console.log(error,body);

    });
    return "OK"
}