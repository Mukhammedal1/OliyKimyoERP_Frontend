import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  DateWrapper,
  IconWrapper,
  Input,
  InputWrapper,
  ListWrapper,
  MainDateWrapper,
  NavWrapper,
  NotProductWrapper,
  ProductsRow,
  ProductsTable,
  ProfileIconWrapper,
  ProfileWrapper,
  SearchWrapper,
  SelectWrapper,
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
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Select from "react-select";
import { useGetAllCustomer } from "../../hooks/useCustomer";
import { FaPlus } from "react-icons/fa";

const SaleHistoryPage = () => {
  const router = useRouter();
  const { data: sales = [], isLoading, refetch } = useGetAllSale();
  const { data: customers = [], isLoading: isCustomersLoading } =
    useGetAllCustomer();

  const { mutate: deleteSale } = useDeleteSale();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const customerOptions = customers.map((c: any) => ({
    value: c._id,
    label: c.name,
  }));

  const filteredSales = useMemo(() => {
    return sales.filter((item: any) => {
      const date = new Date(item.createdAt);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate
        ? new Date(new Date(endDate).setHours(23, 59, 59, 999))
        : null;

      const startMatch = start ? date >= start : true;
      const endMatch = end ? date <= end : true;

      const customerMatch = selectedCustomer
        ? item.customer?._id === selectedCustomer.value
        : true;

      return startMatch && endMatch && customerMatch;
    });
  }, [sales, startDate, endDate, selectedCustomer]);

  const handleClickChevronIcon = (id: string) => {
    setOpenRowId((prev) => (prev === id ? null : id));
  };

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
    router.push(`/edit-sale/${id}`);
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
      {isCustomersLoading ? (
        <Spinner />
      ) : (
        <>
          <SearchWrapper>
            <Select
              classNamePrefix="react-select"
              options={customerOptions}
              value={selectedCustomer}
              onChange={(option: any) => setSelectedCustomer(option)}
              isSearchable={true}
              menuPortalTarget={document.body}
              placeholder="Mijozni tanlang..."
              isClearable
              styles={{
                control: (base) => ({
                  ...base,
                  width: 240,
                  borderRadius: 8,
                  border: "1px solid #1e293b",
                  boxShadow: "none",
                  "&:hover": { borderColor: "#1e293b" },
                }),
                singleValue: (base) => ({ ...base, color: "black" }),
                placeholder: (base) => ({ ...base, color: "black" }),
                menu: (base) => ({
                  ...base,
                  borderRadius: 8,
                  maxHeight: 200,
                }),
                menuList: (base) => ({
                  ...base,
                  padding: 0,
                  maxHeight: 120,
                  borderRadius: 8,
                }),
                option: (base, state) => ({
                  ...base,
                  color: "black",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "#1e293b",
                    color: "white",
                  },
                }),
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
            />
            <MainDateWrapper>
              <DateWrapper>
                <p>dan:</p>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e: any) => setStartDate(e.target.value)}
                />
              </DateWrapper>
              <DateWrapper>
                <p>gacha:</p>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </DateWrapper>
            </MainDateWrapper>
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
            ) : filteredSales.length === 0 ? (
              <NotProductWrapper>Sotuvlar mavjud emas</NotProductWrapper>
            ) : (
              filteredSales.map((sale: any, index: number) => (
                <>
                  <TableBody key={sale._id}>
                    <span>{index + 1}</span>
                    <ListWrapper>
                      {sale.products[0].product_id.name}...
                      {openRowId === sale._id ? (
                        <FiChevronUp
                          onClick={() => handleClickChevronIcon(sale._id)}
                        />
                      ) : (
                        <FiChevronDown
                          onClick={() => handleClickChevronIcon(sale._id)}
                        />
                      )}
                    </ListWrapper>
                    <span>{sale.total_amount.toLocaleString()}</span>
                    <span>{sale.paid_amount.toLocaleString()}</span>
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
                  {openRowId === sale._id && (
                    <ProductsRow>
                      <ProductsTable>
                        <thead>
                          <tr>
                            <th>Mahsulotlar</th>
                            <th>Miqdor</th>
                            <th>Narx</th>
                            <th>Jami</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sale.products.map((product: any, index: number) => (
                            <tr key={index}>
                              <td>{product.product_id?.name}</td>
                              <td>{product.quantity}</td>
                              <td>{product.price.toLocaleString()}</td>
                              <td>{product.total_price.toLocaleString()}</td>
                            </tr>
                          ))}
                          <tr className="oxirgirow">
                            <td>Sotuvdan qolgan qarz</td>
                            {sale.total_amount - sale.paid_amount > 0 ? (
                              <td
                                colSpan={3}
                                className="red"
                                style={{ color: "red" }}
                              >
                                -{" "}
                                {(
                                  sale.total_amount - sale.paid_amount
                                ).toLocaleString()}
                              </td>
                            ) : (
                              <td
                                colSpan={3}
                                className="green"
                                style={{ color: "green" }}
                              >
                                {(
                                  sale.total_amount - sale.paid_amount
                                ).toLocaleString()}
                              </td>
                            )}
                          </tr>
                          <tr className="oxirgirow">
                            <td>Sotuv izohi</td>
                            <td colSpan={3}>
                              <div className="note-cell">
                                {sale.note || "-"}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </ProductsTable>
                    </ProductsRow>
                  )}
                </>
              ))
            )}
          </TableWrapper>
        </>
      )}

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
