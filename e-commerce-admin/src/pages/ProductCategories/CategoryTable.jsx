import { Box, Button, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryContext";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteCategory } from "../../services/CategoryServices";

export default function CategoriesTable() {
  const [caterories, setCategories, URL] = useContext(CategoryContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const FETCHED_DATA = await fetch(URL);
    const FETCHED_JSON = await FETCHED_DATA.json();
    setCategories(FETCHED_JSON);
  }

  async function handleDelete(categoryId) {
    deleteCategory(setCategories, caterories, categoryId, URL);
    console.log(categoryId);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "product_category_name", headerName: "Category name", width: 150 },
    { field: "product_category_description", headerName: "Description" },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <Link
              to={`/product/category/edit/${params.row.id}`}
              state={{
                category: caterories.filter((r) => r.id === params.row.id),
              }}
            >
              <Button color={"info"} variant={"outlined"}>
                <AutoFixHighOutlinedIcon />
              </Button>
            </Link>{" "}
            <Button
              color={"error"}
              variant={"contained"}
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteOutlineIcon />
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Container style={{ height: 400, width: "50%" }}>
      <Typography variant="h3" sx={{ marginBottom: 3, marginTop: 10 }}>
        PRODUCT CATEGORIES
      </Typography>
      <DataGrid
        rows={caterories}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      <Link to="/product/category/add">
        <Button variant="contained" color="info" sx={{ marginTop: 2 }}>
          BACK
        </Button>
      </Link>
    </Container>
  );
}
