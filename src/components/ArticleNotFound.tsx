"use client";

import React from "react";
import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div>
      <h1>Article not found</h1>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
