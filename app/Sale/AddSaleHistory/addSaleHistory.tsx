import React, { useEffect, useRef, useState } from "react";
import ProfileIcon from "../../../icons/profile-icon";
import {
  AddProductWrapper,
  ButtonWrapper,
  ButtonWrapper2,
  Container,
  ContentWrapper,
  ContentWrapper2,
  FirstWrapper,
  IconWrapper,
  Input,
  Input2,
  Input3,
  InputWrapper,
  InputWrapper2,
  NavWrapper,
  NoteWrapper,
  NotProductWrapper,
  PlusWrapper,
  PriceNoteWrapper,
  PricesWrapper,
  PricesWrapper1,
  ProfileIconWrapper,
  ProfileWrapper,
  SelectWrapper,
  SelectWrapper2,
  TableHead,
  TableWrapper,
  TitleWrapper,
} from "./addSaleHistory.style";
import {
  useCreateCustomer,
  useGetAllCustomer,
} from "../../../hooks/useCustomer";
import { toast } from "react-toastify";
import { useCreateProduct, useGetAllProduct } from "../../../hooks/useProduct";
import { useGetAllCategory } from "../../../hooks/useCategory";
import { useGetAllUnit } from "../../../hooks/useUnit";
import Spinner from "../../../components/LoadingComponent/loading";
import { strict } from "assert";
import { TableBody } from "../sale.style";
import { DeleteIcon } from "../../../icons/delete-icon";
import { EditIcon } from "../../../icons/edit-icon";
import { formatDate } from "../../../utils/formatDate";
import Draggable from "react-draggable";
import { useCreateSale } from "../../../hooks/useSale";
import { useRouter } from "next/router";

const AddSaleHistoryPage = () => {
  const router = useRouter();
  const nodeRef = useRef(null);
  
  const [phone_number, setPhoneNumber] = useState("");
  const [customer, setCustomer] = useState("");
  const [paid_amount, setPaidAmount] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [note, setNote] = useState("");
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const [productIdNameUnit, setProductIdNameUnit] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_amount, setProductAmount] = useState("");

  const [productState, setProductState] = useState("productList");
  const [customerProducts, setCustomerProducts] = useState<any[]>([]);

  const { mutate: createSale } = useCreateSale();
  const {
    data: customers = [],
    isLoading: isCustomerLoading,
    refetch: refetchCustomer,
  } = useGetAllCustomer();
  const {
    data: products = [],
    isLoading: isProductLoading,
    refetch: refetchProduct,
  } = useGetAllProduct();

  useEffect(() => {
    if (customers.length > 0 && !customer) {
      setCustomer(customers[0]._id);
    }
  }, [customers, customer]);

  useEffect(() => {
    if (products.length > 0 && !productIdNameUnit) {
      setProductIdNameUnit(
        `${products[0]._id}|${products[0].name}|${products[0].unit.name}`
      );
    }
  }, [products, productIdNameUnit]);

  useEffect(() => {
    let sum = 0;
    customerProducts.forEach((item) => {
      sum += item.total_price;
    });
    setTotalPrice(sum);
  }, [customerProducts]);

  const handleAddProductToArray = async () => {
    if (!productIdNameUnit) {
      toast.error("Iltimos, Mahsulotni tanlang");
      return;
    }
    if (!product_price) {
      toast.error("Iltimos, Mahsulot narxini kiriting");
      return;
    }
    if (!product_amount) {
      toast.error("Iltimos, Mahsulot miqdorini kiriting");
      return;
    }
    const newProduct = {
      product_id: productIdNameUnit.split("|")[0],
      product_name: productIdNameUnit.split("|")[1],
      product_unit: productIdNameUnit.split("|")[2],
      price: Number(product_price),
      quantity: Number(product_amount),
      total_price: Number(product_price) * Number(product_amount),
    };
    setCustomerProducts((prev) => [...prev, newProduct]);
    setProductPrice("");
    setProductAmount("");
    setProductState("productList");
  };

  const handleCreateSale = () => {
    if (customerProducts.length == 0) {
      toast.error("Iltimos, Mijoz mahsulotlarini qo'shing");
      return;
    }
    if (!totalPrice) {
      toast.error("Iltimos, Jami summa miqdorini kiriting");
      return;
    }
    if (!paid_amount) {
      toast.error("Iltimos, To'langan summani kiriting");
      return;
    }
    if (Number(totalPrice) < Number(paid_amount)) {
      toast.error("To'langan summa jami summadan oshiq bo'lishi mumkin emas!");
      return;
    }
    if (Number(totalPrice) !== Number(paid_amount) && isNewCustomer === true) {
      toast.error(
        "Iltimos, Qolgan qarzni yozish uchun mijozni ro'yxatga qo'shing!"
      );
      return;
    }
    if (
      Number(totalPrice) !== Number(paid_amount) &&
      isNewCustomer === false &&
      !customer
    ) {
      toast.error(
        "Iltimos, Qolgan qarzni yozish uchun mijozni ro'yxatga qo'shing!"
      );
      return;
    }

    const formattedProducts = customerProducts.map((p) => ({
      product_id: p.product_id,
      quantity: Number(p.quantity),
      price: Number(p.price),
      total_price: Number(p.total_price),
    }));

    createSale(
      {
        customer: isNewCustomer ? null : customer,
        total_amount: totalPrice,
        paid_amount: Number(paid_amount),
        note,
        customer_phone: Number(phone_number),
        is_new_customer: isNewCustomer,
        products: formattedProducts,
      },
      {
        onSuccess: () => {
          toast.success("Sotuv qo'shildi");
          router.push("/sale-history");
        },
        onError: (e: any) => {
          toast.error(
            Array.isArray(e.response?.data?.message)
              ? e.response.data.message.join(", ")
              : e.response?.data?.message
          );
        },
      }
    );
  };

  const handleCancelSale = () => {
    router.push("/sale-history");
  };

  const handlePlusButton = () => {
    setProductState("addProduct");
  };

  const handleCancel = () => {
    setProductState("productList");
  };

  const handleDeleteProduct = (index: number) => {
    setCustomerProducts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <NavWrapper>
        <span>Sotuv qo'shish</span>
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
        <div>
          <ContentWrapper>
            <FirstWrapper>
              {isNewCustomer ? (
                <SelectWrapper>
                  <p>Mijoz telefon raqami:</p>
                  <Input>
                    <input
                      type="tel"
                      placeholder="90 123 45 67"
                      maxLength={9}
                      minLength={9}
                      value={phone_number}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,9}$/.test(value)) {
                          setPhoneNumber(value);
                        }
                      }}
                    />
                  </Input>
                </SelectWrapper>
              ) : (
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
              )}
              <InputWrapper>
                <input
                  id="input"
                  type="checkbox"
                  checked={isNewCustomer}
                  onChange={(e) => setIsNewCustomer(e.target.checked)}
                />
                <p>Yangi Mijoz</p>
              </InputWrapper>
            </FirstWrapper>

            {productState == "productList" && (
              <TableWrapper>
                <TableHead>
                  <span>№</span>
                  <span>Mahsulotning nomi</span>
                  <span>Mahsulot narxi</span>
                  <span>Mahsulot miqdori</span>
                  <span>O'lchov birligi</span>
                  <span>Umumiy narx</span>
                  <span>O'chirish</span>
                </TableHead>

                {customerProducts.length === 0 ? (
                  <NotProductWrapper>Mahsulotlar mavjud emas</NotProductWrapper>
                ) : (
                  customerProducts.map((product: any, index: number) => (
                    <TableBody key={index}>
                      <span>{index + 1}</span>
                      <span>{product.product_name}</span>
                      <span>{product.price}</span>
                      <span>{product.quantity}</span>
                      <span>{product.product_unit}</span>
                      <span>{product.total_price}</span>
                      <IconWrapper>
                        <DeleteIcon
                          onClick={() => {
                            handleDeleteProduct(index);
                          }}
                        />
                      </IconWrapper>
                    </TableBody>
                  ))
                )}
                <Draggable
                  bounds={{ top: -175, left: -900, right: 20, bottom: 15 }}
                  nodeRef={nodeRef}
                >
                  <PlusWrapper onClick={handlePlusButton} ref={nodeRef}>
                    <span>+</span>
                  </PlusWrapper>
                </Draggable>
              </TableWrapper>
            )}
            {productState == "addProduct" &&
              (isProductLoading ? (
                <Spinner />
              ) : (
                <AddProductWrapper>
                  <TitleWrapper>
                    <p>Mahsulot qo'shish</p>
                  </TitleWrapper>
                  <ContentWrapper2>
                    <SelectWrapper2>
                      <p>Mahsulotni tanlang</p>
                      <select
                        value={productIdNameUnit}
                        onChange={(e) => setProductIdNameUnit(e.target.value)}
                      >
                        {products.map((product: any) => (
                          <option
                            value={`${product._id}|${product.name}|${product.unit.name}`}
                            key={product._id}
                          >
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </SelectWrapper2>

                    <InputWrapper2>
                      <p>Mahsulot narxi</p>
                      <Input2>
                        <input
                          type="number"
                          min={0}
                          placeholder="Mahsulot narxi..."
                          value={product_price}
                          onKeyDown={(e) => {
                            if (e.key === "-" || e.key === "e") {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                      </Input2>
                    </InputWrapper2>

                    <InputWrapper2>
                      <p>
                        Mahsulot miqdori ({productIdNameUnit.split("|")[2]})
                      </p>
                      <Input2>
                        <input
                          type="number"
                          min={0}
                          placeholder="Mahsulot miqdori..."
                          onKeyDown={(e) => {
                            if (e.key === "-" || e.key === "e") {
                              e.preventDefault();
                            }
                          }}
                          value={product_amount}
                          onChange={(e) => setProductAmount(e.target.value)}
                        />
                      </Input2>
                    </InputWrapper2>
                  </ContentWrapper2>
                  <ButtonWrapper2>
                    <button onClick={handleAddProductToArray}>Qo'shish</button>
                    <button onClick={handleCancel}>Bekor qilish</button>
                  </ButtonWrapper2>
                </AddProductWrapper>
              ))}
          </ContentWrapper>

          <PriceNoteWrapper>
            <PricesWrapper1>
              <PricesWrapper>
                <p>Jami summa miqdori:</p>
                <Input3>
                  <input
                    type="number"
                    min={0}
                    placeholder="Jami summa miqdori..."
                    value={totalPrice}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      setTotalPrice(Number(e.target.value));
                    }}
                  />
                </Input3>
              </PricesWrapper>
              <PricesWrapper>
                <p>To'langan summa miqdori:</p>
                <Input3>
                  <input
                    type="number"
                    min={0}
                    placeholder="To'langan summa..."
                    value={paid_amount}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      setPaidAmount(e.target.value);
                    }}
                  />
                </Input3>
              </PricesWrapper>
            </PricesWrapper1>
            <NoteWrapper>
              <p>Izoh:</p>
              <textarea
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                name=""
                id=""
                placeholder="Sotuv uchun izoh..."
              ></textarea>
            </NoteWrapper>
          </PriceNoteWrapper>

          <ButtonWrapper>
            <button onClick={handleCreateSale}>Qo'shish</button>
            <button onClick={handleCancelSale}>Bekor qilish</button>
          </ButtonWrapper>
        </div>
      )}
    </Container>
  );
};

export default AddSaleHistoryPage;
