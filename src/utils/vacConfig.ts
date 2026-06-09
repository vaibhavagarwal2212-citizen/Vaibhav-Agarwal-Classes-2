export interface CampusAddress {
  office: string;
  building: string;
  landmark: string;
  cityStatePin: string;
  fullAddress: string;
}

export interface AdminContact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface InstituteDetails {
  name: string;
  address: CampusAddress;
  contacts: AdminContact[];
}

export const INSTITUTE_DETAILS: InstituteDetails = {
  name: "Vaibhav Agarwal Classes",
  
  // Updated Campus Address Parameters
  address: {
    office: "Office No. 101, 102",
    building: "JMD Excellence Business Space Hub",
    landmark: "Bhimrad, Althan",
    cityStatePin: "Surat - 395017",
    fullAddress: "Office No. 101, 102, JMD Excellence Business Space Hub, Bhimrad, Althan, Surat - 395017"
  },

  // Multi-Admin Phone Directory for routing WhatsApp links accurately
  contacts: [
    {
      name: "Vaibhav Agarwal",
      role: "Director / Administrator",
      phone: "9637716664",
      email: "vaibhav@vacsurat.com"
    },
    {
      name: "Kajal Agarwal",
      role: "Admissions Head",
      phone: "9586032030",
      email: "kajal@vacsurat.com"
    },
    {
      name: "Jitendra Maurya",
      role: "Operations & Tech Support",
      phone: "7383123990",
      email: "jitendra@vacsurat.com"
    }
  ]
};
