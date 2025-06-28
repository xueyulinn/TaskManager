import React, { useState } from "react";
import { useLocation } from "react-router";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { LuTrash2 } from "react-icons/lu";
import SelectUsers from "../../components/inputs/SelectUsers";
import { PRIORITY_DATA } from "../../utils/data";
const CreateTask = () => {
  const location = useLocation();
  const taskId = location.state || {};
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const handleValueChange = (key, value) => {
    setTaskData((preData) => ({ ...preData, [key]: value }));
  };

  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className="grid grid-cols-4 mt-4">
        <div className="form-card col-span-4">
          <div className=" flex justify-between items-center">
            <h2 className="text-base md:text-xl">
              {taskId ? "UpdateTask" : "CreateTask"}
            </h2>
            {taskId && (
              <button
                onClick={() => setOpenDeleteAlert(true)}
                className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
              >
                <LuTrash2 className="text-base" /> Delete
              </button>
            )}
          </div>
          {/* header */}
          <div className="mt-4">
            <label className="text-xs md:text-base font-medium text-slate-600 ">
              Task Title
            </label>

            <input
              className="form-input"
              value={taskData.title}
              onChange={(event) =>
                handleValueChange("title", event.target.value)
              }
              placeholder="Create APP UI"
            ></input>
          </div>
          {/* description */}
          <div className="mt-3">
            <label className="text-xs md:text-base font-medium text-slate-600">
              Description
            </label>

            <textarea
              placeholder="Describe task"
              className="form-input"
              rows={4}
              value={taskData.description}
              onChange={({ event }) =>
                handleValueChange("description", event.target.value)
              }
            />
          </div>

          <div className=" grid  grid-cols-10  md:grid-cols-12 ">
            <div className="mt-3 col-span-4">
              <label className="text-xs md:text-base font-medium text-slate-600 mr-3">
                Priority
              </label>
              <select
                className="text-xs md:text-sm mx-[8px] border border-gray-100 bg-gray-50"
                onChange={({ event }) =>
                  handleValueChange("priority", event.target.value)
                }
              >
                {PRIORITY_DATA.map((item, index) => (
                  <option key={index}> {item.label}</option>
                ))}
              </select>
            </div>

            <div className="mt-3 col-span-4">
              <label className="text-xs md:text-base font-medium text-slate-600 ">
                Due Date
              </label>

              <input
                className="text-xs md:text-sm mx-[12px] bg-gray-50 border border-gray-100"
                value={taskData.dueDate}
                onChange={({ event }) =>
                  handleValueChange("dueDate", event.target.value)
                }
                type="date"
              />
            </div>

            <div className="mt-3 col-span-4">
              <label className=" text-xs md:text-base font-medium text-slate-600">
                Assign To
              </label>
              <SelectUsers
                setSelectedUsers={(assignedUsers) =>
                  handleValueChange("assignedTo", assignedUsers)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;
