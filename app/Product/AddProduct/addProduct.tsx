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
} from "./addProduct.style";
import { useCreateCustomer } from "../../../hooks/useCustomer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useCreateProduct } from "../../../hooks/useProduct";
import { useGetAllCategory } from "../../../hooks/useCategory";
import { useGetAllUnit } from "../../../hooks/useUnit";
import Spinner from "../../../components/LoadingComponent/loading";

const AddProductPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [buy_price, setBuyPrice] = useState("");
  const [stock_amount, setStockAmount] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");

  const { mutate: createProduct } = useCreateProduct();
  const {
    data: categories = [],
    isLoading: isCategoryLoading,
    refetch: refetchCategories,
  } = useGetAllCategory();
  const {
    data: units = [],
    isLoading: isUnitLoading,
    refetch: refetchUnits,
  } = useGetAllUnit();

  useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0]._id);
    }
  }, [categories, category]);

  useEffect(() => {
    if (units.length > 0 && !unit) {
      setUnit(units[0]._id);
    }
  }, [units, unit]);

  const handleCreateProduct = async () => {
    if (!name) {
      toast.error("Iltimos, Mahsulot nomini kiriting");
      return;
    }
    if (!buy_price) {
      toast.error("Iltimos, Sotib olingan narxni kiriting");
      return;
    }
    if (!stock_amount) {
      toast.error("Iltimos, Mahsulotning ombordagi miqdorini kiriting");
      return;
    }
    if (!category) {
      toast.error("Iltimos, Mahsulot kategoriyasini tanlang");
      return;
    }
    if (!unit) {
      toast.error("Iltimos, O'lchov birligini tanlang");
      return;
    }
    createProduct(
      {
        name,
        description,
        buy_price: Number(buy_price) || 0,
        stock_amount: Number(stock_amount) || 0,
        category,
        unit,
      },
      {
        onSuccess: () => {
          toast.success("Mahsulot qo'shildi");
          router.push("/products");
        },
        onError: () => {
          toast.error("Mahsulot qo'shishda xatolik");
        },
      }
    );
  };

  const handleCancel = () => {
    router.push("/products");
  };

  return (
    <Container>
      <NavWrapper>
        <span>Mahsulot qo'shish</span>
        <ProfileWrapper>
          <p>Muhammadali</p>
          <ProfileIconWrapper>
            <ProfileIcon />
          </ProfileIconWrapper>
        </ProfileWrapper>
      </NavWrapper>
      {isCategoryLoading || isUnitLoading ? (
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
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
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
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
                  value={buy_price}
                  onChange={(e) => {
                    setBuyPrice(e.target.value);
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
                  value={stock_amount}
                  onChange={(e) => {
                    setStockAmount(e.target.value);
                  }}
                />
              </Input>
            </InputWrapper>
            <SelectWrapper>
              <p>Mahsulot kategoriyasi</p>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                name=""
                id=""
              >
                {categories &&
                  categories.map((category: any) => {
                    return (
                      <option value={category._id} key={category._id}>
                        {category.name}
                      </option>
                    );
                  })}
              </select>
            </SelectWrapper>
            <SelectWrapper>
              <p>Mahsulot o'lchov birligi</p>
              <select
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
                name=""
                id=""
              >
                {units &&
                  units.map((unit: any) => {
                    return (
                      <option value={unit._id} key={unit._id}>
                        {unit.name}
                      </option>
                    );
                  })}
              </select>
            </SelectWrapper>
          </ContentWrapper>
          <ButtonWrapper>
            <button onClick={handleCreateProduct}>Qo'shish</button>
            <button onClick={handleCancel}>Bekor qilish</button>
          </ButtonWrapper>
        </div>
      )}
    </Container>
  );
};

export default AddProductPage;
