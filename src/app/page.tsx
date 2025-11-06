import { graphQLClient } from '@/lib/graphql-client';
import { GET_POSTS, GET_GENERAL_SETTINGS } from '@/lib/queries';
import CatalogHomePage from './CatalogHomePage'; // adjust path to wherever you saved it

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
    <CatalogHomePage
      posts={posts}
      settings={settings}
    />
  );
}
