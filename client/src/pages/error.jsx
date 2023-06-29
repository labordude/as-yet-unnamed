import React from "react";

export default function ErrorElement({error, resetErrorBoundary}) {
  resetErrorBoundary();
  return (
    <div className="text-charcoal">
      An error has occurred...whoops<p>{error.message}</p>
    </div>
  );
}
