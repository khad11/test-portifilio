import FormInput from "../components/FormInput";
import { Form, useActionData } from "react-router-dom";
import FormTextArea from "../components/FormTextArea";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { Timestamp } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

const animatedComponents = makeAnimated();

export async function action({ request }) {
  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");
  const dueTo = form.get("dueTo")
    ? Timestamp.fromDate(new Date(form.get("dueTo")))
    : null;

  return { name, description, dueTo };
}

const usersOptions = [
  { value: "user1", label: "User 1" },
  { value: "user2", label: "User 2" },
  { value: "user3", label: "User 3" },
];

const projectTypes = [
  { value: "smm", label: "SMM" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "marketing", label: "Marketing" },
  { value: "mobilograf", label: "Mobilograf" },
];

function Create() {
  const { addDocument } = useFirestore();
  const CreateActionData = useActionData();
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [projectType, setProjectType] = useState([]);

  const selectUser = (user) => {
    setAssignedUsers(user);
  };

  const selectProjectType = (type) => {
    setProjectType(type);
  };

  const handleValidation = () => {
    if (!CreateActionData?.name) {
      toast.error("Project name is required!");
      return false;
    }
    if (!CreateActionData?.description) {
      toast.error("Project description is required!");
      return false;
    }
    if (!CreateActionData?.dueTo) {
      toast.error("Due date is required!");
      return false;
    }
    if (assignedUsers.length === 0) {
      toast.error("Please assign at least one user!");
      return false;
    }
    if (projectType.length === 0) {
      toast.error("Please select at least one project type!");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (CreateActionData && handleValidation()) {
      addDocument("projects", {
        ...CreateActionData,
        assignedUsers,
        projectType,
        createdAt: serverTimestamp(new Date()),
      });
      toast.success("Project created successfully!");
    }
  }, [CreateActionData]);

  return (
    <div className="flex flex-col items-center px-5">
      <h2 className="text-4xl font-semibold text-center mb-10 text-teal-600 uppercase">
        Create Your Project
      </h2>
      <Form
        method="post"
        className="flex flex-col gap-7 max-w-[700px] w-full justify-center bg-white p-10 shadow-lg rounded-lg border border-gray-300"
      >
        <FormInput
          name="name"
          label="Project Name"
          type="text"
          placeholder="Enter project name here"
        />
        <FormTextArea label="Project Description" name="description" />
        <FormInput label="Set Due Date" type="date" name="dueTo" />
        <label className="form-control">
          <div className="label">
            <span className="label-text font-medium text-gray-700">
              Project Type:
            </span>
          </div>
          <Select
            onChange={selectProjectType}
            options={projectTypes}
            isMulti
            components={animatedComponents}
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text font-medium text-gray-700">
              Assign Users:
            </span>
          </div>
          <Select
            onChange={selectUser}
            options={usersOptions}
            isMulti
            components={animatedComponents}
          />
        </label>
        <div className="flex justify-end">
          <button
            className="py-3 px-6 mt-8 bg-teal-500 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300"
            type="submit"
          >
            Add Project
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Create;
