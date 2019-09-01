const WXBizDataCrypt = require('./WXBizDataCrypt')

const AppId = 'wxff731b7b470bd303'

const getRowData = (encryptedData, iv, session_key) => {
    const pc = new WXBizDataCrypt(AppId, session_key)

    return pc.decryptData(encryptedData, iv)
}
export default getRowData
