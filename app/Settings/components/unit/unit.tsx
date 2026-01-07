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
} from "./unit.style";
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
import {
  useCreateUnit,
  useDeleteUnit,
  useGetAllUnit,
  useGetUnitById,
  useUpdateUnit,
} from "../../../../hooks/useUnit";

const UnitComponent = ({ onBack }: { onBack: () => void }) => {
  const { mutate: deleteUnit, isPending: isDeleteUnitPending } =
    useDeleteUnit();
  const { mutate: createUnit, isPending: isCreateUnitPending } =
    useCreateUnit();
  const { mutate: updateUnit, isPending: isUpdateUnitPending } =
    useUpdateUnit();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isAllUnit, setIsAllUnit] = useState(true);
  const [isAddUnit, setIsAddUnit] = useState(false);
  const [isEditUnit, setIsEditUnit] = useState(false);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState("");
  const [updatedName, setUpdatedName] = useState("");

  const { data: oneUnit, isLoading: isOneUnitLoading } = useGetUnitById(editId);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: units, isLoading: isUnitLoading, refetch } = useGetAllUnit();

  useEffect(() => {
    if (oneUnit) {
      setUpdatedName(oneUnit.name);
    }
  }, [oneUnit]);

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

    deleteUnit(selectedId, {
      onSuccess: () => {
        refetch();
        handleCloseDialog();
        toast.success("O'lchov birligi o'chirildi");
      },
      onError: (e: any) => {
        handleCloseDialog();
        toast.error(e.response?.data?.message);
      },
    });
  };

  const handleAddUnit = () => {
    setIsAddUnit(true);
    setIsAllUnit(false);
  };

  const handleCreateUnit = async () => {
    if (!name) {
      toast.error("Iltimos, O'lchov birligi nomini kiriting");
      return;
    }
    createUnit(
      {
        name,
      },
      {
        onSuccess: () => {
          toast.success("O'lchov birligi qo'shildi");
          setIsAddUnit(false);
          setIsAllUnit(true);
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
    setIsAddUnit(false);
    setIsEditUnit(false);
    setIsAllUnit(true);
  };

  const handleEditUnit = (id: string) => {
    setEditId(id);
    setIsEditUnit(true);
    setIsAllUnit(false);
  };

  const handleUpdateCategory = () => {
    if (!updatedName || !editId) {
      toast.error("Iltimos, O'lchov birligi nomini kiriting");
    }

    updateUnit(
      { id: editId, data: { name: updatedName } },
      {
        onSuccess: () => {
          toast.success("O'lchov birligi yangilandi");
          setIsEditUnit(false);
          setIsAllUnit(true);
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
      {isAllUnit ? (
        <>
          <TitleWrapper>
            <p>O'lchov birliklari</p>
            <button onClick={handleAddUnit}>O'lchov birligi qo'shish</button>
          </TitleWrapper>
          <TableWrapper>
            <TableHead>
              <span>№</span>
              <span>O'lchov birligi nomi</span>
              <span>Amallar</span>
            </TableHead>
            {isUnitLoading ? (
              <Spinner />
            ) : units.length === 0 ? (
              <NotCategoryWrapper>
                O'lchov birliklari mavjud emas
              </NotCategoryWrapper>
            ) : (
              units.map((unit: any, index: number) => (
                <TableBody key={unit._id}>
                  <span>{index + 1}</span>
                  <span>{unit.name}</span>
                  <IconWrapper>
                    <DeleteIcon onClick={() => handleOpenDialog(unit._id)} />
                    <EditIcon onClick={() => handleEditUnit(unit._id)} />
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

      {isAddUnit ? (
        <AddCategoryWrapper>
          <InputWrapper>
            <p>O'lchov birligi nomini kiriting:</p>
            <Input>
              <input
                type="text"
                placeholder="O'lchov birligi nomi..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Input>
          </InputWrapper>
          <ButtonWrapper>
            <button onClick={handleCreateUnit}>
              {isCreateUnitPending ? "Saqlanmoqda..." : "Qo'shish"}
            </button>
            <button onClick={handleCancel}>Bekor qilish</button>
          </ButtonWrapper>
        </AddCategoryWrapper>
      ) : null}

      {isEditUnit ? (
        <AddCategoryWrapper>
          <InputWrapper>
            <p>O'lchov birligi nomi:</p>
            <Input>
              <input
                type="text"
                placeholder="O'lchov birligi nomi..."
                value={updatedName}
                onChange={(e) => {
                  setUpdatedName(e.target.value);
                }}
              />
            </Input>
          </InputWrapper>
          <ButtonWrapper>
            <button onClick={handleUpdateCategory}>
              {isUpdateUnitPending ? "Saqlanmoqda..." : "Saqlash"}
            </button>
            <button onClick={handleCancel}>Bekor qilish</button>
          </ButtonWrapper>
        </AddCategoryWrapper>
      ) : null}
    </>
  );
};

export default UnitComponent;
