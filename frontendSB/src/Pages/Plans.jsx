import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit, FaArrowUp, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import Cookies from "universal-cookie";
import shopping from "../images/work-order.png";
import list from "../images/list.gif";

function Plans() {
  const cookies = new Cookies();
  const userId = cookies.get("userId");

  if (!userId) {
    alert("Invalid user, please refresh the page.");
  }

  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState("");
  const [newTask, setNewTask] = useState("");
  const [activeSectionId, setActiveSectionId] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/plans/${userId}/getAll`)
      .then((response) => {
        if (response.status === 200 && response.data) {
          const updatedSections = response.data.sections.map((section) => ({
            ...section,
            tasks: section.tasks || [],
          }));
          setSections(updatedSections);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [userId]);

  const toggleTaskInputVisibility = (sectionId) => {
    setActiveSectionId((prevActiveSectionId) =>
      prevActiveSectionId === sectionId ? null : sectionId
    );
  };

  const addSection = async () => {
    if (!newSection.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/plans/section/${userId}/${newSection}`
      );
      if (response.status === 200) {
        const currentsection = response.data;
        // Ensure tasks array is initialized
        currentsection.tasks = currentsection.tasks || [];
        setSections((prevsections) => [...prevsections, currentsection]);
      }
    } catch (error) {
      console.error("Error adding section:", error);
    } finally {
      setNewSection("");
    }
  };

  const deleteSection = async (sectionId) => {
    try {
      await axios.delete(
        `http://localhost:5000/plans/section/${userId}/${sectionId}/delete`
      );
      setSections((prev) => prev.filter((_, index) => index != sectionId));
    } catch (err) {
      console.error("Error deleting section:", err);
    }
  };

  const editSection = async (sectionId) => {
    const newSectionName = prompt(
      "Edit Section Name:",
      sections[sectionId].sectionName
    );

    if (
      !newSectionName ||
      newSectionName.trim() === sections[sectionId].sectionName
    )
      return;

    try {
      const response = await axios.put(
        `http://localhost:5000/plans/section/${userId}/${sectionId}`,
        { sectionName: newSectionName }
      );

      if (response.status === 200) {
        setSections((prevSections) =>
          prevSections.map((section, index) =>
            index === sectionId
              ? { ...section, sectionName: newSectionName }
              : section
          )
        );
      }
    } catch (err) {
      console.error("Error updating section:", err);
    }
  };

  const addTask = async (sectionId) => {
    const newTaskObject = {
      taskName: newTask,
      dueDate: new Date(),
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/plans/task/${userId}/${sectionId}`,
        newTaskObject
      );
      if (response.status === 200) {
        const newTask = response.data;
        setSections((prev) =>
          prev.map((section, index) =>
            index === sectionId
              ? {
                  ...section,
                  tasks: [...section.tasks, newTask],
                }
              : section
          )
        );
      }
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setNewTask("");
    }
  };

  const deleteTask = async (sectionId, taskId) => {
    setSections((prev) =>
      prev.map((section, index) =>
        index === sectionId
          ? {
              ...section,
              tasks: section.tasks.filter(
                (_, indextask) => indextask != taskId
              ),
            }
          : section
      )
    );

    try {
      await axios.delete(
        `http://localhost:5000/plans/task/${userId}/${sectionId}/${taskId}/delete`
      );
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const editTask = async (sectionId, taskId) => {
    const taskname = sections[sectionId].tasks[taskId].taskName;

    const newTaskName = prompt("Edit Section Name:", taskname);

    const newTaskObject = {
      taskName: newTaskName,
      dueDate: new Date(),
    };

    if (
      !newTaskName ||
      newTaskName.trim() === sections[sectionId].tasks[taskId].taskName
    )
      return;

    try {
      const response = await axios.put(
        `http://localhost:5000/plans/task/${userId}/${sectionId}/${taskId}`,
        newTaskObject
      );

      if (response.status === 200) {
        setSections((prev) =>
          prev.map((section, index) =>
            index === sectionId
              ? {
                  ...section,
                  tasks: section.tasks?.map((task, indextask) =>
                    indextask !== taskId
                      ? task
                      : {
                          ...task,
                          taskName: response.data.taskName,
                          dueDate: new Date(),
                        }
                  ),
                }
              : section
          )
        );
      }
    } catch (err) {
      console.error("Error updating section:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6">My Plans</h1>

        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            placeholder="New Section Name"
            className="p-2 rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button
            className="py-2 px-5 bg-green-500 text-white rounded-lg cursor-pointer"
            onClick={addSection}
          >
            Add
          </button>
        </div>

        {sections.length === 0 ? (
          <div>
            <img src={shopping} alt="No plans" />
          </div>
        ) : (
          sections.map((section, sectionId) => (
            <div
              key={sectionId}
              className="bg-white p-4 mb-6 rounded-xl shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-semibold flex items-center">
                  <img src={list} alt="List" className="w-8 h-8" />
                  {section.sectionName}
                </div>

                <div className="space-x-2 flex items-center">
                  <button
                    className="text-gray-500 hover:underline"
                    onClick={() => toggleTaskInputVisibility(sectionId)}
                  >
                    {activeSectionId === sectionId ? (
                      <FaArrowUp className="text-gray-600" />
                    ) : (
                      <FaArrowDown className="text-gray-600" />
                    )}
                  </button>

                  <button
                    className="text-yellow-500 hover:text-yellow-700"
                    onClick={() => editSection(sectionId)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteSection(sectionId)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              {activeSectionId === sectionId && (
                <>
                  <div className="flex mb-4 space-x-2">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="New Task"
                      className="p-2 rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button
                      className="py-2 px-5 bg-blue-500 text-white rounded-lg cursor-pointer"
                      onClick={() => addTask(sectionId)}
                    >
                      Add Task
                    </button>
                  </div>

                  {section.tasks &&
                    section.tasks.map((task, taskId) => (
                      <div
                        key={taskId}
                        className="flex justify-between items-center p-4 mb-4 border border-gray-300 rounded-lg"
                      >
                        <div className="flex space-x-2 w-full items-center">
                          <p className="flex-1">{task.taskName}</p>
                          <small className="text-gray-500 ml-2 p-2">
                            Date: {new Date(task.dueDate).toLocaleDateString()}
                          </small>
                        </div>
                        <div className="space-x-2 flex items-center">
                          <button
                            className="text-yellow-500 hover:text-yellow-700"
                            onClick={() => editTask(sectionId, taskId)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteTask(sectionId, taskId)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Plans;
