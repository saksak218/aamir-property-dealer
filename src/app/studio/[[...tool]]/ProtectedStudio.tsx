// app/studio/[[...tool]]/ProtectedStudio.tsx
"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NextStudio } from "next-sanity/studio";
import Loader from "@/components/common/Loader";

interface ProtectedStudioProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
}

export function ProtectedStudio({ config }: ProtectedStudioProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, isLoaded, router]);

  // Show loading state while checking authentication
  if (!isLoaded) {
    return <Loader />;
  }

  // If not signed in, show nothing (redirect is happening)
  if (!isSignedIn) {
    return null;
  }

  return <NextStudio config={config} />;
}
