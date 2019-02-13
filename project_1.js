const strOne = 'Order_ID:0021505747 Product: The Basics + Pik 5 Customer: Myrna Morgan Sales Rep ID - BQ9C Sales Rep Name: CORY LUTZ'
const strTwo = 'Order_ID:0021521464 Product: TELUS Internet 25/25 Customer: Doris Braun Sales Rep ID - BDHC Sales Rep Name: OSKAR GAFAROV'

//extract the comment section
const commentSection = str => {
 const Order_ID = 'Order_ID'
 const Product = 'Product'
 const Product_index = str.indexOf(Product)
 const Customer = 'Customer'
 const Customer_index = str.indexOf(Customer)
 const SalesRepId = 'Sales Rep ID' 
 const SalesRepId_index = str.indexOf(SalesRepId)
 const SalesRepName = 'Sales Rep Name'
 const SalesRepName_index = str.indexOf(SalesRepName)
 const OrderValue = str.slice(Order_ID.length, Product_index)
 const ProductValue = str.slice(Product_index + Product.length, Customer_index)
 return{
  Order_ID : OrderValue.slice(1).trim(),
  Product : ProductValue.slice(1).trim()
 }
}