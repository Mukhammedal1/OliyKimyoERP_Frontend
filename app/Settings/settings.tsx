import React, { useState } from "react";
import {
  Container,
  NavWrapper,
  ProfileIconWrapper,
  ProfileWrapper,
  SectionWrapper,
  SettingsIconWrapper,
  TextIconWrapper,
} from "./settings.style";
import ProfileIcon from "../../icons/profile-icon";
import { MeasurementIcon } from "../../icons/measure.icon";
import {
  FaBalanceScale,
  FaLock,
  FaTags,
  FaUser,
  FaWeight,
} from "react-icons/fa";
import Spinner from "../../components/LoadingComponent/loading";
import { formatDate } from "../../utils/formatDate";
import { DeleteIcon } from "../../icons/delete-icon";
import { EditIcon } from "../../icons/edit-icon";
import { useGetAllCategory } from "../../hooks/useCategory";
import CategoryComponent from "./components/category/category";
import UnitComponent from "./components/unit/unit";
import PasswordComponent from "./components/password/password";

const SettingsPage = () => {
  const [isCategory, setIsCategory] = useState(false);
  const [isUnits, setIsUnits] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isSection, setIsSection] = useState(true);

  const { data: categories, isLoading: isCategoryLoading } =
    useGetAllCategory();

  const handleClickCategory = () => {
    setIsCategory(true);
    setIsSection(false);
  };
  const handleClickUnits = () => {
    setIsUnits(true);
    setIsSection(false);
  };
   const handleClickPassword = () => {
     setIsPassword(true);
     setIsSection(false);
   };

  const handleBackFromCategory = () => {
    setIsCategory(false);
    setIsSection(true);
  };

  const handleBackFromUnit = () => {
    setIsPassword(false);
    setIsSection(true);
  };

  const handleBackFromPassword = () => {
    setIsPassword(false);
    setIsSection(true);
  };

  return (
    <Container>
      <NavWrapper>
        <span>Sozlamalar </span>
        <ProfileWrapper>
          <p>Muhammadali</p>
          <ProfileIconWrapper>
            <ProfileIcon />
          </ProfileIconWrapper>
        </ProfileWrapper>
      </NavWrapper>
      {isSection ? (
        <>
          <SectionWrapper>
            <TextIconWrapper onClick={handleClickCategory}>
              <SettingsIconWrapper>
                <FaTags size={50} color="white" />
              </SettingsIconWrapper>
              <p>Mahsulot kategoriyalari</p>
            </TextIconWrapper>
            <TextIconWrapper onClick={handleClickUnits}>
              <SettingsIconWrapper>
                <FaBalanceScale size={50} color="white" />
              </SettingsIconWrapper>
              <p>O'lchov birliklari</p>
            </TextIconWrapper>
          </SectionWrapper>
          <SectionWrapper>
            <TextIconWrapper onClick={handleClickPassword}>
              <SettingsIconWrapper>
                <FaLock size={50} color="white" />
              </SettingsIconWrapper>
              <p>Parolni yangilash</p>
            </TextIconWrapper>
            <TextIconWrapper>
              <SettingsIconWrapper>
                <FaUser size={50} color="white" />
              </SettingsIconWrapper>
              <p>Profil sozlamalari</p>
            </TextIconWrapper>
          </SectionWrapper>
        </>
      ) : null}
      {isCategory ? (
        <CategoryComponent onBack={handleBackFromCategory} />
      ) : null}
      {isUnits ? <UnitComponent onBack={handleBackFromUnit} /> : null}
      {isPassword ? (
        <PasswordComponent onBack={handleBackFromPassword} />
      ) : null}
    </Container>
  );
};

export default SettingsPage;
