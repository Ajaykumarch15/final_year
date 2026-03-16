import { useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";
import { motion } from "framer-motion";
import { FaFileExcel, FaUpload } from "react-icons/fa";

const UploadCGPA = () => {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {

        const selected = e.target.files[0];

        if (!selected) return;

        if (!selected.name.endsWith(".xlsx")) {
            setMessage("Please upload a valid Excel file (.xlsx)");
            return;
        }

        setFile(selected);
        setMessage("");

    };

    const uploadFile = async () => {

        if (!file) {
            setMessage("Please select a file first");
            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();
            formData.append("file", file);

            const res = await API.post(
                "/admin/upload-cgpa",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setMessage(`✅ ${res.data.updatedStudents} students updated`);

        } catch (err) {

            setMessage("Upload failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    Upload CGPA Excel
                </h1>

                <motion.div
                    whileHover={{ y: -3 }}
                    className="bg-white shadow rounded-xl p-8"
                >

                    <div className="flex flex-col items-center text-center">

                        <FaFileExcel className="text-green-600 text-5xl mb-4" />

                        <h2 className="text-xl font-semibold mb-2">
                            Upload Student CGPA Sheet
                        </h2>

                        <p className="text-slate-500 mb-6">
                            Upload Excel file containing RollNo and CGPA columns
                        </p>

                        {/* File Input */}

                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileChange}
                            className="mb-4"
                        />

                        {file && (
                            <p className="text-sm text-slate-600 mb-4">
                                Selected file: {file.name}
                            </p>
                        )}

                        {/* Upload Button */}

                        <button
                            onClick={uploadFile}
                            disabled={loading}
                            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition"
                        >

                            <FaUpload />

                            {loading ? "Uploading..." : "Update CGPA"}

                        </button>

                        {message && (
                            <p className="mt-4 text-sm font-medium">
                                {message}
                            </p>
                        )}

                    </div>

                </motion.div>

                {/* Format Info */}

                <div className="bg-slate-50 p-6 rounded-xl mt-8">

                    <h3 className="font-semibold mb-2">
                        Expected Excel Format
                    </h3>

                    <pre className="text-sm text-slate-600">

                        RollNo | CGPA
                        21CS001 | 8.9
                        21CS002 | 7.8
                        21CS003 | 9.1

                    </pre>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default UploadCGPA;