// mockData.js
export const mockItems = [
    {
      id: 1,
      name: "Website Development",
      description: "Custom website design and development",
      cost: 1200,
      category: "Services"
    },
    {
      id: 2,
      name: "SEO Package",
      description: "Search engine optimization basic package",
      cost: 500,
      category: "Services"
    },
    {
      id: 3,
      name: "Content Writing",
      description: "Professional blog post writing (1000 words)",
      cost: 150,
      category: "Services"
    },
    {
      id: 4,
      name: "Social Media Management",
      description: "Monthly social media content creation and posting",
      cost: 800,
      category: "Services"
    },
    {
      id: 5,
      name: "Domain Registration",
      description: "1-year domain registration (.com)",
      cost: 12.99,
      category: "Products"
    },
    {
      id: 6,
      name: "SSL Certificate",
      description: "1-year SSL security certificate",
      cost: 89.99,
      category: "Products"
    },
    {
      id: 7,
      name: "Web Hosting",
      description: "Premium shared hosting (monthly)",
      cost: 9.99,
      category: "Products"
    },
    {
      id: 8,
      name: "Consultation",
      description: "1-hour business consultation",
      cost: 100,
      category: "Services"
    }
  ];
  
  export const mockDataInvoices = [
    {
      id: 1,
      name: "Jon Snow",
      email: "jonsnow@gmail.com",
      cost: 21.99,
      phone: "(665)121-5454",
      date: "03/12/2023",
      status: "Paid",
      items: [
        { id: 1, name: "Domain Registration", quantity: 1, cost: 12.99 },
        { id: 7, name: "Web Hosting", quantity: 1, cost: 9.99 }
      ]
    },
    {
      id: 2,
      name: "Cersei Lannister",
      email: "cerseilannister@gmail.com",
      cost: 500,
      phone: "(421)314-2288",
      date: "06/15/2023",
      status: "Pending",
      items: [
        { id: 2, name: "SEO Package", quantity: 1, cost: 500 }
      ]
    },
    {
      id: 3,
      name: "Jaime Lannister",
      email: "jaimelannister@gmail.com",
      cost: 1200,
      phone: "(422)982-6739",
      date: "05/02/2023",
      status: "Paid",
      items: [
        { id: 1, name: "Website Development", quantity: 1, cost: 1200 }
      ]
    },
    {
      id: 4,
      name: "Anya Stark",
      email: "anyastark@gmail.com",
      cost: 150,
      phone: "(921)425-6742",
      date: "03/21/2023",
      status: "Paid",
      items: [
        { id: 3, name: "Content Writing", quantity: 1, cost: 150 }
      ]
    },
    {
      id: 5,
      name: "Daenerys Targaryen",
      email: "daenerystargaryen@gmail.com",
      cost: 800,
      phone: "(421)445-1189",
      date: "01/12/2023",
      status: "Overdue",
      items: [
        { id: 4, name: "Social Media Management", quantity: 1, cost: 800 }
      ]
    },
    {
      id: 6,
      name: "Ever Melisandre",
      email: "evermelisandre@gmail.com",
      cost: 102.98,
      phone: "(232)545-6483",
      date: "11/02/2023",
      status: "Paid",
      items: [
        { id: 5, name: "Domain Registration", quantity: 1, cost: 12.99 },
        { id: 6, name: "SSL Certificate", quantity: 1, cost: 89.99 }
      ]
    },
    {
      id: 7,
      name: "Ferrara Clifford",
      email: "ferraraclifford@gmail.com",
      cost: 100,
      phone: "(543)124-0123",
      date: "02/11/2023",
      status: "Pending",
      items: [
        { id: 8, name: "Consultation", quantity: 1, cost: 100 }
      ]
    },
    {
      id: 8,
      name: "Rossini Frances",
      email: "rossinifrances@gmail.com",
      cost: 1649.97,
      phone: "(222)444-5555",
      date: "05/02/2023",
      status: "Paid",
      items: [
        { id: 1, name: "Website Development", quantity: 1, cost: 1200 },
        { id: 2, name: "SEO Package", quantity: 1, cost: 500 },
        { id: 5, name: "Domain Registration", quantity: 1, cost: 12.99 },
        { id: 6, name: "SSL Certificate", quantity: 1, cost: 89.99 },
        { id: 7, name: "Web Hosting", quantity: 3, cost: 9.99 }
      ]
    }
  ];
  
  export const defaultSenderInfo = {
    name: "Tech Solutions Inc.",
    address: "123 Business Rd, Tech City, TC 10001",
    email: "billing@techsolutions.com",
    phone: "+1 (555) 123-4567",
    taxId: "TAX-987654321",
    website: "www.techsolutions.com",
    bankInfo: {
      bankName: "First National Bank",
      accountNumber: "1234567890",
      routingNumber: "987654321"
    }
  };
  
  export const sampleRecipients = [
    {
      id: 1,
      name: "Acme Corporation",
      address: "456 Corporate Ave, Business City, BC 20002",
      email: "accounts@acme.com",
      phone: "+1 (555) 987-6543",
      taxId: "TAX-123456789",
      contactPerson: "John Smith"
    },
    {
      id: 2,
      name: "Global Enterprises",
      address: "789 World St, Metro City, MC 30003",
      email: "finance@global.com",
      phone: "+1 (555) 456-7890",
      taxId: "TAX-456789123",
      contactPerson: "Sarah Johnson"
    },
    {
      id: 3,
      name: "Innovative Solutions",
      address: "321 Progress Blvd, Future City, FC 40004",
      email: "billing@innovative.com",
      phone: "+1 (555) 789-0123",
      taxId: "TAX-789123456",
      contactPerson: "Michael Brown"
    }
  ];