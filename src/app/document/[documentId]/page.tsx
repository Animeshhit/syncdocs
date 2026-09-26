import Editor from "../../../components/Document/Editor";
import { Room } from "@/app/document/[documentId]/Room";
import { auth } from '@clerk/nextjs/server'


const Document = async () => {
  
  await auth.protect()
  return (
    <>
      <Room>
        <Editor />
      </Room>
    </>
  );
};

export default Document;
