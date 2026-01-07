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
} from "./purchase.style";
import ProfileIcon from "../../icons/profile-icon";
import SearchIcon from "../../icons/search-icons";
import { DeleteIcon } from "../../icons/delete-icon";
import { EditIcon } from "../../icons/edit-icon";
import ConfirmDialog from "../../components/modal";
import Spinner from "../../components/LoadingComponent/loading";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { formatDate } from "../../utils/formatDate";
import { useDeleteSale, useGetAllSale } from "../../hooks/useSale";
import { useDeletePurchase, useGetAllPurchase } from "../../hooks/usePurchase";

const PurchasePage = () => {
  const router = useRouter();
  const { data: purchases = [], isLoading, refetch } = useGetAllPurchase();
  const { mutate: deletePurchase } = useDeletePurchase();
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

    deletePurchase(selectedId, {
      onSuccess: () => {
        refetch();
        handleCloseDialog();
        toast.success("Xarid o'chirildi");
      },
      onError: () => {
        handleCloseDialog();
        toast.error("Xaridni o'chirishda xatolik");
      },
    });
  };

  const handleAddPurchase = () => {
    router.push("/add-purchase");
  };

  const handleEditPurchase = (id: string) => {
    router.push(`/edit-product/${id}`);
  };

  return (
    <Container>
      <NavWrapper>
        <span>Xaridlar tarixi</span>
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
          <input type="text" placeholder="Xaridni qidirish..." />
        </InputWrapper>
        <button onClick={handleAddPurchase}>Xarid qo'shish</button>
      </SearchWrapper>
      <TableWrapper>
        <TableHead>
          <span>№</span>
          <span>Mahsulotlar</span>
          <span>Jami summa</span>
          <span>To'langan summa</span>
          <span>Ta'minotchi (ism / tel raqam)</span>
          <span>Xarid sanasi</span>
          <span>Amallar</span>
        </TableHead>
        {isLoading ? (
          <Spinner />
        ) : purchases.length === 0 ? (
          <NotProductWrapper>Xaridlar mavjud emas</NotProductWrapper>
        ) : (
          purchases.map((purchase: any, index: number) => (
            <TableBody key={purchase._id}>
              <span>{index + 1}</span>
              <span>{purchase.products[0].product_id.name}</span>
              <span>{purchase.total_amount}</span>
              <span>{purchase.paid_amount}</span>
              {purchase.supplier ? (
                <span>{purchase.supplier.name}</span>
              ) : purchase.supplier_phone ? (
                <span>{purchase.supplier_phone}</span>
              ) : (
                <span>-</span>
              )}
              <span>{formatDate(purchase.createdAt)}</span>
              <IconWrapper>
                <DeleteIcon onClick={() => handleOpenDialog(purchase._id)} />
                <EditIcon onClick={() => handleEditPurchase(purchase._id)} />
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

export default PurchasePage;
