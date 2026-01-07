import React, { useMemo, useState } from "react";
import {
  Container,
  DateWrapper,
  FilterWrapper,
  GlowText,
  IconWrapper,
  Input,
  MainDateWrapper,
  MainTabWrapper,
  NavWrapper,
  NotProductWrapper,
  ProfileIconWrapper,
  ProfileWrapper,
  Select,
  Span1,
  TableBody,
  TableHead,
  TableWrapper,
  TabWrapper,
} from "./transaction.style";
import ProfileIcon from "../../icons/profile-icon";
import {
  useDeleteTransaction,
  useGetAllTransaction,
} from "../../hooks/useTransaction";
import Spinner from "../../components/LoadingComponent/loading";
import { DeleteIcon } from "../../icons/delete-icon";
import { formatDate } from "../../utils/formatDate";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Transaction } from "../../utils/types";
import ConfirmDialog from "../../components/modal";

const TransactionPage = () => {
  const router = useRouter();

  const {
    data: transactions = [],
    isLoading,
    refetch,
  } = useGetAllTransaction();

  const { mutate: deleteTransaction } = useDeleteTransaction();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Barchasi");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item: any) => {
      const matchTabs =
        activeTab && activeTab === "Kirimlar"
          ? item.incomeExpenseType === "KIRIM"
          : activeTab === "Chiqimlar"
          ? item.incomeExpenseType === "CHIQIM"
          : true;
      const categoryMatch =
        selectedCategory && selectedCategory !== "BARCHASI"
          ? item.categoryType === selectedCategory
          : true;

      const date = new Date(item.createdAt);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate
        ? new Date(new Date(endDate).setHours(23, 59, 59, 999))
        : null;

      const startMatch = start ? date >= start : true;
      const endMatch = end ? date <= end : true;

      return matchTabs && categoryMatch && startMatch && endMatch;
    });
  }, [transactions, selectedCategory, startDate, endDate, activeTab]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
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

    deleteTransaction(selectedId, {
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

  const handleAddTransaction = () => {
    if (activeTab === "Kirimlar") {
      router.push("/add-transaction?type=kirim");
    }
    if (activeTab === "Chiqimlar") {
      router.push("/add-transaction?type=chiqim");
    }
  };

  const handleEditSale = (id: string) => {
    router.push(`/edit-product/${id}`);
  };

  return (
    <Container>
      <NavWrapper>
        <span>Kirim/Chiqim</span>
        <ProfileWrapper>
          <p>Muhammadali</p>
          <ProfileIconWrapper>
            <ProfileIcon />
          </ProfileIconWrapper>
        </ProfileWrapper>
      </NavWrapper>
      <MainTabWrapper>
        <TabWrapper
          $active={activeTab === "Barchasi"}
          onClick={() => handleTabClick("Barchasi")}
        >
          <span>Barchasi</span>
        </TabWrapper>

        <TabWrapper
          $active={activeTab === "Kirimlar"}
          onClick={() => handleTabClick("Kirimlar")}
        >
          <span>Kirimlar</span>
        </TabWrapper>

        <TabWrapper
          $active={activeTab === "Chiqimlar"}
          onClick={() => handleTabClick("Chiqimlar")}
        >
          <span>Chiqimlar</span>
        </TabWrapper>
      </MainTabWrapper>

      <FilterWrapper>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {activeTab === "Kirimlar" ? (
            <>
              <option value="BARCHASI">KIRIM/CHIQIM MANBASI</option>
              <option className="sale" value="SOTUV">
                SOTUV
              </option>
              <option className="customer_debt" value="MIJOZ QARZ TO'LOVI">
                MIJOZ QARZ TO'LOVI
              </option>
              <option className="other" value="BOSHQA">
                BOSHQA
              </option>
            </>
          ) : activeTab === "Chiqimlar" ? (
            <>
              <option value="BARCHASI">KIRIM/CHIQIM MANBASI</option>
              <option className="purchase" value="XARID">
                XARID
              </option>
              <option
                className="company_debt"
                value="KOMPANIYAMIZ QARZ TO'LOVI"
              >
                KOMPANIYAMIZ QARZ TO'LOVI
              </option>
              <option className="other" value="BOSHQA">
                BOSHQA
              </option>
            </>
          ) : (
            <>
              <option value="BARCHASI">KIRIM/CHIQIM MANBASI</option>
              <option className="sale" value="SOTUV">
                SOTUV
              </option>
              <option className="purchase" value="XARID">
                XARID
              </option>
              <option className="customer_debt" value="MIJOZ QARZ TO'LOVI">
                MIJOZ QARZ TO'LOVI
              </option>
              <option
                className="company_debt"
                value="KOMPANIYAMIZ QARZ TO'LOVI"
              >
                KOMPANIYAMIZ QARZ TO'LOVI
              </option>
              <option className="other" value="BOSHQA">
                BOSHQA
              </option>
            </>
          )}
        </Select>
        <MainDateWrapper>
          <DateWrapper>
            <p>dan:</p>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
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
        {activeTab !== "Barchasi" && (
          <button onClick={handleAddTransaction}>
            {activeTab === "Kirimlar" ? "Kirim" : "Chiqim"} qo'shish
          </button>
        )}
      </FilterWrapper>

      <TableWrapper>
        <TableHead>
          <span>№</span>
          <span>Kirim/Chiqim manbasi</span>
          <span>Summa miqdori</span>
          <span>Kirim/Chiqim sanasi</span>
          <span>Kirim / Chiqim</span>
          <span>Amallar</span>
        </TableHead>
        {isLoading ? (
          <Spinner />
        ) : filteredTransactions.length === 0 ? (
          <NotProductWrapper>
            {activeTab === "Kirimlar"
              ? "Kirimlar mavjud emas"
              : activeTab === "Chiqimlar"
              ? "Chiqimlar mavjud emas"
              : "Kirim/Chiqim tarixi mavjud emas"}
          </NotProductWrapper>
        ) : (
          filteredTransactions.map((transaction: any, index: number) => (
            <TableBody key={transaction._id}>
              <span>{index + 1}</span>
              <GlowText $type={transaction.categoryType}>
                {transaction.categoryType}
              </GlowText>
              {transaction.incomeExpenseType === "KIRIM" ? (
                <span>+ {transaction.amount}</span>
              ) : (
                <span>- {transaction.amount}</span>
              )}
              <span>{formatDate(transaction.createdAt)}</span>
              <Span1 $type={transaction.incomeExpenseType}>
                {transaction.incomeExpenseType}
              </Span1>
              <IconWrapper>
                <DeleteIcon onClick={() => handleOpenDialog(transaction._id)} />
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

export default TransactionPage;
