import React from "react";
import { useRouter } from "next/router";
import {
  Button,
  Container,
  Content,
  LogoWrapper,
  SectionWrapper,
  Sidebar,
} from "./layout.style";

import { DashboardIcon } from "@/icons/dashboard.icon";
import { IncomeExpenseIcon } from "@/icons/incomeexpense.icon";
import { SalesHistoryIcon } from "@/icons/sale.icon";
import { PurchaseHistoryIcon } from "@/icons/purchase.icon";
import { ProductsIcon } from "@/icons/products.icon";
import { CustomersIcon } from "@/icons/customer.icon";
import { SuppliersIcon } from "@/icons/supplier.icon";
import { SettingsIcon } from "@/icons/settings.icon";

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const activePath = router.pathname; // sahifa active

  const sections = [
    { path: "/dashboard", label: "Дашбоард", icon: <DashboardIcon /> },
    { path: "/transaction", label: "Кирим/Чиким", icon: <IncomeExpenseIcon /> },
    { path: "/sale-history", label: "Сотувлар", icon: <SalesHistoryIcon /> },
    {
      path: "/purchase-history",
      label: "Харидлар",
      icon: <PurchaseHistoryIcon />,
    },
    { path: "/products", label: "Маҳсулотлар", icon: <ProductsIcon /> },
    { path: "/customer", label: "Мижозлар", icon: <CustomersIcon /> },
    { path: "/supplier", label: "Таминотчилар", icon: <SuppliersIcon /> },
    { path: "/settings", label: "Созламалар", icon: <SettingsIcon /> },
  ];

  return (
    <Container>
      <Sidebar>
        <LogoWrapper>
          <img src="/logo.png" alt="Logo" />
        </LogoWrapper>

        {sections.map((sec) => (
          <SectionWrapper
            key={sec.path}
            active={activePath === sec.path} // router bilan active qilish
            onClick={() => router.push(sec.path)}
          >
            {sec.icon}
            <Button>{sec.label}</Button>
          </SectionWrapper>
        ))}
      </Sidebar>

      <Content>{children}</Content>
    </Container>
  );
};

export default LayoutPage;
