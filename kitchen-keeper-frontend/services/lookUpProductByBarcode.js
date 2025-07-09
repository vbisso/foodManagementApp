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
    // console.log("UPC API response:", data);

    if (data && data.items && data.items.length > 0) {
      const item = data.items[0];
      console.log("UPC API response:", item);
      //   console.log("UPC API response:", item.title);
      return {
        name: item.title,
        brand: item.brand,
        category: item.category,
      };
    }

    return null;
  } catch (error) {
    console.error("Barcode lookup failed:", error);
    return null;
  }
};
