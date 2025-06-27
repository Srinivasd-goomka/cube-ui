import { ptProductMetadata } from "./portable-toilet";

// const user = JSON.parse(localStorage.getItem("user"));
// const userName = `${user?.first_name} ${user?.last_name
//   .charAt(0)
//   .toUpperCase()}`;

export const productConfig = (productId: number) => {
  let metaData;
  let categoryOverRides;
  const initialData = null;
  switch (productId) {
    case 5:
      metaData = ptProductMetadata();
      categoryOverRides = {
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
    //   metaData = rollOff();
    //   categoryOverRides = {
    //     "Dump Truck": {
    //       quantity: "1",
    //     },
    //   };
    //   break;
    // case 7:
    //   metaData = storageContainers();
    //   categoryOverRides = {
    //     Office: {
    //       quantity: "1",
    //     },
    //   };
    //   break;
    // case 2:
    //   metaData = fencing();
    //   initialData = {
    //     category: "nocat",
    //     personnel_gate: "0",
    //     equipment_gate: "0",
    //     cycle_time: "28 Days",
    //   };
    //   break;
    // case 1:
    //   metaData = frontLoad();
    //   initialData = { removal_requested_by: userName };
    //   categoryOverRides = {
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
    //   metaData = equipmentRentals();
    //   categoryOverRides = {
    //     "Scissor Lift": {
    //       quantity: "1",
    //     },
    //   };
    //   break;
    // case 9:
    //   metaData = otherServices();
    //   initialData = { category: "Other" };
    //   categoryOverRides = {
    //     Other: {
    //       quantity: "1",
    //     },
    //   };
    //   break;
    // case 4:
    //   metaData = permRollOff();
    //   initialData = { removal_requested_by: userName };
    //   categoryOverRides = {
    //     Auger: {
    //       frequency: "1x/week",
    //     },
    //   };
    //   break;
    // case 3:
    //   metaData = otherServices();
    //   initialData = { category: "Other" };
    //   categoryOverRides = {
    //     Other: {
    //       quantity: "1",
    //     },
    //   };
    //   break;
    default:
      return null;
  }
  return { metaData, categoryOverRides, initialData };
};
