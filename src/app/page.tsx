import { graphQLClient } from '@/lib/graphql-client';
import { GET_POSTS, GET_GENERAL_SETTINGS } from '@/lib/queries';

async function getPosts() {
  try {
    const data: any = await graphQLClient.request(GET_POSTS);
    return data.posts.nodes;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function getSettings() {
  try {
    const data: any = await graphQLClient.request(GET_GENERAL_SETTINGS);
    return data.generalSettings;
  } catch (error) {
    return { title: 'Catalog', description: '', url: '' };
  }
}

export default async function Home() {
  const posts = await getPosts();
  const settings = await getSettings();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">{settings.title}</h1>
      <p className="text-xl mb-8">{settings.description}</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <div key={post.id} className="border rounded-lg p-6 bg-white shadow">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            <p className="text-sm text-gray-500 mt-4">{post.date}</p>
          </div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <p className="text-center text-gray-500">No posts found</p>
      )}
    </main>
  );
}