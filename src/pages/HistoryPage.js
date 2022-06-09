import React, { useEffect, useContext } from "react";

import TableHistory from "../components/TableHistory";
import { Store } from "../store";
import axios from "axios";

function HistoryPage() {
  const {
    state: { start2, loading, wesabiUser, filterValue, histories },
    dispatch,
  } = useContext(Store);

  const id = wesabiUser?.id;

  useEffect(() => {
    async function getCustomerRequestData() {
      console.log(id);
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
        console.log(error);
      }
    }
    getCustomerRequestData();
  }, [id, filterValue, dispatch, start2]);

  const handleSelectedChange = (event) => {
    dispatch({ type: "UPDATE_FILTER", payload: event.target.value });
    console.log(event.target.value);
  };
  const next_function = async () => {
    dispatch({ type: "INCREASE_START2", payload: start2 + 20 });
  };
  console.log(histories.length < 20);
  const pre_function = async () => {
    dispatch({ type: "REDUCE_START2", payload: start2 - 20 });
  };

  return (
    <>
      <main className="overflow-auto mt-5">
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8 overflow-auto">
          <div className="px-4 py-2 sm:px-0">
            <div className="flex justify-end">
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
            </div>

            <TableHistory />

            {!loading && histories.length > 0 && (
              <div className="flex justify-end  mb-2 pr-5 ">
                <button
                  onClick={pre_function}
                  className="border text-myColor font-bold py-2 px-2 mr-3 disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={start2 <= 0}
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
