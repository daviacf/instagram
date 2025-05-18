'use client';

import PostItem from './components/PostItem';

interface Post {
  id: number;
  username: string;
  avatarUrl: string;
  imageUrl: string;
  numberOfLikes: number;
  description: string;
}

const posts: Post[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  username: `user${Math.floor(Math.random() * 1000)}`,
  avatarUrl: `https://i.pravatar.cc/150?img=${i + 1}`,
  imageUrl: `https://cataas.com/cat?img=${i + 1}`,
  numberOfLikes: Math.floor(Math.random() * 1000),
  description: '',//descrição adicionado no componente PostItem
}));

export default function Home() {
  return (
    <div>
      {/* <h1 className="text-center text-2xl font-bold mb-6"> .</h1> */}
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
