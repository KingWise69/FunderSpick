import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete, VisibilityOff, CloudUpload, GetApp, Close } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const ProductListPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDarkMode = theme.palette.mode === "dark";

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    image: null,
    imageFile: null,
    name: "",
    code: "",
    category: "",
    brand: "",
    price: "",
    unit: "",
    quantity: "",
  });

  const [error, setError] = useState("");

  // Handle text field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Drag and drop or file selection for image
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(file),
        imageFile: file,
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  // Remove selected image
  const removeImage = () => {
    setFormData({ ...formData, image: null, imageFile: null });
  };

  const handleCreateProduct = () => {
    if (Object.values(formData).some((field) => field === "" || field === null)) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    setProducts([...products, { id: products.length + 1, ...formData }]);
    setFormData({
      image: null,
      imageFile: null,
      name: "",
      code: "",
      category: "",
      brand: "",
      price: "",
      unit: "",
      quantity: "",
    });
    setError("");
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleHide = (id) => {
    alert(`Product with ID ${id} is now hidden`);
  };

  // Generate PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Product List", 10, 10);
    autoTable(doc, {
      head: [["Name", "Code", "Category", "Brand", "Price (UGX)", "Unit", "Quantity"]],
      body: products.map(({ name, code, category, brand, price, unit, quantity }) => [
        name,
        code,
        category,
        brand,
        price,
        unit,
        quantity,
      ]),
    });
    doc.save("Product_List.pdf");
  };

  // Generate Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "Product_List.xlsx");
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <img src={params.value} alt="Product" style={{ width: 50, height: 50, borderRadius: 5 }} />
        ) : (
          "No Image"
        ),
    },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "code", headerName: "Code", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "brand", headerName: "Brand", flex: 1 },
    { field: "price", headerName: "Price (UGX)", flex: 1 },
    { field: "unit", headerName: "Unit", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton color="warning" onClick={() => handleHide(params.row.id)}>
            <VisibilityOff />
          </IconButton>
          <IconButton color="primary">
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Typography variant="h4" fontWeight="bold">
        Product List
      </Typography>

      {/* Create Product Form */}
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        mt={3}
        sx={{ backgroundColor: colors.primary[400], p: 3, borderRadius: 2 }}
      >
        <Typography variant="h6">Create Product</Typography>

        {/* Drag and Drop Image Upload */}
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed gray",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: colors.primary[300],
          }}
        >
          <input {...getInputProps()} />
          <Typography sx={{ color: isDarkMode ? "white" : "white" }}>
            {formData.image ? "Image Selected" : "Drag & drop an image here, or click to select one"}
          </Typography>

          {formData.image && (
            <Box mt={1} display="flex" alignItems="center" gap={1}>
              <img src={formData.image} alt="Preview" style={{ width: 100, height: 100, borderRadius: 5 }} />
              <IconButton color="error" onClick={removeImage}>
                <Close />
              </IconButton>
            </Box>
          )}
        </Box>

        {error && (
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        )}

        <Button variant="contained" color="primary" onClick={handleCreateProduct}>
          Create Product
        </Button>
      </Box>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button variant="contained" color="secondary" startIcon={<CloudUpload />}>
          Import Products
        </Button>
        <Box>
          <Button variant="contained" color="error" startIcon={<GetApp />} onClick={handleDownloadPDF} sx={{ ml: 2 }}>
            Download PDF
          </Button>
          <Button variant="contained" color="success" startIcon={<GetApp />} onClick={handleDownloadExcel} sx={{ ml: 2 }}>
            Download Excel
          </Button>
        </Box>
      </Box>

      {/* Product Table */}
      <Box mt={4} sx={{ height: "60vh" }}>
        <DataGrid rows={products} columns={columns} />
      </Box>
    </Box>
  );
};

export default ProductListPage;
