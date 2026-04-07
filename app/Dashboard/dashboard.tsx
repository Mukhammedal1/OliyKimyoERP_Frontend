import React, { useEffect, useState } from "react";
import {
  Container,
  NavWrapper,
  ProfileIconWrapper,
  ProfileWrapper,
  CardGrid,
  Card,
  CardTitle,
  CardValue,
  TopProductsWrapper,
  ProductItem,
  ProductName,
  ProductSold,
  ProgressBar,
} from "./dashboard.style";
import ProfileIcon from "../../icons/profile-icon";
import { useGetAllSale } from "@/hooks/useSale";
import Spinner from "@/components/LoadingComponent/loading";
import { useGetAllPurchase } from "@/hooks/usePurchase";
import { useGetAllTransaction } from "@/hooks/useTransaction";
import { useGetAllProduct } from "@/hooks/useProduct";
import { useGetAllCustomer } from "@/hooks/useCustomer";

const DashboardPage = () => {
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalPurchase, setTotalPurchase] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [customersCount, setCustomersCount] = useState<number>(0);
  const [topProducts, setTopProducts] = useState<
    { name: string; sold: number; unit: string }[]
  >([]);

  const { data: sales, isLoading: salesLoading } = useGetAllSale();
  const { data: purchase, isLoading: purchaseLoading } = useGetAllPurchase();
  const { data: transaction, isLoading: transactionLoading } =
    useGetAllTransaction();
  const { data: products, isLoading: productLoading } = useGetAllProduct();
  const { data: customers, isLoading: customerLoading } = useGetAllCustomer();

  const getProgressColor = (progress: number) => {
    if (progress > 70) return "#4ade80"; // yashil — ko'p sotilgan
    if (progress > 30) return "#facc15"; // sariq — o'rtacha
    return "#f87171"; // qizil — kam sotilgan
  };

  useEffect(() => {
    if (!sales || !purchase || !transaction || !products || !customers) return;

    const totalsale = sales?.reduce((sum: number, sale: any) => {
      return sum + (sale.total_amount || 0);
    }, 0);

    const totalpurchase = purchase?.reduce((sum: number, sale: any) => {
      return sum + (sale.total_amount || 0);
    }, 0);

    const income = transaction
      .filter((t: any) => t.incomeExpenseType === "KIRIM")
      .reduce((sum: number, t: any) => sum + (t.amount || 0), 0);

    const expense = transaction
      .filter((t: any) => t.incomeExpenseType === "CHIQIM")
      .reduce((sum: number, t: any) => sum + (t.amount || 0), 0);

    const productMap: {
      [key: string]: { name: string; sold: number; unit: string };
    } = {};

    sales.forEach((sale: any) => {
      sale.products?.forEach((p: any) => {
        console.log("product_id:", p.product_id);
        console.log("quantity:", p.quantity);
        const id = p.product_id?._id || p.product_id;
        const name = p.product_id?.name || "Noma'lum";
        const qty = p.quantity || 0;
        const unit = p.product_id?.unit?.name || "";

        if (productMap[id]) {
          productMap[id].sold += qty;
        } else {
          productMap[id] = { name, sold: qty, unit: unit };
        }
      });
    });

    const sorted = Object.values(productMap)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);

    setTopProducts(sorted);

    setProductsCount(products.length);
    setCustomersCount(customers.length);
    setTotalIncome(income);
    setTotalExpense(expense);
    setTotalSales(totalsale);
    setTotalPurchase(totalpurchase);
  }, [sales, purchase, transaction, products, customers]);


  return (
    <Container>
      <NavWrapper>
        <span>Dashboard </span>
        <ProfileWrapper>
          <p>Muhammadali</p>
          <ProfileIconWrapper>
            <ProfileIcon />
          </ProfileIconWrapper>
        </ProfileWrapper>
      </NavWrapper>

      {salesLoading ||
      purchaseLoading ||
      transactionLoading ||
      productLoading ||
      customerLoading ? (
        <Spinner />
      ) : (
        <>
          <CardGrid>
            <Card>
              <CardTitle>Умумий сотувлар</CardTitle>
              <CardValue style={{ color: "#60a5fa" }}>
                {totalSales.toLocaleString()} so'm
              </CardValue>
            </Card>

            <Card>
              <CardTitle>Умумий харидлар</CardTitle>
              <CardValue style={{ color: "#f472b6" }}>
                {totalPurchase.toLocaleString()} so'm
              </CardValue>
            </Card>

            <Card>
              <CardTitle>Умумий киримлар</CardTitle>
              <CardValue style={{ color: "#4ade80" }}>
                {totalIncome.toLocaleString()} so'm
              </CardValue>
            </Card>

            <Card>
              <CardTitle>Умумий чиқимлар</CardTitle>
              <CardValue style={{ color: "#f87171" }}>
                {totalExpense.toLocaleString()} so'm
              </CardValue>
            </Card>

            <Card>
              <CardTitle>Умумий маҳсулотлар</CardTitle>
              <CardValue style={{ color: "#facc15" }}>
                {productsCount}
              </CardValue>
            </Card>

            <Card>
              <CardTitle>Умумий мижозлар</CardTitle>
              <CardValue style={{ color: "#9ca3af " }}>
                {customersCount}
              </CardValue>
            </Card>
          </CardGrid>
          <h2>Энг кўп сотилган маҳсулотлар</h2>
          <TopProductsWrapper>
            {topProducts.map((product) => {
              const progress =
                (product.sold / (topProducts[0]?.sold || 1)) * 100;
              const color = getProgressColor(progress);

              return (
                <ProductItem key={product.name}>
                  <ProductName>{product.name}</ProductName>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <ProductSold>
                      {product.sold} {product.unit}
                    </ProductSold>
                    <ProgressBar progress={progress} color={color} />
                  </div>
                </ProductItem>
              );
            })}
          </TopProductsWrapper>
        </>
      )}
    </Container>
  );
};

export default DashboardPage;
