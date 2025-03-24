"use client";
import { useEffect, useState } from "react";
import { getAllTransactions } from "@/services";
import Table from "@/components/tables/Table";
import { TableOptions } from "@/components/tables/tableOptions.types";
import { DashboardGames } from "@/types";
import { useSearchParamsUpdater } from "@/utils/createQuery";
import { useSearchParams } from "next/navigation";
import EditTransactionStatus from "./EditTrnsaction";
import useRefetchStore from "@/store/useRefetchStore";

const DepositTransactions = () => {
  const { refetch } = useRefetchStore(state => state);
  const searchParams = useSearchParams();
  const { updateSearchParams } = useSearchParamsUpdater();
  const [tableData, setTableData] = useState<DashboardGames>();
  const [meta, setMeta] = useState();

  //query params
  const status = searchParams.get("status") || "";

  const handleFilterChange = (value: string | number | null) => {
    updateSearchParams({ ["status"]: value });
  };

  useEffect(() => {
    const fetchFunc = async () => {
      const endpoint = `?type=deposit&${status ? "status=" + status : ""}`;
      try {
        const res = await getAllTransactions(endpoint);
        setTableData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFunc();
  }, [status, refetch]);

  const tableOptions: TableOptions = {
    uniqueKey: "id",
    search: false,
    select: false,
    image: {
      active: false,
      imageDataKey: "img",
    },
    saveData: true,
    pagination: false,
    sort: true,
    settings: {
      title: "Withdrawal-transactions",
      active: true,
    },
    create: {
      active: false,
      link: "",
    },
    extraOptions: {
      colColor: {
        active: true,
        actionComponent: EditTransactionStatus,
        col_key: "status",
        col_dependency: [
          {
            id: 1,
            color: "#ff7105",
            name: "pending",
          },
          {
            id: 2,
            color: "#008a1e",
            name: "completed",
          },
          {
            id: 3,
            color: "#610000",
            name: "failed",
          },
          {
            id: 4,
            color: "#db0000",
            name: "cancelled",
          },
        ],
      },
    },
    actions: {
      active: false,
      actions: [],
    },
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-center ">
        <h3 className=" font-bold capitalize">filter by:</h3>
        {tableOptions.extraOptions?.colColor?.col_dependency.map(i => (
          <button
            key={i.id}
            onClick={() => handleFilterChange(i.name)}
            style={{ backgroundColor: i.color, color: "white" }}
            className="px-2 py-1 rounded-md"
          >
            {i.name}
          </button>
        ))}
        <button
          onClick={() => handleFilterChange("")}
          className="px-2 py-1 rounded-md border border-black "
        >
          clear filter
        </button>
      </div>
      <Table data={tableData} metaData={meta} options={tableOptions} />
    </div>
  );
};

export default DepositTransactions;
