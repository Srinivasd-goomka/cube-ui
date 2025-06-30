// import { getLocalStorage } from "../../../lib/helpers";
import { ptProductMetadataFields } from "./portable-toilet";

// const user = JSON.parse(getLocalStorage("user"));
// const userName = `${user?.first_name} ${user?.last_name
//   .charAt(0)
//   .toUpperCase()}`;

export const productConfig = (productId: number) => {
  let metaDataFields;
  let defaultCategoryOverrides;
  const defaultBaseValues = null;
  switch (productId) {
    case 5:
      metaDataFields = ptProductMetadataFields();
      defaultCategoryOverrides = {
        Event: {
          frequency: "Event",
          cycle_time: "Event",
          quantity: "1",
        },
        Construction: {
          frequency: "1x/week",
          cycle_time: "28 Days",
          quantity: "1",
        },
      };
      break;
    // case 6:
    //   metaDataFields = rollOff();
    //   defaultCategoryOverrides = {
    //     "Dump Truck": {
    //       quantity: "1",
    //     },
    //   };
    //   break;
    // case 7:
    //   metaDataFields = storageContainers();
    //   defaultCategoryOverrides = {
    //     Office: {
    //       quantity: "1",
    //     },
    //   };
    //   break;
    // case 2:
    //   metaDataFields = fencing();
    //   defaultBaseValues = {
    //     category: "nocat",
    //     personnel_gate: "0",
    //     equipment_gate: "0",
    //     cycle_time: "28 Days",
    //   };
    //   break;
    // case 1:
    //   metaDataFields = frontLoad();
    //   defaultBaseValues = { removal_requested_by: userName };
    //   defaultCategoryOverrides = {
    //     "Front Load": {
    //       quantity: "1",
    //       frequency: "1x/week",
    //       cycle_time: "28 Days",
    //     },
    //     Toter: {
    //       frequency: "1x/week",
    //       cycle_time: "28 Days",
    //       quantity: "1",
    //     },
    //   };
    //   break;
    // case 8:
    //   metaDataFields = equipmentRentals();
    //   defaultCategoryOverrides = {
    //     "Scissor Lift": {
    //       quantity: "1",
    //     },
    //   };
    //   break;
    // case 9:
    //   metaDataFields = otherServices();
    //   defaultBaseValues = { category: "Other" };
    //   defaultCategoryOverrides = {
    //     Other: {
    //       quantity: "1",
    //     },
    //   };
    //   break;
    // case 4:
    //   metaDataFields = permRollOff();
    //   defaultBaseValues = { removal_requested_by: userName };
    //   defaultCategoryOverrides = {
    //     Auger: {
    //       frequency: "1x/week",
    //     },
    //   };
    //   break;
    // case 3:
    //   metaDataFields = otherServices();
    //   defaultBaseValues = { category: "Other" };
    //   defaultCategoryOverrides = {
    //     Other: {
    //       quantity: "1",
    //     },
    //   };
    //   break;
    default:
      return null;
  }
  return { metaDataFields, defaultCategoryOverrides, defaultBaseValues };
};
