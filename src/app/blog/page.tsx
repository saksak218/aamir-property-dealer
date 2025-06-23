import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import BlogWrapper from "@/components/blog/BlogWrapper";

const POSTS_PER_PAGE = 6;

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[$start...$end]{_id, title, author, body, category, tags, mainImage, slug, publishedAt, excerpt, readTime}`;

const POSTS_COUNT_QUERY = `count(*[_type == "post" && defined(slug.current)])`;

const AUTHOR_QUERY = `*[_type == "author"]{_id, name, slug, image}`;

const CATEGORIES_QUERY = `*[_type == "category"]{_id, title, "slug": slug.current}`;

const options = { next: { revalidate: 30 } };

interface PageProps {
  searchParams: { page?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [posts, totalPosts, authors, categories] = await Promise.all([
    client.fetch<SanityDocument[]>(POSTS_QUERY, { start, end }, options),
    client.fetch<number>(POSTS_COUNT_QUERY, {}, options),
    client.fetch<SanityDocument[]>(AUTHOR_QUERY, {}, options),
    client.fetch<SanityDocument[]>(CATEGORIES_QUERY, {}, options),
  ]);

  // const today = new Date();
  // const todayStr = today.toISOString().slice(0, 10); // 'YYYY-MM-DD'
  // const featuredPost =
  //   posts.find(
  //     (post) =>
  //       post.publishedAt &&
  //       post.publishedAt.slice(0, 10) === todayStr
  //   ) || null;

  const featuredPost = posts.length > 0 ? posts[0] : null;

  // console.log(featuredPost);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // console.log(posts);
  // console.log(authors);
  // console.log(categories);

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
      <BlogWrapper
        categories={categories}
        featuredPost={featuredPost ? featuredPost : null}
        authors={authors}
        posts={posts}
      />
    </main>
  );

  // return (
  //   <div className="bg-gradient-to-br from-slate-50 dark:from-slate-900 via-blue-50 dark:via-slate-800 to-indigo-100 dark:to-indigo-900 min-h-screen">
  //     {/* Hero Section */}
  //     <div className="relative overflow-hidden">
  //       <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
  //       <div className="relative mx-auto px-6 lg:px-8 py-24 sm:py-32 max-w-7xl">
  //         <div className="text-center">
  //           <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-extrabold text-transparent text-5xl sm:text-7xl tracking-tight">
  //             Our Blog
  //           </h1>
  //           <p className="mx-auto mt-6 max-w-2xl text-slate-600 dark:text-slate-300 text-lg leading-8">
  //             Discover insights, stories, and expertise from our team. Stay updated with the latest trends and innovations.
  //           </p>
  //         </div>
  //       </div>
  //     </div>

  //     <main className="mx-auto px-6 lg:px-8 pb-24 max-w-7xl">
  //       {/* Posts Grid */}
  //       <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
  //         {posts.map(({ _id, title, slug, mainImage, publishedAt, excerpt }) => (
  //           <article
  //             key={_id}
  //             className="group relative bg-white/80 dark:bg-slate-800/80 shadow-lg hover:shadow-2xl dark:shadow-slate-900/20 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
  //           >
  //             {/* Image */}
  //             <div className="relative rounded-t-2xl w-full h-64 overflow-hidden">
  //               {mainImage ? (
  //                 <Image
  //                   src={urlFor(mainImage).width(600).height(400).url()}
  //                   alt={title}
  //                   fill
  //                   className="object-cover group-hover:scale-110 transition-transform duration-500"
  //                 />
  //               ) : (
  //                 <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 w-full h-full">
  //                   <div className="opacity-20 font-bold text-white text-6xl">
  //                     {title.charAt(0)}
  //                   </div>
  //                 </div>
  //               )}
  //               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  //             </div>

  //             {/* Content */}
  //             <div className="p-6">
  //               {/* Date */}
  //               <div className="flex items-center gap-2 mb-3 text-slate-500 dark:text-slate-400 text-sm">
  //                 <Calendar className="w-4 h-4" />
  //                 <time dateTime={publishedAt}>
  //                   {new Date(publishedAt).toLocaleDateString('en-US', {
  //                     year: 'numeric',
  //                     month: 'long',
  //                     day: 'numeric'
  //                   })}
  //                 </time>
  //               </div>

  //               {/* Title */}
  //               <h2 className="mb-3 font-bold text-slate-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-xl leading-tight transition-colors">
  //                 {title}
  //               </h2>

  //               {/* Excerpt */}
  //               {excerpt && (
  //                 <p className="mb-4 text-slate-600 dark:text-slate-300 line-clamp-3">
  //                   {excerpt}
  //                 </p>
  //               )}

  //               {/* Read More Link */}
  //               <Link
  //                 href={`/hello/${slug.current}`}
  //                 className="inline-flex items-center gap-2 hover:gap-3 font-semibold text-blue-600 hover:text-blue-700 dark:hover:text-blue-300 dark:text-blue-400 transition-all duration-200"
  //               >
  //                 Read More
  //                 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
  //               </Link>
  //             </div>

  //             {/* Hover overlay */}
  //             <div className="absolute inset-0 rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 group-hover:ring-blue-500/20 ring-inset transition-all duration-300"></div>
  //           </article>
  //         ))}
  //       </div>

  //       {/* Empty State */}
  //       {posts.length === 0 && (
  //         <div className="py-16 text-center">
  //           <div className="flex justify-center items-center bg-slate-100 dark:bg-slate-800 mx-auto mb-6 rounded-full w-24 h-24">
  //             <Calendar className="w-12 h-12 text-slate-400" />
  //           </div>
  //           <h3 className="mb-2 font-semibold text-slate-900 dark:text-white text-xl">
  //             No posts yet
  //           </h3>
  //           <p className="text-slate-600 dark:text-slate-400">
  //             Check back soon for new content!
  //           </p>
  //         </div>
  //       )}

  //       {/* Pagination */}
  //       {totalPages > 1 && (
  //         <div className="flex justify-center items-center mt-16">
  //           <nav className="flex items-center gap-2">
  //             {/* Previous Button */}
  //             <Link
  //               href={`?page=${currentPage - 1}`}
  //               className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
  //                 currentPage <= 1
  //                   ? 'cursor-not-allowed text-slate-400 dark:text-slate-600'
  //                   : 'text-slate-700 hover:bg-white hover:shadow-md dark:text-slate-300 dark:hover:bg-slate-800'
  //               }`}
  //               {...(currentPage <= 1 && { 'aria-disabled': true })}
  //             >
  //               <ChevronLeft className="w-4 h-4" />
  //               Previous
  //             </Link>

  //             {/* Page Numbers */}
  //             <div className="flex items-center gap-1">
  //               {Array.from({ length: totalPages }, (_, i) => i + 1)
  //                 .filter(page => {
  //                   const distance = Math.abs(page - currentPage);
  //                   return distance <= 2 || page === 1 || page === totalPages;
  //                 })
  //                 .map((page, index, array) => {
  //                   const showEllipsis = index > 0 && array[index - 1] !== page - 1;
  //                   return (
  //                     <div key={page} className="flex items-center">
  //                       {showEllipsis && (
  //                         <span className="px-2 text-slate-400 dark:text-slate-600">
  //                           ...
  //                         </span>
  //                       )}
  //                       <Link
  //                         href={`?page=${page}`}
  //                         className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
  //                           currentPage === page
  //                             ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
  //                             : 'text-slate-700 hover:bg-white hover:shadow-md dark:text-slate-300 dark:hover:bg-slate-800'
  //                         }`}
  //                       >
  //                         {page}
  //                       </Link>
  //                     </div>
  //                   );
  //                 })}
  //             </div>

  //             {/* Next Button */}
  //             <Link
  //               href={`?page=${currentPage + 1}`}
  //               className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
  //                 currentPage >= totalPages
  //                   ? 'cursor-not-allowed text-slate-400 dark:text-slate-600'
  //                   : 'text-slate-700 hover:bg-white hover:shadow-md dark:text-slate-300 dark:hover:bg-slate-800'
  //               }`}
  //               {...(currentPage >= totalPages && { 'aria-disabled': true })}
  //             >
  //               Next
  //               <ChevronRight className="w-4 h-4" />
  //             </Link>
  //           </nav>
  //         </div>
  //       )}

  //       {/* Page Info */}
  //       {totalPosts > 0 && (
  //         <div className="mt-8 text-slate-600 dark:text-slate-400 text-sm text-center">
  //           Showing {start + 1} to {Math.min(end, totalPosts)} of {totalPosts} posts
  //         </div>
  //       )}
  //     </main>
  //   </div>
  // );
}
