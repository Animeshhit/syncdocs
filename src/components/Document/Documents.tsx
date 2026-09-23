"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function Documents() {
  const doc = useQuery(api.document.get);

  return (
    <div>Documents : {JSON.stringify(doc)}</div>
  )
}

export default Documents