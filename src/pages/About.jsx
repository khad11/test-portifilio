import { useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import toast from "react-hot-toast";

function About() {
  const [project, setProject] = useState(null);
  const { isPending, deleteDocument, updateDocument } = useFirestore("project");

  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchProject();
  }, [id]);
  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading project details...</p>
      </div>
    );
  }
  return (
    <>
      <div className="">
        <div className="card bg-gradient-to-b from-slate-800 to-slate-600 text-neutral-content w-[500px]  ">
          <div className="card-body ">
            <h2 className="card-title  text-2xl uppercase"> {project.name}</h2>
            <h3 className="text-x italic font-extralight">
              {project.projectType}
            </h3>
            <hr />

            <p className="w-full p-2 bg-slate-400 text-black rounded-md mt-2 ">
              {project.description}
            </p>
            {/*BUTTONS */}
            <div className="card-actions flex  justify-center gap-10">
              <div className="flex justify-end">
                <button
                  className="py-2 px-4 mt-4 bg-teal-600 text-white rounded-lg font-semibold text-sx shadow-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300"
                  type="submit"
                  onClick={() => updateDocument(project.id)}
                >
                  Completed Project
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  className="py-2 px-4 mt-4 bg-teal-600 text-white rounded-lg font-semibold text-sx shadow-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300"
                  type="submit"
                  onClick={() => deleteDocument(id)}
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
