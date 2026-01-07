import React, { useState } from "react";
import {
  Container,
  IconWrapper,
  InputWrapper,
  NavWrapper,
  NotProductWrapper,
  ProfileIconWrapper,
  ProfileWrapper,
  SearchWrapper,
  TableBody,
  TableHead,
  TableWrapper,
} from "./product.style";
import ProfileIcon from "../../icons/profile-icon";
import SearchIcon from "../../icons/search-icons";
import { useDeleteCustomer, useGetAllCustomer } from "../../hooks/useCustomer";
import { DeleteIcon } from "../../icons/delete-icon";
import { EditIcon } from "../../icons/edit-icon";
import ConfirmDialog from "../../components/modal";
import Spinner from "../../components/LoadingComponent/loading";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDeleteProduct, useGetAllProduct } from "../../hooks/useProduct";
import { formatDate } from "../../utils/formatDate";

const ProductPage = () => {
  const router = useRouter();
  const { data: products = [], isLoading, refetch } = useGetAllProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleOpenDialog = (id: string) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedId(null);
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (!selectedId) return;

    deleteProduct(selectedId, {
      onSuccess: () => {
        refetch();
        handleCloseDialog();
        toast.success("Mahsulot o'chirildi");
      },
      onError: () => {
        handleCloseDialog();
        toast.error("Mahsulotni o'chirishda xatolik");
      },
    });
  };

  const handleAddProduct = () => {
    router.push("/add-product");
  };

  const handleEditProduct = (id: string) => {
    router.push(`/edit-product/${id}`);
  };

  return (
    <Container>
      <NavWrapper>
        <span>Mahsulotlar</span>
        <ProfileWrapper>
          <p>Muhammadali</p>
          <ProfileIconWrapper>
            <ProfileIcon />
          </ProfileIconWrapper>
        </ProfileWrapper>
      </NavWrapper>

      <SearchWrapper>
        <InputWrapper>
          <SearchIcon />
          <input type="text" placeholder="Mahsulotni qidirish..." />
        </InputWrapper>
        <button onClick={handleAddProduct}>Mahsulot qo'shish</button>
      </SearchWrapper>
      <TableWrapper>
        <TableHead>
          <span>№</span>
          <span>Mahsulotning nomi</span>
          <span>Sotib olingan narxi</span>
          <span>O'lchov birligi</span>
          <span>Ombordagi miqdori</span>
          <span>Kelgan sanasi</span>
          <span>Amallar</span>
        </TableHead>
        {isLoading ? (
          <Spinner />
        ) : products.length === 0 ? (
          <NotProductWrapper>Mahsulotlar mavjud emas</NotProductWrapper>
        ) : (
          products.map((product: any, index: number) => (
            <TableBody key={product._id}>
              <span>{index + 1}</span>
              <span>{product.name}</span>
              <span>{product.buy_price}</span>
              <span>{product.unit.name}</span>
              <span>{product.stock_amount}</span>
              <span>{formatDate(product.createdAt)}</span>
              <IconWrapper>
                <DeleteIcon onClick={() => handleOpenDialog(product._id)} />
                <EditIcon onClick={() => handleEditProduct(product._id)} />
              </IconWrapper>
            </TableBody>
          ))
        )}
      </TableWrapper>

      <ConfirmDialog
        open={dialogOpen}
        title="O'chirishni tasdiqlaysizmi?"
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
      />
    </Container>
  );
};

export default ProductPage;
