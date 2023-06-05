import { baseUrl } from "@/utlis";

async function getNote(noteId: string) {
  const res = await fetch(`${baseUrl}/api/collections/posts/records/${noteId}`, {
    next: { revalidate: 10 },
  });

  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);
  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className="">
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
      </div>
    </div>
  );
}
