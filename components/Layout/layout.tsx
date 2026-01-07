import React, { useRef, useState } from "react";
import {
  Button,
  Container,
  Content,
  LogoWrapper,
  SectionWrapper,
  Sidebar,
} from "./layout.style";
import { useRouter } from "next/router";
import { SalesHistoryIcon } from "../../icons/sale.icon";
import { DashboardIcon } from "../../icons/dashboard.icon";
import { PurchaseHistoryIcon } from "../../icons/purchase.icon";
import { IncomeExpenseIcon } from "../../icons/incomeexpense.icon";
import { ProductsIcon } from "../../icons/products.icon";
import { CustomersIcon } from "../../icons/customer.icon";
import { SuppliersIcon } from "../../icons/supplier.icon";
import { SettingsIcon } from "../../icons/settings.icon";

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Container>
      <Sidebar>
        <LogoWrapper>
          <img src="/logo.png" alt="" />
        </LogoWrapper>
        <SectionWrapper onClick={() => router.push("/dashboard")}>
          <DashboardIcon />
          <Button>Dashboard</Button>
        </SectionWrapper>
        <SectionWrapper onClick={() => router.push("/transaction")}>
          <IncomeExpenseIcon />
          <Button>Kirim/Chiqim</Button>
        </SectionWrapper>
        <SectionWrapper onClick={() => router.push("/sale-history")}>
          <SalesHistoryIcon />
          <Button>Sotuvlar tarixi</Button>
        </SectionWrapper>
        <SectionWrapper onClick={() => router.push("/purchase-history")}>
          <PurchaseHistoryIcon />
          <Button>Xaridlar tarixi</Button>
        </SectionWrapper>
        <SectionWrapper onClick={() => router.push("/products")}>
          <ProductsIcon />
          <Button>Mahsulotlar</Button>
        </SectionWrapper>
        <SectionWrapper onClick={() => router.push("/customer")}>
          <CustomersIcon />
          <Button>Mijozlar</Button>
        </SectionWrapper>
        <SectionWrapper onClick={() => router.push("/supplier")}>
          <SuppliersIcon />
          <Button>Ta'minotchilar</Button>
        </SectionWrapper>
        <SectionWrapper onClick={() => router.push("/settings")}>
          <SettingsIcon />
          <Button>Sozlamalar</Button>
        </SectionWrapper>
      </Sidebar>

      <Content>{children}</Content>
    </Container>
  );
};

export default LayoutPage;
