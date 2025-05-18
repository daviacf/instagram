'use client';

import { useState, useEffect } from 'react';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

interface Post {
  id: number;
  username: string;
  avatarUrl: string;
  imageUrl: string;
  numberOfLikes: number;
  description: string;
}

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const [liked, setLiked] = useState(false);
  const [fact, setFact] = useState<string>('Carregando...');

  const toggleLike = () => setLiked(!liked);

  useEffect(() => {
    fetch('https://meowfacts.herokuapp.com/')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setFact(data.data[0]);
        } else {
          setFact('Fato não disponível.');
        }
      })
      .catch(() => {
        setFact('Erro ao carregar o fato.');
      });
  }, []);

  return (
    <div className="max-w-md mx-auto my-4 bg-white shadow">
      {/* Header */}
      <div className="flex items-center p-4">
        <img src={post.avatarUrl} alt={post.username} className="w-10 h-10 rounded-full mr-3" />
        <span className="font-semibold">{post.username}</span>
      </div>

      {/* Image */}
      <img src={post.imageUrl} alt="Post" className="w-full p-4" />

      {/* Footer */}
      <div className="p-4">
        <button onClick={toggleLike}>
          {liked ? (
            <HeartSolid className="h-6 w-6 text-red-500" />
          ) : (
            <HeartOutline className="h-6 w-6 text-gray-700" />
          )}
        </button>

        <p className="mt-2 text-sm text-gray-800">
          <strong>{post.numberOfLikes + (liked ? 1 : 0)} curtidas</strong>
        </p>
        <p className="text-sm">
          <strong>{post.username}</strong> {fact}
        </p>
      </div>
    </div>
  );
}
