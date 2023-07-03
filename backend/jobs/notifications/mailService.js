const nodemailer = require('nodemailer')
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'help.c4ei.net@gmail.com',
        pass: 'Asdf123$'
    }
})

const sendDepositEmail = async (amount, coin, toEmail) => {
    const mailDetails = {
        from: 'CexC4EI Exchange <correo>',
        to: toEmail,
        subject: `[CexC4EI] Deposit Confirmation`,
        html: `<h3><strong>Depositado completado correctamente</strong></h3>
        <p>your deposit of ${amount} ${coin.toUpperCase()} 
        is now available in your CexC4EI account.
        <a style="text-decoration: none;" href="https://cex.c4ei.net/wallet/${coin.toLowerCase()}"
         target="_blank" rel="noopener">Comprueba tu balance aquí.</a></p>`
    }

    return await mailTransporter.sendMail(mailDetails)
}

const sendWithdrawEmail = async (amount, coin, toAddress, txId, toEmail) => {
    const mailDetails = {
        from: 'C4EI Exchange',
        to: toEmail,
        subject: `[CexC4EI] Withdrawal Confirmation`,
        html: `<h3><strong>Withdrawal completed successfully</strong></h3>
        <div>You have made a withdrawal from ${amount} ${coin.toUpperCase()} 
        in your CexC4EI account.</div>
        <div>&nbsp;</div>
        <div><strong>withdrawal address:</strong> ${toAddress}</div>
        <div><strong>Transaction's ID:</strong> ${txId}</div>`
    }

    return await mailTransporter.sendMail(mailDetails)
}

module.exports = {
    sendDepositEmail,
    sendWithdrawEmail
}