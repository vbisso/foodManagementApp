import { extractFoodData } from "../utils/extractFoodData";
// import { processUPCResponse } from "./processUPCData";
// import categoriesJSON from "../assets/data/categories.json";
export const lookupProductByBarcode = async (barcode) => {
  try {
    const response = await fetch(
      `https://api.upcitemdb.com/prod/trial/lookup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upc: barcode }),
      }
    );

    const data = await response.json();

    if (data && data.items && data.items.length > 0) {
      const item = data.items[0];
      console.log("UPC response:", item);
      return item;
    }
  } catch (error) {
    console.error("Barcode lookup failed:", error);
    return null;
  }
};
