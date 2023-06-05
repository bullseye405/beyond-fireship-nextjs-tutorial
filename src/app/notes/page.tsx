import { baseUrl } from "@/utlis";
import Link from "next/link";
import PocketBase from "pocketbase";
import CreateNote from "./CreateNote";

async function getNotes() {
  const db = new PocketBase(baseUrl);
  const data = await db.collection("posts").getList(1, 10);

  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div>
      <h1>Notes</h1>
      <div className="flex flex-wrap">
        {notes.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};
  return (
    <Link
      href={`/notes/${id}`}
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-3"
    >
      <div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="font-normal text-gray-700 dark:text-gray-400">{content}</p>
      </div>
    </Link>
  );
}
