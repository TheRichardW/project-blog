import React, { lazy, Suspense } from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import Spinner from "@/components/Spinner";
import CodeSnippet from "@/components/CodeSnippet";
import RespectMotionPreferences from "@/components/RespectMotionPreferences";
const DivisionGroupsDemo = lazy(() => import("@/components/DivisionGroupsDemo"))
const CircularColorsDemo = lazy(() => import("@/components/CircularColorsDemo"))

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
        <RespectMotionPreferences>
          <Suspense fallback={<Spinner />}>
            <MDXRemote source={blogPost.content} components={{
              pre: CodeSnippet,
              DivisionGroupsDemo,
              CircularColorsDemo
            }} />
          </Suspense>
        </RespectMotionPreferences>
      </div>
    </article>
  );
}

export default BlogPost;
