import React, { useState, useEffect, useContext } from "react";

import TableHistory from "../components/TableHistory";
import FilterModal from "../components/filterModal";
import { Store } from "../store";
import axios from "axios";
import { toast } from "react-toastify";
import { FilterIcon } from "@heroicons/react/outline";

function HistoryPage() {
  const {
    state: {
      start2,
      loading,
      wesabiUser,
      filterValue,
      histories,
      fetchHistory,
      filterFeedback,
      filterName,
      filterDate,
      filteredHistories,
      start4,
    },
    dispatch,
  } = useContext(Store);

  const id = wesabiUser?.id;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getCustomerRequestData() {
      if (filterValue) {
        dispatch({ type: "START_FETCHING", payload: true });
        try {
          let startingPoint = start2 > -1 ? start2 : 0;
          const { data } = await axios.get(
            `https://sellbackend.creditclan.com/parent/index.php/globalrequest/getmerchantscalled/${startingPoint}/${filterValue}`,
            { user_id: id }
          );
          console.log(data.data);
          dispatch({ type: "UPDATE_HISTORY", payload: data.data });
          dispatch({ type: "END_FETCHING", payload: false });
        } catch (error) {
          dispatch({ type: "END_FETCHING", payload: false });
          let msg = error?.message
            ? error.message
            : "no or poor internet connection, try it again";
          toast.error(msg);
          console.log(error);
        }
      }
    }
    getCustomerRequestData();
  }, [id, filterValue, dispatch, start2]);

  useEffect(() => {
    async function getMarketers() {
      dispatch({ type: "START_FETCHING", payload: true });
      try {
        const { data } = await axios.get(
          "https://sellbackend.creditclan.com/parent/index.php/globalrequest/telemarketers"
        );
        dispatch({ type: "UPDATE_MARKETER", payload: data.data });
      } catch (error) {
        dispatch({ type: "END_FETCHING", payload: false });
        let msg = error?.message
          ? error.message
          : "no or poor internet connection, try it again";
        toast.error(msg);
        console.log(error);
      }
    }
    getMarketers();
  }, [dispatch]);

  useEffect(() => {
    async function getCustomerRequestData() {
      console.log(filterFeedback, filterName, filterDate);
      if (filterFeedback && filterName && filterDate) {
        console.log(id);
        dispatch({ type: "START_FETCHING", payload: true });
        try {
          let startingPoint = start4 > -1 ? start4 : 0;

          const { data } = await axios.post(
            `https://sellbackend.creditclan.com/parent/index.php/globalrequest/getmerchants/${startingPoint}/${filterFeedback}/${filterName}/${filterDate}`,
            { user_id: id }
          );
          console.log(id);
          console.log(data);
          dispatch({ type: "UPDATE_HISTORY", payload: data.data });
          dispatch({ type: "END_FETCHING", payload: false });
        } catch (error) {
          dispatch({ type: "END_FETCHING", payload: false });
          let msg = error?.message
            ? error.message
            : "no or poor internet connection, try it again";
          toast.error(msg);
          console.log(error);
        }
      }
    }

    getCustomerRequestData();
  }, [
    id,
    dispatch,
    start4,
    filterFeedback,
    filterName,
    filterDate,
    fetchHistory,
  ]);

  const next_function = async () => {
    if (filterFeedback && filterName && filterDate) {
      dispatch({ type: "INCREASE_START4", payload: start4 + 20 });
    } else {
      dispatch({ type: "INCREASE_START2", payload: start2 + 20 });
    }
  };

  const pre_function = async () => {
    if (filterFeedback && filterName && filterDate) {
      dispatch({ type: "INCREASE_START4", payload: start4 - 20 });
    } else {
      dispatch({ type: "REDUCE_START2", payload: start2 - 20 });
    }
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <main className="overflow-auto mt-5">
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8 overflow-auto">
          <div className="px-4 py-2 sm:px-0">
            <FilterModal open={open} setOpen={setOpen} setClose={closeModal} />
            <div className="flex justify-end mt-5 cursor:pointer">
              <div
                onClick={() => setOpen(true)}
                className="flex space-x-2 rounded-lg w-20 cursor:pointer ring-1 bg-transparent border-1 border-gray-600 hover:border-blue-500 hover:bg-gray-200 hover:ring-2 hover:ring-blue-300 p-2"
              >
                <span className="text-sm font-medium text-slate-400 cursor:pointer">
                  filter
                </span>
                <FilterIcon
                  className="h-4 text-blue-500 mt-1  hover:text-blue-700 text-sm cursor:pointer"
                  aria-hidden="true"
                  onClick={() => setOpen(true)}
                />
              </div>
            </div>
            {/* <div className="flex justify-end">
              <span className="pt-4 mr-2 font-mono text-sm">
                Filter By Feedback Type
              </span>
              <select
                onChange={handleSelectedChange}
                className="form-select form-select-sm mb-3 appearance-none block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label=".form-select-lg example"
              >
                <option defaultValue>filter</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="busy">Busy</option>
                <option value="call-back">Call-back</option>
                <option value="not reachable">Not reachable</option>
                <option value="wrong number">Wrong number</option>
                <option value="no answer">No answer</option>
              </select>
            </div> */}
            <TableHistory />
            {!loading && histories.length > 0 && (
              <div className="flex justify-end  mb-2 pr-5 ">
                <button
                  onClick={pre_function}
                  className="border text-myColor font-bold py-2 px-2 mr-3 disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={start2 <= 0 && start4 <= 0}
                >
                  Previous
                </button>
                <button
                  onClick={next_function}
                  className="border text-myColor font-bold  py-2 px-2  disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={histories.length < 20}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default HistoryPage;
