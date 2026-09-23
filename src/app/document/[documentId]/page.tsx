import { Editor } from "../../../components/Document/Editor";

interface DocumentProps {
    params: Promise<{documentId:string}>
}


const Document =  async ({params}:DocumentProps) => {
    const awaitedParams = await params;
    const {documentId} = awaitedParams;


    return (
        <>
        <Editor/>
        </>
    )
}

export default Document;