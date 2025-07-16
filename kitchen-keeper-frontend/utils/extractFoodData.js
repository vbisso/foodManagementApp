import stringSimilarity from "string-similarity";
import categoriesJSON from "../assets/data/categories.json";

const extractQuantityAndUnit = (text) => {
  const match = text?.match(
    /(\d+\.?\d*)\s*(oz|lb|g|kg|ml|l|ct|count|pack|fl oz)/i
  );
  if (match) {
    return {
      quantity: parseFloat(match[1]),
      unit: match[2].toLowerCase(),
    };
  }
  return { quantity: 1, unit: "" };
};
// const matchCategory = (rawCategory) => {
//   const categoryList = Object.keys(categoriesJSON);
//   const lowerCategoryList = categoryList.map((c) => c.toLowerCase());
//   const cleaned =
//     rawCategory?.split(">").pop()?.trim().toLowerCase() || "other";

//   const similarityResults = stringSimilarity.findBestMatch(
//     cleaned,
//     lowerCategoryList
//   );
//   const bestMatchIndex = similarityResults.bestMatchIndex;
//   const bestMatchRating = similarityResults.bestMatch.rating;
//   const bestMatchTarget = categoryList[bestMatchIndex]; // return original casing

//   console.log("Cleaned category:", cleaned);
//   console.log("Best match:", similarityResults.bestMatch);

//   if (bestMatchRating > 0.3) {
//     return bestMatchTarget;
//   }

//   // // Optional fallback keywords
//   if (cleaned.includes("chip")) return "Snacks";
//   // if (cleaned.includes("trail")) return "Trail Mix";
//   // if (cleaned.includes("bread")) return "Bakery";
//   if (cleaned.includes("butter")) return "Dairy";

//   return "Other";
// };

const matchCategory = (rawCategory) => {
  const cleaned =
    rawCategory?.split(">").pop()?.trim().toLowerCase() || "other";

  for (const [category, keywords] of Object.entries(categoriesJSON)) {
    for (const keyword of keywords) {
      if (cleaned.includes(keyword.toLowerCase())) {
        return category; // Match found
      }
    }
  }

  return "Other"; // No match found
};

const cleanTitle = (rawTitle) => {
  return rawTitle
    .toLowerCase()
    .split(" ")
    .slice(0, 5) // optional: limit to first 5 words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const extractFoodData = (item) => {
  const name = cleanTitle(item.title);
  const rawCategory = item.category || "";
  const matchedCategory = matchCategory(rawCategory);

  const sizeSource =
    item.size || item.weight || item.title || item.description || "";
  const { quantity, unit } = extractQuantityAndUnit(sizeSource);

  return {
    name: name || "Unknown item",
    category: matchedCategory,
    quantity,
    unit,
  };
};
