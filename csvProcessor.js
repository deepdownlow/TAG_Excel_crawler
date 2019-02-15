const fs = require('fs')
const Json2csvParser = require('json2csv').Parser
const csv = require('csvtojson')

//Convert and Process cvs files
const FileProcess = () => {
    const fileName = fs.readdirSync('./csv_drop_off')[1]
    const csvFilePath = `./csv_drop_off/${fileName}`
    csv()
    .fromFile(csvFilePath)
    .then( jsonObj =>{
       JsonToCsv(jsonObj)
      // console.log(jsonObj)
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
 'PRODUCT',
 'CUSTOMER',
 'SALES_REP_ID',
 'SALES_REP_NAME',
 'AP_CASH',
 'AP_GST',
 'AR_GST',
 'TOTAL_AP_CASH',
 'TOTAL_AP_GST'
]
 const JSON_file = []

 json.map(x => {
  const OutLetId = x["OUTLET ID"]
  const StartDate = x["REPORT START DATE"]
  const EndDate = x["REPORT END DATE"]
  const ApCash = x["AP CASH"]
  const ApGst = x["AP GST"]
  const ArGst = x["AR GST"]
  const Product = x["PLAN FEATURE DESCRIPTION"]
  const SalesRepId = x["SALES REP ID"]
  const SalesRepName = x["SALES REP NAME"]
  const CustomerName = x["CLIENT NAME"]

  const obj = 
  {
   OUTLET_ID: OutLetId,
   START_DATE: StartDate,
   END_DATE: EndDate,
   PRODUCT: Product,
   CUSTOMER: CustomerName,
   SALES_REP_ID: SalesRepId,
   SALES_REP_NAME: SalesRepName,
   AP_CASH: ApCash,
   AP_GST: ApGst,
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
 let fileName = fs.readdirSync('./csv_drop_off')[1]
 fs.writeFile(`./csv_pick_up/Modified_${fileName}`, csv, err => {
  if(err) return console.log(err);
  console.log("The File Has Been Created!");
 });
}

//init
FileProcess()