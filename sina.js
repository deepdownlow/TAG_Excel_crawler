const DomoStatus = () => {
   // const filterMode = readLine.question(`Please Enter a Filter Mode: `)
   const domoFile = fs.readdirSync('./DOMO_drop_off')[0]
   const domoFilePath = `./DOMO_drop_off/${domoFile}`
   const fifaFile = fs.readdirSync('./csv_pick_up')[1]
   const fifaFilePath = `./csv_pick_up/${fifaFile}`
   console.log(fifaFile)
   csv()
      .fromFile(domoFilePath)
      .then(domoJson => {
         csv()
            .fromFile(fifaFilePath)
            .then(fifaJson => {
               const outletId = readLine.question(`Please Enter Outlet ID Number: \n`)
               const outletInDomo = domoJson.filter(x => (x["NCCS_CHANNEL_OUTLET_ID"] === outletId))
               const outletInFIfa = fifaJson.filter(x => (x["OUTLET_ID"] === outletId))
               // if (!outletInDomo.length || !outletInFIfa.length) {
               //    console.log(`Outlet ID you are looking for doesn't exist on DOMO\n`)
               //    return setTimeout(() => {
               //       const question = readLine.question(`Would you like to look up for another outlet ID? (y/n)`)
               //       if (question.toLocaleLowerCase() === 'y') return setTimeout(() => DomoStatus(), 500)
               //       setTimeout(() => init(), 1000)
               //    }, 2000)
               // }
               // setTimeout(() => console.log(`Number Of occurance on DOMO: ${outletInDomo.length}`), 1000)
               // setTimeout(() => console.log(`Number Of Occurance on FIFA: ${outletInFIfa.length}`), 3000)               
               const fields =
                  [
                     'OUTLET_ID',
                     'ORDER_ID',
                     'DATE_CREATED',
                     'DATE_ACTIVATED',
                     'PRODUCT',
                     'CUSTOMER',
                     'SALES_REP_ID',
                     'SALES_REP_NAME',
                     'STATUS',
                     'CONSOLIDATION'
                  ]
               const json2csvParser = new Json2csvParser({ fields })
               const csv = json2csvParser.parse(outletInFIfa)
               console.log(csv)
               fs.writeFile(`./FIFA_REP_Report/OUTLET_ID_${outletId}.csv`, csv, err => {
                  if (err) console.log(err)
                  console.log(`Modified_DOMO file is ready`)
                  return setTimeout(() => init(), 3000)
               })        
            })
            .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
}