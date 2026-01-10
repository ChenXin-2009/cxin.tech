import Link from 'next/link'

export default function BlogPage() {
  const posts = [
    { slug: 'first-post', title: 'My First Post', date: '2024-01-01' },
    { slug: 'second-post', title: 'Second Post', date: '2024-01-15' },
  ]

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:text-blue-500">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-500 text-sm">{post.date}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
