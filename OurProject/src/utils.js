// utils.js
export const calculateCurrentSales = (data) => {
  return data.inpValue * data.productSellingPrice -
         data.productQuantity * data.productSellingPrice
}
