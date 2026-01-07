import React, { useEffect, useState } from "react";
import {
  AddCategoryWrapper,
  BackButtonWrapper,
  ButtonWrapper,
  IconWrapper,
  Input,
  InputWrapper,
  NotCategoryWrapper,
  TableBody,
  TableHead,
  TableWrapper,
  TitleWrapper,
} from "./category.style";
import {
  useCreateCategory,
  useDeleteCategory,
  useGetAllCategory,
  useGetCategoryById,
  useUpdateCategory,
} from "../../../../hooks/useCategory";
import Spinner from "../../../../components/LoadingComponent/loading";
import { DeleteIcon } from "../../../../icons/delete-icon";
import { EditIcon } from "../../../../icons/edit-icon";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ConfirmDialog from "../../../../components/modal";

const CategoryComponent = ({ onBack }: { onBack: () => void }) => {
  const { mutate: deleteCategory, isPending: isDeletePending } =
    useDeleteCategory();
  const { mutate: createCategory, isPending: isCreatePending } =
    useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdatePending } =
    useUpdateCategory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isAllCategory, setIsAllCategory] = useState(true);
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState("");
  const [updatedName, setUpdatedName] = useState("");

  const { data: oneCategory, isLoading: isOneCategoryLoading } =
    useGetCategoryById(editId);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const {
    data: categories,
    isLoading: isCategoryLoading,
    refetch,
  } = useGetAllCategory();

  useEffect(() => {
    if (oneCategory) {
      setUpdatedName(oneCategory.name);
    }
  }, [oneCategory]);

  const handleOpenDialog = (id: string) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedId(null);
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (!selectedId) return;

    deleteCategory(selectedId, {
      onSuccess: () => {
        refetch();
        handleCloseDialog();
        toast.success("Kategoriya o'chirildi");
      },
      onError: (e: any) => {
        handleCloseDialog();
        toast.error(e.response?.data?.message);
      },
    });
  };

  const handleAddCategory = () => {
    setIsAddCategory(true);
    setIsAllCategory(false);
  };

  const handleCreateCategory = async () => {
    if (!name) {
      toast.error("Iltimos, Kategoriya nomini kiriting");
      return;
    }
    createCategory(
      {
        name,
      },
      {
        onSuccess: () => {
          toast.success("Kategoriya qo'shildi");
          setIsAddCategory(false);
          setIsAllCategory(true);
          setName("");
          refetch();
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

  const handleCancel = () => {
    setIsAddCategory(false);
    setIsEditCategory(false);
    setIsAllCategory(true);
  };

  const handleEditCategory = (id: string) => {
    setEditId(id);
    setIsEditCategory(true);
    setIsAllCategory(false);
  };

  const handleUpdateCategory = () => {
    if (!updatedName || !editId) {
      toast.error("Iltimos, Kategoriya nomini kiriting");
    }

    updateCategory(
      { id: editId, data: { name: updatedName } },
      {
        onSuccess: () => {
          toast.success("Kategoriya yangilandi");
          setIsEditCategory(false);
          setIsAllCategory(true);
          setEditId("");
          setUpdatedName("");
          refetch();
        },
        onError: (e: any) => {
          toast.error(e.response?.data?.message);
        },
      }
    );
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <>
      {isAllCategory ? (
        <>
          <TitleWrapper>
            <p>Mahsulot Kategoriyalari</p>
            <button onClick={handleAddCategory}>Kategoriya qo'shish</button>
          </TitleWrapper>
          <TableWrapper>
            <TableHead>
              <span>№</span>
              <span>Mahsulot kategoriyasi nomi</span>
              <span>Amallar</span>
            </TableHead>
            {isCategoryLoading ? (
              <Spinner />
            ) : categories.length === 0 ? (
              <NotCategoryWrapper>Kategoriyalar mavjud emas</NotCategoryWrapper>
            ) : (
              categories.map((category: any, index: number) => (
                <TableBody key={category._id}>
                  <span>{index + 1}</span>
                  <span>{category.name}</span>
                  <IconWrapper>
                    <DeleteIcon
                      onClick={() => handleOpenDialog(category._id)}
                    />
                    <EditIcon
                      onClick={() => handleEditCategory(category._id)}
                    />
                  </IconWrapper>
                </TableBody>
              ))
            )}
          </TableWrapper>

          <BackButtonWrapper>
            <button className="back" onClick={handleBack}>
              Orqaga
            </button>
          </BackButtonWrapper>

          <ConfirmDialog
            open={dialogOpen}
            title="O'chirishni tasdiqlaysizmi?"
            onClose={handleCloseDialog}
            onConfirm={handleDelete}
          />
        </>
      ) : null}

      {isAddCategory ? (
        <AddCategoryWrapper>
          <InputWrapper>
            <p>Kategoriya nomini kiriting:</p>
            <Input>
              <input
                type="text"
                placeholder="Kategoriya nomi..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Input>
          </InputWrapper>
          <ButtonWrapper>
            <button onClick={handleCreateCategory}>
              {isCreatePending ? "Saqlanmoqda..." : "Qo'shish"}
            </button>
            <button onClick={handleCancel}>Bekor qilish</button>
          </ButtonWrapper>
        </AddCategoryWrapper>
      ) : null}

      {isEditCategory ? (
        <AddCategoryWrapper>
          <InputWrapper>
            <p>Kategoriya nomi:</p>
            <Input>
              <input
                type="text"
                placeholder="Kategoriya nomi..."
                value={updatedName}
                onChange={(e) => {
                  setUpdatedName(e.target.value);
                }}
              />
            </Input>
          </InputWrapper>
          <ButtonWrapper>
            <button onClick={handleUpdateCategory}>
              {isUpdatePending ? "Saqlanmoqda..." : "Saqlash"}
            </button>
            <button onClick={handleCancel}>Bekor qilish</button>
          </ButtonWrapper>
        </AddCategoryWrapper>
      ) : null}
    </>
  );
};

export default CategoryComponent;
