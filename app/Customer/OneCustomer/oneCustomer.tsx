import React, { useEffect, useState } from "react";
import ProfileIcon from "../../../icons/profile-icon";
import {
  BackButtonWrapper,
  ButtonWrapper,
  Container,
  ContentWrapper,
  CustomerInfoWrapper,
  IconWrapper,
  InputWrapper,
  NavWrapper,
  NotCustomerWrapper,
  NoteWrapper,
  NotProductWrapper,
  ProfileIconWrapper,
  ProfileWrapper,
  TableBody,
  TableHead,
  TableWrapper,
  TabsWrapper,
  TabWrapper,
} from "./oneCustomer.style";
import {
  useGetCustomerById,
  useUpdateCustomer,
} from "../../../hooks/useCustomer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spinner from "../../../components/LoadingComponent/loading";
import { formatDate } from "../../../utils/formatDate";
import { DeleteIcon } from "../../../icons/delete-icon";
import { EditIcon } from "../../../icons/edit-icon";
import { useGetAllSaleByCustomerId } from "../../../hooks/useSale";
import CustomerSalesComponent from "./components/sales/sales";

const OneCustomerPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("1");

  const { data: customerInfo, isLoading } = useGetCustomerById(id as string);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleBack = () => {
    router.push("/customer");
  };

  return (
    <Container>
      <NavWrapper>
        <span>Mijozning sotuv va qarzlari</span>
        <ProfileWrapper>
          <p>Muhammadali</p>
          <ProfileIconWrapper>
            <ProfileIcon />
          </ProfileIconWrapper>
        </ProfileWrapper>
      </NavWrapper>
      <TabsWrapper>
        <TabWrapper
          $active={activeTab === "1"}
          onClick={() => handleTabClick("1")}
        >
          <span>Mijoz sotuvlari</span>
        </TabWrapper>
        <TabWrapper
          $active={activeTab === "2"}
          onClick={() => handleTabClick("2")}
        >
          <span>Mijoz qarzlari</span>
        </TabWrapper>
        <TabWrapper
          $active={activeTab === "3"}
          onClick={() => handleTabClick("3")}
        >
          <span>Qarz to'lovlari</span>
        </TabWrapper>
        <TabWrapper
          $active={activeTab === "4"}
          onClick={() => handleTabClick("4")}
        >
          <span>Mijoz ma'lumotlari</span>
        </TabWrapper>
      </TabsWrapper>
      {activeTab && activeTab === "1" && id ? (
        <CustomerSalesComponent customerId={id} filterKey="sales" />
      ) : null}
      {activeTab && activeTab === "2" && id ? (
        <CustomerSalesComponent customerId={id} filterKey="debts" />
      ) : null}
      {activeTab && activeTab === "4" && id ? (
        isLoading ? (
          <Spinner />
        ) : (
          <>
            <hr />
            <CustomerInfoWrapper>
              <p>Mijoz ismi:</p>
              <span>{customerInfo.name}</span>
            </CustomerInfoWrapper>
            <CustomerInfoWrapper>
              <p>Mijoz telefon raqami:</p>
              <span>{customerInfo.phone_number}</span>
            </CustomerInfoWrapper>
            <CustomerInfoWrapper>
              <p>Mijoz qarz miqdori:</p>
              <span>{customerInfo.debt_amount}</span>
            </CustomerInfoWrapper>
          </>
        )
      ) : null}

      <BackButtonWrapper>
        <button className="back" onClick={handleBack}>
          Orqaga
        </button>
      </BackButtonWrapper>
    </Container>
  );
};

export default OneCustomerPage;
