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
} from "./sale.style";
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

const SaleHistoryPage = () => {
  const router = useRouter();
  const { data: sales = [], isLoading, refetch } = useGetAllSale();
  const { mutate: deleteSale } = useDeleteSale();
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

    deleteSale(selectedId, {
      onSuccess: () => {
        refetch();
        handleCloseDialog();
        toast.success("Sotuv o'chirildi");
      },
      onError: () => {
        handleCloseDialog();
        toast.error("Sotuvni o'chirishda xatolik");
      },
    });
  };

  const handleAddSale = () => {
    router.push("/add-saleHistory");
  };

  const handleEditSale = (id: string) => {
    router.push(`/edit-product/${id}`);
  };

  return (
    <Container>
      <NavWrapper>
        <span>Sotuvlar tarixi</span>
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
        <button onClick={handleAddSale}>Sotuv qo'shish</button>
      </SearchWrapper>
      <TableWrapper>
        <TableHead>
          <span>№</span>
          <span>Mahsulotlar</span>
          <span>Jami summa</span>
          <span>To'langan summa</span>
          <span>Mijoz (ism / tel raqam)</span>
          <span>Sotuv sanasi</span>
          <span>Amallar</span>
        </TableHead>
        {isLoading ? (
          <Spinner />
        ) : sales.length === 0 ? (
          <NotProductWrapper>Sotuvlar mavjud emas</NotProductWrapper>
        ) : (
          sales.map((sale: any, index: number) => (
            <TableBody key={sale._id}>
              <span>{index + 1}</span>
              <span>{sale.products[0].product_id.name}...</span>
              <span>{sale.total_amount}</span>
              <span>{sale.paid_amount}</span>
              {sale.customer ? (
                <span>{sale.customer.name}</span>
              ) : sale.customer_phone ? (
                <span>{sale.customer_phone}</span>
              ) : (
                <span>-</span>
              )}
              <span>{formatDate(sale.createdAt)}</span>
              <IconWrapper>
                <DeleteIcon onClick={() => handleOpenDialog(sale._id)} />
                <EditIcon onClick={() => handleEditSale(sale._id)} />
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

export default SaleHistoryPage;
