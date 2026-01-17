import React, { useEffect, useState } from "react";
import {
  DateWrapper,
  FlexWrapper,
  Input,
  ListWrapper,
  MainDateWrapper,
  NotCustomerWrapper,
  ProductsRow,
  ProductsTable,
  TableBody,
  TableHead,
  TableWrapper,
  TotalDebts,
} from "./sales.style";
import Spinner from "../../../../../components/LoadingComponent/loading";
import { useGetAllSaleByCustomerId } from "../../../../../hooks/useSale";
import { formatDate } from "../../../../../utils/formatDate";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const CustomerSalesComponent = (props: any) => {
  const id = props.customerId;
  const filterKey = props.filterKey;
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { data: customerSales = [], isLoading } = useGetAllSaleByCustomerId(
    id as string
  );
  const handleClickChevronIcon = (id: string) => {
    setOpenRowId((prev) => (prev === id ? null : id));
  };

  const filteredSales = customerSales.filter((sale: any) => {
    const salesDebts =
      filterKey && filterKey === "debts"
        ? sale.total_amount - sale.paid_amount > 0
        : true;

    const date = new Date(sale.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate
      ? new Date(new Date(endDate).setHours(23, 59, 59, 999))
      : null;

    const startMatch = start ? date >= start : true;
    const endMatch = end ? date <= end : true;

    return salesDebts && startMatch && endMatch;
  });
  const total_debts = filteredSales.reduce(
    (sum: any, sale: any) => sum + (sale.total_amount - sale.paid_amount),
    0
  );
  const total_sales = filteredSales.reduce(
    (sum: any, sale: any) => sum + sale.total_amount,
    0
  );

  return (
    <>
      <FlexWrapper>
        {filterKey && filterKey === "sales" ? (
          <TotalDebts>
            <p>Jami sotuv summasi:</p>
            <span className="green">{total_sales.toLocaleString()}</span>
          </TotalDebts>
        ) : null}
        {filterKey && filterKey === "debts" ? (
          <TotalDebts>
            <p>Jami qarz summasi:</p>
            <span className="red">- {total_debts.toLocaleString()}</span>
          </TotalDebts>
        ) : null}
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
      </FlexWrapper>

      <TableWrapper>
        <TableHead>
          <span>№</span>
          <span>Mahsulotlar</span>
          <span>Jami summa</span>
          <span>To'langan summa</span>
          <span>Qarz miqdori</span>
          <span>Izoh</span>
          <span>Sotuv sanasi</span>
        </TableHead>
        {isLoading ? (
          <Spinner />
        ) : filteredSales.length === 0 ? (
          <NotCustomerWrapper>Sotuvlar mavjud emas</NotCustomerWrapper>
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

                {sale.total_amount - sale.paid_amount > 0 ? (
                  <span className="red">
                    - {(sale.total_amount - sale.paid_amount).toLocaleString()}
                  </span>
                ) : (
                  <span className="blue">
                    {sale.total_amount - sale.paid_amount}
                  </span>
                )}
                <span>{sale.note || "-"}</span>
                <span>{formatDate(sale.createdAt)}</span>
              </TableBody>
              {openRowId === sale._id && (
                <ProductsRow>
                  <ProductsTable>
                    <thead>
                      <tr>
                        <th>Mahsulot</th>
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
                    </tbody>
                  </ProductsTable>
                </ProductsRow>
              )}
            </>
          ))
        )}
      </TableWrapper>
    </>
  );
};

export default CustomerSalesComponent;
