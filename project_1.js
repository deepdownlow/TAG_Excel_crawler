const fs = require('fs')
//creating an array of files from the repo folder
const fileName = fs.readdirSync('/Users/sina/Desktop/tag_extraction_project/repository')

//extract the required info from the csv files
const excelToJson = arr => {
 const Object = []
 arr.map(x => {
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
   AR_GST: ArGst
  }
  Object.push(obj)
 })
//Object => JSON
 const JSONFile = JSON.stringify(Object)
 //Write to file
 fs.writeFile(`./json_files/${arr}.json`, JSONFile, err => {
  if(err) {
    return console.log(err);
  }
  console.log("The File Has Been Created!");
 });
}
//process csv files
const excelProccesor = (...args) => {
 if(args[0].length === 0) return console.log(`The repository folder is empty`)
 args.map(x => {
  x.map(y => excelToJson(y))
 })
}
//init
excelProccesor(fileName)



















//grabbing csv files from folder

//extract the info from csv files

// //init
// excelToJson()




