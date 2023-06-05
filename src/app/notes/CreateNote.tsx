"use client";

import { baseUrl } from "@/utlis";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Error components must be Client Components

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [errors, setErrors] = useState<any>({});

  const router = useRouter();

  const create = async () => {
    if (title && content) {
      await fetch(`${baseUrl}/api/collections/posts/records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      setContent("");
      setTitle("");

      router.refresh();
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md m-3">
      <h2 className="text-2xl font-bold mb-4">Create a new post</h2>
      {/* {successMessage && (
          <div
            className="bg-green- border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{successMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-green-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  fillRule="evenodd"
                  d="M14.348 5.652a.5.5 0 01.708.708L6.707 15.707a.5.5 0 01-.708-.708l7.349-7.349a.5.5 0 000-.708L6.707 4.293a.5.5 0 01.708-.708l7.349 7.349z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        )} */}
      <form onSubmit={create}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
              ${errors.title ? "border-red-500" : ""}`}
            id="title"
            name="title"
            type="text"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            // ref={register({ required: true })}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">Title is required</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.content ? "border-red-500" : ""
            }`}
            id="content"
            name="content"
            placeholder="Enter content"
            onChange={(e) => setContent(e.target.value)}
            value={content}

            // ref={register({ required: true })}
          />
          {errors.content && <p className="text-red-500 text-xs mt-1">Content is required</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create!
          </button>
        </div>
      </form>
    </div>
  );
}
