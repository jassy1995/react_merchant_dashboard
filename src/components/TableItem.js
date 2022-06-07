import React, { useState, useContext } from "react";
import { Store } from "../store";
import Modal from "../components/modal";
import DisplayInfo from "./empty";

function TableItem() {
  const {
    state: { requests, loading },
  } = useContext(Store);

  const [requestId, setRequestId] = useState(null);
  const [open, setOpen] = useState(false);

  const giveFeedback = (id, checkFeedback) => {
    console.log(checkFeedback);
    if (checkFeedback?.toString() === "0") {
      setRequestId(id);
      setOpen(true);
    } else return;
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        setClose={closeModal}
        requestId={requestId}
      />
      {loading ? (
        <DisplayInfo children="Loading..." />
      ) : requests.length === 0 && !loading ? (
        <DisplayInfo children="No Request" />
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-auto">
                <table className="min-w-full table-fixed">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left border  border-slate-300"
                      >
                        s/n
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left border  border-slate-300"
                      >
                        name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left border  border-slate-300"
                      >
                        phone
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left border  border-slate-300"
                      >
                        Store link
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-lef border  border-slate-300"
                      >
                        Reset password link
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left border  border-slate-300"
                      >
                        feedback
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left  border border-slate-300"
                      >
                        date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-slate-300">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-slate-300">
                          {request?.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300">
                          {request?.phone}
                        </td>

                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300">
                          {request?.store_link}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300">
                          {request?.password_reset_link
                            ? request?.password_reset_link
                            : "no link"}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300">
                          <button
                            className={
                              request?.feedback_provided?.toString() === "1"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }
                            onClick={() =>
                              giveFeedback(
                                request.id,
                                request.feedback_provided
                              )
                            }
                            style={{
                              padding: "5px",
                              color: "white",
                              borderRadius: "8px",
                            }}
                          >
                            feedback
                          </button>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300">
                          {request?.created_at}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TableItem;
