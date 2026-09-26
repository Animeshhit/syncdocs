import Editor from "../../../components/Document/Editor";
import { Room } from "@/app/document/[documentId]/Room";

interface DocumentProps {
  params: Promise<{ documentId: string }>;
}

const Document = async ({ params }: DocumentProps) => {
  const awaitedParams = await params;
  const { documentId } = awaitedParams;

  return (
    <>
      <Room>
        <Editor />
      </Room>
    </>
  );
};

export default Document;
