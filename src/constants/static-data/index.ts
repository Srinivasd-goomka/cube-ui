export function leadSource() {
  const listItems = [
    { value: "Connectiv", label: "Connectiv" },
    { value: "Google", label: "Google" },
    { value: "Mint", label: "Mint" },
    { value: "NDS", label: "NDS" },
    { value: "PortaPottyRentalGuide.com", label: "PortaPottyRentalGuide.com" },
    { value: "Project Armada", label: "Project Armada" },
    { value: "Search Advisor", label: "Search Advisor" },
    { value: "Triares", label: "Triares" },
    { value: "Advertising Campaign", label: "Advertising Campaign" },
  ];
  return listItems;
}

export function productList() {
  const productList = [
    "Portable Toilet",
    "Roll-Off",
    "Storage Containers/Mobile Offices",
    "Fencing",
    "Other Services",
    "Equipment Rentals",
    "Front Load",
    "Perm Roll-Off/Compactor",
    "Other"
  ];
  return productList;
}

export function productShortnameList() {
  const data = ["Portable Toilet"];
  return data;
}

export function productNameOrderList() {
  const data = [
    "ADA Toilet",
    "Standard Toilet",
    "Crane Unit",
    "Tray",
    "Trailer",
    "Wastewater Holding Tank",
    "Freshwater Holding Tank",
  ];
  return data;
}

export function frequencyList() {
  const data = [
    { label: "On Call", value: "On Call" },
    { label: "Per Service", value: "Per Service" },
    { label: "Event", value: "Event" },
    { label: "1x/month", value: "1x/month" },
    { label: "EOW", value: "EOW" },
    { label: "1x/week", value: "1x/week" },
    { label: "2x/week", value: "2x/week" },
    { label: "3x/week", value: "3x/week" },
    { label: "4x/week", value: "4x/week" },
    { label: "5x/week", value: "5x/week" },
    { label: "6x/week", value: "6x/week" },
    { label: "7x/week", value: "7x/week" },
  ];
  return data;
}

export function cycleTimeList() {
  const data = [
    { label: "28 Days", value: "28 Days" },
    { label: "1 Month", value: "1 Month" },
    { label: "1 Week", value: "1 Week" },
    { label: "2 Weeks", value: "2 Weeks" },
    { label: "Event", value: "Event" },
  ];
  return data;
}

export function lengthList() {
  const data = [
    { label: "One month or less", value: "One month or less" },
    { label: "1-3 months", value: "1-3 months" },
    { label: "3-6 months", value: "3-6 months" },
    { label: "6-9 months", value: "6-9 months" },
    { label: "9-12 months", value: "9-12 months" },
    { label: "Greater than 1 year", value: "Greater than 1 year" },
    { label: "Greater than 2 years", value: "Greater than 2 years" },
  ];
  return data;
}

export function serviceDaysList() {
  const data = [
    { label: "MON", value: "Monday" },
    { label: "TUE", value: "Tuesday" },
    { label: "WED", value: "Wednesday" },
    { label: "THU", value: "Thursday" },
    { label: "FRI", value: "Friday" },
    { label: "SAT", value: "Saturday" },
    { label: "SUN", value: "Sunday" },
  ];
  return data;
}

export function saleTempList() {
  const data = [
    { label: "0 - Unsure", value: 0 },
    { label: "1 - Icy", value: 1 },
    { label: "2 - Cold", value: 2 },
    { label: "3 - Room Temp", value: 3 },
    { label: "4 - Warm", value: 4 },
    { label: "5 - Lava", value: 5 },
  ];
  return data;
}

export function portableToiletCategoryList() {
  const data = [
    { label: "Construction", value: "Construction" },
    { label: "Event", value: "Event" },
  ];
  return data;
}

export function quoteStatusList() {
  const data = [
    { value: "No Sale", label: "No Sale", color: "#6c757d" }, //grey
    {
      value: "Quote In Progress",
      label: "Quote In Progress",
      color: "#ffc107",
    }, //yellow
    { value: "Hauler Quote", label: "Hauler Quote", color: "#17a2b8" }, //#17a2b8
    { value: "Canceled", label: "Canceled", color: "#dc3545" }, //red
    { value: "Sale", label: "Sale", color: "#28a745" }, //green
  ];
  return data;
}

export function quoteCancelationReasonList() {
  const data = [
    {
      value: "Hauler Availability/Booked",
      label: "Hauler Availability/Booked",
    },
    { value: "Hauler Issue", label: "Hauler Issue" },
    { value: "Haulers Do Not Service", label: "Haulers Do Not Service" },
    {
      value: "Franchised/Won't Work With Us",
      label: "Franchised/Won't Work With Us",
    },
    {
      value: "Customer Found Better Price",
      label: "Customer Found Better Price",
    },
    { value: "Customer Postponed", label: "Customer Postponed" },
    { value: "Customer No Longer Needed", label: "Customer No Longer Needed" },
    { value: "No Reason Given", label: "No Reason Given" },
    { value: "No Longer Needed", label: "No Longer Needed" },
    { value: "Weather", label: "Weather" },
    { value: "Card Decline", label: "Card Decline" },
    { value: "Other", label: "Other" },
  ];
  return data;
}

export function accessoriesList() {
  const data = [
    { label: "Containment Tray", value: "Containment Tray" },
    { label: "Eyewash Station", value: "Eyewash Station" },
    { label: "Hand Sanitizer", value: "Hand Sanitizer" },
    { label: "Locking Hasp", value: "Locking Hasp" },
    { label: "Pump", value: "Pump" },
    { label: "Rigging Cages", value: "Rigging Cages" },
  ];
  return data;
}

export function rentalProtectionList() {
  const data = [
    { label: "Accept", value: "Accept" },
    { label: "Decline", value: "Decline" },
  ];

  return data;
}

export function vendorAdditionalFrequencyList() {
  const data = [
    { label: "One Time", value: "One Time" },
    { label: "Per Haul", value: "Per Haul" },
    { label: "Recurring", value: "Recurring" },
  ];
  return data;
}

export function serviceTicketStatusList() {
  const data = [
    {
      value: "Service Date Required",
      label: "Service Date Required",
      color: "#f57514",
    }, //orange
    {
      value: "No Action Required",
      label: "No Action Required",
      color: "#ffc107",
    }, //yellow
    {
      value: "Dispatching Required",
      label: "Dispatching Required",
      color: "#17a2b8",
    }, //#17a2b8
    { value: "Dispatched", label: "Dispatched", color: "#28a745" }, //red
    { value: "Error", label: "Error", color: "#fc1703" }, //red
  ];
  return data;
}

export function discountTypes() {
  const data = [
    { label: "No Discount", value: "No Discount" },
    { label: "Flat Discount", value: "Flat Discount" },
    { label: "Percent Discount", value: "Percent Discount" },
  ];
  return data;
}

export function lowMarginReasonList() {
  const data = [
    { label: "Customer Service Discount", value: "Customer_Service_Discount" },
    { label: "Did Not Ask About Fees", value: "Did_Not_Ask_About_Fees" },
    { label: "Did Not Dispatch Timely", value: "Did_Not_Dispatch_Timely" },
    { label: "Franchised", value: "Franchised" },
    { label: "Hauler Availability", value: "Hauler_Availability" },
    { label: "Hauler Changed Rate", value: "Hauler_Changed_Rate" },
    {
      label: "Miscalculated Hauler Pricing",
      value: "Miscalculated_Hauler_Pricing",
    },
    { label: "Pricing Tool", value: "Pricing_Tool" },
    { label: "Repeat Client Discount", value: "Repeat_Client_Discount" },
    {
      label: "Switched to Preferred/Managed Vendor",
      value: "Switched_to_Preferred_Managed_Vendor",
    },
    {
      label: "System Pricing - Out of Date",
      value: "System_Pricing_Out_of_Date",
    },
    {
      label: "System Pricing - User Error",
      value: "System_Pricing_User_Error",
    },
    { label: "USS Approval", value: "USS_Approval" },
  ];
  return data;
}

export function rollOffCategoryList() {
  const data = [
    { label: "Dump Truck", value: "Dump Truck" },
    { label: "Open Top", value: "Open Top" },
    { label: "Trash Trailer", value: "Trash Trailer" },
  ];
  return data;
}

export function rebateList() {
  const data = [
    { label: "Check", value: "Check" },
    { label: "Credit on Invoice", value: "Credit on Invoice" },
  ];
  return data;
}

export function removalReasonList() {
  const data = [
    { label: "Business Closing", value: "Business Closing" },
    { label: "Collections Issue", value: "Collections Issue" },
    { label: "Lost To Competitor", value: "Lost To Competitor" },
    { label: "Ownership Change", value: "Ownership Change" },
    { label: "Product Change", value: "Product Change" },
    { label: "Safety Concerns", value: "Safety Concerns" },
    { label: "Service Capabilities", value: "Service Capabilities" },
    { label: "Vendor Change", value: "Vendor Change" },
  ];
  return data;
}

export function rollOffAccessoriesList() {
  const data = [
    { label: "Liners", value: "liners" },
    { label: "Lids", value: "lids" },
    { label: "Tarp", value: "tarp" },
    { label: "Permit Needed", value: "permit_needed" },
    { label: "Has Permit", value: "has_permit" },
    { label: "Bungie", value: "bungie" },
    { label: "House Burned", value: "house_burned" },
    { label: "Lock", value: "lock" },
    { label: "Live Load", value: "live_load" },
    { label: "Low Boy", value: "low_boy" },
    { label: "On Call", value: "on_call" },
    { label: "Mattress", value: "mattress" },
    { label: "Non Friable Asbestos", value: "non_friable_asbestos" },
    { label: "W&D", value: "wd" },
    { label: "Freezer", value: "freezer" },
    { label: "Electronics", value: "electronics" },
    { label: "Tires", value: "tires" },
    { label: "Empty Paint Supplies", value: "empty_paint_supplies" },
    { label: "Dumpster", value: "dumpster" },
    { label: "Liner", value: "liner" },
    { label: "Metal", value: "metal" },
    { label: "Water Tank", value: "water_tank" },
    { label: "TV", value: "tv" },
    { label: "Appliances", value: "appliances" },
    { label: "Dish Washer", value: "dish_washer" },
    { label: "Stove", value: "stove" },
    { label: "Fridge", value: "fridge" },
    { label: "Water Heater", value: "water_heater" },
    { label: "Enclosed", value: "enclosed" },
    { label: "Paint cans", value: "paint_cans" },
  ];
  return data;
}

export function debrisList() {
  const data = [
    { label: "Construction", value: "Construction" },
    { label: "Roofing", value: "Roofing" },
    { label: "Concrete", value: "Concrete" },
    { label: "Concrete Wash-Out", value: "Concrete Wash-Out" },
    { label: "Trash", value: "Trash" },
    { label: "Brick & Block", value: "Brick & Block" },
    { label: "Dirt", value: "Dirt" },
    { label: "Asphalt", value: "Asphalt" },
    { label: "Sandblasting Media", value: "Sandblasting Media" },
    { label: "General Household", value: "General Household" },
    { label: "OCC", value: "OCC" },
    { label: "Metal", value: "Metal" },
    { label: "Green Waste", value: "Green Waste" },
    { label: "Wood", value: "Wood" },
    { label: "Special Waste", value: "Special Waste" },
    { label: "Paper and Plastic", value: "Paper and Plastic" },
    { label: "Recycling", value: "Recycling" },
    { label: "Gravel", value: "Gravel" },
    { label: "Other", value: "Other" },
  ];
  return data;
}

export function storageContainersAccessoriesList() {
  const data = [
    { label: "Stairs", value: "stairs" },
    { label: "Mounted", value: "mounted" },
    { label: "Cleaning", value: "cleaning" },
    { label: "Furniture", value: "furniture" },
    { label: "Doors on one end", value: "doors_one_end" },
    { label: "Doors on both ends", value: "doors_both_ends" },
    { label: "Shelves", value: "shelves" },
    { label: "Lights", value: "lights" },
    { label: "2 windows", value: "two_windows" },
    { label: "Insulated", value: "insulated" },
    { label: "High-Cube", value: "high_cube" },
    { label: "Lock", value: "lock" },
    { label: "ADA Ramps", value: "ada_ramps" },
    { label: "Generator", value: "generator" },
    { label: "Restroom", value: "restroom" },
    { label: "Door on passenger side", value: "door_passenger_side" },
    { label: "Wind Turbines", value: "wind_turbines" },
    { label: "Microwave", value: "microwave" },
    { label: "Coffee pot", value: "coffee_pot" },
    { label: "White board", value: "white_board" },
    { label: "Desks", value: "desks" },
    { label: "Chairs", value: "chairs" },
    { label: "Mini-fridge", value: "mini_fridge" },
    { label: "Refrigerated Unit", value: "refrigerated_unit" },
    { label: "A/C", value: "ac" },
    { label: "Doors To Rear", value: "doors_to_rear" },
    { label: "Climate Controlled", value: "climate_controlled" },
    { label: "Shower", value: "shower" },
    { label: "Double Doors", value: "double_doors" },
    { label: "Hydraulic Door Closures", value: "hydraulic_door_closures" },
    {
      label: "Security Door System with 3-part interior locking system",
      value: "security_door_system",
    },
    { label: "Mini blinds", value: "mini_blinds" },
    { label: "Exterior Security", value: "exterior_security" },
    { label: "IT storage", value: "it_storage" },
    { label: "Planning Table", value: "planning_table" },
    { label: "FREEZER", value: "freezer" },
    { label: "On wheels", value: "on_wheels" },
    { label: "Extension Cord", value: "extension_cord" },
    { label: "1/4 Hose", value: "quarter_hose" },
    {
      label: "4 separate offices 11.6 by 11",
      value: "four_separate_offices_11_6_by_11",
    },
    { label: "5 Unit Office", value: "five_unit_office" },
    { label: "Pad lock connector", value: "pad_lock_connector" },
    { label: "3 separate offices", value: "three_separate_offices" },
    { label: "Side Door", value: "side_door" },
    { label: "Fresh Water Tank", value: "fresh_water_tank" },
    { label: "Holding Tank", value: "holding_tank" },
    { label: "Security Bars", value: "security_bars" },
    { label: "Conference room", value: "conference_room" },
    { label: "2 offices", value: "two_offices" },
    { label: "48” Lights", value: "forty_eight_inch_lights" },
    { label: "Epoxy coated", value: "epoxy_coated" },
    { label: "Wood flooring", value: "wood_flooring" },
    { label: "24” wide counter top", value: "twenty_four_inch_counter_top" },
    {
      label: "2 drawer, locking file cabinet",
      value: "two_drawer_locking_file_cabinet",
    },
    { label: "Exhaust fan in restroom", value: "exhaust_fan_in_restroom" },
    { label: "Corrugated steel exterior", value: "corrugated_steel_exterior" },
    { label: "Bathroom", value: "bathroom" },
    { label: "CONTAINER GUARD KEYED", value: "container_guard_keyed" },
    { label: "PREMIUM OFFICE PACKAGE", value: "premium_office_package" },
    { label: "Bas. Entrance-Steps T2", value: "bas_entrance_steps_t2" },
    {
      label: "Window/Door Security Bundle - 40+",
      value: "window_door_security_bundle",
    },
    {
      label: "Holding Tank 1X WEEKLY SERVICE",
      value: "holding_tank_weekly_service",
    },
    {
      label: "60x12 Mobile Office (56x12 Box)",
      value: "sixty_by_twelve_mobile_office",
    },
    {
      label: "Prof. Entrance-Canopy T2",
      value: "professional_entrance_canopy_t2",
    },
    { label: "Data Hub Rental T2", value: "data_hub_rental_t2" },
    {
      label: "Professional Office Package: 2 sets",
      value: "professional_office_package_2_sets",
    },
    { label: "Planning Package: 1 set", value: "planning_package_1_set" },
    { label: "Basic Cafe Package: 1 set", value: "basic_cafe_package_1_set" },
    {
      label: "CONTAINER GUARD KEYED DIFFERENT - MAGNETIC CONTAINER LIGHT",
      value: "container_guard_keyed_different_magnetic_light",
    },
    { label: "1 sliding window", value: "one_sliding_window" },
    {
      label: "1 exterior door 1 interior through door",
      value: "one_exterior_one_interior_door",
    },
    { label: "Doors facing the road", value: "doors_facing_road" },
    { label: "4 offices", value: "four_offices" },
    { label: "Hazardous Waste", value: "hazardous_waste" },
    {
      label: "Doors on both sides of container",
      value: "doors_both_sides_container",
    },
    { label: "(Qty.1) Mini Refrigerator", value: "qty_1_mini_refrigerator" },
    {
      label: "(Qty.1) Convenience Package",
      value: "qty_1_convenience_package",
    },
    {
      label: "(Qty.2) Sm. Lateral File - 2 Drawer",
      value: "qty_2_small_lateral_file",
    },
    {
      label: "(Qty. 3) Conference Table 6ft x 3.5ft",
      value: "qty_3_conference_table",
    },
    { label: "(Qty. 8) Sm. Desk - 4ft x 2.5ft", value: "qty_8_small_desk" },
    { label: "(Qty. 22) Folding Chair", value: "qty_22_folding_chair" },
    { label: "(Qty. 3) Large Trash Can", value: "qty_3_large_trash_can" },
    {
      label: "(Qty. 2) Sm. White Board - 3ft x 4ft",
      value: "qty_2_small_white_board",
    },
    {
      label: "(Qty. 1) Lg. White Board - 4ft x 6ft",
      value: "qty_1_large_white_board",
    },
    { label: "(Qty. 1) Coffee Pot - 12 Cup", value: "qty_1_coffee_pot_12_cup" },
    { label: "(Qty. 1) Microwave", value: "qty_1_microwave" },
    {
      label: "(Qty. 1) Full-Sized Refrigerator",
      value: "qty_1_full_sized_refrigerator",
    },
    { label: "(Qty. 1) Folding Table - 6ft", value: "qty_1_folding_table" },
    {
      label: "(Qty. 3) Office Starter Kit.",
      value: "qty_3_office_starter_kit",
    },
    {
      label: "ADA/IBC Switchback Ramp - 36ft & Larger",
      value: "ada_ibc_switchback_ramp_36ft_larger",
    },
    {
      label: "Prof. Entrance - Steps w/ Canopy",
      value: "professional_entrance_steps_canopy",
    },
    { label: "Data Hub - Rental", value: "data_hub_rental" },
    {
      label: "60x12 Mobile Office or Similar",
      value: "sixty_by_twelve_mobile_office_similar",
    },
    { label: "10x30 mobile office", value: "ten_by_thirty_mobile_office" },
    { label: "50' furnished trailer", value: "fifty_furnished_trailer" },
    {
      label: "12x45 office trailer",
      value: "twelve_by_forty_five_office_trailer",
    },
    { label: "10 x 50 mobile office", value: "ten_by_fifty_mobile_office" },
    { label: "100 AMP Service", value: "100_amp_service" },
    { label: "Locking hasp", value: "locking_hasps" },
    { label: "Kitchen", value: "kitchen" },
    { label: "Breakroom", value: "breakroom" },
  ];
  return data;
}

export function storageContainersCycleTimeList() {
  const data = [
    { label: "28 Days", value: "28 Days" },
    { label: "1 Month", value: "1 Month" },
    { label: "1 Week", value: "1 Week" },
    { label: "Event", value: "Event" },
  ];
  return data;
}

export function fencingAccessoriesList() {
  const data = [
    { label: "Driven", value: "Driven" },
    { label: "Sandbags", value: "Sandbags" },
    { label: "Windscreen", value: "Windscreen" },
    { label: "Barb Wired", value: "Barb Wired" },
    { label: "Wheels", value: "Wheels" },
  ];
  return data;
}

export function fencingPrevailingWagesList() {
  const data = [
    { label: "Federal", value: "Federal" },
    { label: "State", value: "State" },
    { label: "Union", value: "Union" },
    { label: "Prevailing wage", value: "Prevailing wage" },
    { label: "TLA", value: "TLA" },
    { label: "School", value: "School" },
    { label: "City", value: "City" },
  ];
  return data;
}

export function fencingStylesList() {
  const data = [
    { label: "Panels on Stands", value: "Panels on Stands" },
    { label: "Post Driven", value: "Post Driven" },
  ];
  return data;
}

export function terrainList() {
  const data = [
    { label: "Dirt", value: "Dirt" },
    { label: "Concrete", value: "Concrete" },
    { label: "Asphalt", value: "Asphalt" },
  ];
  return data;
}
export function storageContainersCategoryList() {
  const data = [
    { label: "Combo Office/Storage", value: "Combo Office/Storage" },
    { label: "Converted Office", value: "Converted Office" },
    { label: "Office", value: "Office" },
    { label: "Storage", value: "Storage" },
  ];
  return data;
}

export function acceptList() {
  const data = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  return data;
}

export function restroomTrailerList() {
  const data = [
    { label: "2-stall Exec", value: "2-stall Exec" },
    { label: "3-stall Exec", value: "3-stall Exec" },
    { label: "4-stall Exec", value: "4-stall Exec" },
    { label: "5-stall Exec", value: "5-stall Exec" },
    { label: "6-stall Exec", value: "6-stall Exec" },
    { label: "7-stall Exec", value: "7-stall Exec" },
    { label: "8-stall Exec", value: "8-stall Exec" },
    { label: "9-stall Exec", value: "9-stall Exec" },
    { label: "10-stall Exec", value: "10-stall Exec" },
    { label: "ADA Exec", value: "ADA Exec" },
    { label: "PT trailer", value: "PT trailer" },
    { label: "Shower Trailer", value: "Shower Trailer" },
    { label: "Tow Behind", value: "Tow Behind" },
    { label: "With Sink", value: "With Sink" },
    { label: "Other", value: "Other" },
  ];
  return data;
}

export function flPermanentOrTemporary() {
  const data = [
    { label: "Front Load Temp", value: "front_load_temp" },
    { label: "Front Load Perm", value: "front_load_perm" },
  ];
  return data;
}

export function flNewService() {
  const data = [
    { label: "New New", value: "new_new" },
    { label: "New Site", value: "new_site" },
    { label: "New Product", value: "new_product" },
    { label: "Ownership Change", value: "ownership_change" },
    { label: "Vendor Change", value: "vendor_change" },
  ];
  return data;
}

export function flCategoryList() {
  const data = [
    { label: "Front Load", value: "Front Load" },
    { label: "Toter", value: "Toter" },
  ];
  return data;
}

export function flDebrisList() {
  const data = [
    { label: "Trash", value: "Trash" },
    { label: "Recycle", value: "Recycle" },
  ];
  return data;
}
export function equipmentRentalsCategoryList() {
  const data = [
    { label: "Scissor Lift", value: "Scissor Lift" },
    { label: "Boom Lift", value: "Boom Lift" },
    { label: "Fork Lift", value: "Fork Lift" },
    { label: "Man Lift", value: "Man Lift" },
    { label: "Earthmoving", value: "Earthmoving" },
    { label: "Compaction", value: "Compaction" },
    { label: "Light Pole", value: "Light Pole" },
    { label: "Crane", value: "Crane" },
    { label: "Generator", value: "Generator" },
    { label: "Fuel Tank", value: "Fuel Tank" },
    { label: "Trailer", value: "Trailer" },
  ];
  return data;
}
export function eqAddOnsList() {
  const data = [
    { label: "Rental Protection Plan", value: "rental_protection_plan" },
    {
      label: "Additional Pan Tilt Zoom (PTZ) Camera",
      value: "additional_ptz_camera",
    },
    { label: "Fixed IP (internet protocol) Camera", value: "fixed_ip_camera" },
    {
      label: "License Plate Recognition IP Camera",
      value: "license_plate_recognition_ip_camera",
    },
    { label: "Multi sensor IP Camera", value: "multi_sensor_ip_camera" },
    { label: "Fixed thermal IP Camera", value: "fixed_thermal_ip_camera" },
    {
      label:
        "Bi-spectrum PTZ Camera (detects each individual with 4K resolution)",
      value: "bi_spectrum_ptz_camera",
    },
    {
      label:
        "Methanol Generator Fuel Cell (cold weather or poor solar connection)",
      value: "methanol_generator_fuel_cell",
    },
    {
      label: "Service Calls (End user related - 4 hour minimum)",
      value: "service_calls",
    },
    {
      label: "Service Calls Mileage (End user related)",
      value: "service_calls_mileage",
    },
    { label: "Monthly Monitoring", value: "monthly_monitoring" },
  ];
  return data;
}
export function flDebrisDetailsList() {
  const data = [
    { label: "General", value: "General" },
    { label: "Cardboard", value: "Cardboard" },
    { label: "Paper", value: "Paper" },
    { label: "Plastic", value: "Plastic" },
    { label: "Glass", value: "Glass" },
    {
      label: "Organics / Compost - Food Waste",
      value: "Organics / Compost - Food Waste",
    },
    {
      label: "Organics / Compost - Green Waste",
      value: "Organics / Compost - Green Waste",
    },
    { label: "Manure", value: "Manure" },
  ];
  return data;
}

export function debrisTypeList() {
  const data = [
    { label: "Construction - Wood", value: "Wood", category: "Construction" },
    {
      label: "Construction - Drywall",
      value: "Drywall",
      category: "Construction",
    },
    { label: "Construction - Glass", value: "Glass", category: "Construction" },
    { label: "Construction - Doors", value: "Doors", category: "Construction" },
    {
      label: "Construction - Cabinets",
      value: "Cabinets",
      category: "Construction",
    },
    {
      label: "Construction - Flooring (carpet, tile, etc)",
      value: "Flooring (carpet, tile, etc)",
      category: "Construction",
    },
    { label: "Construction - PVC", value: "PVC", category: "Construction" },
    {
      label: "Construction - Insulation",
      value: "Insulation",
      category: "Construction",
    },
    {
      label: "Construction - Fiberglass",
      value: "Fiberglass",
      category: "Construction",
    },
    { label: "Construction - Other", value: "Other", category: "Construction" },
    {
      label: "General Household - Furniture",
      value: "Furniture",
      category: "General Household",
    },
    {
      label: "General Household - Clothes",
      value: "Clothes",
      category: "General Household",
    },
    {
      label: "General Household - Paper (books, magazines, newspapers, etc)",
      value: "Paper (books, magazines, newspapers, etc)",
      category: "General Household",
    },
    {
      label: "General Household - Junk",
      value: "Junk",
      category: "General Household",
    },
    {
      label: "General Household - Other",
      value: "Other",
      category: "Other",
    },
    { label: "Concrete - Clean", value: "Clean", category: "Concrete" },
    {
      label: "Concrete - Rebar included",
      value: "Rebar included",
      category: "Concrete",
    },
    { label: "Concrete - Slurry", value: "Slurry", category: "Concrete" },
    { label: "Concrete - Washout", value: "Washout", category: "Concrete" },
    {
      label: "Concrete - Other",
      value: "Other",
      category: "Concrete Wash-Out",
    },
    { label: "Wood - Railroad ties", value: "Railroad ties", category: "Wood" },
    {
      label: "Wood - Pressure treated",
      value: "Pressure treated",
      category: "Wood",
    },
    { label: "Wood - Other", value: "Other", category: "Wood" },
    { label: "Roofing - Asphalt", value: "Asphalt", category: "Roofing" },
    { label: "Roofing - Built-up", value: "Built-up", category: "Roofing" },
    { label: "Roofing - Metal", value: "Metal", category: "Roofing" },
    { label: "Roofing - Slate", value: "Slate", category: "Roofing" },
    { label: "Roofing - Tile", value: "Tile", category: "Roofing" },
    { label: "Roofing - Other", value: "Other", category: "Roofing" },
  ];
  return data;
}

// TODO shown on status == sale
export function debrisRestrictedItemsList() {
  const data = [
    { label: "Tires", value: "Tires" },
    { label: "Mattresses", value: "Mattresses" },
    { label: "Electronics", value: "Electronics" },
    {
      label: "Appliances containing Freon",
      value: "Appliances containing Freon",
    },
    { label: "White Goods/Appliances", value: "White Goods/Appliances" },
    { label: "Large/bulky items", value: "Large/bulky items" },
    { label: "Other", value: "Other" },
    { label: "Discussed with customer", value: "Discussed with customer" },
  ];
  return data;
}

export function typeOfGateList() {
  const data = [
    { label: "None", value: "none" },
    { label: "Personnel Gate", value: "Personal Gate" },
    { label: "Equipment Gate", value: "Equipment Gate" },
  ];
  return data;
}

export function paymentTypeList() {
  const data = [
    {
      id: 1,
      payment_type: "AMEX",
      use_for: 1,
      created_at: "2024-10-17 10:17:41",
      updated_at: null,
    },
    {
      id: 2,
      payment_type: "Check",
      use_for: 1,
      created_at: "2024-10-17 10:17:41",
      updated_at: null,
    },
    {
      id: 3,
      payment_type: "Discover",
      use_for: 1,
      created_at: "2024-10-17 10:17:41",
      updated_at: null,
    },
    {
      id: 4,
      payment_type: "Mastercard",
      use_for: 1,
      created_at: "2024-10-17 10:17:41",
      updated_at: null,
    },
    {
      id: 5,
      payment_type: "Visa",
      use_for: 1,
      created_at: "2024-10-17 10:17:41",
      updated_at: null,
    },
  ];
  return data;
}

export function otherServiceCategoryList() {
  const data = [
    { label: "Other", value: "Other" },
    // { label: "Grease", value: "Grease" }, //TODO check
  ];
  return data;
}

export function equipRentalCycleList() {
  const data = [
    { label: "Event", value: "Event" },
    { label: "1 Week", value: "1 Week" },
    { label: "28 Days", value: "28 Days" },
    { label: "1 Month", value: "1 Month" },
    { label: "2 Months", value: "2 Months" },
    { label: "3 Months", value: "3 Months" },
    { label: "4 Months", value: "4 Months" },
    { label: "5 Months", value: "5 Months" },
    { label: "6 Months", value: "6 Months" },
    { label: "9 Months", value: "9 Months" },
    { label: "12 Months", value: "12 Months" },
    { label: "18 Months", value: "18 Months" },
    { label: "24 Months", value: "24 Months" },
  ];
  return data;
}

export function premRoCategoryList() {
  const data = [
    { label: "Auger", value: "Auger" },
    { label: "Baler", value: "Baler" },
    { label: "Open Top", value: "Open Top" },
    { label: "Self Contained Compactor", value: "Self Contained Compactor" },
    { label: "Stationary Compactor", value: "Stationary Compactor" },
    { label: "Trailer", value: "Trailer" },
  ];
  return data;
}

export function permRoDebrisList() {
  const data = [
    { label: "Recycle", value: "Recycle" },
    { label: "Trash", value: "Trash" },
  ];
  return data;
}
export function permRoDebrisDetailList() {
  const data = [
    { label: "General", value: "General" },
    { label: "Single Stream Recycle", value: "Single Stream Recycle" },
    { label: "Cardboard", value: "Cardboard" },
    { label: "Construction", value: "Construction" },
    { label: "Mattresses", value: "Mattresses" },
    { label: "Wood", value: "Wood" },
    { label: "Vinyl", value: "Vinyl" },
    {
      label: "Organics / Compost - Food Waste",
      value: "Organics / Compost - Food Waste",
    },
    {
      label: "Organics / Compost - Green Waste",
      value: "Organics / Compost - Green Waste",
    },
    { label: "Special Waste", value: "Special Waste" },
    { label: "Manure", value: "Manure" },
    { label: "Plastic", value: "Plastic" },
  ];
  return data;
}

export function fencingCycleList() {
  const data = [
    { label: "Event", value: "Event" },
    { label: "1 Week", value: "1 Week" },
    { label: "28 Days", value: "28 Days" },
    { label: "1 Month", value: "1 Month" },
    { label: "2 Months", value: "2 Months" },
    { label: "3 Months", value: "3 Months" },
    { label: "4 Months", value: "4 Months" },
    { label: "5 Months", value: "5 Months" },
    { label: "6 Months", value: "6 Months" },
    { label: "9 Months", value: "9 Months" },
    { label: "12 Months", value: "12 Months" },
    { label: "18 Months", value: "18 Months" },
    { label: "24 Months", value: "24 Months" },
    { label: "36 Months", value: "36 Months" },
    { label: "Annually", value: "12 Months" },
  ];
  return data;
}

export function fencingVendorBillingTypeList() {
  const data = [
    { label: "Flat Rate", value: "flat_rate" },
    { label: "Per Foot", value: "per_foot" },
    { label: "Per Panel", value: "per_panel" },
  ];
  return data;
}
export function fencingVendorInitialRentalLengthList() {
  const data = [
    { label: "Event", value: "1" },
    { label: "1 Week", value: "7" },
    { label: "28 Days", value: "28" },
    { label: "1 Month", value: "30" },
    { label: "2 Months", value: "60" },
    { label: "3 Months", value: "90" },
    { label: "4 Months", value: "120" },
    { label: "5 Months", value: "150" },
    { label: "6 Months", value: "180" },
    { label: "9 Months", value: "270" },
    { label: "12 Months", value: "360" },
    { label: "18 Months", value: "480" },
    { label: "24 Months", value: "720" },
    { label: "36 Months", value: "1200" },
    { label: "Annually", value: "365" },
  ];
  return data;
}

export function fencingVendorSecondaryRentalLengthList() {
  const data = [
    ...fencingVendorInitialRentalLengthList(),
    { label: "NA", value: "0" },
  ];
  return data;
}

export function fencingVendorPanelLengthList() {
  const data = [
    { label: "10 ft", value: "10" },
    { label: "12 ft", value: "12" },
    { label: "8 ft", value: "8" },
  ];
  return data;
}

export function fencingVendorDeliveryTypeList() {
  const data = [
    { label: "Trip", value: "trip" },
    { label: "Per Mile", value: "per_mile" },
  ];
  return data;
}

export function automaticPull() {
  const data = [
    { label: "No", value: "no" },
    { label: "Extendable", value: "extendable" },
    { label: "Not Extendable", value: "not_extendable" },
  ];
  return data;
}
export function rentalInterval() {
  const data = [
    { label: "Block", value: "block" },
    { label: "Block - Prorated", value: "block_prorated" },
    { label: "Daily", value: "daily" },
    { label: "Monthly", value: "monthly" },
  ];
  return data;
}

export function cqRentalInterval() {
  const data = [
    { label: "Block", value: "block" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly", value: "quarterly" },
    { label: "Annually", value: "annually" },
  ];
  return data;
}

export function disposalType() {
  const data = [
    { label: "Per Ton", value: "per_ton" },
    { label: "Flat Rate", value: "flat_rate" },
    { label: "Per Yard", value: "per_yard" },
    { label: "Per Ton - Split Rate", value: "per_ton_split_rate" },
    { label: "Per Mattress", value: "per_mattress" },
    { label: "Per Pallet", value: "per_pallet" },
    { label: "Add Other Choice", value: "add_other_choice" },
  ];
  return data;
}

export function inactivityFrequency() {
  const data = [
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly", value: "quarterly" },
    { label: "Block", value: "block" },
    { label: "0", value: "0" },
    { label: "28", value: "28" },
    { label: "30", value: "30" },
    // { label: "Other", value: "Other" },
    { label: "Add Other Choice", value: "add_other_choice" },

  ];
  return data;
}

export function environmentalFluctuating() {
  const data = [
    { label: "Environmental Fluctuates", value: "environmental_fluctuates" },
    { label: "Fixed", value: "fixed" },
    { label: "Fuel Fluctuates", value: "fuel_fluctuates" },
    {
      label: "Fuel/Environmental Fluctuates",
      value: "fuel_environmental_fluctuates",
    },
  ];
  return data;
}

export function margins() {
  const data = [
    { label: " ", value: 0 },
    { label: "15%", value: 85 },
    { label: "20%", value: 80 },
    { label: "25%", value: 75 },
  ];
  return data;
}

export function othersFrequencyOfServiceList() {
  const data = [
    { label: "One Time", value: "one_time" },
    { label: "On Call", value: "on_call" },
    { label: "Weekly", value: "weekly" },
    { label: "14 Days", value: "14_days" },
    { label: "28 Days", value: "28_days" },
    { label: "30 Days", value: "30_days" },
    { label: "45 Days", value: "45_days" },
    { label: "60 Days", value: "60_days" },
    { label: "90 Days", value: "90_days" },
    { label: "120 Days", value: "120_days" },
    { label: "180 Days", value: "180_days" },
    { label: "365 Days", value: "365_days" },
  ];
  return data;
}

export function rentalFormat() {
  const data = [
    { label: "Billed Separately", value: "Billed Separately" },
    { label: "Included in Haul", value: "Included in Haul" },
    { label: "No Rental", value: "No Rental" },
  ];
  return data;
}

export function monitorBillingFrequency() {
  const data = [
    { label: "Monthly", value: "Monthly" },
    { label: "Quarterly", value: "Quarterly" },
    { label: "Annually", value: "Annually" },
  ];
  return data;
}

export function rentalType() {
  const data = [
    { label: "Monitoring System", value: "monitor_system" },
    { label: "Equipment", value: "equipment" },
  ];
  return data;
}

export function cqDisposalType() {
  const data = [
    { label: "Flat Rate", value: "flat_rate" },
    { label: "Per Ton", value: "per_ton" },
    { label: "Per Mattress", value: "per_mattress" },
    { label: "Per Pallet", value: "per_pallet" },
  ];
  return data;
}
