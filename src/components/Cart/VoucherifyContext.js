
const voucherifyClient = require('voucherify')

const client = voucherifyClient({
    applicationId: '510e88ad-5567-4104-b381-41c22b2c9636',
    clientSecretKey: 'fd360641-9cf2-4bf9-bddd-64a566ab4f3a',
    apiVersion: 'v2017-04-20'
})

export default client