// app/explore/page.tsx
import React, { Suspense } from 'react';
import ExploreContent from './ExploreContent'; // move your existing code to this component

const Page = () => {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading explore page...</div>}>
      <ExploreContent />
    </Suspense>
  );
};

export default Page;
