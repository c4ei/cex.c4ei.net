const {
    Worker,
    connectDB,
    createTransaction,
    processDeposit,
    processWithdraw
} = require('./index')

connectDB.then(() => {
    new Worker('c4ei-transactions', async (job) => {
        return await createTransaction(job.data)
    })

    new Worker('c4ei-deposits', async (job) => {
        return await processDeposit(job.data)
    })

    new Worker('c4ei-withdraws', async (job) => {
        return await processWithdraw(job.data)
    })

})