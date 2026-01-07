import React, { useEffect, useState } from "react";
import ProfileIcon from "../../../icons/profile-icon";
import {
  ButtonWrapper,
  Container,
  ContentWrapper,
  Input,
  InputWrapper,
  NavWrapper,
  ProfileIconWrapper,
  ProfileWrapper,
  SelectWrapper,
} from "./editProduct.style";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spinner from "../../../components/LoadingComponent/loading";
import { useGetProductById, useUpdateProduct } from "../../../hooks/useProduct";
import { useGetAllCategory } from "../../../hooks/useCategory";
import { useGetAllUnit } from "../../../hooks/useUnit";

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useGetProductById(id as string);
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: categoryData, isLoading: isLoadingCategory } =
    useGetAllCategory();
  const { data: unitData, isLoading: isLoadingUnit } = useGetAllUnit();

  const [productData, setProductData] = useState({
    _id: "",
    name: "",
    description: "",
    buy_price: 0,
    stock_amount: 0,
    category: { _id: "", name: "" },
    unit: { _id: "", name: "" },
  });

  useEffect(() => {
    if (data) {
      setProductData({
        _id: data._id || "",
        name: data.name || "",
        description: data.description || "",
        buy_price: data.buy_price || 0,
        stock_amount: data.stock_amount || 0,
        category: data.category || { _id: "", name: "" },
        unit: data.unit || { _id: "", name: "" },
      });
    }
  }, [data]);

  const handleUpdateProduct = () => {
    if (!productData.name)
      return toast.error("Iltimos, Mahsulot nomini kiriting");
    if (!productData.buy_price)
      return toast.error("Iltimos, Sotib olingan narxni kiriting");

    updateProduct(
      {
        id: productData._id,
        data: {
          name: productData.name,
          description: productData.description,
          buy_price: Number(productData.buy_price) || 0,
          stock_amount: Number(productData.stock_amount) || 0,
          category: productData.category,
          unit: productData.unit,
        },
      },
      {
        onSuccess: () => {
          toast.success("Ma'lumotlar saqlandi");
          router.push("/products");
        },
        onError: () => toast.error("Malumotlarni yangilashda xatolik"),
      }
    );
  };

  const handleCancel = () => router.push("/products");

  return (
    <Container>
      <NavWrapper>
        <span>Mahsulotni tahrirlash</span>
        <ProfileWrapper>
          <p>Muhammadali</p>
          <ProfileIconWrapper>
            <ProfileIcon />
          </ProfileIconWrapper>
        </ProfileWrapper>
      </NavWrapper>
      {isLoading || isLoadingCategory || isLoadingUnit ? (
        <Spinner />
      ) : (
        <div>
          <ContentWrapper>
            <InputWrapper>
              <p>Mahsulot nomi</p>
              <Input>
                <input
                  type="text"
                  placeholder="Mahsulot nomi..."
                  value={productData.name}
                  onChange={(e) => {
                    setProductData({ ...productData, name: e.target.value });
                  }}
                />
              </Input>
            </InputWrapper>
            <InputWrapper>
              <p>Mahsulot haqida ma'lumot</p>
              <Input>
                <input
                  type="text"
                  placeholder="Mahsulot haqida ma'lumot..."
                  value={productData.description}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    });
                  }}
                />
              </Input>
            </InputWrapper>
            <InputWrapper>
              <p>Sotib olingan narxi</p>
              <Input>
                <input
                  type="number"
                  placeholder="Sotib olingan narxi..."
                  min={0}
                  value={productData.buy_price}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      buy_price: Number(e.target.value),
                    });
                  }}
                />
              </Input>
            </InputWrapper>
            <InputWrapper>
              <p>Mahsulotning ombordagi miqdori</p>
              <Input>
                <input
                  type="number"
                  placeholder="Mahsulotning ombordagi miqdori..."
                  min={0}
                  value={productData.stock_amount}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      stock_amount: Number(e.target.value),
                    });
                  }}
                />
              </Input>
            </InputWrapper>
            <SelectWrapper>
              <p>Mahsulot kategoriyasi</p>
              <select
                value={productData.category._id}
                onChange={(e) => {
                  const selectedCategory = categoryData.find(
                    (cat: any) => cat._id === e.target.value
                  );
                  if (selectedCategory) {
                    setProductData({
                      ...productData,
                      category: selectedCategory,
                    });
                  }
                }}
                name=""
                id=""
              >
                {categoryData.map((category: any) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </SelectWrapper>
            <SelectWrapper>
              <p>Mahsulot o'lchov birligi</p>
              <select
                value={productData.unit._id}
                onChange={(e) => {
                  const selectedUnit = unitData.find(
                    (cat: any) => cat._id === e.target.value
                  );
                  if (selectedUnit) {
                    setProductData({
                      ...productData,
                      unit: selectedUnit,
                    });
                  }
                }}
                name=""
                id=""
              >
                {unitData.map((unit: any) => (
                  <option value={unit._id} key={unit._id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </SelectWrapper>
          </ContentWrapper>
          <ButtonWrapper>
            <button onClick={handleUpdateProduct}>Saqlash</button>
            <button onClick={handleCancel}>Bekor qilish</button>
          </ButtonWrapper>
        </div>
      )}
    </Container>
  );
};

export default EditProductPage;
