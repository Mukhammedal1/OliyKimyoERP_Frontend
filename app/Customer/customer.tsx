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
  SearchWrapper2,
  SwitchWrapper,
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
import { Switch } from "@mui/material";

const CustomerPage = () => {
  const router = useRouter();
  const { data: customers = [], isLoading, refetch } = useGetAllCustomer();
  const { mutate: deleteCustomer } = useDeleteCustomer();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [onlyDebtors, setOnlyDebtors] = useState(false);

  const filteredCustomers = customers.filter((customer: any) => {
    const text = search?.toLowerCase();
    const matchSearch =
      customer.name?.toLowerCase().includes(text) ||
      customer.phone_number?.includes(text);
    const matchDebt = onlyDebtors ? customer.debt_amount > 0 : true;
    return matchSearch && matchDebt;
  });

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

  const handleClickOneCustomer = (id: string) => {
    router.push(`/one-customer/${id}`);
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
        <SearchWrapper2>
          <InputWrapper>
            <SearchIcon />
            <input
              type="text"
              placeholder="Mijozlarni qidirish..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </InputWrapper>
          <SwitchWrapper>
            <Switch
              checked={onlyDebtors}
              onChange={(e) => setOnlyDebtors(e.target.checked)}
              color="primary"
            />
            <span>Qarzdor mijozlar</span>
          </SwitchWrapper>
        </SearchWrapper2>
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
        ) : filteredCustomers.length === 0 ? (
          <NotCustomerWrapper>Mijozlar mavjud emas</NotCustomerWrapper>
        ) : (
          filteredCustomers.map((customer: any, index: number) => (
            <TableBody
              onClick={() => {
                handleClickOneCustomer(customer._id);
              }}
              key={customer._id}
            >
              <span>{index + 1}</span>
              <span>{customer.name}</span>
              <span>{customer.phone_number}</span>
              {customer.debt_amount > 0 ? (
                <span className="red"> - {customer.debt_amount.toLocaleString()}</span>
              ) : (
                <span className="green">{customer.debt_amount.toLocaleString()}</span>
              )}
              <span>{formatDate(customer.createdAt)}</span>
              <IconWrapper>
                <DeleteIcon
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleOpenDialog(customer._id);
                  }}
                />
                <EditIcon
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleEditCustomer(customer._id);
                  }}
                />
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
