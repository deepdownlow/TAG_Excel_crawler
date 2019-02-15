const fs = require('fs')
const readLine = require('readline-sync')
const Json2csvParser = require('json2csv').Parser
const csv = require('csvtojson')

//JSON File
const JSON_file = []

//Convert and Process cvs files
const FileProcess = () => {
    const fileName = fs.readdirSync('./csv_drop_off')[1]
    const csvFilePath = `./csv_drop_off/${fileName}`
    csv()
    .fromFile(csvFilePath)
    .then( jsonObj => {
       JsonToCsv(jsonObj)
    })
    .catch(err => console.log(err))
 }
//extract the required info from the csv files
const JsonToCsv = json => {
 
//initializing the csv feilds
 
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
   CUSTOMER: CustomerName,
   PRODUCT: Product,
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
 console.log(`Modified csv file has been successfully created! `)
 WriteToFile(JSON_file, './csv_drop_off', './csv_pick_up')
//  return init()  
}
// filtering the files based on rep id
const FilteredByRepId = json => {
   const repId = readLine.question(`Please Enter Rep's Id: `)
   let repSale = json.filter(x => x["SALES_REP_ID"] === 'DMG8')
   WriteToFile(repSale, null,'./FIFA_REP_Report',repId)  
  }

//write to file function
const WriteToFile = (file, getPath, setPath, id) => {
   const fields =
      [
         'OUTLET_ID',
         'START_DATE',
         'END_DATE',
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
   const json2csvParser = new Json2csvParser({ fields })
   const csv = json2csvParser.parse(file)
   let fileName = getPath !== null ? fs.readdirSync(getPath)[1] : `REP_ID_${id.toUpperCase()}.csv`
   fs.writeFile(`./${ setPath }/Modified_${ fileName }`, csv, err => {
      if (err) return console.log(err)
      return init()
   })
}
//init
const init = () => {
   if(!JSON_file.length) 
    {
      console.log(`There is no file in the buffer`)
      return
    }
   console.log('1. Process FIFA File (FIFA)')
   console.log('2. Extract Transaction By Id (ID)')
   const choose = readLine.question('Please choose from the menu: ')
   if(choose.toUpperCase() === 'FIFA') {
      return FileProcess()
   }
   if(choose.toUpperCase() === 'ID') {
      return FilteredByRepId(JSON_file)
   }
}
init()