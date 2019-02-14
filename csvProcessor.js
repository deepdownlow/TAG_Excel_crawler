
const fs = require('fs')
const Json2csvParser = require('json2csv').Parser
const csv = require('csvtojson')

//Convert and Process cvs files
const FileProcess = () => {
    const csvFilePath = './repository/FIFA WE Aug 18.csv'
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
       JsonToCsv(jsonObj)
    })
    .catch(err => console.log(err))
 }
//extract the required info from the csv files
const JsonToCsv = json => {
 //initializing the csv feilds
 const fields = 
 [
  'OUTLET_ID', 
 'START_DATE', 
 'END_DATE','STATUS',
 'DATE_RECIEVED',
 'ORDER_ID',
 'PRODUCT',
 'CUSTOMER',
 'SALES_REP_ID',
 'SALES_REP_NAME',
 'AP_CASH',
 'AP_GST',
 'AR_CREDITS',
 'AR_GST',
 'TOTAL_AP_CASH',
 'TOTAL_AP_GST'
]
 const JSON_file = []

 json.map(x => {
  const OutLetId = x["OUTLET ID"]
  const StartDate = x["REPORT START DATE"]
  const EndDate = x["REPORT END DATE"]
  const Status = x["STATUS"]
  const DateRecived = x["DATE RECEIVED"]
  const ApCash = x["AP CASH"]
  const ApGst = x["AP GST"]
  const ArCredit = x["AR CREDITS"]
  const ArGst = x["AR GST"]
  const Order_ID = 'Order_ID'
  const Product = 'Product'
  const Product_index = x.COMMENTS.indexOf(Product)
  const Customer = 'Customer'
  const Customer_index = x.COMMENTS.indexOf(Customer)
  const SalesRepId = 'Sales Rep ID'
  const SalesRepId_index = x.COMMENTS.indexOf(SalesRepId)
  const SalesRepName = 'Sales Rep Name'
  const SalesRepName_index = x.COMMENTS.indexOf(SalesRepName)
  const OrderValue = x.COMMENTS.slice(Order_ID.length, Product_index)
  const ProductValue = x.COMMENTS.slice(Product_index + Product.length, Customer_index)
  const CustomerName = x.COMMENTS.slice(Customer_index + Customer.length, SalesRepId_index)
  const RepId = x.COMMENTS.slice(SalesRepId_index + SalesRepId.length, SalesRepName_index)
  const RepName = x.COMMENTS.slice(SalesRepName_index + SalesRepName.length, x.COMMENTS.length - 1)

  const obj = 
  {
   OUTLET_ID: OutLetId,
   START_DATE: StartDate,
   END_DATE: EndDate,
   STATUS: Status,
   DATE_RECIEVED: DateRecived,
   ORDER_ID: OrderValue.slice(1).trim(),
   PRODUCT: ProductValue.slice(1).trim(),
   CUSTOMER: CustomerName.slice(1).trim(),
   SALES_REP_ID: RepId.slice(2).trim(),
   SALES_REP_NAME: RepName.slice(1).trim(),
   AP_CASH: ApCash,
   AP_GST: ApGst,
   AR_CREDITS: ArCredit,
   AR_GST: ArGst,
   TOTAL_AP_CASH:'',
   TOTAL_AP_GST:''
  }
  JSON_file.push(obj)
 })

 //JSON to csv
 const json2csvParser = new Json2csvParser({ fields });
 const csv = json2csvParser.parse(JSON_file)
 
 //Write to file
 let fileName = fs.readdirSync('./repository')[1]
 fs.writeFile(`./csv_pick_up/Modified-${fileName}.csv`, csv, err => {
  if(err) return console.log(err);
  console.log("The File Has Been Created!");
 });
}
//init
FileProcess()