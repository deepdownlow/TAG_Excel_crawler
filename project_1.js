//extract the comment section from csv
const excelCommentSection = arr => {
 return arr.map(x => x.COMMENTS)
}
//extract info from the comment section 
const commentSection = arr => {
 arr.map(x => {
  const Order_ID = 'Order_ID'
  const Product = 'Product'
  const Product_index = x.indexOf(Product)
  const Customer = 'Customer'
  const Customer_index = x.indexOf(Customer)
  const SalesRepId = 'Sales Rep ID'
  const SalesRepId_index = x.indexOf(SalesRepId)
  const SalesRepName = 'Sales Rep Name'
  const SalesRepName_index = x.indexOf(SalesRepName)
  const OrderValue = x.slice(Order_ID.length, Product_index)
  const ProductValue = x.slice(Product_index + Product.length, Customer_index)
  const CustomerName = x.slice(Customer_index + Customer.length, SalesRepId_index)
  const RepId = x.slice(SalesRepId_index + SalesRepId.length, SalesRepName_index)
  const RepName = x.slice(SalesRepName_index + SalesRepName.length, x.length - 1)
  const object =
  {
   Order_ID: OrderValue.slice(1).trim(),
   Product: ProductValue.slice(1).trim(),
   Customer: CustomerName.slice(1).trim(),
   Sales_Rep_ID: RepId.slice(2).trim(),
   Sales_Rep_Name: RepName.slice(1).trim()
  }
  // return object
  console.log(object)
 })
}




