import React, { useEffect, useRef, useState } from "react";
import ProfileIcon from "../../../icons/profile-icon";
import {
  ButtonWrapper,
  Container,
  ContentWrapper,
  FirstWrapper,
  Input3,
  NavWrapper,
  NoteWrapper,
  PricesWrapper,
  ProfileIconWrapper,
  ProfileWrapper,
  Select,
  SelectWrapper,
} from "./addTransaction.style";
import { useGetAllCustomer } from "../../../hooks/useCustomer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spinner from "../../../components/LoadingComponent/loading";
import { useCreateTransaction } from "../../../hooks/useTransaction";
import { useSearchParams } from "next/navigation";
import { useGetAllSupplier } from "../../../hooks/useSupplier";

const AddTransactionPage = () => {
  const router = useRouter();
  const nodeRef = useRef(null);
  const searchParams = useSearchParams();
  const type = searchParams!.get("type");

  const [selectedCategory, setSelectedCategory] = useState(
    type === "kirim" ? "MIJOZ QARZ TO'LOVI" : "KOMPANIYAMIZ QARZ TO'LOVI"
  );
  const [customer, setCustomer] = useState("");
  const [supplier, setSupplier] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const { mutate: createTransaction, isPending } = useCreateTransaction();
  const {
    data: customers = [],
    isLoading: isCustomerLoading,
    refetch: refetchCustomer,
  } = useGetAllCustomer();
  const {
    data: suppliers = [],
    isLoading: isSupplierLoading,
    refetch: refetchSupplier,
  } = useGetAllSupplier();

  useEffect(() => {
    if (customers.length > 0 && !customer) {
      setCustomer(customers[0]._id);
    }
  }, [customers, customer]);

  useEffect(() => {
    if (suppliers.length > 0 && !supplier) {
      setSupplier(suppliers[0]._id);
    }
  }, [suppliers, supplier]);

  const handleCreateTransaction = () => {
    if (selectedCategory === "MIJOZ QARZ TO'LOVI" && !customer) {
      toast.error("Iltimos, Mijozni tanlang");
      return;
    }
    if (selectedCategory === "KOMPANIYAMIZ QARZ TO'LOVI" && !supplier) {
      toast.error("Iltimos, Ta'minotchi kompaniyani tanlang");
      return;
    }
    if (!amount) {
      toast.error("Iltimos, Qarz to'lov summasini kiriting");
      return;
    }

    createTransaction(
      {
        incomeExpenseType: type === "kirim" ? "KIRIM" : "CHIQIM",
        categoryType: selectedCategory,
        amount: Number(amount),
        note,
        customerId:
          selectedCategory === "MIJOZ QARZ TO'LOVI" ? customer : undefined,
        supplierId:
          selectedCategory === "KOMPANIYAMIZ QARZ TO'LOVI"
            ? supplier
            : undefined,
      },
      {
        onSuccess: () => {
          toast.success(
            type === "kirim" ? "Kirim qo'shildi" : "Chiqim qo'shildi"
          );
          router.push("/transaction");
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Xatolik yuzberdi");
        },
      }
    );
  };

  const handleCancelTransaction = () => {
    router.push("/transaction");
  };

  return (
    <Container>
      <NavWrapper>
        <span>{type === "kirim" ? "Kirim" : "Chiqim"} qo'shish</span>
        <ProfileWrapper>
          <p>Muhammadali</p>
          <ProfileIconWrapper>
            <ProfileIcon />
          </ProfileIconWrapper>
        </ProfileWrapper>
      </NavWrapper>
      {isCustomerLoading ? (
        <Spinner />
      ) : (
        <ContentWrapper>
          <SelectWrapper>
            <p>{type === "kirim" ? "Kirim" : "Chiqim"} turini tanlang:</p>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option
                className={type === "kirim" ? "customer_debt" : "company_debt"}
                value={
                  type === "kirim"
                    ? "MIJOZ QARZ TO'LOVI"
                    : "KOMPANIYAMIZ QARZ TO'LOVI"
                }
              >
                {type === "kirim"
                  ? "MIJOZ QARZ TO'LOVI"
                  : "KOMPANIYAMIZ QARZ TO'LOVI"}
              </option>
              <option className="other" value="BOSHQA">
                BOSHQA
              </option>
            </Select>
          </SelectWrapper>

          <hr />

          <FirstWrapper>
            {selectedCategory === "MIJOZ QARZ TO'LOVI" ? (
              <SelectWrapper>
                <p>Mijozni tanlang:</p>
                <select
                  value={customer}
                  onChange={(e) => {
                    setCustomer(e.target.value);
                  }}
                  name=""
                  id=""
                >
                  {customers &&
                    customers.map((customer: any) => {
                      return (
                        <option value={customer._id} key={customer._id}>
                          {customer.name}
                        </option>
                      );
                    })}
                </select>
              </SelectWrapper>
            ) : selectedCategory === "KOMPANIYAMIZ QARZ TO'LOVI" ? (
              <SelectWrapper>
                <p>Ta'minotchi kompaniyani tanlang:</p>
                <select
                  value={supplier}
                  onChange={(e) => {
                    setSupplier(e.target.value);
                  }}
                  name=""
                  id=""
                >
                  {suppliers &&
                    suppliers.map((supplier: any) => {
                      return (
                        <option value={supplier._id} key={supplier._id}>
                          {supplier.name}
                        </option>
                      );
                    })}
                </select>
              </SelectWrapper>
            ) : null}

            <PricesWrapper>
              <p>Qarz to'lovi summasini kiriting:</p>
              <Input3>
                <input
                  type="number"
                  min={0}
                  placeholder="Qarz to'lovi summasi..."
                  value={amount}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </Input3>
            </PricesWrapper>
          </FirstWrapper>

          <NoteWrapper>
            <p>Izoh:</p>
            <textarea
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              name=""
              id=""
              placeholder="Kirim uchun izoh..."
            ></textarea>
          </NoteWrapper>

          <ButtonWrapper>
            <button onClick={handleCreateTransaction} disabled={isPending}>
              {isPending ? "Saqlanmoqda..." : "Qo'shish"}
            </button>
            <button onClick={handleCancelTransaction}>Bekor qilish</button>
          </ButtonWrapper>
        </ContentWrapper>
      )}
    </Container>
  );
};

export default AddTransactionPage;
