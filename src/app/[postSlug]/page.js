import React, { lazy, Suspense } from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import Spinner from "@/components/Spinner";
import CodeSnippet from "@/components/CodeSnippet";
const DivisionGroupsDemo = lazy(() => import("@/components/DivisionGroupsDemo"))

export async function generateMetadata({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);

  return {
    title: blogPost.frontmatter.title,
  };
}

async function BlogPost({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);
  
  return (
    <article className={styles.wrapper}>
      <BlogHero title={blogPost.frontmatter.title} publishedOn={blogPost.frontmatter.publishedOn} />
      <div className={styles.page}>
        <Suspense fallback={<Spinner />}>
          <MDXRemote source={blogPost.content} components={{
            pre: CodeSnippet,
            DivisionGroupsDemo
          }} />
        </Suspense>
      </div>
    </article>
  );
}

export default BlogPost;
