import React, { useState } from "react";
import {
  Container,
  IconWrapper,
  InputWrapper,
  NavWrapper,
  NotCustomerWrapper,
  ProfileIconWrapper,
  ProfileWrapper,
  SearchWrapper,
  TableBody,
  TableHead,
  TableWrapper,
} from "./supplier.style";
import ProfileIcon from "../../icons/profile-icon";
import SearchIcon from "../../icons/search-icons";
import { useDeleteCustomer, useGetAllCustomer } from "../../hooks/useCustomer";
import { DeleteIcon } from "../../icons/delete-icon";
import { EditIcon } from "../../icons/edit-icon";
import ConfirmDialog from "../../components/modal";
import Spinner from "../../components/LoadingComponent/loading";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { formatDate } from "../../utils/formatDate";
import { useDeleteSupplier, useGetAllSupplier } from "../../hooks/useSupplier";

const SupplierPage = () => {
  const router = useRouter();
  const { data: suppliers = [], isLoading, refetch } = useGetAllSupplier();
  const { mutate: deleteSupplier } = useDeleteSupplier();
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

    deleteSupplier(selectedId, {
      onSuccess: () => {
        refetch();
        handleCloseDialog();
        toast.success("Hamkor o'chirildi");
      },
      onError: () => {
        handleCloseDialog();
        toast.error("Hamkorni o'chirishda xatolik");
      },
    });
  };

  const handleAddSupplier = () => {
    router.push("/add-supplier");
  };

  const handleEditSupplier = (id: string) => {
    router.push(`/edit-supplier/${id}`);
  };

  return (
    <Container>
      <NavWrapper>
        <span>Ta'minotchilar</span>
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
          <input type="text" placeholder="Hamkorlarni qidirish..." />
        </InputWrapper>
        <button onClick={handleAddSupplier}>Ta'minotchi qo'shish</button>
      </SearchWrapper>
      <TableWrapper>
        <TableHead>
          <span>№</span>
          <span>Kompaniya nomi</span>
          <span>Kompaniya raqami</span>
          <span>Kompaniyamiz qarzi</span>
          <span>Yaratilingan sana</span>
          <span>Amallar</span>
        </TableHead>
        {isLoading ? (
          <Spinner />
        ) : suppliers.length === 0 ? (
          <NotCustomerWrapper>Hamkorlar mavjud emas</NotCustomerWrapper>
        ) : (
          suppliers.map((supplier: any, index: number) => (
            <TableBody key={supplier._id}>
              <span>{index + 1}</span>
              <span>{supplier.name}</span>
              <span>{supplier.phone_number}</span>
              <span>{supplier.debt_amount}</span>
              <span>{formatDate(supplier.createdAt)}</span>
              <IconWrapper>
                <DeleteIcon onClick={() => handleOpenDialog(supplier._id)} />
                <EditIcon onClick={() => handleEditSupplier(supplier._id)} />
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

export default SupplierPage;
