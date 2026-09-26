import Editor from "../../../components/Document/Editor";
import { Room } from "@/app/document/[documentId]/Room";


const Document = async () => {

  return (
    <>
      <Room>
        <Editor />
      </Room>
    </>
  );
};

export default Document;
