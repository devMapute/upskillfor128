"use client";

import React, { use, useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl text-red-500">Error: {error.message}</p>
    </div>
  );
}
