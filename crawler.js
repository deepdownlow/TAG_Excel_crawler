const fs = require('fs')
const Json2csvParser = require('json2csv').Parser
const csv = require('csvtojson')

const WriteToCsv = (file, name) => {
    const fields =
       [
          'OUTLET_ID',
          'COMMISION_TYPE',
          'ORDER_ID',
          'PRODUCT',
          'CUSTOMER',
          'SALES_REP_ID',
          'SALES_REP_NAME',
          'TOTAL_AP_CASH',
          'TOTAL_AP_GST'
       ]
    const json2csvParser = new Json2csvParser({ fields })
    const csv = json2csvParser.parse(file)
    fs.writeFile(`C:/Users/TAG LISA/Desktop/REPORT/${ name }.csv`, csv, err => {
       if (err) console.log(err)
    })
 }

const Compare = () => {
   console.log(`PLEASE WAIT ....`)
   const fifaFile = fs.readdirSync('./FIFA_REPORT')[1]
   const fifaCsvFilePath = `./FIFA_REPORT/${fifaFile}`
   const domoFile = fs.readdirSync('./DOMO_REPORT')[1]
   const domoCsvFilePath = `./DOMO_REPORT/${domoFile}`
   csv()
      .fromFile(fifaCsvFilePath)
      .then(fifaObj => {
         csv()
            .fromFile(domoCsvFilePath)
            .then(domoObj => {
               const onlyInDomo = domoObj.filter(x => !fifaObj.some(x2 => (x.ORDER_ID == x2.ORDER_ID) && (x.OUTLET_ID == x2.OUTLET_ID)))
               const existsOnBoth = domoObj.filter(x => fifaObj.some(x2 => (x.ORDER_ID == x2.ORDER_ID) && (x.OUTLET_ID == x2.OUTLET_ID)))
               const signalTheEnd = new Promise((resolve, reject) => {
                  WriteToCsv(onlyInDomo, `ONLY_EXIST_ON_DOMO`)
                  WriteToCsv(existsOnBoth, `EXIST_ON_BOTH_FIFA_AND_DOMO`)
                  resolve(`Files have been created`)
                  reject(`Something went wrong. Please try again!`)
               })
               signalTheEnd
                  .then(message => console.log(message))
                  .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
} 

const ExtractData = json => {
   json.map(x => {
      const OutLetId = x["OUTLET_ID"]
      const CommisionType = x["COMMISSION_TYPE"]
      const Order_ID = 'Order_ID'
      const Product = 'Product'
      const Product_index = x.COMMENT.indexOf(Product)
      const Customer = 'Customer'
      const Customer_index = x.COMMENT.indexOf(Customer)
      const SalesRepId = 'Sales Rep ID'
      const SalesRepId_index = x.COMMENT.indexOf(SalesRepId)
      const SalesRepName = 'Sales Rep Name'
      const SalesRepName_index = x.COMMENT.indexOf(SalesRepName)
      const OrderValue = x.COMMENT.slice(Order_ID.length, Product_index)
      const ProductValue = x.COMMENT.slice(Product_index + Product.length, Customer_index)
      const CustomerName = x.COMMENT.slice(Customer_index + Customer.length, SalesRepId_index)
      const RepId = x.COMMENT.slice(SalesRepId_index + SalesRepId.length, SalesRepName_index)
      const RepName = x.COMMENT.slice(SalesRepName_index + SalesRepName.length, x.COMMENT.length - 1)

      const obj =
      {
         OUTLET_ID: OutLetId,
         COMMISION_TYPE: CommisionType,
         ORDER_ID: OrderValue.slice(1).trim(),
         PRODUCT: ProductValue.slice(1).trim(),
         CUSTOMER: CustomerName.slice(1).trim(),
         SALES_REP_ID: RepId.slice(2).trim(),
         SALES_REP_NAME: RepName.slice(1).trim(),
         TOTAL_AP_CASH: '',
         TOTAL_AP_GST: ''
      }
      if(json == fifaObj) return FIFA_JSON.push(obj)
      DOMO_JSON.push(obj)
   })
}

const Process = () => {
   console.log(`PLEASE WAIT...`)
   const fifaFile = fs.readdirSync('./FIFA_DROP_OFF')[1]
   const fifaCsvFilePath = `./FIFA_DROP_OFF/${ fifaFile }`
   const domoFile = fs.readdirSync('./DOMO_DROP_OFF')[0]
   const domoCsvFilePath = `./DOMO_DROP_OFF/${ domoFile }`
   csv()
   .fromFile(fifaCsvFilePath)
   .then( fifaObj => {
       csv()
       .fromFile(domoCsvFilePath)
       .then( domoObj => {
          const FIFA_JSON = []
          const DOMO_JSON = []
          const createFile = new Promise((resolve, reject) => {
             ExtractData(fifaObj)
             ExtractData(domoObj)
             WriteToCsv(FIFA_JSON, `MODIFIED_FIFA`)
             WriteToCsv(DOMO_JSON, `MODIFIED_DOMO`)
             resolve(`Extraction was successful. Reports will be ready shortly...`)
             reject(`Something went wrong`)
          })
          createFile
           .then(message => {
             console.log(message)
             Compare()
          })
          .catch(err => console.log(err))
       })
       .catch(err => console.log(err))
   })
   .catch(err => console.log(err))
}

Process()