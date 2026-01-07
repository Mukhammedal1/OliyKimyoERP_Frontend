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
} from "./customer.style";
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

const CustomerPage = () => {
  const router = useRouter();
  const { data: customers = [], isLoading, refetch } = useGetAllCustomer();
  const { mutate: deleteCustomer } = useDeleteCustomer();
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

    deleteCustomer(selectedId, {
      onSuccess: () => {
        refetch();
        handleCloseDialog();
        toast.success("Mijoz o'chirildi");
      },
      onError: (e: any) => {
        handleCloseDialog();
        toast.error(e.response?.data?.message);
      },
    });
  };

  const handleAddCustomer = () => {
    router.push("/add-customer");
  };

  const handleEditCustomer = (id: string) => {
    router.push(`/edit-customer/${id}`);
  };

  return (
    <Container>
      <NavWrapper>
        <span>Mijozlar</span>
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
          <input type="text" placeholder="Mijozlarni qidirish..." />
        </InputWrapper>
        <button onClick={handleAddCustomer}>Mijoz qo'shish</button>
      </SearchWrapper>
      <TableWrapper>
        <TableHead>
          <span>№</span>
          <span>Mijoz ismi</span>
          <span>Mijoz raqami</span>
          <span>Qarz miqdori</span>
          <span>Yaratilingan sana</span>
          <span>Amallar</span>
        </TableHead>
        {isLoading ? (
          <Spinner />
        ) : customers.length === 0 ? (
          <NotCustomerWrapper>Mijozlar mavjud emas</NotCustomerWrapper>
        ) : (
          customers.map((customer: any, index: number) => (
            <TableBody key={customer._id}>
              <span>{index + 1}</span>
              <span>{customer.name}</span>
              <span>{customer.phone_number}</span>
              <span>{customer.debt_amount}</span>
              <span>{formatDate(customer.createdAt)}</span>
              <IconWrapper>
                <DeleteIcon onClick={() => handleOpenDialog(customer._id)} />
                <EditIcon onClick={() => handleEditCustomer(customer._id)} />
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

export default CustomerPage;
